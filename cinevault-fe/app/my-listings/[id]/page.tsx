"use client"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Copy, DollarSign, Edit, Eye, Key, Lock, Package, Shield, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Mock data for a specific listing
const mockListing = {
  id: "1",
  service: "Netflix Premium",
  plan: "4K Ultra HD",
  price: 17.99,
  duration: "6 months",
  status: "active",
  activeSplits: 0,
  maxSplits: 4,
  views: 42,
  createdAt: "May 2, 2025",
  description: "Netflix Premium with 4K streaming on up to 4 devices simultaneously.",
  earnings: 0,
  credentials: {
    email: "krishnaaggarwal012@gmail.com",
    password: "12345678",
  },
  splits: [],
  // splits: [
  //   {
  //     id: "split-1",
  //     buyer: "Alex Johnson",
  //     buyerWallet: "0x1a2b3c4d5e6f7g8h9i0j",
  //     startDate: "May 5, 2025",
  //     endDate: "August 5, 2025",
  //     amount: 35.98,
  //     status: "active",
  //     progress: 33,
  //   },
  //   {
  //     id: "split-2",
  //     buyer: "Jamie Smith",
  //     buyerWallet: "0x9i8h7g6f5e4d3c2b1a0",
  //     startDate: "May 10, 2025",
  //     endDate: "August 10, 2025",
  //     amount: 35.98,
  //     status: "active",
  //     progress: 30,
  //   },
  // ],
  analytics: {
    viewsThisWeek: 12,
    viewsLastWeek: 8,
    conversionRate: 4.8,
    averageTimeToSplit: "2.3 days",
  },
}

