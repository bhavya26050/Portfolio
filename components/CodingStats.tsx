"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Trophy, Calendar, TrendingUp, RefreshCw, Wifi, WifiOff } from "lucide-react"

// Fallback static data
const fallbackStats = {
  leetcode: {
    username: "bhavyaverma435",
    totalSolved: 150, // Update with your actual current stats
    easy: 61,
    medium: 71,
    hard: 10,
    ranking: "800k+",
    streak: 30,
    badges: ["50 Days Badge", "100 Problems Badge", "SQL Badge"],
    url: "https://leetcode.com/u/bhavyaverma435",
    lastUpdated: "2024-12-11" // Update this when you update the numbers
  },
  geeksforgeeks: {
    username: "bhavyavea3hx",
    problemsSolved: 230,
    articles: 0,
    rank: 145,
    score: 662,
    streakDays: 17,
    badges: ["Problem Solver", "Consistent Coder", "Algorithm Expert"],
    url: "https://www.geeksforgeeks.org/user/bhavyavea3hx",
    lastUpdated: "2024-12-11"
  }
}

interface CodingStatsData {
  isLive: boolean
  leetcode: typeof fallbackStats.leetcode
  geeksforgeeks: typeof fallbackStats.geeksforgeeks
  lastFetched?: string
  error?: string
}

export default function CodingStats() {
  const [statsData, setStatsData] = useState<CodingStatsData>({
    isLive: false,
    leetcode: fallbackStats.leetcode,
    geeksforgeeks: fallbackStats.geeksforgeeks
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    fetchLiveStats()
  }, [])

  const fetchLiveStats = async () => {
    setIsRefreshing(true)
    try {
      // Try to fetch live LeetCode stats
      const leetcodeResponse = await fetch('/api/coding-stats/leetcode-graphql')
      let leetcodeData = fallbackStats.leetcode
      let isLive = false
      
      if (leetcodeResponse.ok) {
        const result = await leetcodeResponse.json()
        if (result.success) {
          leetcodeData = {
            ...fallbackStats.leetcode,
            ...result.stats,
            lastUpdated: result.stats.lastUpdated
          }
          isLive = true
        }
      }

      setStatsData({
        isLive,
        leetcode: leetcodeData,
        geeksforgeeks: fallbackStats.geeksforgeeks, // Keep static for GFG
        lastFetched: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to fetch live stats:', error)
      setStatsData({
        isLive: false,
        leetcode: fallbackStats.leetcode,
        geeksforgeeks: fallbackStats.geeksforgeeks,
        error: 'Failed to fetch live data'
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 via-black to-orange-900/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-green-400 to-orange-500 bg-clip-text text-transparent">
                Coding
              </span>{" "}
              <span className="text-white">Journey</span>
            </h2>
            
            {/* Live Data Indicator */}
            <div className="flex items-center gap-2">
              {statsData.isLive ? (
                <div className="flex items-center gap-1 px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full">
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-300">Live Data</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-3 py-1 bg-orange-900/30 border border-orange-500/30 rounded-full">
                  <WifiOff className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-orange-300">Static Data</span>
                </div>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchLiveStats}
                disabled={isRefreshing}
                className="p-2 hover:bg-blue-500/10"
              >
                <RefreshCw className={`w-4 h-4 text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Consistent problem-solving and algorithmic thinking across multiple platforms
          </p>
          
          {statsData.lastFetched && (
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date(statsData.lastFetched).toLocaleString()}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LeetCode Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-yellow-900/20 via-black to-yellow-900/10 border border-yellow-500/20">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-white flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-sm">LC</span>
                  </div>
                  LeetCode Profile
                  {statsData.isLive && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-yellow-950/20 rounded-lg border border-yellow-500/20">
                    <div className="text-3xl font-bold text-yellow-400">{statsData.leetcode.totalSolved}</div>
                    <div className="text-sm text-gray-400">Problems Solved</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-950/20 rounded-lg border border-yellow-500/20">
                    <div className="text-3xl font-bold text-yellow-400">{statsData.leetcode.ranking}</div>
                    <div className="text-sm text-gray-400">Global Ranking</div>
                  </div>
                </div>

                {/* Problem Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Problem Breakdown</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-green-950/20 rounded-lg border border-green-500/20">
                      <div className="text-xl font-bold text-green-400">{statsData.leetcode.easy}</div>
                      <div className="text-xs text-gray-400">Easy</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-950/20 rounded-lg border border-yellow-500/20">
                      <div className="text-xl font-bold text-yellow-400">{statsData.leetcode.medium}</div>
                      <div className="text-xs text-gray-400">Medium</div>
                    </div>
                    <div className="text-center p-3 bg-red-950/20 rounded-lg border border-red-500/20">
                      <div className="text-xl font-bold text-red-400">{statsData.leetcode.hard}</div>
                      <div className="text-xs text-gray-400">Hard</div>
                    </div>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-blue-950/20 rounded-lg border border-blue-500/20">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-sm font-semibold text-white">{statsData.leetcode.streak} Days</div>
                      <div className="text-xs text-gray-400">Current Streak</div>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2 p-3 bg-purple-950/20 rounded-lg border border-purple-500/20">
                    <Trophy className="w-5 h-5 text-purple-400" />
                    <div>
                      
                    </div>
                  </div> */}
                </div>

                {/* Badges */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    {statsData.leetcode.badges.map((badge, index) => (
                      <Badge key={index} className="bg-yellow-900/30 text-yellow-300 border-yellow-500/30">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  asChild 
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold"
                >
                  <a href={statsData.leetcode.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View LeetCode Profile
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* GeeksforGeeks Stats - Keep existing structure */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-green-900/20 via-black to-green-900/10 border border-green-500/20">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-white flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GFG</span>
                  </div>
                  GeeksforGeeks Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-950/20 rounded-lg border border-green-500/20">
                    <div className="text-3xl font-bold text-green-400">{statsData.geeksforgeeks.problemsSolved}</div>
                    <div className="text-sm text-gray-400">Problems Solved</div>
                  </div>
                  <div className="text-center p-4 bg-green-950/20 rounded-lg border border-green-500/20">
                    <div className="text-3xl font-bold text-green-400">#{statsData.geeksforgeeks.rank}</div>
                    <div className="text-sm text-gray-400">Institute Rank</div>
                  </div>
                </div>

                {/* Score and Articles */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-orange-950/20 rounded-lg border border-orange-500/20">
                    <div className="text-2xl font-bold text-orange-400">{statsData.geeksforgeeks.score}</div>
                    <div className="text-sm text-gray-400">Coding Score</div>
                  </div>
                  <div className="text-center p-4 bg-blue-950/20 rounded-lg border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">{statsData.geeksforgeeks.articles}</div>
                    <div className="text-sm text-gray-400">Articles Published</div>
                  </div>
                </div>

                {/* Streak */}
                <div className="flex items-center gap-2 p-4 bg-purple-950/20 rounded-lg border border-purple-500/20">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-lg font-semibold text-white">{statsData.geeksforgeeks.streakDays} Days</div>
                    <div className="text-sm text-gray-400">Problem Solving Streak</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    {statsData.geeksforgeeks.badges.map((badge, index) => (
                      <Badge key={index} className="bg-green-900/30 text-green-300 border-green-500/30">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  asChild 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  <a href={statsData.geeksforgeeks.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View GeeksforGeeks Profile
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}