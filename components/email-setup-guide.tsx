"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Mail, Settings, AlertCircle } from "lucide-react"

export function EmailSetupGuide() {
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testEmailConfig = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/test-email")
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({ success: false, message: "Failed to test email configuration" })
    } finally {
      setIsLoading(false)
    }
  }

  const sendTestEmail = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/test-email", { method: "POST" })
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({ success: false, message: "Failed to send test email" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Configuration Setup
          </CardTitle>
          <CardDescription>Configure email notifications for your portfolio contact form</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Gmail Setup (Recommended)
              </h3>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1. Go to your Google Account settings</li>
                <li>2. Enable 2-Factor Authentication</li>
                <li>3. Generate an App Password for "Mail"</li>
                <li>4. Add these to your .env.local:</li>
              </ol>
              <div className="mt-3 p-3 bg-gray-100 rounded-md font-mono text-xs">
                EMAIL_SERVICE=gmail
                <br />
                EMAIL_USER=your-email@gmail.com
                <br />
                EMAIL_APP_PASSWORD=your-16-char-password
                <br />
                EMAIL_FROM=your-email@gmail.com
                <br />
                EMAIL_TO=bhavyaverma.dev@gmail.com
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Custom SMTP Setup</h3>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1. Get SMTP details from your hosting provider</li>
                <li>2. Add these to your .env.local:</li>
              </ol>
              <div className="mt-3 p-3 bg-gray-100 rounded-md font-mono text-xs">
                EMAIL_SERVICE=smtp
                <br />
                SMTP_HOST=smtp.your-provider.com
                <br />
                SMTP_PORT=587
                <br />
                SMTP_USER=your-username
                <br />
                SMTP_PASSWORD=your-password
                <br />
                EMAIL_FROM=noreply@yourdomain.com
                <br />
                EMAIL_TO=bhavyaverma.dev@gmail.com
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={testEmailConfig} disabled={isLoading}>
              {isLoading ? "Testing..." : "Test Configuration"}
            </Button>
            <Button onClick={sendTestEmail} disabled={isLoading} variant="outline">
              {isLoading ? "Sending..." : "Send Test Email"}
            </Button>
          </div>

          {testResult && (
            <div
              className={`p-4 rounded-md flex items-center gap-2 ${
                testResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`}
            >
              {testResult.success ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="p-4 bg-blue-50 rounded-md">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold">Important Notes:</p>
                <ul className="mt-2 space-y-1">
                  <li>• For Gmail, you must use an App Password, not your regular password</li>
                  <li>• Make sure to restart your development server after adding environment variables</li>
                  <li>• Test emails might go to spam folder initially</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
