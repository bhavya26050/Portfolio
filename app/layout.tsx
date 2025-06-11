import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bhavya Verma - AI Developer | Full-Stack Engineer | Researcher",
  description:
    "Portfolio of Bhavya Verma, BTech CSE student at NMIMS Shirpur specializing in AI/ML, full-stack development, and research.",
  keywords:
    "Bhavya Verma, AI Developer, Machine Learning, Full Stack Developer, React, Next.js, Python, Research, NMIMS",
  authors: [{ name: "Bhavya Verma" }],
  openGraph: {
    title: "Bhavya Verma - AI Developer | Full-Stack Engineer | Researcher",
    description: "Building intelligent, beautiful, and meaningful tech.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
