"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Globe, Smartphone, Monitor, TrendingUp } from "lucide-react"

interface DownloadRecord {
  _id: string
  timestamp: string
  userAgent: string
  ip?: string
  country?: string
  device?: string
}

interface DownloadStats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
  byDevice: Record<string, number>
  byCountry: Record<string, number>
  recent: DownloadRecord[]
}

export function ResumeDownloads() {
  const [stats, setStats] = useState<DownloadStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDownloadStats()
  }, [])

  const fetchDownloadStats = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/download-stats")
      if (!response.ok) {
        throw new Error("Failed to fetch download stats")
      }
      const data = await response.json()
      setStats(data.stats)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes("mobile")) return <Smartphone className="h-4 w-4" />
    if (device.toLowerCase().includes("tablet")) return <Smartphone className="h-4 w-4" />
    return <Monitor className="h-4 w-4" />
  }

  const parseUserAgent = (userAgent: string) => {
    // Simple user agent parsing
    if (userAgent.includes("Mobile")) return "Mobile"
    if (userAgent.includes("Tablet")) return "Tablet"
    if (userAgent.includes("Chrome")) return "Desktop (Chrome)"
    if (userAgent.includes("Firefox")) return "Desktop (Firefox)"
    if (userAgent.includes("Safari")) return "Desktop (Safari)"
    return "Desktop"
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Resume Downloads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Resume Downloads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <Button onClick={fetchDownloadStats} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Resume Downloads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Download className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No download data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Resume Downloads
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.today}</div>
            <div className="text-sm text-gray-600">Today</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.thisWeek}</div>
            <div className="text-sm text-gray-600">This Week</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.thisMonth}</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
        </div>

        {/* Device Breakdown */}
        {Object.keys(stats.byDevice).length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              By Device Type
            </h4>
            <div className="space-y-2">
              {Object.entries(stats.byDevice).map(([device, count]) => (
                <div key={device} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(device)}
                    <span className="text-sm">{device}</span>
                  </div>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Downloads */}
        {stats.recent.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Recent Downloads
            </h4>
            <div className="space-y-2">
              {stats.recent.slice(0, 10).map((download) => (
                <div key={download._id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getDeviceIcon(parseUserAgent(download.userAgent))}
                    <div>
                      <div className="text-sm font-medium">{parseUserAgent(download.userAgent)}</div>
                      <div className="text-xs text-gray-500">
                        {download.country && (
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {download.country}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{formatDate(download.timestamp)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <Button onClick={fetchDownloadStats} variant="outline" className="w-full">
            Refresh Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
