"use server"

import { z } from "zod"
import nodemailer from "nodemailer"
import { getDatabase } from "@/lib/mongodb"

const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  projectType: z.string().optional(),
})

export type ContactFormState = {
  success: boolean
  error?: string
  message?: string
  fieldErrors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
    projectType?: string[]
  }
}

// Create email transporter with better error handling
function createEmailTransporter() {
  const emailUser = process.env.EMAIL_USER
  const emailPassword = process.env.EMAIL_APP_PASSWORD

  if (!emailUser || !emailPassword) {
    throw new Error("Email credentials not configured. Please set EMAIL_USER and EMAIL_APP_PASSWORD.")
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
    // Additional options for better reliability
    pool: true,
    maxConnections: 1,
    rateDelta: 20000,
    rateLimit: 5,
  })
}

export async function sendContactNotification(formData: z.infer<typeof ContactFormSchema>) {
  try {
    const transporter = createEmailTransporter()

    // Verify connection before sending
    await transporter.verify()
    console.log("📧 Email transporter verified successfully")

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 30px; border-radius: 10px; color: white; text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 28px;">New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Portfolio Website</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin-top: 0;">Contact Details</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Project Type:</strong> ${formData.projectType || 'Not specified'}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px;">
          <h2 style="color: #1e293b; margin-top: 0;">Subject</h2>
          <p style="font-size: 16px; font-weight: 600; color: #3b82f6;">${formData.subject}</p>
          
          <h2 style="color: #1e293b;">Message</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            ${formData.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f5f9; border-radius: 10px;">
          <p style="color: #64748b; margin: 0;">
            <strong>Received:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `

    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📧 New Contact: ${formData.subject}`,
      html: emailHtml,
      replyTo: formData.email,
    })

    console.log("✅ Contact notification sent:", info.messageId)
    return { success: true, messageId: info.messageId }

  } catch (error) {
    console.error("❌ Error sending contact notification:", error)
    throw error
  }
}

export async function sendContactConfirmation(formData: z.infer<typeof ContactFormSchema>) {
  try {
    const transporter = createEmailTransporter()

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; border-radius: 10px; color: white; text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 28px;">Thank You, ${formData.name}!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your message has been received</p>
        </div>
        
        <div style="padding: 30px; background: #f8fafc; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin-top: 0;">Message Summary</h2>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <div style="padding: 30px; background: #f8fafc; border-radius: 10px;">
          <h2 style="color: #1e293b; margin-top: 0;">What's Next?</h2>
          <ul style="color: #4b5563; line-height: 1.6;">
            <li>I'll review your message within 24 hours</li>
            <li>You'll receive a personal response to discuss your project</li>
            <li>Feel free to check out my portfolio while you wait</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #64748b;">
            Best regards,<br>
            <strong style="color: #3b82f6;">Bhavya Verma</strong><br>
            AI Developer & Full-Stack Engineer
          </p>
        </div>
      </div>
    `

    const info = await transporter.sendMail({
      from: `"Bhavya Verma" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: "✅ Thank you for contacting me!",
      html: confirmationHtml,
    })

    console.log("✅ Confirmation email sent:", info.messageId)
    return { success: true, messageId: info.messageId }

  } catch (error) {
    console.error("❌ Error sending confirmation email:", error)
    throw error
  }
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  console.log("📧 Processing contact form submission...")

  try {
    // Validate form data
    const validatedFields = ContactFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      projectType: formData.get("projectType"),
    })

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Please fill in all required fields correctly.",
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const db = await getDatabase()

    // Prepare contact data
    const contactData = {
      ...validatedFields.data,
      submittedAt: new Date(),
      status: "new",
      emailSent: false,
      confirmationSent: false,
    }

    // Insert contact form submission into MongoDB
    const result = await db.collection("contacts").insertOne(contactData)
    console.log("✅ Contact form submitted successfully:", result.insertedId)

    // Send email notifications
    let emailSuccess = false
    let confirmationSuccess = false
    
    try {
      await sendContactNotification(validatedFields.data)
      emailSuccess = true
      console.log("✅ Admin notification sent successfully")
    } catch (emailError) {
      console.error("⚠️ Admin email sending failed:", emailError)
    }

    try {
      await sendContactConfirmation(validatedFields.data)
      confirmationSuccess = true
      console.log("✅ User confirmation sent successfully")
    } catch (confirmationError) {
      console.error("⚠️ Confirmation email sending failed:", confirmationError)
    }

    // Update contact record with email status
    await db.collection("contacts").updateOne(
      { _id: result.insertedId },
      {
        $set: {
          emailSent: emailSuccess,
          confirmationSent: confirmationSuccess,
          emailSentAt: emailSuccess ? new Date() : null,
          confirmationSentAt: confirmationSuccess ? new Date() : null,
        }
      }
    )

    return {
      success: true,
      message: emailSuccess 
        ? "Thank you for your message! I'll get back to you soon." 
        : "Your message was saved successfully. Email notification may be delayed.",
    }
  } catch (error) {
    console.error("❌ Error submitting contact form:", error)
    return {
      success: false,
      error: "An error occurred while submitting your message. Please try again.",
    }
  }
}
