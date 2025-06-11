import { NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { GridFSBucket, ObjectId } from "mongodb"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params

    if (!ObjectId.isValid(fileId)) {
      return NextResponse.json(
        { error: "Invalid file ID" },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const bucket = new GridFSBucket(db, { bucketName: 'resumes' })

    // Check if file exists
    const files = await bucket.find({ _id: new ObjectId(fileId) }).toArray()
    
    if (files.length === 0) {
      return NextResponse.json(
        { error: "Resume file not found" },
        { status: 404 }
      )
    }

    const file = files[0]
    
    // Log successful download
    console.log(`📥 Resume download: ${file.filename} (${fileId})`)
    
    // Track download completion
    await db.collection("download_completions").insertOne({
      fileId: fileId,
      filename: file.filename,
      downloadedAt: new Date(),
      fileSize: file.length,
    })
    
    // Stream the file
    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId))
    
    const chunks: Buffer[] = []
    
    return new Promise((resolve, reject) => {
      downloadStream.on('data', (chunk) => {
        chunks.push(chunk)
      })
      
      downloadStream.on('end', () => {
        const fileBuffer = Buffer.concat(chunks)
        
        console.log(`✅ Resume successfully streamed: ${file.filename} (${fileBuffer.length} bytes)`)
        
        const response = new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${file.filename || 'resume.pdf'}"`,
            'Content-Length': fileBuffer.length.toString(),
            'Cache-Control': 'no-cache',
            'X-Download-Success': 'true',
          },
        })
        
        resolve(response)
      })
      
      downloadStream.on('error', (error) => {
        console.error('❌ Error streaming resume:', error)
        reject(NextResponse.json(
          { error: "Failed to download resume" },
          { status: 500 }
        ))
      })
    })
    
  } catch (error) {
    console.error("❌ Error serving resume:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}