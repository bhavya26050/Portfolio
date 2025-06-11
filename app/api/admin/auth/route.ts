import { NextRequest, NextResponse } from "next/server"
import { loginAdmin, logoutAdmin, changeAdminPassword, initializeAdmin } from "@/app/actions/auth"

export async function POST(request: NextRequest) {
  try {
    const { action, username, password, currentPassword, newPassword } = await request.json()

    // Initialize admin on first request (for setup)
    if (action === "init") {
      const result = await initializeAdmin()
      return NextResponse.json(result)
    }

    if (action === "login") {
      if (!username || !password) {
        return NextResponse.json(
          { error: "Username and password are required" },
          { status: 400 }
        )
      }

      const result = await loginAdmin(username, password)
      
      if (result.success) {
        return NextResponse.json({
          success: true,
          token: result.token,
          admin: result.admin,
          message: "Login successful"
        })
      } else {
        return NextResponse.json(
          { error: result.error },
          { status: 401 }
        )
      }
    }

    if (action === "logout") {
      const authHeader = request.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]
        await logoutAdmin(token)
      }
      
      return NextResponse.json({
        success: true,
        message: "Logout successful"
      })
    }

    if (action === "change-password") {
      const authHeader = request.headers.get('authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: "No authorization token provided" },
          { status: 401 }
        )
      }

      const token = authHeader.split(' ')[1]
      const result = await changeAdminPassword(currentPassword, newPassword, token)
      
      if (result.success) {
        return NextResponse.json({
          success: true,
          message: "Password changed successfully"
        })
      } else {
        return NextResponse.json(
          { error: result.error },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    )

  } catch (error) {
    console.error("Auth API error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
}