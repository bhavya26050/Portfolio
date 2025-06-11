import { NextRequest, NextResponse } from "next/server"
import { saveContactMessage } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      )
    }

    // Save to MongoDB
    const result = await saveContactMessage(data)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to save contact message" }, 
      { status: 500 }
    )
  }
}