"use server"

import { getDatabase } from "@/lib/mongodb"
import { GridFSBucket, ObjectId } from "mongodb"
import fs from "fs"
import path from "path"

// Store resume file in MongoDB GridFS
export async function storeResumeFile(fileBuffer: Buffer, filename: string) {
  try {
    const db = await getDatabase()
    const bucket = new GridFSBucket(db, { bucketName: 'resumes' })
    
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: { 
        uploadedAt: new Date(),
        type: 'resume',
        version: '1.0'
      }
    })
    
    uploadStream.end(fileBuffer)
    
    return new Promise((resolve, reject) => {
      uploadStream.on('error', reject)
      uploadStream.on('finish', () => {
        console.log('✅ Resume stored in MongoDB:', uploadStream.id)
        resolve({ success: true, fileId: uploadStream.id })
      })
    })
  } catch (error) {
    console.error("❌ Error storing resume:", error)
    throw error
  }
}

// Get latest resume file from MongoDB
export async function getLatestResume() {
  try {
    const db = await getDatabase()
    const bucket = new GridFSBucket(db, { bucketName: 'resumes' })
    
    const files = await bucket.find({}).sort({ uploadDate: -1 }).limit(1).toArray()
    
    if (files.length === 0) {
      // Fallback to static file if no resume in DB
      return {
        success: true,
        url: "/Bhavya_Verma_Resume.pdf",
        isStatic: true
      }
    }
    
    return {
      success: true,
      fileId: files[0]._id,
      filename: files[0].filename,
      isStatic: false
    }
  } catch (error) {
    console.error("❌ Error fetching resume:", error)
    throw error
  }
}

export async function trackResumeDownload() {
  console.log("📄 Processing resume download...")

  try {
    const db = await getDatabase()

    // Get latest resume info
    const resumeInfo = await getLatestResume()

    // Track download in MongoDB
    const downloadData = {
      type: "resume",
      downloadedAt: new Date(),
      userAgent: "unknown", // You can add user agent tracking
      ipAddress: "unknown", // You can add IP tracking
      resumeId: resumeInfo.isStatic ? null : resumeInfo.fileId,
      isStatic: resumeInfo.isStatic
    }

    const result = await db.collection("downloads").insertOne(downloadData)

    console.log("✅ Resume download tracked:", result.insertedId)

    // Track analytics
    await db.collection("analytics").insertOne({
      event: "resume_downloaded",
      timestamp: new Date(),
      data: {
        downloadId: result.insertedId,
        resumeId: resumeInfo.isStatic ? null : resumeInfo.fileId,
      },
    })

    // Return appropriate URL
    if (resumeInfo.isStatic) {
      return {
        success: true,
        url: resumeInfo.url,
        isStatic: true
      }
    } else {
      return {
        success: true,
        url: `/api/resume/download/${resumeInfo.fileId}`,
        filename: resumeInfo.filename || "Bhavya_Verma_Resume.pdf",
        isStatic: false
      }
    }
  } catch (error) {
    console.error("❌ Error tracking resume download:", error)
    // Even if tracking fails, still allow download
    return {
      success: true,
      url: "/Bhavya_Verma_Resume.pdf",
      warning: "Download tracking failed but download will proceed",
      isStatic: true
    }
  }
}

// Function to get download statistics
export async function getDownloadStats() {
  try {
    const db = await getDatabase()

    const totalDownloads = await db.collection("downloads").countDocuments()
    const recentDownloads = await db
      .collection("downloads")
      .find({ downloadedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } })
      .count()

    const downloadsByType = await db
      .collection("downloads")
      .aggregate([
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()

    return {
      totalDownloads,
      recentDownloads,
      downloadsByType,
    }
  } catch (error) {
    console.error("Error fetching download stats:", error)
    throw error
  }
}
