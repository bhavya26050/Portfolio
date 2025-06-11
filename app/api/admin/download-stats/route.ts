import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDatabase()

    const totalDownloads = await db.collection("downloads").countDocuments()

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const recentDownloads = await db.collection("downloads").countDocuments({ downloadedAt: { $gte: thirtyDaysAgo } })

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

    return NextResponse.json({
      totalDownloads,
      recentDownloads,
      downloadsByType,
    })
  } catch (error) {
    console.error("Error fetching download stats:", error)
    return NextResponse.json({ error: "Failed to fetch download stats" }, { status: 500 })
  }
}
