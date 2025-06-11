"use client"

import { motion } from "framer-motion"
import { BookOpen, Award, ExternalLink, Download, Calendar, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ResearchPage() {
  const publications = [
    {
      id: 1,
      title: "AI in Market Prediction, Customer Retention & Churn Modelling",
      conference: "International Conference on Next Generation Technologies (ICNGT-2025)",
      status: "Accepted",
      date: "2025",
      type: "Conference Paper",
      abstract:
        "This research presents a comprehensive analysis of artificial intelligence applications in market prediction and customer behavior modeling. The study explores advanced machine learning techniques including ensemble methods, deep learning, and predictive analytics to enhance customer retention strategies and improve churn prediction accuracy.",
      keywords: [
        "Artificial Intelligence",
        "Machine Learning",
        "Customer Churn",
        "Market Prediction",
        "Predictive Analytics",
        "Ensemble Learning",
      ],
      methodology: [
        "Comparative analysis of ML algorithms (Random Forest, XGBoost, Logistic Regression)",
        "Implementation of ensemble learning techniques for improved accuracy",
        "Real-world dataset analysis with 10,000+ customer records",
        "Statistical validation and cross-validation techniques",
        "Performance optimization and model interpretability analysis",
      ],
      results: [
        "Achieved 95% accuracy in customer churn prediction",
        "Improved market prediction accuracy by 23% over baseline models",
        "Reduced false positive rate by 18% in customer retention models",
        "Demonstrated scalability across multiple industry verticals",
        "Established new benchmarks for ensemble learning in customer analytics",
      ],
      impact: "High",
      citations: "Pending Publication",
      featured: true,
    },
  ]

  const certifications = [
    {
      id: 1,
      title: "AI A-Z: Complete Artificial Intelligence Course",
      issuer: "Udemy",
      date: "2024",
      credentialId: "UC-AI-2024-BV",
      skills: ["Machine Learning", "Deep Learning", "Neural Networks", "Python", "TensorFlow", "Computer Vision"],
      description:
        "Comprehensive certification covering the fundamentals of artificial intelligence, machine learning algorithms, deep learning frameworks, and practical implementation of AI solutions.",
      verified: true,
    },
    {
      id: 2,
      title: "Advanced Machine Learning Specialization",
      issuer: "Coursera",
      date: "2024",
      credentialId: "ML-ADV-2024-BV",
      skills: ["Advanced ML", "Ensemble Methods", "Feature Engineering", "Model Optimization"],
      description:
        "Advanced specialization focusing on sophisticated machine learning techniques, ensemble methods, and optimization strategies for complex real-world problems.",
      verified: true,
    },
  ]

  const researchInterests = [
    {
      area: "Artificial Intelligence & Machine Learning",
      topics: [
        "Ensemble Learning Methods",
        "Predictive Analytics",
        "Natural Language Processing",
        "Computer Vision Applications",
      ],
      icon: "🧠",
    },
    {
      area: "Customer Analytics & Business Intelligence",
      topics: ["Customer Churn Prediction", "Market Forecasting", "Behavioral Analysis", "Retention Strategies"],
      icon: "📊",
    },
    {
      area: "Software Engineering & System Design",
      topics: ["Scalable AI Systems", "Real-time Analytics", "Cloud Computing", "API Development"],
      icon: "⚙️",
    },
    {
      area: "Human-Computer Interaction",
      topics: ["AI-Powered Interfaces", "User Experience Design", "Accessibility in AI", "Conversational AI"],
      icon: "🤝",
    },
  ]

  const futureResearch = [
    {
      title: "Explainable AI in Financial Services",
      description:
        "Developing interpretable machine learning models for financial decision-making and risk assessment.",
      timeline: "2025-2026",
      status: "Planning",
    },
    {
      title: "Multi-modal AI for Healthcare Applications",
      description: "Integrating computer vision, NLP, and sensor data for comprehensive healthcare monitoring systems.",
      timeline: "2025-2026",
      status: "Proposal Stage",
    },
    {
      title: "Federated Learning for Privacy-Preserving Analytics",
      description:
        "Implementing federated learning frameworks for distributed machine learning while maintaining data privacy.",
      timeline: "2026",
      status: "Conceptual",
    },
  ]

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
                    item.href === "/research"
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
          {[...Array(10)].map((_, i) => (
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
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-full backdrop-blur-sm border border-blue-400/10"></div>
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
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Research</span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Advancing the frontiers of AI and machine learning through rigorous research and innovative applications
            </p>
          </motion.div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Publications
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Peer-reviewed research contributions to the academic and scientific community
            </p>
          </motion.div>

          <div className="space-y-8">
            {publications.map((publication, index) => (
              <motion.div
                key={publication.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 border border-blue-500/20 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-400/30">
                          {publication.type}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-400 border-green-400/30">
                          {publication.status}
                        </Badge>
                        {publication.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-400/30">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <CardTitle className="text-2xl text-white mb-2">{publication.title}</CardTitle>
                    <p className="text-blue-400 font-medium mb-4">{publication.conference}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-gray-300 leading-relaxed">{publication.abstract}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-blue-400 mb-3">Methodology</h4>
                        <ul className="space-y-2">
                          {publication.methodology.map((method, methodIndex) => (
                            <li key={methodIndex} className="flex items-start text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-blue-400 mb-3">Key Results</h4>
                        <ul className="space-y-2">
                          {publication.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-start text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-3">Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {publication.keywords.map((keyword, keywordIndex) => (
                          <Badge
                            key={keywordIndex}
                            variant="outline"
                            className="text-xs border-blue-400/30 text-blue-300"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-blue-500/20">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {publication.date}
                        </div>
                        <div className="flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          Impact: {publication.impact}
                        </div>
                      </div>
                      <div className="text-blue-400 font-medium">{publication.citations}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-black to-blue-950/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Research Interests
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Areas of focus driving my research and development efforts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchInterests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 border border-blue-500/20 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">{interest.icon}</div>
                      <CardTitle className="text-xl text-blue-400">{interest.area}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {interest.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional certifications and continuous learning achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 border border-blue-500/20 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <Award className="w-6 h-6 text-blue-400 mr-3" />
                        {cert.verified && (
                          <Badge className="bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-400 border-green-400/30">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>

                    <CardTitle className="text-xl text-white mb-2">{cert.title}</CardTitle>
                    <p className="text-blue-400 font-medium">{cert.issuer}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>

                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Skills Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="outline"
                            className="text-xs border-blue-400/30 text-blue-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-blue-500/20">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {cert.date}
                      </div>
                      <div className="text-blue-400 font-medium">ID: {cert.credentialId}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Research */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-black to-blue-950/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Future Research
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Upcoming research initiatives and areas of exploration
            </p>
          </motion.div>

          <div className="space-y-6">
            {futureResearch.map((research, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 border border-blue-500/20 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <h3 className="text-xl font-bold text-white mr-4">{research.title}</h3>
                          <Badge variant="outline" className="border-blue-400/30 text-blue-400">
                            {research.status}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">{research.description}</p>
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          Timeline: {research.timeline}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
                Collaborate on Research
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Interested in collaborating on cutting-edge AI research? Let's explore new frontiers together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25"
                >
                  Discuss Research
                  <BookOpen className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
                >
                  View Applied Research
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
