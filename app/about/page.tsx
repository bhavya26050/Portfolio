"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Award, Code2, Rocket, Users, Star, BookOpen, Target, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("journey")
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const skills = {
    "Programming Languages": [
      { name: "Python", level: 95, icon: "🐍" },
      { name: "JavaScript", level: 90, icon: "⚡" },
      { name: "C++", level: 85, icon: "⚙️" },
      { name: "SQL", level: 88, icon: "🗄️" },
      { name: "TypeScript", level: 85, icon: "📘" },
    ],
    "AI/ML Frameworks": [
      { name: "TensorFlow", level: 90, icon: "🧠" },
      { name: "Scikit-learn", level: 95, icon: "📊" },
      { name: "XGBoost", level: 88, icon: "🚀" },
      { name: "OpenCV", level: 82, icon: "👁️" },
      { name: "Pandas", level: 92, icon: "🐼" },
    ],
    "Web Technologies": [
      { name: "React", level: 92, icon: "⚛️" },
      { name: "Next.js", level: 90, icon: "▲" },
      { name: "Node.js", level: 88, icon: "💚" },
      { name: "FastAPI", level: 85, icon: "⚡" },
      { name: "Flask", level: 87, icon: "🌶️" },
    ],
    "Cloud & Tools": [
      { name: "AWS", level: 80, icon: "☁️" },
      { name: "Docker", level: 78, icon: "🐳" },
      { name: "Git", level: 90, icon: "📝" },
      { name: "MongoDB", level: 85, icon: "🍃" },
      { name: "PostgreSQL", level: 88, icon: "🐘" },
    ],
  }

  const achievements = [
    {
      title: "Hackathon Victory",
      description: "2nd Place Winner - AI Resume Suite",
      prize: "₹1,10,000",
      date: "2025",
      icon: <Star className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Research Publication",
      description: "ICNGT-2025 Conference Paper Accepted",
      prize: "International Recognition",
      date: "2025",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Industry Impact",
      description: "500+ Users Across AI Projects",
      prize: "Real-world Adoption",
      date: "2024-2025",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Technical Excellence",
      description: "95% ML Model Accuracy Achievement",
      prize: "Performance Milestone",
      date: "2024",
      icon: <Target className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
    },
  ]

  const timeline = [
    {
      year: "2022",
      title: "Academic Journey Begins",
      description: "Started BTech CSE at NMIMS MPSTME Shirpur",
      icon: <BookOpen className="w-5 h-5" />,
      details: [
        "Focused on Computer Science fundamentals",
        "Discovered passion for AI/ML",
        "Built first programming projects",
      ],
    },
    {
      year: "2023",
      title: "Skill Development Phase",
      description: "Deep dive into AI/ML and Full-Stack Development",
      icon: <Code2 className="w-5 h-5" />,
      details: ["Mastered Python and JavaScript", "Learned ML algorithms", "Started building web applications"],
    },
    {
      year: "2024",
      title: "Professional Experience",
      description: "Growth Say Internship & Major Project Development",
      icon: <Rocket className="w-5 h-5" />,
      details: [
        "Associate Software Intern at Growth Say",
        "Developed Customer Churn Prediction System",
        "Achieved 95% ML model accuracy",
      ],
    },
    {
      year: "2025",
      title: "Innovation & Recognition",
      description: "Research Publication & Hackathon Success",
      icon: <Award className="w-5 h-5" />,
      details: ["ICNGT-2025 research paper accepted", "Won ₹1,10,000 in hackathon", "Launched multiple AI projects"],
    },
  ]

  const personalInfo = {
    "Full Name": "Bhavya Verma",
    "Date of Birth": "May 26, 2005",
    Education: "BTech CSE @ NMIMS MPSTME Shirpur",
    Graduation: "2026",
    Location: "Shirpur, Maharashtra, India",
    Specialization: "AI/ML & Full-Stack Development",
    "Research Interest": "Market Prediction & Customer Analytics",
    Languages: "English, Hindi",
  }

  return (
    <div className="min-h-screen bg-black text-white" ref={containerRef}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link
              href="/"
              className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
            >
              BV
            </Link>
            <div className="hidden md:flex space-x-8">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Projects", href: "/projects" },
                { name: "Research", href: "/research" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    item.href === "/about"
                      ? "text-blue-400 bg-blue-500/10 rounded-md"
                      : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-blue-900/5"></div>
          {/* 3D Geometric Elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-xl backdrop-blur-sm border border-blue-400/10 transform rotate-45"></div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">About Me</span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A passionate technologist dedicated to pushing the boundaries of AI and creating meaningful impact through
              innovation
            </p>
          </motion.div>

          {/* Personal Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {Object.entries(personalInfo).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="p-6 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 rounded-2xl border border-blue-500/20 backdrop-blur-xl"
              >
                <div className="text-sm text-blue-400 font-medium mb-2">{key}</div>
                <div className="text-white font-semibold">{value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-2 border border-blue-500/20">
              {[
                { id: "journey", label: "My Journey", icon: <Rocket className="w-4 h-4" /> },
                { id: "skills", label: "Skills", icon: <Code2 className="w-4 h-4" /> },
                { id: "achievements", label: "Achievements", icon: <Award className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-blue-500/10"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "journey" && (
              <div className="space-y-12">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      My Journey
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    From curious student to AI innovator - a timeline of growth, learning, and achievement
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-700 rounded-full"></div>

                  {timeline.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className={`relative flex items-center mb-16 ${
                        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                        <Card className="bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 border border-blue-500/20 backdrop-blur-xl">
                          <CardHeader>
                            <div className={`flex items-center ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl mr-4">
                                {event.icon}
                              </div>
                              <div>
                                <CardTitle className="text-xl text-white">{event.title}</CardTitle>
                                <p className="text-blue-400 font-semibold">{event.year}</p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-300 mb-4">{event.description}</p>
                            <ul className="space-y-2">
                              {event.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="flex items-center text-sm text-gray-400">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full border-4 border-black"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-12">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      Technical Skills
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    A comprehensive toolkit spanning AI/ML, full-stack development, and cloud technologies
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 border border-blue-500/20 backdrop-blur-xl">
                        <CardHeader>
                          <CardTitle className="text-2xl text-blue-400 flex items-center">
                            <Code2 className="w-6 h-6 mr-3" />
                            {category}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {skillList.map((skill, skillIndex) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                              viewport={{ once: true }}
                              className="space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <span className="text-2xl mr-3">{skill.icon}</span>
                                  <span className="text-white font-medium">{skill.name}</span>
                                </div>
                                <span className="text-blue-400 font-semibold">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2 bg-gray-800" />
                            </motion.div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-12">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      Key Achievements
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Milestones that define my journey in technology and innovation
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="group"
                    >
                      <Card className="h-full bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 border border-blue-500/20 backdrop-blur-xl hover:border-blue-400/40 transition-all duration-500">
                        <CardContent className="p-8">
                          <div
                            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${achievement.color} bg-opacity-20 mb-6`}
                          >
                            {achievement.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                            {achievement.title}
                          </h3>
                          <p className="text-gray-300 mb-4 leading-relaxed">{achievement.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge className={`bg-gradient-to-r ${achievement.color} text-white border-0`}>
                              {achievement.prize}
                            </Badge>
                            <span className="text-blue-400 font-semibold">{achievement.date}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-black to-blue-950/10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                My Philosophy
              </span>
            </h2>
            <blockquote className="text-2xl text-gray-300 leading-relaxed italic mb-8">
              "Technology should not just solve problems—it should anticipate them, understand human needs, and create
              meaningful impact that improves lives."
            </blockquote>
            <p className="text-lg text-gray-400 leading-relaxed">
              I believe in the power of AI to transform industries and create positive change. My approach combines
              technical excellence with human-centered design, ensuring that every solution I build is not just
              innovative, but also accessible and impactful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Let's Build Something Amazing
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Ready to collaborate on innovative AI solutions? Let's connect and create the future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25"
                >
                  Get In Touch
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
                >
                  View My Projects
                  <ExternalLink className="w-5 h-5 ml-3" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
