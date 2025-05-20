"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  DollarSign,
  ExternalLink,
  Info,
  Shield,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for a streaming service
const mockService = {
  id: "netflix",
  name: "Netflix",
  description:
    "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
  logo: "/placeholder.svg?height=80&width=80&text=Netflix",
  color: "from-red-600 to-red-800",
  textColor: "text-red-500",
  borderColor: "border-red-500/30",
  bgColor: "bg-red-500/20",
  website: "https://netflix.com",
  plans: [
    {
      id: "netflix-basic",
      name: "Basic",
      price: 9.99,
      features: ["Standard Definition (SD)", "Watch on 1 device at a time", "No downloads"],
      popular: false,
    },
    {
      id: "netflix-standard",
      name: "Standard",
      price: 15.99,
      features: ["High Definition (HD)", "Watch on 2 devices at a time", "Downloads on 2 devices"],
      popular: true,
    },
    {
      id: "netflix-premium",
      name: "Premium",
      price: 19.99,
      features: [
        "Ultra High Definition (UHD) & HDR",
        "Watch on 4 devices at a time",
        "Downloads on 6 devices",
        "Spatial Audio",
      ],
      popular: false,
    },
  ],
  listings: [
    {
      id: "listing-1",
      plan: "Premium",
      price: 17.99,
      duration: "6 months",
      seller: "David Kim",
      rating: 4.8,
      reviews: 24,
      activeSince: "March 2025",
    },
    {
      id: "listing-2",
      plan: "Standard",
      price: 13.99,
      duration: "3 months",
      seller: "Sarah Williams",
      rating: 4.5,
      reviews: 18,
      activeSince: "January 2025",
    },
    {
      id: "listing-3",
      plan: "Premium",
      price: 18.99,
      duration: "12 months",
      seller: "Michael Chen",
      rating: 4.9,
      reviews: 32,
      activeSince: "November 2024",
    },
  ],
  faqs: [
    {
      question: "How does account sharing work on SplitStream?",
      answer:
        "SplitStream allows users to securely share their streaming accounts with others. Account owners list their accounts, and buyers can purchase access for a specified duration. All credentials are encrypted and secured by blockchain technology.",
    },
    {
      question: "Is this allowed by Netflix's terms of service?",
      answer:
        "SplitStream operates within the guidelines of Netflix's household sharing policy. We recommend all users to review the terms of service of their streaming providers.",
    },
    {
      question: "What happens if the account owner changes the password?",
      answer:
        "SplitStream's smart contracts include provisions for account access. If access is revoked, the buyer can report the issue, and our dispute resolution system will handle it. Account owners with verified issues may face penalties.",
    },
    {
      question: "How are payments handled?",
      answer:
        "All payments are processed through secure blockchain transactions and held in escrow. Funds are released to sellers according to the agreement terms, ensuring both parties are protected.",
    },
  ],
}

