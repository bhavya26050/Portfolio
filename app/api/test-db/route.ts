import { NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    console.log("Testing MongoDB connection...")
    const db = await getDatabase()

    // Test connection by performing a simple operation
    const collections = await db.listCollections().toArray()

    console.log("✅ MongoDB connection successful")
    console.log("Available collections:", collections.map((c) => c.name))

    return NextResponse.json({
      success: true,
      message: "MongoDB connection successful",
      collections: collections.map((c) => c.name),
      database: db.databaseName,
    })
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
