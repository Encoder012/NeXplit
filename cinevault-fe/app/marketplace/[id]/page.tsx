"use client"

import { Label } from "@/components/ui/label"
import React from 'react'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Check, Download, Lock, Shield, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import blockchainService from "@/lib/blockchain-service"
import { use } from 'react'
import {
  ConnectButton,
  WalletProvider,
  useWallet,
  addressEllipsis,
  ConnectModal,
  useAccountBalance
} from "@suiet/wallet-kit";

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [listing, setListing] = useState<any>(null)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(3)


  const { select, configuredWallets, detectedWallets } = useWallet();

  const handleConnect = async (walletInfo: any) => {

    console.log(walletInfo.name);
    await select(walletInfo.name);

  }

  const { id } = React.use(params) as { id: string };

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data for the listing
        setListing({
          id: id,
          name: "Netflix Premium",
          category: "Movies & TV",
          image: "/placeholder.svg?height=400&width=600",
          rating: 0,
          reviews: 0,
          price: 17.99,
          duration: "6 months",
          description:
            "Share a Netflix Premium account with 4K UHD and multiple profiles. This subscription includes access to all Netflix content in ultra-high definition quality.",
          features: ["4K UHD", "Multiple Profiles", "No Ads", "Downloads"],
          seller: {
            id: "user_123",
            name: "Krishna Aggarwal",
            rating: 4.8,
            listings: 12,
            completedSplits: 45,
            joinedDate: "January 2025",
            avatar: "/placeholder.svg?height=100&width=100",
          },
          details: {
            plan: "Premium",
            maxProfiles: 4,
            maxDuration: 6,
            minDuration: 1,
            restrictions: ["No password changes", "Designated profile only", "No payment method changes"],
            availableFrom: "Immediate",
            devices: ["Smart TVs", "Phones", "Tablets", "Computers", "Game Consoles"],
          },
        })
      } catch (error) {
        toast({
          title: "Error loading listing",
          description: "Failed to load the listing details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchListing()
  }, [id, toast])

  const handlePurchase = () => {
    if (!user?.walletConnected) {
      setShowWalletModal(true)
      return
    }

    // Connect the wallet to our blockchain service
    blockchainService.connectWallet(user.walletAddress || "")

    // Proceed with purchase - this will be handled in the checkout page
    router.push(`/checkout/${id}?duration=${selectedDuration}`)
  }

  if (isLoading || !listing) {
    return (
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading listing details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/marketplace">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to marketplace</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/marketplace" className="hover:text-primary hover:underline">
              Marketplace
            </Link>
            <span>/</span>
            <span className="text-foreground">{listing.name}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <div className="relative aspect-video overflow-hidden rounded-xl border">
              <Image
                src={listing.image || "/placeholder.svg"}
                alt={listing.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="mb-2 bg-primary/20 text-primary border-primary/20">{listing.category}</Badge>
                <h1 className="text-3xl font-bold text-white">{listing.name}</h1>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="text-sm text-white/90">
                    {listing.rating} ({listing.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="details">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="seller">Seller</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-6 pt-4">
                <div>
                  <h2 className="text-xl font-semibold">Description</h2>
                  <p className="mt-2 text-muted-foreground">{listing.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Features</h3>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {listing.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium">Account Details</h3>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <span className="text-sm text-muted-foreground">Plan</span>
                        <span className="font-medium">{listing.details.plan}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <span className="text-sm text-muted-foreground">Max Profiles</span>
                        <span className="font-medium">{listing.details.maxProfiles}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <span className="text-sm text-muted-foreground">Available From</span>
                        <span className="font-medium">{listing.details.availableFrom}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <span className="text-sm text-muted-foreground">Max Duration</span>
                        <span className="font-medium">{listing.details.maxDuration} months</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Restrictions</h3>
                    <div className="mt-3 space-y-2">
                      {listing.details.restrictions.map((restriction: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 rounded-lg border p-3">
                          <Lock className="h-4 w-4 text-primary" />
                          <span className="text-sm">{restriction}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Supported Devices</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {listing.details.devices.map((device: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-muted/50">
                        {device}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seller" className="space-y-6 pt-4">
                <div className="flex items-start gap-6">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border">
                    <Image
                      src={listing.seller.avatar || "/placeholder.svg"}
                      alt={listing.seller.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{listing.seller.name}</h2>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <span className="text-sm text-muted-foreground">{listing.seller.rating} rating from buyers</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Member since {listing.seller.joinedDate}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="rounded-lg border p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{listing.seller.listings}</div>
                    <div className="text-sm text-muted-foreground">Active Listings</div>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{listing.seller.completedSplits}</div>
                    <div className="text-sm text-muted-foreground">Completed Splits</div>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Positive Feedback</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Seller Verification</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Identity Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Payment Method Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Email Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Blockchain Wallet Connected</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Customer Reviews</h2>
                  <Button variant="outline" size="sm">
                    Filter Reviews
                  </Button>
                </div>

                <div className="grid gap-6">
                  {[
                    {
                      name: "Sarah Williams",
                      date: "April 28, 2025",
                      rating: 5,
                      comment:
                        "Great experience sharing this Netflix account. The seller was responsive and everything worked as described. The 4K streaming quality is excellent!",
                      avatar: "/placeholder.svg?height=40&width=40&text=SW",
                    },
                    {
                      name: "Michael Chen",
                      date: "April 15, 2025",
                      rating: 4,
                      comment:
                        "Good value for money. The account works well, though I had a small issue with one of the profiles that was quickly resolved by the seller.",
                      avatar: "/placeholder.svg?height=40&width=40&text=MC",
                    },
                    {
                      name: "Jessica Taylor",
                      date: "March 30, 2025",
                      rating: 5,
                      comment:
                        "Perfect! The account credentials were provided immediately after purchase and everything has been working flawlessly for the past month.",
                      avatar: "/placeholder.svg?height=40&width=40&text=JT",
                    },
                  ].map((review, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-start gap-4">
                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border">
                          <Image
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{review.name}</div>
                            <div className="text-xs text-muted-foreground">{review.date}</div>
                          </div>
                          <div className="mt-1 flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-muted text-muted-foreground"
                                  }`}
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-sm">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </TabsContent>

              <TabsContent value="faq" className="space-y-6 pt-4">
                <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>

                <div className="grid gap-4">
                  {[
                    {
                      question: "How does account sharing work?",
                      answer:
                        "When you purchase this listing, you'll receive secure access to the Netflix account credentials. You'll be assigned a specific profile to use, and the account owner will maintain the subscription. Your access is secured through our blockchain technology.",
                    },
                    {
                      question: "Can I change the password or account details?",
                      answer:
                        "No, you cannot change the password or any account details. This is to protect the account owner. You'll have access to use the service with the assigned profile only.",
                    },
                    {
                      question: "What happens if the account stops working?",
                      answer:
                        "If the account stops working during your sharing period, you can report the issue through our platform. We'll verify the problem and either resolve it with the seller or issue a refund for the remaining time.",
                    },
                    {
                      question: "How are payments handled?",
                      answer:
                        "Payments are processed through our secure escrow system. The full amount is held in escrow and released to the seller in installments throughout the sharing period. This ensures you only pay for the time you have access.",
                    },
                    {
                      question: "Can I extend my sharing period?",
                      answer:
                        "Yes, if the seller continues to offer the account, you can extend your sharing period before it expires. You'll receive a notification when your sharing period is about to end with an option to extend.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <h3 className="font-medium">{faq.question}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Options</CardTitle>
              <CardDescription>Select your sharing duration and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">${listing.price.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Sharing Duration</Label>
                  <span className="text-sm font-medium">{selectedDuration} months</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 3, 6].map((months) => (
                    <Button
                      key={months}
                      variant={selectedDuration === months ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setSelectedDuration(months)}
                    >
                      {months} {months === 1 ? "month" : "months"}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Start Date</span>
                  </div>
                  <span className="text-sm font-medium">Immediate</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Profiles</span>
                  </div>
                  <span className="text-sm font-medium">1 of 4</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Downloads</span>
                  </div>
                  <span className="text-sm font-medium">Allowed</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between font-medium">
                  <span>Monthly Price</span>
                  <span>${listing.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Duration</span>
                  <span>× {selectedDuration} months</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Platform Fee</span>
                  <span>${(listing.price * selectedDuration * 0.05).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(listing.price * selectedDuration * 1.05).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" size="lg" onClick={handlePurchase}>
                Purchase Now
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                Secure, encrypted credentials with blockchain verification
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Purchase</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete your purchase and the payment will be held in escrow
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive encrypted credentials and access your assigned profile
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Enjoy</h3>
                    <p className="text-sm text-muted-foreground">
                      Stream content for your selected duration with full support
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium">Payments</h3>
                    <p className="text-sm text-muted-foreground">
                      Payments are released to the seller at predefined milestones
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {showWalletModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="max-w-md">
                <WalletProvider>
                  <div className="grid grid-cols-4 gap-3 ">

                    {[...detectedWallets, ...configuredWallets].map((walletInfo) => (

                      <button

                        className="size-10 aspect-square gap-1"
                        key={walletInfo.name}
                        // onClick={() => handleConnect(walletInfo.name)}
                        onClick={async () => {
                          await handleConnect(walletInfo).then(() => {
                            setShowWalletModal(false)
                            // Proceed with purchase after wallet connection
                            router.push(`/checkout/${id}?duration=${selectedDuration}`)

                          })

                        }}
                      >
                        <img src={walletInfo.iconUrl} alt={walletInfo.name} />
                      </button>
                    ))}

                  </div>
                </WalletProvider>
                {/* <WalletConnect
                  onSuccess={() => {
                    setShowWalletModal(false)
                    // Proceed with purchase after wallet connection
                    router.push(`/checkout/${params.id}?duration=${selectedDuration}`)
                  }}
                /> */}
                <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowWalletModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