export default function ServiceDetailsPage({ params }) {
  const router = useRouter()
  const [service, setService] = useState(mockService)

  // In a real app, you would fetch the service data based on the ID
  // useEffect(() => {
  //   const fetchService = async () => {
  //     const response = await fetch(`/api/services/${params.id}`)
  //     const data = await response.json()
  //     setService(data)
  //   }
  //   fetchService()
  // }, [params.id])

  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr] gradient-bg">
      <div className="hidden border-r border-white/10 bg-black/30 backdrop-blur-md lg:block">
        {/* Sidebar would go here - same as dashboard */}
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-white/10 bg-black/30 backdrop-blur-md px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="w-full flex-1">
            <h1 className="font-semibold text-lg">Service Details</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 gap-1 border-neon-purple/30 bg-black/20 hover:bg-black/30 hover:text-neon-purple"
            onClick={() => window.open(service.website, "_blank")}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            <span>Visit Website</span>
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-neon-glow opacity-10 blur-[150px]"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div
                className={`w-20 h-20 rounded-lg flex items-center justify-center bg-gradient-to-br ${service.color} p-4`}
              >
                <img
                  src={service.logo || "/placeholder.svg"}
                  alt={service.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-3">
                  <Badge className={`${service.bgColor} ${service.textColor} border ${service.borderColor}`}>
                    Streaming
                  </Badge>
                  <Badge className="bg-neon-purple/20 text-neon-purple border border-neon-purple/30">Popular</Badge>
                  <Badge className="bg-black/30 border border-white/10">
                    <Users className="h-3 w-3 mr-1" /> Account Sharing
                  </Badge>
                </div>
              </div>
            </div>

            <Tabs defaultValue="listings" className="relative z-10">
              <TabsList className="bg-black/30 border border-white/10">
                <TabsTrigger
                  value="listings"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-white"
                >
                  Available Listings
                </TabsTrigger>
                <TabsTrigger
                  value="plans"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-white"
                >
                  Plans & Pricing
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-white"
                >
                  FAQ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="listings" className="border-none p-0 pt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {service.listings.map((listing) => (
                    <Card key={listing.id} className="glass-effect border-white/5 neon-border overflow-hidden">
                      <div className={`h-1 bg-gradient-to-r ${service.color}`}></div>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {service.name} {listing.plan}
                          </CardTitle>
                          <Badge className="bg-neon-green/20 text-neon-green border border-neon-green/30">
                            Available
                          </Badge>
                        </div>
                        <CardDescription>Listed by {listing.seller}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Monthly Price</span>
                            <span className="font-medium">${listing.price.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Duration</span>
                            <span className="font-medium">{listing.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Seller Rating</span>
                            <span className="font-medium flex items-center">
                              <Star className="h-3.5 w-3.5 mr-1 text-yellow-500 fill-yellow-500" />
                              {listing.rating} ({listing.reviews} reviews)
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Active Since</span>
                            <span className="font-medium">{listing.activeSince}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}
                          onClick={() => router.push(`/marketplace/${listing.id}`)}
                        >
                          View Listing
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="border-neon-purple/30 bg-black/20 hover:bg-black/30 hover:text-neon-purple"
                    onClick={() => router.push("/marketplace")}
                  >
                    View All {service.name} Listings
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="plans" className="border-none p-0 pt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {service.plans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`glass-effect border-white/5 ${
                        plan.popular ? `border-${service.textColor} relative overflow-hidden` : "neon-border"
                      }`}
                    >
                      {plan.popular && (
                        <>
                          <div className={`h-1 bg-gradient-to-r ${service.color}`}></div>
                          <div
                            className={`absolute top-0 right-0 ${service.bgColor} ${service.textColor} px-3 py-1 text-xs font-medium rounded-bl-lg border-l border-b ${service.borderColor}`}
                          >
                            Most Popular
                          </div>
                        </>
                      )}
                      <CardHeader className="p-4">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <CardDescription>Official {service.name} Plan</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="mb-4">
                          <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 mr-2 text-neon-green shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex flex-col gap-3">
                        <Button
                          className={`w-full ${
                            plan.popular
                              ? `bg-gradient-to-r ${service.color}`
                              : "bg-gradient-to-r from-neon-purple to-neon-blue"
                          } hover:opacity-90 transition-opacity`}
                          onClick={() => window.open(service.website, "_blank")}
                        >
                          Subscribe Directly
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-white/10 bg-black/20 hover:bg-black/30"
                          onClick={() => router.push("/marketplace")}
                        >
                          Find Shared Accounts
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-black/30 rounded-lg border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-neon-purple/10 border border-neon-purple/30 shrink-0">
                      <Info className="h-5 w-5 text-neon-purple" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-1">Save with SplitStream</h3>
                      <p className="text-sm text-muted-foreground">
                        By sharing accounts through SplitStream, you can save up to 75% compared to official
                        subscription prices. All while maintaining secure access and supporting content creators.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="faq" className="border-none p-0 pt-6">
                <Card className="glass-effect border-white/5 neon-border">
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Common questions about {service.name} on SplitStream</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {service.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                  <CardFooter className="flex-col gap-4">
                    <div className="w-full p-4 bg-black/30 rounded-lg border border-white/10">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-neon-green/10 border border-neon-green/30 shrink-0">
                          <Shield className="h-5 w-5 text-neon-green" />
                        </div>
                        <div>
                          <h3 className="text-base font-medium mb-1">Secure Account Sharing</h3>
                          <p className="text-sm text-muted-foreground">
                            SplitStream uses blockchain technology to ensure secure and transparent account sharing. All
                            credentials are encrypted and protected by smart contracts.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-opacity"
                      onClick={() => router.push("/marketplace")}
                    >
                      Browse {service.name} Listings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8 relative z-10">
              <h2 className="text-2xl font-semibold mb-4">Why Share {service.name} on SplitStream?</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass-effect border-white/5 neon-border">
                  <CardHeader className="p-4 pb-2">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-neon-purple/10 border border-neon-purple/30 mb-2">
                      <DollarSign className="h-5 w-5 text-neon-purple" />
                    </div>
                    <CardTitle className="text-base">Save Money</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground">
                      Share the cost of your {service.name} subscription and save up to 75% on your monthly bill.
                    </p>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/5 neon-border">
                  <CardHeader className="p-4 pb-2">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-neon-blue/10 border border-neon-blue/30 mb-2">
                      <Shield className="h-5 w-5 text-neon-blue" />
                    </div>
                    <CardTitle className="text-base">Secure Access</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground">
                      All account sharing is secured by blockchain technology, ensuring your credentials remain
                      protected.
                    </p>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/5 neon-border">
                  <CardHeader className="p-4 pb-2">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-neon-green/10 border border-neon-green/30 mb-2">
                      <ThumbsUp className="h-5 w-5 text-neon-green" />
                    </div>
                    <CardTitle className="text-base">Flexible Terms</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground">
                      Choose from various durations and plans that fit your needs, without long-term commitments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center relative z-10">
              <Button
                variant="outline"
                className="border-white/10 bg-black/20 hover:bg-black/30"
                onClick={() => router.push("/marketplace")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Marketplace
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-opacity"
                      onClick={() => router.push("/list-account")}
                    >
                      List Your {service.name} Account <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share your account and earn passive income</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
