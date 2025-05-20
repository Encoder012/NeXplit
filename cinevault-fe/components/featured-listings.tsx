"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, DollarSign, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function FeaturedListings() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const streamingServices = [
    {
      id: 1,
      name: "Netflix Premium",
      category: "Movies & TV",
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.9,
      reviews: 128,
      price: 17.99,
      duration: "6 months",
      description: "Share a Netflix Premium account with 4K UHD and multiple profiles.",
      features: ["4K UHD", "Multiple Profiles", "No Ads", "Downloads"],
    },
    {
      id: 2,
      name: "Disney+ Bundle",
      category: "Family",
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.7,
      reviews: 94,
      price: 13.99,
      duration: "12 months",
      description: "Disney+ bundle with Hulu and ESPN+ for all your entertainment needs.",
      features: ["Disney+", "Hulu", "ESPN+", "Family Friendly"],
    },
    {
      id: 3,
      name: "HBO Max",
      category: "Premium",
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.8,
      reviews: 76,
      price: 15.99,
      duration: "3 months",
      description: "Access to HBO Max with all premium content and new releases.",
      features: ["New Releases", "Exclusive Content", "4K UHD", "No Ads"],
    },
  ]

  return (
    <section className="py-20 bg-gradient-dark relative overflow-hidden" id="marketplace">
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Featured <span className="text-gradient">Listings</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Browse our most popular streaming accounts available for splitting
          </p>
        </div>

        <div
          ref={ref}
          className="grid gap-8 md:grid-cols-3"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {streamingServices.map((service, index) => (
            <div
              key={service.id}
              className="border-gradient bg-card rounded-xl shadow-blue overflow-hidden transition-transform hover:translate-y-[-5px]"
              style={{
                transitionDelay: `${0.1 * index}s`,
              }}
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-primary/20 text-primary border-primary/20">{service.category}</Badge>
                </div>
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-xl font-bold text-white">{service.name}</h3>
                  <div className="flex items-center gap-1 text-white/90">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-sm">{service.rating}</span>
                    <span className="text-xs text-white/70">({service.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="font-bold">${service.price.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground">/ month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">{service.duration} available</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="bg-secondary/50 border-primary/20">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full" asChild>
                  <Link href={`/marketplace/${service.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/marketplace">
              View All Listings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
