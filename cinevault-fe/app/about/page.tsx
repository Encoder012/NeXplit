import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Globe, Users, Shield, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Co-Founder",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Former fintech executive with 10+ years experience in blockchain and digital payments.",
    },
    {
      name: "Sarah Chen",
      role: "CTO & Co-Founder",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Blockchain engineer and security expert with background at major tech companies.",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Product leader with experience building consumer subscription platforms.",
    },
    {
      name: "Emily Taylor",
      role: "Head of Marketing",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Digital marketing strategist specializing in growth for tech startups.",
    },
    {
      name: "David Kim",
      role: "Lead Engineer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Full-stack developer with expertise in secure payment systems and encryption.",
    },
    {
      name: "Jessica Patel",
      role: "Customer Success Lead",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Customer experience professional focused on building trust and satisfaction.",
    },
  ]

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Security First",
      description:
        "We prioritize the security of our users' data and credentials above all else, implementing the highest standards of encryption and protection.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Trust",
      description:
        "Building a trusted community where users can safely share resources is at the core of everything we do.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Innovation",
      description:
        "We continuously push the boundaries of what's possible with blockchain technology to create better, more secure sharing experiences.",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Accessibility",
      description:
        "We believe premium content should be accessible to everyone, and we're building technology to make that possible in a fair, secure way.",
    },
  ]

  return (
    <main className="flex-1">
      <section className="py-20 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <Badge className="mb-4 inline-block bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Our Story
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              About <span className="text-gradient">SplitStream</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We're building the future of secure subscription sharing with blockchain technology
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 items-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-blue-lg border-gradient">
              <Image
                src="/placeholder.svg?height=600&width=800&text=SplitStream+Office"
                alt="SplitStream Office"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                SplitStream was founded in 2023 with a simple mission: to make subscription sharing secure, transparent,
                and fair for everyone.
              </p>
              <p className="text-lg text-muted-foreground">
                We recognized that people were already sharing their streaming accounts, but doing so in ways that were
                insecure, unreliable, and often led to disputes. By leveraging blockchain technology, we've created a
                platform that protects both the account owner and the borrower.
              </p>
              <p className="text-lg text-muted-foreground">
                Our team of security experts, blockchain engineers, and product designers are committed to building a
                platform that makes subscription sharing as seamless and secure as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do at SplitStream</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {values.map((value, index) => (
              <div
                key={index}
                className="border-gradient p-6 bg-card rounded-xl shadow-blue"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The talented people behind SplitStream's technology and vision
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {team.map((member, index) => (
              <div
                key={index}
                className="border-gradient bg-card rounded-xl shadow-blue overflow-hidden transition-transform hover:translate-y-[-5px]"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="container relative z-10">
          <div className="border-gradient p-8 md:p-12 bg-card rounded-xl shadow-blue-lg animate-fade-in">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Join Our <span className="text-gradient">Team</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We're always looking for talented individuals who are passionate about blockchain technology,
                  security, and creating amazing user experiences.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Competitive salary and equity packages</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Remote-first work environment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Comprehensive health and wellness benefits</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Professional development opportunities</span>
                  </div>
                </div>
                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link href="/careers">
                      View Open Positions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-blue">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Join+Our+Team"
                  alt="Join Our Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