export default function ListingDetailsPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const [listing, setListing] = useState(mockListing)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isCredentialsDialogOpen, setIsCredentialsDialogOpen] = useState(false)

  // In a real app, you would fetch the listing data based on the ID
  // useEffect(() => {
  //   const fetchListing = async () => {
  //     const response = await fetch(`/api/listings/${params.id}`)
  //     const data = await response.json()
  //     setListing(data)
  //   }
  //   fetchListing()
  // }, [params.id])

  const handleDeleteListing = () => {
    // In a real app, you would make an API call to delete the listing
    router.push("/my-listings")
    toast({
      title: "Listing deleted",
      description: "Your listing has been successfully deleted.",
    })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    })
  }

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
            <h1 className="font-semibold text-lg">Listing Details</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 gap-1 border-neon-purple/30 bg-black/20 hover:bg-black/30 hover:text-neon-purple"
            onClick={() => router.push(`/list-account/edit/${listing.id}`)}
          >
            <Edit className="h-3.5 w-3.5 mr-1" />
            <span>Edit Listing</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1 border-red-500/30 bg-black/20 hover:bg-black/30 hover:text-red-500"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            <span>Delete</span>
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-neon-glow opacity-10 blur-[150px]"></div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 relative z-10">
            <div className="md:w-2/3">
              <Card className="glass-effect border-white/5 neon-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{listing.service}</CardTitle>
                      <CardDescription>{listing.plan}</CardDescription>
                    </div>
                    <Badge
                      className={`
                        ${listing.status === "active"
                          ? "bg-neon-green/20 text-neon-green border-neon-green/30"
                          : listing.status === "pending"
                            ? "bg-orange-500/20 text-orange-500 border-orange-500/30"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                        } border
                      `}
                    >
                      {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Monthly Price</p>
                      <p className="text-lg font-medium">${listing.price.toFixed(2)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="text-lg font-medium">{listing.duration}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Active Splits</p>
                      <p className="text-lg font-medium">
                        {listing.activeSplits} / {listing.maxSplits}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <p className="text-lg font-medium text-neon-green">${listing.earnings.toFixed(2)}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">{listing.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Account Credentials</h3>
                    <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 mr-2 text-neon-purple" />
                          <span className="text-sm">Credentials are encrypted and secure</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-neon-purple/30 bg-black/20 hover:bg-black/30 hover:text-neon-purple"
                          onClick={() => setIsCredentialsDialogOpen(true)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          <span>View Credentials</span>
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Your account credentials are securely stored and only shared with active split participants
                        through encrypted channels.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="splits" className="mt-6">
                <TabsList className="bg-black/30 border border-white/10">
                  <TabsTrigger
                    value="splits"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-white"
                  >
                    Active Splits
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-white"
                  >
                    Analytics
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="splits" className="border-none p-0 pt-4">
                  {listing.splits.length > 0 ? (
                    <div className="grid gap-4">
                      {listing.splits.map((split) => (
                        <Card key={split.id} className="glass-effect border-white/5 neon-border overflow-hidden">
                          <div className="h-1 bg-gradient-to-r from-neon-purple to-neon-blue"></div>
                          <CardHeader className="p-4">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">Split with {split.buyer}</CardTitle>
                              <Badge className="bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
                                Active
                              </Badge>
                            </div>
                            <CardDescription>
                              {split.startDate} - {split.endDate}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="grid gap-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Buyer Wallet</span>
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    {split.buyerWallet.substring(0, 6)}...
                                    {split.buyerWallet.substring(split.buyerWallet.length - 4)}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 ml-1 text-muted-foreground hover:text-white"
                                    onClick={() => copyToClipboard(split.buyerWallet)}
                                  >
                                    <Copy className="h-3 w-3" />
                                    <span className="sr-only">Copy</span>
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Amount</span>
                                <span className="font-medium text-neon-green">${split.amount.toFixed(2)}</span>
                              </div>
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="text-xs">{split.progress}%</span>
                                </div>
                                <Progress
                                  value={split.progress}
                                  className="h-2 bg-black/30"
                                  indicatorClassName="bg-gradient-to-r from-neon-purple to-neon-blue"
                                />
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-neon-purple/30 bg-black/20 hover:bg-black/30 hover:text-neon-purple"
                              onClick={() => router.push(`/splits/${split.id}`)}
                            >
                              View Split Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-black/30 p-4 border border-white/10 mb-4">
                        <Users className="h-8 w-8 text-neon-purple" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No active splits</h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        Your listing doesn't have any active splits yet. When users purchase access to your account,
                        they'll appear here.
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="analytics" className="border-none p-0 pt-4">
                  <Card className="glass-effect border-white/5 neon-border">
                    <CardHeader>
                      <CardTitle>Listing Analytics</CardTitle>
                      <CardDescription>Performance metrics for your {listing.service} listing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Views This Week</p>
                          <p className="text-2xl font-medium">{listing.analytics.viewsThisWeek}</p>
                          <p className="text-xs text-neon-green">
                            +{listing.analytics.viewsThisWeek - listing.analytics.viewsLastWeek} from last week
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Total Views</p>
                          <p className="text-2xl font-medium">{listing.views}</p>
                          <p className="text-xs text-muted-foreground">All time</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Conversion Rate</p>
                          <p className="text-2xl font-medium">{listing.analytics.conversionRate}%</p>
                          <p className="text-xs text-muted-foreground">Views to splits</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Avg. Time to Split</p>
                          <p className="text-2xl font-medium">{listing.analytics.averageTimeToSplit}</p>
                          <p className="text-xs text-muted-foreground">From view to purchase</p>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Views Over Time</h3>
                        <div className="h-64 bg-black/30 rounded-lg border border-white/10 flex items-center justify-center">
                          <p className="text-muted-foreground">Analytics chart would be displayed here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="md:w-1/3">
              <Card className="glass-effect border-white/5 neon-border sticky top-8">
                <CardHeader>
                  <CardTitle>Listing NFT</CardTitle>
                  <CardDescription>Your listing as an NFT on the blockchain</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 p-6 animate-glow">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-neon-blue/5 backdrop-blur-sm"></div>
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-neon-purple" />
                          <span className="font-semibold">SplitStream Listing</span>
                        </div>
                        <div className="rounded-full bg-black/30 px-3 py-1 text-xs backdrop-blur-sm border border-white/10">
                          #{listing.id}
                        </div>
                      </div>
                      <div className="mt-auto">
                        <div className="mb-4 text-2xl font-bold text-neon-blue">{listing.service}</div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Plan</div>
                            <div className="font-medium">{listing.plan}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Price</div>
                            <div className="font-medium">${listing.price.toFixed(2)}/mo</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Duration</div>
                            <div className="font-medium">{listing.duration}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Splits</div>
                            <div className="font-medium">
                              {listing.activeSplits}/{listing.maxSplits}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-neon-green" />
                      <div>
                        <p className="text-sm font-medium">Blockchain Verified</p>
                        <p className="text-xs text-muted-foreground">This listing is verified on the blockchain</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-neon-blue" />
                      <div>
                        <p className="text-sm font-medium">Secure Credentials</p>
                        <p className="text-xs text-muted-foreground">Your account details are encrypted</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-neon-purple" />
                      <div>
                        <p className="text-sm font-medium">Escrow Payments</p>
                        <p className="text-xs text-muted-foreground">All payments are held in secure escrow</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button
                    className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-opacity"
                    onClick={() => router.push(`/list-account/edit/${listing.id}`)}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit Listing
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 bg-black/20 hover:bg-black/30"
                    onClick={() => router.push("/my-listings")}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Listings
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="glass-effect border-white/10">
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
              {listing.activeSplits > 0 && (
                <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded-md text-sm">
                  <strong>Warning:</strong> This listing has {listing.activeSplits} active splits. Deleting it will
                  terminate all agreements and may affect your reputation on the platform.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-white/10 bg-black/20"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteListing}
              className="bg-gradient-to-r from-red-500 to-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCredentialsDialogOpen} onOpenChange={setIsCredentialsDialogOpen}>
        <DialogContent className="glass-effect border-white/10">
          <DialogHeader>
            <DialogTitle>Account Credentials</DialogTitle>
            <DialogDescription>
              These are the encrypted credentials for your {listing.service} account. They are only shared with active
              split participants.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex">
                <Input id="email" value={listing.credentials.email} readOnly className="bg-black/30 border-white/10" />
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2 border-neon-purple/30 bg-black/20"
                  onClick={() => copyToClipboard(listing.credentials.email)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex">
                <Input
                  id="password"
                  value={listing.credentials.password}
                  type="password"
                  readOnly
                  className="bg-black/30 border-white/10"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2 border-neon-purple/30 bg-black/20"
                  onClick={() => copyToClipboard(listing.credentials.password)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg border border-white/10 p-3 text-xs text-muted-foreground">
              <div className="flex items-center mb-2">
                <Key className="h-4 w-4 mr-2 text-neon-purple" />
                <span className="font-medium text-sm">Security Notice</span>
              </div>
              <p>
                These credentials are encrypted and securely stored on the blockchain. When a user purchases a split,
                they receive a decryption key that allows them to access these credentials for the duration of their
                agreement.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsCredentialsDialogOpen(false)}
              className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-opacity"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
