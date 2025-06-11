"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, Mail, LogOut, FileText, Eye, Calendar, User } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ContactSubmission {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  projectType?: string
  submittedAt: string
  emailSent: boolean
  confirmationSent: boolean
}

interface DownloadStat {
  _id: string
  type: string
  downloadedAt: string
  resumeId?: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [downloads, setDownloads] = useState<DownloadStat[]>([])
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalDownloads: 0,
    todayContacts: 0,
    todayDownloads: 0
  })
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData()
    }
  }, [isAuthenticated])

  const checkAuth = () => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    setIsAuthenticated(true)
    setIsLoading(false)
  }

  const fetchAdminData = async () => {
    const token = localStorage.getItem("adminToken")
    if (!token) return

    try {
      // Fetch contacts
      const contactsResponse = await fetch("/api/admin/contacts", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      
      if (contactsResponse.ok) {
        const contactsData = await contactsResponse.json()
        setContacts(contactsData.contacts || [])
      }

      // Fetch download stats
      const downloadsResponse = await fetch("/api/admin/downloads", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      
      if (downloadsResponse.ok) {
        const downloadsData = await downloadsResponse.json()
        setDownloads(downloadsData.downloads || [])
        setStats(downloadsData.stats || stats)
      }
    } catch (error) {
      console.error("Error fetching admin data:", error)
    }
  }

  const handleLogout = async () => {
    const token = localStorage.getItem("adminToken")
    
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ action: "logout" })
      })
    } catch (error) {
      console.error("Logout error:", error)
    }

    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminInfo")
    router.push("/admin/login")
  }

  const handleFileUpload = async () => {
    if (!uploadFile) {
      toast({
        title: "No File Selected",
        description: "Please select a PDF file to upload",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    const token = localStorage.getItem("adminToken")

    try {
      const formData = new FormData()
      formData.append("resume", uploadFile)

      const response = await fetch("/api/admin/resume/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Upload Successful",
          description: `Resume "${data.filename}" uploaded successfully`,
          variant: "default",
        })
        setUploadFile(null)
        // Reset file input
        const fileInput = document.getElementById("resume-upload") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        toast({
          title: "Upload Failed",
          description: data.error || "Failed to upload resume",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload Error",
        description: "An error occurred during upload",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Contacts</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.totalContacts}</p>
                </div>
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Downloads</p>
                  <p className="text-2xl font-bold text-green-400">{stats.totalDownloads}</p>
                </div>
                <Download className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Today's Contacts</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.todayContacts}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Today's Downloads</p>
                  <p className="text-2xl font-bold text-orange-400">{stats.todayDownloads}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="resume" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-700">
            <TabsTrigger value="resume" className="data-[state=active]:bg-blue-600">
              <FileText className="w-4 h-4 mr-2" />
              Resume Management
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-blue-600">
              <Mail className="w-4 h-4 mr-2" />
              Contact Submissions ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              <Download className="w-4 h-4 mr-2" />
              Download Analytics ({downloads.length})
            </TabsTrigger>
          </TabsList>

          {/* Resume Management Tab */}
          <TabsContent value="resume">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Upload New Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-300 mb-2">
                    Select PDF Resume File
                  </label>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="w-full text-gray-300 bg-gray-800 border border-gray-700 rounded-md p-2"
                  />
                </div>
                
                {uploadFile && (
                  <div className="text-sm text-gray-400">
                    Selected: {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}

                <Button
                  onClick={handleFileUpload}
                  disabled={!uploadFile || isUploading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? "Uploading..." : "Upload Resume"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Submissions Tab */}
          <TabsContent value="contacts">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Contact Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.length > 0 ? (
                    contacts.map((contact) => (
                      <div key={contact._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-400" />
                            <span className="font-semibold text-white">{contact.name}</span>
                            <span className="text-gray-400">({contact.email})</span>
                          </div>
                          <div className="text-sm text-gray-400">
                            {new Date(contact.submittedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mb-2">
                          <span className="text-blue-400 font-medium">{contact.subject}</span>
                          {contact.projectType && (
                            <span className="ml-2 px-2 py-1 bg-blue-900 text-blue-200 text-xs rounded">
                              {contact.projectType}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{contact.message}</p>
                        <div className="flex gap-2 text-xs">
                          <span className={`px-2 py-1 rounded ${contact.emailSent ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                            Admin: {contact.emailSent ? '✅ Sent' : '❌ Failed'}
                          </span>
                          <span className={`px-2 py-1 rounded ${contact.confirmationSent ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                            User: {contact.confirmationSent ? '✅ Sent' : '❌ Failed'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-center py-8">
                      No contact submissions yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Resume Download Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {downloads.length > 0 ? (
                    downloads.map((download) => (
                      <div key={download._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Download className="w-4 h-4 text-green-400" />
                            <span className="text-white">Resume Download</span>
                            <span className="text-gray-400">({download.type})</span>
                          </div>
                          <div className="text-sm text-gray-400">
                            {new Date(download.downloadedAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-center py-8">
                      No downloads yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
