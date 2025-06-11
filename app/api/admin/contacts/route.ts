import { NextRequest, NextResponse } from "next/server"
import { verifyAdminToken } from "@/app/actions/auth"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
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

    const db = await getDatabase()
    
    // Fetch recent contacts
    const contacts = await db.collection("contacts")
      .find({})
      .sort({ submittedAt: -1 })
      .limit(50)
      .toArray()

    return NextResponse.json({
      success: true,
      contacts: contacts
    })

  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    )
  }
}
