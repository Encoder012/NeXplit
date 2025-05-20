"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Shield, Split, Wallet, Timer, Lock, Users, CreditCard, BarChart } from "lucide-react"

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure Encryption",
      description: "Your credentials are encrypted using Mysten Labs SEAL and stored securely on the blockchain.",
    },
    {
      icon: <Split className="h-10 w-10 text-primary" />,
      title: "Smart Splitting",
      description: "Split costs fairly based on usage time with transparent pricing and automatic calculations.",
    },
    {
      icon: <Wallet className="h-10 w-10 text-primary" />,
      title: "Escrow Payments",
      description: "Funds are held in escrow and released automatically at predefined milestones.",
    },
    {
      icon: <Timer className="h-10 w-10 text-primary" />,
      title: "Time-Based Access",
      description: "Share access for specific time intervals with automatic expiration when the period ends.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Credential Protection",
      description: "Advanced encryption ensures your login details remain secure throughout the sharing period.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "User Verification",
      description: "All users are verified through blockchain identity to ensure trust and accountability.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Flexible Payments",
      description: "Support for multiple payment methods and currencies with automatic conversion.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Usage Analytics",
      description: "Track your sharing history, earnings, and expenses with detailed analytics.",
    },
  ]

  return (
    <section className="py-20 bg-background relative overflow-hidden" id="features">
      <div className="absolute inset-0 bg-dots opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Advanced <span className="text-gradient">Features</span> for Secure Sharing
          </h2>
          <p className="text-xl text-muted-foreground">
            SplitStream combines cutting-edge blockchain technology with user-friendly features to make subscription
            sharing secure, fair, and transparent.
          </p>
        </div>

        <div
          ref={ref}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="border-gradient p-6 bg-card rounded-xl shadow-blue transition-transform hover:translate-y-[-5px]"
              style={{
                transitionDelay: `${0.1 * index}s`,
              }}
            >
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
