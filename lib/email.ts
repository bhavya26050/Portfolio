import nodemailer from "nodemailer"
import { getDatabase } from "@/lib/mongodb"

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // For Gmail
  if (process.env.EMAIL_SERVICE === "gmail") {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Use App Password for Gmail
      },
      // Add these options for better reliability
      secure: true,
      port: 465,
    })
  }

  // For custom SMTP (like your hosting provider)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

export interface ContactEmailData {
  name: string
  email: string
  subject: string
  message: string
  projectType?: string
}

// Send notification email to you when someone contacts you
export async function sendContactNotification(data: ContactEmailData) {
  try {
    const transporter = createTransporter()

    // Verify transporter before sending
    await transporter.verify()

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || "bhavyaverma.dev@gmail.com",
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            ${data.projectType ? `<p><strong>Project Type:</strong> ${data.projectType}</p>` : ""}
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #334155; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${data.message.replace(/\n/g, "<br>")}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>Quick Actions:</strong>
              <a href="mailto:${data.email}?subject=Re: ${data.subject}" 
                 style="color: #3b82f6; text-decoration: none; margin-left: 10px;">
                Reply to ${data.name}
              </a>
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              This email was sent from your portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission

        Name: ${data.name}
        Email: ${data.email}
        Subject: ${data.subject}
        ${data.projectType ? `Project Type: ${data.projectType}` : ""}

        Message:
        ${data.message}

        Reply to: ${data.email}
        Submitted at: ${new Date().toLocaleString()}
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("✅ Contact notification email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("❌ Error sending contact notification email:", error)
    throw error
  }
}

// Send confirmation email to the person who contacted you
export async function sendContactConfirmation(data: ContactEmailData) {
  try {
    const transporter = createTransporter()

    // Verify transporter before sending
    await transporter.verify()

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: data.email,
      subject: `Thank you for contacting me, ${data.name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="color: #dbeafe; margin: 10px 0 0 0; font-size: 16px;">Your message has been received</p>
          </div>

          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 18px; color: #334155; margin-top: 0;">Hi ${data.name},</p>
            
            <p style="line-height: 1.6; color: #475569;">
              Thank you for reaching out! I've received your message about "<strong>${data.subject}</strong>" 
              and I appreciate you taking the time to contact me.
            </p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
              <h3 style="color: #1e40af; margin-top: 0; font-size: 16px;">Your Message Summary:</h3>
              <p style="color: #64748b; margin: 5px 0;"><strong>Subject:</strong> ${data.subject}</p>
              ${data.projectType ? `<p style="color: #64748b; margin: 5px 0;"><strong>Project Type:</strong> ${data.projectType}</p>` : ""}
              <p style="color: #64748b; margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <p style="line-height: 1.6; color: #475569;">
              I typically respond to messages within 24-48 hours. In the meantime, feel free to:
            </p>

            <ul style="color: #475569; line-height: 1.6;">
              <li>Check out my <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/projects" style="color: #3b82f6;">latest projects</a></li>
              <li>Read about my <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/research" style="color: #3b82f6;">research work</a></li>
              <li>Connect with me on <a href="https://linkedin.com/in/bhavya-verma" style="color: #3b82f6;">LinkedIn</a></li>
            </ul>

            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #334155; font-weight: 500;">Looking forward to connecting with you!</p>
              <p style="margin: 5px 0 0 0; color: #64748b;">Best regards,<br><strong>Bhavya Verma</strong></p>
            </div>
          </div>

          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              This is an automated confirmation email. Please do not reply to this email.
              <br>If you have any urgent questions, please contact me directly at bhavyaverma.dev@gmail.com
            </p>
          </div>
        </div>
      `,
      text: `
        Hi ${data.name},

        Thank you for reaching out! I've received your message about "${data.subject}" and I appreciate you taking the time to contact me.

        Your Message Summary:
        - Subject: ${data.subject}
        ${data.projectType ? `- Project Type: ${data.projectType}` : ""}
        - Submitted: ${new Date().toLocaleString()}

        I typically respond to messages within 24-48 hours. In the meantime, feel free to check out my work at ${process.env.NEXTAUTH_URL || "http://localhost:3000"}.

        Looking forward to connecting with you!

        Best regards,
        Bhavya Verma

        ---
        This is an automated confirmation email. Please do not reply to this email.
        If you have any urgent questions, please contact me directly at bhavyaverma.dev@gmail.com
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("✅ Contact confirmation email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("❌ Error sending contact confirmation email:", error)
    throw error
  }
}

// Test email configuration
export async function testEmailConfiguration() {
  try {
    const transporter = createTransporter()
    await transporter.verify()
    console.log("✅ Email configuration is valid")
    return { success: true, message: "Email configuration is valid" }
  } catch (error) {
    console.error("❌ Email configuration error:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

// Save contact message to MongoDB
export async function saveContactMessage(data: ContactEmailData) {
  try {
    const db = await getDatabase()
    
    const contactData = {
      ...data,
      createdAt: new Date(),
      status: "unread", // You can use this to track read/unread messages
      ip: null, // You can add IP tracking if needed
    }

    const result = await db.collection("contacts").insertOne(contactData)
    
    console.log("✅ Contact message saved to database:", result.insertedId)
    return { 
      success: true, 
      id: result.insertedId,
      message: "Contact message saved successfully" 
    }
  } catch (error) {
    console.error("❌ Error saving contact message:", error)
    throw error
  }
}

// Get all contact messages (for admin dashboard)
export async function getContactMessages() {
  try {
    const db = await getDatabase()
    
    const messages = await db.collection("contacts")
      .find({})
      .sort({ createdAt: -1 }) // Latest first
      .toArray()
    
    return { success: true, messages }
  } catch (error) {
    console.error("❌ Error fetching contact messages:", error)
    throw error
  }
}

// Mark message as read
export async function markMessageAsRead(messageId: string) {
  try {
    const db = await getDatabase()
    const { ObjectId } = require("mongodb")
    
    const result = await db.collection("contacts").updateOne(
      { _id: new ObjectId(messageId) },
      { $set: { status: "read", readAt: new Date() } }
    )
    
    return { success: true, modified: result.modifiedCount }
  } catch (error) {
    console.error("❌ Error marking message as read:", error)
    throw error
  }
}

// Delete message
export async function deleteContactMessage(messageId: string) {
  try {
    const db = await getDatabase()
    const { ObjectId } = require("mongodb")
    
    const result = await db.collection("contacts").deleteOne(
      { _id: new ObjectId(messageId) }
    )
    
    return { success: true, deleted: result.deletedCount }
  } catch (error) {
    console.error("❌ Error deleting message:", error)
    throw error
  }
}
