"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Play,
  Pause,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import { trackResumeDownload } from "./actions/resume"
import CodingStats from "@/components/CodingStats"
import Navigation from "@/components/Navigation"

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const roles = ["AI Developer", "Full-Stack Engineer", "ML Researcher", "Innovation Architect", "Tech Entrepreneur"]

  useEffect(() => {
    document.documentElement.classList.add("dark")
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentRole((prev) => (prev + 1) % roles.length)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [isPlaying, roles.length])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleDownloadResume = async () => {
    setIsDownloading(true)
    setDownloadProgress(0)
    
    try {
      const result = await trackResumeDownload()

      if (result.success) {
        setDownloadProgress(30) // Tracking completed

        if (result.isStatic) {
          const link = document.createElement("a")
          link.href = result.url
          link.download = "Bhavya_Verma_Resume.pdf"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          
          setDownloadProgress(100)
          
          setTimeout(() => {
            toast({
              title: "✅ Resume Downloaded",
              description: "Your resume has been downloaded successfully.",
              variant: "default",
            })
          }, 500)
        } else {
          try {
            setDownloadProgress(50) // Starting download
            
            const response = await fetch(result.url)
            
            if (!response.ok) {
              throw new Error(`Download failed: ${response.statusText}`)
            }

            setDownloadProgress(80) // Download completed
            
            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            
            const link = document.createElement("a")
            link.href = downloadUrl
            link.download = result.filename || "Bhavya_Verma_Resume.pdf"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            
            window.URL.revokeObjectURL(downloadUrl)
            setDownloadProgress(100)

            setTimeout(() => {
              toast({
                title: "✅ Resume Downloaded Successfully",
                description: `Latest resume "${result.filename || 'Resume'}" has been downloaded.`,
                variant: "default",
              })
            }, 500)
          } catch (downloadError) {
            console.error("Download error:", downloadError)
            toast({
              title: "❌ Download Failed",
              description: "Failed to download the resume. Please try again.",
              variant: "destructive",
            })
          }
        }
      } else {
        toast({
          title: "❌ Download Failed",
          description: result.error || "Failed to download resume. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error downloading resume:", error)
      toast({
        title: "❌ Download Failed",
        description: "An error occurred while downloading the resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
      setDownloadProgress(0)
    }
  }

  const featuredProjects = [
    {
      id: 1,
      title: "AI-Powered Resume Suite",
      subtitle: "Intelligent Career Optimization Platform",
      description:
        "Revolutionary AI-driven platform transforming how professionals optimize their careers through intelligent resume analysis, ATS compatibility checking, and LinkedIn profile enhancement.",
      metrics: {
        users: "500+",
        improvement: "20%",
        engagement: "35%",
        prize: "₹1,10,000",
      },
      tech: ["Python", "FastAPI", "Next.js", "Scikit-learn", "TensorFlow", "Redis", "PostgreSQL"],
      features: [
        "Advanced ATS Compatibility Analysis",
        "AI-Powered Skill Gap Detection",
        "LinkedIn Profile Optimization",
        "Real-time Career Insights",
        "Industry-Specific Recommendations",
        "Automated Resume Scoring",
      ],
      github: "https://github.com/bhavya26050/Techify.git",
      status: "Production",
      category: "AI/ML",
    },
    {
      id: 2,
      title: "ML-Based Customer Churn Prediction",
      subtitle: "Enterprise-Grade Predictive Analytics",
      description:
        "Sophisticated machine learning ecosystem combining multiple algorithms to predict customer behavior, featuring an intelligent chatbot for real-time customer engagement and retention strategies.",
      metrics: {
        accuracy: "95%",
        queries: "1,000+",
        latency: "20%",
        retention: "30%",
      },
      tech: ["Random Forest", "XGBoost", "Logistic Regression", "Flask", "Docker", "AWS", "MongoDB"],
      features: [
        "Multi-Algorithm Ensemble Learning",
        "Real-time Prediction API",
        "Intelligent Customer Chatbot",
        "Advanced Analytics Dashboard",
        "Automated Model Retraining",
        "Enterprise Integration",
      ],
      github: "https://github.com/bhavya26050/Churn_Modelling.git",
      status: "Production",
      category: "ML/Analytics",
    },
    {
      id: 3,
      title: "NutriChef AI Assistant",
      subtitle: "Personalized Nutrition Intelligence",
      description:
        "Advanced AI-powered nutrition assistant leveraging Google's Gemini API to provide personalized recipe recommendations, dietary analysis, and intelligent meal planning.",
      metrics: {
        accuracy: "92%",
        suggestions: "10+",
        rating: "4.8/5",
        users: "2,000+",
      },
      tech: ["Gemini API", "Python", "Tailwind CSS", "React", "Node.js", "Firebase"],
      features: [
        "Personalized Recipe Generation",
        "Nutritional Analysis Engine",
        "Dietary Restriction Handling",
        "Meal Planning Optimization",
        "Ingredient Substitution AI",
        "Health Goal Tracking",
      ],
      github: "https://github.com/bhavya26050/Recipe_Giver.git",
      status: "Active Development",
      category: "AI/Health",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Toaster />
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section with 3D Elements */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-blue-900/5"></div>

          {/* Animated Geometric Shapes */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div
                className={`w-${4 + Math.floor(Math.random() * 8)} h-${4 + Math.floor(Math.random() * 8)} bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg backdrop-blur-sm border border-blue-400/10`}
              ></div>
            </motion.div>
          ))}

          {/* Neural Network Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000">
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            {[...Array(50)].map((_, i) => (
              <motion.circle
                key={i}
                cx={Math.random() * 1000}
                cy={Math.random() * 1000}
                r="2"
                fill="url(#neuralGradient)"
                animate={{
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <motion.h1 className="text-6xl md:text-8xl font-bold mb-8" style={{ y }}>
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Bhavya
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent">
                Verma
              </span>
            </motion.h1>

            <motion.div
              className="text-2xl md:text-4xl font-medium mb-6 h-16 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-gray-300">I'm a </span>
              <motion.span
                key={currentRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="ml-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-bold"
              >
                {roles[currentRole]}
              </motion.span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="ml-4 p-2 text-gray-400 hover:text-blue-400"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Crafting the future through <span className="text-blue-400 font-semibold">Artificial Intelligence</span>,{" "}
              <span className="text-blue-500 font-semibold">Machine Learning</span>, and{" "}
              <span className="text-blue-300 font-semibold">Full-Stack Innovation</span>
            </motion.p>

            <motion.p
              className="text-lg mb-12 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              BTech Computer Science Engineering @ NMIMS MPSTME Shirpur | Batch of 2026
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25 border border-blue-500/30"
                onClick={handleDownloadResume}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {downloadProgress > 0 && (
                      <span className="text-sm">
                        {downloadProgress < 100 ? `${downloadProgress}%` : "Completing..."}
                      </span>
                    )}
                  </div>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-3" />
                    Download Resume
                  </>
                )}
              </Button>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
                >
                  Explore My Journey
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="flex justify-center space-x-6 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {[
                { icon: Github, href: "https://github.com/bhavya26050", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/bhavya-verma-9391b224a", label: "LinkedIn" },
                { icon: Mail, href: "mailto:bhavyaverma435@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Bhavya,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss...", label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label === "Email" ? "_self" : "_blank"} // Don't open email in new tab
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-400/20 backdrop-blur-sm hover:from-blue-500/20 hover:to-blue-600/10 hover:border-blue-400/40 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-6 h-6 text-blue-400" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-8 h-8 text-blue-400" />
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Featured</span>{" "}
              <span className="text-white">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Innovative solutions at the intersection of AI, machine learning, and full-stack development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group h-full"
              >
                <Card className="h-full bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 border border-blue-500/20 backdrop-blur-xl hover:border-blue-400/40 transition-all duration-500 flex flex-col">
                  <CardContent className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-6">
                      <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-400/30">
                        {project.category}
                      </Badge>
                      <div className="flex space-x-2">
                        {project.github && (
                          <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-blue-400">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {project.live && (
                          <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-blue-400">
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-blue-400 font-medium mb-4">{project.subtitle}</p>
                    <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-blue-950/20 rounded-lg border border-blue-500/20">
                          <div className="text-xl font-bold text-blue-400">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 4).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs border-blue-400/30 text-blue-300">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 4 && (
                        <Badge variant="outline" className="text-xs border-blue-400/30 text-blue-300">
                          +{project.tech.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="mt-auto">
                      <Link href="/projects">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
              >
                View All Projects
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-black to-blue-950/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Active Users", icon: "👥" },
              { number: "95%", label: "ML Accuracy", icon: "🎯" },
              { number: "₹1.1L", label: "Prize Won", icon: "🏆" },
              { number: "2025", label: "Research Published", icon: "📚" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gradient-to-br from-blue-950/20 to-gray-900/20 rounded-2xl border border-blue-500/20 backdrop-blur-sm"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coding Profile Stats */}
      <CodingStats />

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-blue-900/5"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Ready to Innovate?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Let's collaborate on cutting-edge AI solutions and build the future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Get In Touch
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
                >
                  Learn More About Me
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
