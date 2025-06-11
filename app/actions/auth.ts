"use server"

import { getDatabase } from "@/lib/mongodb"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-key"

// Initialize admin user in database (run this once)
export async function initializeAdmin() {
  try {
    const db = await getDatabase()
    
    // Check if admin already exists
    const existingAdmin = await db.collection("admins").findOne({ username: "admin" })
    
    if (!existingAdmin) {
      // Hash the password from environment variable
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "bhavya26", 12)
      
      await db.collection("admins").insertOne({
        username: "admin",
        password: hashedPassword,
        email: "bhavyaverma.dev@gmail.com",
        role: "admin",
        createdAt: new Date(),
        isActive: true,
      })
      
      console.log("✅ Admin user initialized in database")
    }
    
    return { success: true }
  } catch (error) {
    console.error("❌ Error initializing admin:", error)
    return { success: false, error: "Failed to initialize admin" }
  }
}

export async function loginAdmin(username: string, password: string) {
  try {
    const db = await getDatabase()
    
    // Find admin in database
    const admin = await db.collection("admins").findOne({ 
      username: username,
      isActive: true 
    })
    
    if (!admin) {
      return {
        success: false,
        error: "Invalid credentials"
      }
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password)
    
    if (!isValidPassword) {
      // Log failed login attempt
      await db.collection("admin_login_attempts").insertOne({
        username: username,
        success: false,
        attemptedAt: new Date(),
        ipAddress: "unknown", // You can add IP tracking
      })
      
      return {
        success: false,
        error: "Invalid credentials"
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        adminId: admin._id.toString(),
        username: admin.username,
        role: "admin", 
        loginTime: new Date().toISOString() 
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    )

    // Store session in database
    const sessionData = {
      adminId: admin._id,
      username: admin.username,
      token: token,
      loginAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      isActive: true,
    }
    
    await db.collection("admin_sessions").insertOne(sessionData)
    
    // Log successful login
    await db.collection("admin_login_attempts").insertOne({
      username: username,
      success: true,
      attemptedAt: new Date(),
      sessionId: sessionData._id,
    })

    console.log("✅ Admin logged in successfully:", username)

    return {
      success: true,
      token: token,
      admin: {
        username: admin.username,
        email: admin.email,
      }
    }
  } catch (error) {
    console.error("❌ Admin login error:", error)
    return {
      success: false,
      error: "Login failed"
    }
  }
}

export async function verifyAdminToken(token: string) {
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { 
      adminId: string, 
      username: string, 
      role: string 
    }
    
    if (decoded.role !== "admin") {
      return { isValid: false, error: "Invalid role" }
    }

    const db = await getDatabase()
    
    // Check if session exists and is active
    const session = await db.collection("admin_sessions").findOne({
      token: token,
      isActive: true,
      expiresAt: { $gt: new Date() }
    })

    if (!session) {
      return { isValid: false, error: "Session expired or invalid" }
    }
    
    // Check if admin is still active
    const admin = await db.collection("admins").findOne({
      _id: session.adminId,
      isActive: true
    })
    
    if (!admin) {
      return { isValid: false, error: "Admin account deactivated" }
    }

    return { 
      isValid: true, 
      admin: {
        id: admin._id.toString(),
        username: admin.username,
        email: admin.email
      }
    }
  } catch (error) {
    console.error("❌ Token verification failed:", error)
    return { isValid: false, error: "Token verification failed" }
  }
}

export async function logoutAdmin(token: string) {
  try {
    const db = await getDatabase()
    
    // Deactivate session
    await db.collection("admin_sessions").updateOne(
      { token: token },
      { 
        $set: { 
          isActive: false,
          logoutAt: new Date()
        }
      }
    )
    
    console.log("✅ Admin logged out successfully")
    return { success: true }
  } catch (error) {
    console.error("❌ Logout error:", error)
    return { success: false }
  }
}

export async function changeAdminPassword(currentPassword: string, newPassword: string, token: string) {
  try {
    const verification = await verifyAdminToken(token)
    if (!verification.isValid) {
      return { success: false, error: "Invalid session" }
    }

    const db = await getDatabase()
    const admin = await db.collection("admins").findOne({ 
      username: verification.admin?.username 
    })

    if (!admin) {
      return { success: false, error: "Admin not found" }
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, admin.password)
    if (!isValidPassword) {
      return { success: false, error: "Current password is incorrect" }
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    await db.collection("admins").updateOne(
      { _id: admin._id },
      { 
        $set: { 
          password: hashedNewPassword,
          passwordChangedAt: new Date()
        }
      }
    )

    console.log("✅ Admin password changed successfully")
    return { success: true }
  } catch (error) {
    console.error("❌ Password change error:", error)
    return { success: false, error: "Failed to change password" }
  }
}

export async function getAdminStats(token: string) {
  try {
    const verification = await verifyAdminToken(token)
    if (!verification.isValid) {
      return { success: false, error: "Invalid session" }
    }

    const db = await getDatabase()
    
    // Get various statistics
    const [
      totalDownloads,
      totalContacts,
      recentDownloads,
      recentContacts,
      loginAttempts
    ] = await Promise.all([
      db.collection("downloads").countDocuments(),
      db.collection("contacts").countDocuments(),
      db.collection("downloads").find().sort({ downloadedAt: -1 }).limit(10).toArray(),
      db.collection("contacts").find().sort({ submittedAt: -1 }).limit(10).toArray(),
      db.collection("admin_login_attempts").find().sort({ attemptedAt: -1 }).limit(10).toArray()
    ])

    return {
      success: true,
      stats: {
        totalDownloads,
        totalContacts,
        recentDownloads,
        recentContacts,
        loginAttempts
      }
    }
  } catch (error) {
    console.error("❌ Error fetching admin stats:", error)
    return { success: false, error: "Failed to fetch statistics" }
  }
}