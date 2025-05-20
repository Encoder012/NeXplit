"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Shield, Split } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-gradient-dark py-20 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20"></div>

      <div className="container relative z-10">
        <motion.div
          className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <Badge className="mb-4 inline-block bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                Secure Streaming Account Sharing
              </Badge>
            </motion.div>
            <motion.h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl" variants={itemVariants}>
              Share Streaming <span className="text-gradient">Subscriptions</span> Securely
            </motion.h1>
            <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0" variants={itemVariants}>
              SplitStream uses blockchain technology to create secure, transparent agreements for sharing your streaming
              accounts with complete control and privacy.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Button size="lg" asChild className="h-12 px-8">
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8">
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-center lg:justify-start gap-8 mt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-secondary"
                    >
                      <Image
                        src={`/placeholder.svg?height=32&width=32&text=${i}`}
                        alt={`User ${i}`}
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">1,000+</span> users already joined
                </div>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Encrypted credentials</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Blockchain security</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Smart contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Escrow payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Time-based access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Dispute resolution</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-violet-500/30 rounded-2xl blur-xl opacity-50 animate-pulse-slow"></div>
              <div className="relative bg-card border border-primary/20 rounded-2xl shadow-blue-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Split className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Split Agreement</span>
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      NFT #8721
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Netflix Premium</h3>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">Active</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-secondary/50 rounded-lg p-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Seller</p>
                        <p className="text-sm font-medium">0x71C...9E3F</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Buyer</p>
                        <p className="text-sm font-medium">0x8A2...1D7B</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Price</p>
                        <p className="text-sm font-medium">$24.99 USD</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Duration</p>
                        <p className="text-sm font-medium">3 months</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Agreement Progress</span>
                        <span className="text-xs font-medium">53%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full"
                          style={{ width: "53%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">First Payment</p>
                        <p className="text-sm font-medium">Jun 25, 2025</p>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Final Payment</p>
                        <p className="text-sm font-medium">Aug 10, 2025</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium">Secured by Blockchain</span>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Escrowed
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
