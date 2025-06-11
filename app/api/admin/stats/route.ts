import { NextRequest, NextResponse } from "next/server"
import { getAdminStats } from "@/app/actions/auth"

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
    const result = await getAdminStats(token)
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        stats: result.stats
      })
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    )
  }
}