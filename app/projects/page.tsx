"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Github, ExternalLink, Calendar, Users, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const projects = [
    {
      id: 1,
      title: "AI-Powered Resume Suite",
      subtitle: "Intelligent Career Optimization Platform",
      description:
        "Revolutionary AI-driven platform that transforms how professionals optimize their careers through intelligent resume analysis, ATS compatibility checking, and LinkedIn profile enhancement. Built with cutting-edge machine learning algorithms and modern web technologies.",
      longDescription:
        "This comprehensive platform leverages advanced natural language processing and machine learning to analyze resumes against industry standards and ATS requirements. The system provides detailed feedback, skill gap analysis, and personalized recommendations to improve job application success rates.",
      category: "AI/ML",
      status: "Production",
      featured: true,
      metrics: {
        users: "500+",
        improvement: "20%",
        engagement: "35%",
        prize: "₹1,10,000",
      },
      tech: ["Python", "FastAPI", "Next.js", "Scikit-learn", "TensorFlow", "MongoDB", "Tailwind CSS"],
      features: [
        "Advanced ATS Compatibility Analysis using NLP",
        "AI-Powered Skill Gap Detection and Recommendations",
        "LinkedIn Profile Optimization with Real-time Insights",
        "Industry-Specific Resume Tailoring",
        "Automated Resume Scoring with Detailed Feedback",
        "Career Path Prediction and Guidance",
        "Integration with Job Boards and Career Platforms",
        "Real-time Analytics Dashboard",
      ],
      achievements: [
        "Winner of 2nd Place in National Hackathon (₹1,10,000 prize)",
        "500+ monthly active users within 6 months of launch",
        "20% improvement in ATS pass rates for users",
        "35% increase in LinkedIn profile engagement",
        "Featured in tech publications and career blogs",
      ],
      github: "https://github.com/bhavya26050/Techify.git",
      date: "2025",
      duration: "6 months",
      teamSize: "Solo Project",
    },
    {
      id: 2,
      title: "ML-Based Customer Churn Prediction",
      subtitle: "Enterprise-Grade Predictive Analytics System",
      description:
        "Sophisticated machine learning ecosystem that combines multiple algorithms to predict customer behavior patterns. Features an intelligent chatbot for real-time customer engagement and automated retention strategies.",
      longDescription:
        "This enterprise-grade system uses ensemble learning techniques combining Random Forest, XGBoost, and Logistic Regression to achieve 95% accuracy in predicting customer churn. The integrated chatbot provides real-time customer support and engagement tracking.",
      category: "ML/Analytics",
      status: "Production",
      featured: true,
      metrics: {
        accuracy: "95%",
        queries: "1,000+",
        latency: "20%",
        retention: "30%",
      },
      tech: ["Python", "Random Forest", "XGBoost", "Logistic Regression", "Flask", "MongoDB"],
      features: [
        "Multi-Algorithm Ensemble Learning for Maximum Accuracy",
        "Real-time Prediction API with Sub-second Response Times",
        "Intelligent Customer Engagement Chatbot",
        "Advanced Analytics Dashboard with Interactive Visualizations",
        "Automated Model Retraining Pipeline",
        "Enterprise Integration with CRM Systems",
        "Predictive Customer Lifetime Value Calculation",
        "Automated Alert System for High-Risk Customers",
      ],
      achievements: [
        "Achieved 95% prediction accuracy across multiple datasets",
        "Handles 1,000+ weekly chatbot queries with 92% satisfaction",
        "Reduced prediction latency by 20% through optimization",
        "Improved customer retention rates by 30% for pilot clients",
        "Successfully deployed in production environment",
      ],
      github: "https://github.com/bhavya26050/Churn_Modelling.git",
      date: "2024",
      duration: "4 months",
      teamSize: "Solo Project",
    },
    {
      id: 3,
      title: "NutriChef AI Assistant",
      subtitle: "Personalized Nutrition Intelligence Platform",
      description:
        "Advanced AI-powered nutrition assistant leveraging Google's Gemini API to provide personalized recipe recommendations, comprehensive dietary analysis, and intelligent meal planning solutions.",
      longDescription:
        "NutriChef combines the power of Google's Gemini API with custom nutrition algorithms to create a comprehensive dietary assistant. The platform analyzes user preferences, dietary restrictions, and health goals to provide personalized nutrition guidance.",
      category: "AI/Health",
      status: "Active Development",
      featured: true,
      metrics: {
        accuracy: "92%",
        suggestions: "10+",
        rating: "4.8/5",
        users: "2,000+",
      },
      tech: ["Python", "Gemini API", "Next.js", "Node.js", "Tailwind CSS", "Firebase", "MongoDB", "Docker"],
      features: [
        "Personalized Recipe Generation based on Preferences",
        "Comprehensive Nutritional Analysis Engine",
        "Advanced Dietary Restriction and Allergy Handling",
        "Intelligent Meal Planning and Optimization",
        "AI-Powered Ingredient Substitution Recommendations",
        "Health Goal Tracking and Progress Monitoring",
        "Integration with Fitness Apps and Wearables",
        "Community Recipe Sharing Platform",
      ],
      achievements: [
        "92% accuracy in intent recognition and recipe matching",
        "Generates 10+ personalized suggestions per user session",
        "Achieved 4.8/5 user satisfaction rating",
        "Serves 2,000+ active users with growing community",
        "Featured in health and wellness app directories",
      ],
      github: "https://github.com/bhavya26050/Recipe_Giver.git",
      date: "2025",
      duration: "3 months",
      teamSize: "Solo Project",
    },
    {
      id: 4,
      title: "KickVerse Sneaker Studio",
      subtitle: "Premium E-commerce Platform for Sneaker Enthusiasts",
      description:
        "Full-stack e-commerce platform designed specifically for sneaker enthusiasts, featuring advanced product catalog management, secure payment processing, and modern user experience design.",
      longDescription:
        "KickVerse is a comprehensive e-commerce solution built with React and Node.js, featuring a curated catalog of 200+ premium sneakers, integrated Stripe payment processing, and advanced inventory management systems.",
      category: "Full-Stack",
      status: "Production",
      featured: false,
      metrics: {
        products: "200+",
        transactions: "100+",
        uptime: "99.9%",
        conversion: "3.2%",
      },
      tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "JWT", "Tailwind CSS"],
      features: [
        "Advanced Product Catalog with Search and Filtering",
        "Secure Stripe Payment Integration",
        "User Authentication and Profile Management",
        "Shopping Cart and Wishlist Functionality",
        "Order Tracking and Management System",
        "Admin Dashboard for Inventory Management",
        "Responsive Design for All Devices",
        "SEO Optimization for Better Visibility",
      ],
      achievements: [
        "Successfully manages 200+ sneaker products",
        "Processes 100+ daily transactions with 99.9% uptime",
        "Achieved 3.2% conversion rate above industry average",
        "Implemented secure payment processing with fraud detection",
        "Built scalable architecture supporting high traffic loads",
      ],
      github: "https://github.com/bhavya26050/kickverse-sneaker-studio.git",
      live: "https://techify-vl6u.vercel.app/",
      date: "2024",
      duration: "2 months",
      teamSize: "Solo Project",
    },
    {
      id: 5,
      title: "KNK Aquarium Business Website",
      subtitle: "Professional E-commerce Solution for Aquarium Business",
      description:
        "Custom-built professional website for KNK Aquarium business featuring modern design, e-commerce capabilities, and comprehensive business management tools. Delivered as a freelance project with exceptional results.",
      longDescription:
        "This freelance project involved creating a complete digital presence for KNK Aquarium, including e-commerce functionality, inventory management, customer portal, and business analytics. The solution significantly boosted the client's online presence and revenue.",
      category: "Freelance",
      status: "Production",
      featured: false,
      metrics: {
        visitors: "1,500+",
        revenue: "40%",
        success: "99.7%",
        growth: "25%",
      },
      tech: ["React", "Node.js", "Tailwind CSS", "Stripe API", "MongoDB", "Express", "JWT", "Cloudinary"],
      features: [
        "Modern Responsive Web Design",
        "E-commerce Integration with Product Catalog",
        "Secure Payment Processing with Stripe",
        "Customer Account Management System",
        "Inventory Management Dashboard",
        "Order Tracking and Management",
        "SEO Optimization for Local Search",
        "Analytics and Reporting Tools",
      ],
      achievements: [
        "1,500+ monthly visitors within 3 months of launch",
        "40% increase in business revenue post-launch",
        "99.7% Stripe payment success rate",
        "25% growth in customer base",
        "Featured as case study in local business directory",
      ],
      live: "https://knkaquarium.com",
      date: "2025",
      duration: "2 months",
      teamSize: "Solo Project",
    },
  ]

  const categories = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "AI/ML", label: "AI/ML", count: projects.filter((p) => p.category === "AI/ML").length },
    { id: "ML/Analytics", label: "ML/Analytics", count: projects.filter((p) => p.category === "ML/Analytics").length },
    { id: "AI/Health", label: "AI/Health", count: projects.filter((p) => p.category === "AI/Health").length },
    { id: "Full-Stack", label: "Full-Stack", count: projects.filter((p) => p.category === "Full-Stack").length },
    { id: "Freelance", label: "Freelance", count: projects.filter((p) => p.category === "Freelance").length },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-black text-white">
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
                    item.href === "/projects"
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
          {/* Animated Background Elements */}
          {[...Array(15)].map((_, i) => (
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
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-lg backdrop-blur-sm border border-blue-400/10"></div>
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
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                My Projects
              </span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A comprehensive showcase of AI/ML innovations, full-stack applications, and research implementations
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search projects, technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-blue-500/20 text-white placeholder-gray-400 focus:border-blue-400"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                        : "border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                    }`}
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 border border-blue-500/20 backdrop-blur-xl hover:border-blue-400/40 transition-all duration-500">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-400/30">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-400">
                          {project.status}
                        </Badge>
                        {project.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-400/30">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
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

                    <CardTitle className="text-2xl text-white group-hover:text-blue-400 transition-colors mb-2">
                      {project.title}
                    </CardTitle>
                    <p className="text-blue-400 font-medium mb-4">{project.subtitle}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-gray-300 leading-relaxed">{project.description}</p>

                    {/* Project Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-blue-950/20 rounded-lg border border-blue-500/20">
                          <div className="text-lg font-bold text-blue-400">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                        </div>
                      ))}
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-3">Key Features</h4>
                      <ul className="space-y-1">
                        {project.features.slice(0, 4).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                        {project.features.length > 4 && (
                          <li className="text-sm text-blue-400 font-medium">
                            +{project.features.length - 4} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs border-blue-400/30 text-blue-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-blue-500/20">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {project.date}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {project.teamSize}
                        </div>
                      </div>
                      <div className="text-blue-400 font-medium">{project.duration}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No projects found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-black to-blue-950/10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Interested in Collaboration?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Let's work together to build innovative AI solutions and cutting-edge applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25"
                >
                  Start a Project
                  <TrendingUp className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
                >
                  Learn More About Me
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
