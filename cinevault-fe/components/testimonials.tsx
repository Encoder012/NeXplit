"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Quote } from "lucide-react"

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonials = [
    {
      name: "Alex Johnson",
      title: "Netflix Seller",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "I've been able to offset my streaming costs by sharing my Netflix account when I'm not using it. The blockchain security gives me peace of mind that my credentials are safe.",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      title: "Disney+ Buyer",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "SplitStream made it easy to find a Disney+ account to share with my kids for the summer. The escrow payment system ensures I only pay for what I use.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      title: "HBO Max Seller",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "I travel frequently and don't always use my streaming services. SplitStream lets me monetize my unused subscription time with complete security.",
      rating: 4,
    },
    {
      name: "Emily Rodriguez",
      title: "Spotify Buyer",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "Found a great deal on a Spotify Family account. The NFT agreement makes everything transparent, and I love knowing exactly when payments are released.",
      rating: 5,
    },
    {
      name: "David Kim",
      title: "Amazon Prime Seller",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "The platform makes it simple to list my Amazon Prime account when I'm not using it. The encrypted credentials feature is a game-changer for security.",
      rating: 4,
    },
    {
      name: "Jessica Taylor",
      title: "YouTube Premium Buyer",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "As a student, SplitStream helps me access premium streaming services at a fraction of the cost. The time-based access is perfect for my needs.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            What Our <span className="text-gradient">Users</span> Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied users who are securely sharing their streaming subscriptions
          </p>
        </div>

        <div
          ref={ref}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border-gradient p-6 bg-card rounded-xl shadow-blue"
              style={{
                transitionDelay: `${0.1 * (index % 3)}s`,
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative h-12 w-12 flex-shrink-0 rounded-full overflow-hidden border border-primary/20">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="object-cover"
                    fill
                    sizes="48px"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
              <div className="mb-4">
                <Quote className="h-6 w-6 text-primary/30" />
              </div>
              <p className="text-muted-foreground mb-4">{testimonial.content}</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < testimonial.rating ? "currentColor" : "none"}
                    stroke={i < testimonial.rating ? "none" : "currentColor"}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
