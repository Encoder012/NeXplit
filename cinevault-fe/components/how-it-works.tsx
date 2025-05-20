"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Check, ListChecks, Lock, Wallet } from "lucide-react"

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      number: "01",
      title: "List Your Account",
      description:
        "Securely list your streaming account with your desired terms. Your credentials are encrypted using advanced technology.",
      features: ["Encrypted credentials", "Set your own price", "Define available time periods"],
    },
    {
      number: "02",
      title: "Buyer Selects Split",
      description:
        "Buyers browse available accounts and select their desired time interval. Our platform calculates a fair price based on the subscription cost and split time.",
      features: ["Browse available accounts", "Choose time interval", "Transparent pricing"],
    },
    {
      number: "03",
      title: "NFT Creation & Payment",
      description:
        "The buyer deposits the full split amount, which is escrowed in a Split Agreement NFT. This NFT is transferred to the buyer and contains all agreement details.",
      features: ["Secure escrow payment", "NFT contains all agreement details", "Blockchain-verified transaction"],
    },
    {
      number: "04",
      title: "Access & Payments",
      description:
        "The buyer gains access to the encrypted credentials. Payments are automatically released to the seller at predefined milestones, ensuring fairness for both parties.",
      features: ["Secure credential access", "Automatic milestone payments", "Dispute resolution system"],
    },
  ]

  return (
    <section className="py-20 bg-gradient-dark relative overflow-hidden" id="how-it-works">
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How <span className="text-gradient">SplitStream</span> Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Our blockchain-powered platform makes sharing streaming accounts secure, fair, and transparent.
          </p>
        </div>

        <div
          ref={ref}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
              style={{
                transitionDelay: `${0.1 * index}s`,
              }}
            >
              <div className="mb-6">
                <div className="text-5xl font-bold text-primary/20">{step.number}</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/30 to-transparent -translate-x-8"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <div className="border-gradient p-8 bg-card rounded-xl shadow-blue">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="p-4 bg-primary/10 rounded-full">
                <Lock className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Secure by Design</h3>
                <p className="text-muted-foreground mb-4">
                  SplitStream uses Mysten Labs SEAL encryption and Sui blockchain technology to ensure your credentials
                  are secure and transactions are transparent.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <ListChecks className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Encrypted Credentials</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <Wallet className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Secure Payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
