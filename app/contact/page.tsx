"use client"

import { useState, useEffect } from "react"
import { useActionState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"
import Navigation from "@/components/Navigation"

const projectTypes = [
  "Web Development",
  "Mobile App",
  "AI/ML Project",
  "E-commerce",
  "SaaS Platform",
  "API Development",
  "Consulting",
  "Other",
]

export default function ContactPage() {
  const [selectedProjectType, setSelectedProjectType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const initialState: ContactFormState = { success: false }
  const [state, formAction] = useActionState(submitContactForm, initialState)

  // Reset form after successful submission
  useEffect(() => {
    if (state.success) {
      setSelectedProjectType("")
      setIsSubmitting(false)
      // Reset form
      const form = document.getElementById("contact-form") as HTMLFormElement
      if (form) {
        form.reset()
      }
    }
  }, [state.success])

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    // Add selected project type to form data
    if (selectedProjectType) {
      formData.set("projectType", selectedProjectType)
    }
    formAction(formData)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <div className="pt-20 py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Let's Work Together
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Send className="w-6 h-6 text-blue-400" />
                    Send Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Success/Error Messages */}
                  {state.success && (
                    <Alert className="mb-6 border-green-500 bg-green-900/20">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <AlertDescription className="text-green-300">
                        {state.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  {state.error && (
                    <Alert className="mb-6 border-red-500 bg-red-900/20">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300">
                        {state.error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form id="contact-form" action={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                        placeholder="John Doe"
                      />
                      {state.fieldErrors?.name && (
                        <p className="text-red-400 text-sm mt-1">{state.fieldErrors.name[0]}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                        placeholder="john@example.com"
                      />
                      {state.fieldErrors?.email && (
                        <p className="text-red-400 text-sm mt-1">{state.fieldErrors.email[0]}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                        placeholder="Project Inquiry"
                      />
                      {state.fieldErrors?.subject && (
                        <p className="text-red-400 text-sm mt-1">{state.fieldErrors.subject[0]}</p>
                      )}
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {projectTypes.map((type) => (
                          <Badge
                            key={type}
                            variant={selectedProjectType === type ? "default" : "outline"}
                            className={`cursor-pointer transition-all ${
                              selectedProjectType === type
                                ? "bg-blue-600 text-white border-blue-600"
                                : "border-gray-600 text-gray-300 hover:border-blue-500"
                            }`}
                            onClick={() => setSelectedProjectType(selectedProjectType === type ? "" : type)}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500 resize-none"
                        placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                      />
                      {state.fieldErrors?.message && (
                        <p className="text-red-400 text-sm mt-1">{state.fieldErrors.message[0]}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Get In Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a
                        href="mailto:bhavyaverma435@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Bhavya,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss..."
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        bhavyaverma435@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white">India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Connect With Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                      asChild
                    >
                      <a href="https://github.com/bhavya26050" target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                      asChild
                    >
                      <a href="https://www.linkedin.com/in/bhavya-verma-9391b224a" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Why Work With Me?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-white font-medium">Fast Response</p>
                        <p className="text-gray-400 text-sm">I typically respond within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-white font-medium">Quality Focused</p>
                        <p className="text-gray-400 text-sm">Committed to delivering excellence</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-white font-medium">Collaborative</p>
                        <p className="text-gray-400 text-sm">Regular updates and transparent communication</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
