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
    
    // Fetch download statistics
    const downloads = await db.collection("downloads")
      .find({})
      .sort({ downloadedAt: -1 })
      .limit(50)
      .toArray()

    const totalContacts = await db.collection("contacts").countDocuments()
    const totalDownloads = await db.collection("downloads").countDocuments()

    // Today's stats
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const todayContacts = await db.collection("contacts").countDocuments({
      submittedAt: { $gte: today }
    })
    
    const todayDownloads = await db.collection("downloads").countDocuments({
      downloadedAt: { $gte: today }
    })

    return NextResponse.json({
      success: true,
      downloads: downloads,
      stats: {
        totalContacts,
        totalDownloads,
        todayContacts,
        todayDownloads
      }
    })

  } catch (error) {
    console.error("Error fetching download stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch download statistics" },
      { status: 500 }
    )
  }
}