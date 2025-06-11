import { NextRequest, NextResponse } from "next/server"
import { storeResumeFile } from "@/app/actions/resume"
import { verifyAdminToken } from "@/app/actions/auth"

export async function POST(request: NextRequest) {
  try {
    // Check authentication first
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: "Unauthorized - No token provided" },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const verification = await verifyAdminToken(token)
    
    if (!verification.isValid) {
      return NextResponse.json(
        { error: `Unauthorized - ${verification.error}` },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('resume') as File
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }
    
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      )
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size too large. Maximum 10MB allowed." },
        { status: 400 }
      )
    }
    
    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await storeResumeFile(buffer, file.name) as { fileId: string }
    
    console.log("✅ Admin uploaded new resume:", result.fileId, "by:", verification.admin?.username)
    
    return NextResponse.json({
      success: true,
      message: "Resume uploaded successfully",
      fileId: result.fileId,
      filename: file.name,
      size: file.size,
      uploadedBy: verification.admin?.username
    })
    
  } catch (error) {
    console.error("❌ Error uploading resume:", error)
    return NextResponse.json(
      { error: "Failed to upload resume" },
      { status: 500 }
    )
  }
}