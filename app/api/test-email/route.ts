import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function GET(request: NextRequest) {
  try {
    console.log("Testing email configuration...")
    
    // Check environment variables
    const emailUser = process.env.EMAIL_USER
    const emailPassword = process.env.EMAIL_APP_PASSWORD
    const emailService = process.env.EMAIL_SERVICE

    if (!emailUser || !emailPassword) {
      return NextResponse.json({
        success: false,
        error: "Email credentials not configured",
        details: {
          hasUser: !!emailUser,
          hasPassword: !!emailPassword,
          service: emailService
        }
      }, { status: 400 })
    }

    // Create transporter (fixed method name)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    })

    // Verify connection
    await transporter.verify()
    
    console.log("✅ Email configuration verified successfully")

    // Send test email
    const testEmail = await transporter.sendMail({
      from: `"Portfolio Test" <${emailUser}>`,
      to: emailUser, // Send to yourself for testing
      subject: "Portfolio Email Test ✅",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Email Configuration Test</h2>
          <p>This is a test email to verify your portfolio email configuration.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Status:</strong> ✅ Email system is working properly!</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Email configuration verified and test email sent",
      details: {
        messageId: testEmail.messageId,
        user: emailUser,
        service: emailService
      }
    })

  } catch (error) {
    console.error("❌ Email test failed:", error)
    
    return NextResponse.json({
      success: false,
      error: "Email configuration test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
