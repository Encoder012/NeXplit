"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div
        ref={ref}
        className="container relative z-10"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
        }}
      >
        <div className="border-gradient p-8 md:p-12 bg-card rounded-xl shadow-blue-lg">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Ready to Start <span className="text-gradient">Sharing</span> Securely?
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Join thousands of users already saving money and earning from their unused subscription time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="h-12 px-8">
                  <Link href="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-12 px-8">
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-6 rounded-xl border border-primary/10">
                <div className="text-3xl font-bold text-primary mb-2">$2M+</div>
                <p className="text-muted-foreground">Saved by our users on subscription costs</p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-xl border border-primary/10">
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground">Active sharing agreements on our platform</p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-xl border border-primary/10">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Secure blockchain-based transactions</p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-xl border border-primary/10">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Customer support for all your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
