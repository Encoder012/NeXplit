"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Copy, DollarSign, ExternalLink, Shield, Split, User, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
import { useAuth } from "@/components/auth-provider"
// import { useWallet } from "@/components/wallet-provider"
import {
  useWallet
} from "@suiet/wallet-kit";
import { BlockchainService } from "@/lib/blockchain-service"

interface SplitAgreement {
  id: string
  name: string
  service: string
  image: string
  seller: {
    id: string
    name: string
    walletAddress: string
  }
  buyer: {
    id: string
    name: string
    walletAddress: string
  }
  price: number
  totalAmount: number
  duration: number
  startDate: string
  endDate: string
  progress: number
  status: "active" | "completed" | "pending" | "disputed"
  transactions: {
    id: string
    type: "payment" | "refund" | "escrow"
    amount: number
    timestamp: string
    txHash: string
    status: "completed" | "pending" | "failed"
  }[]
  platformId: string
  subscriptionId: string
  nftId: string
}

export default function SplitDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const wallet = useWallet()
  const { toast } = useToast()
  const router = useRouter()
  const [agreement, setAgreement] = useState<SplitAgreement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClaimingPayment, setIsClaimingPayment] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [blockchainService] = useState(() => new BlockchainService())

  // Set wallet in blockchain service
  useEffect(() => {
    blockchainService.setWallet(wallet)
  }, [wallet, blockchainService])

  useEffect(() => {
    const fetchAgreement = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        const mockAgreement: SplitAgreement = {
          id: params.id,
          name: "Netflix Premium",
          service: "netflix",
          image: "/placeholder.svg?height=300&width=600&text=Netflix",
          seller: {
            id: "user_123",
            name: "Alex Johnson",
            walletAddress: "0x71C...9E3F",
          },
          buyer: {
            id: "user_456",
            name: "Sarah Miller",
            walletAddress: "0x8A2...1D7B",
          },
          price: 17.99,
          totalAmount: 53.97,
          duration: 3,
          startDate: "2025-04-15T10:30:00Z",
          endDate: "2025-07-15T10:30:00Z",
          progress: 35,
          status: "active",
          transactions: [
            {
              id: "tx_1",
              type: "escrow",
              amount: 53.97,
              timestamp: "2025-04-15T10:30:00Z",
              txHash: "0x8a2d7b5e9f1c3d4a6b8c0d2e4f6a8b0c2d4e6f8a",
              status: "completed",
            },
            {
              id: "tx_2",
              type: "payment",
              amount: 26.99,
              timestamp: "2025-05-30T14:45:00Z",
              txHash: "0x1c3d5e7f9a2b4c6d8e0f2a4c6e8d0f2a4c6e8d0f",
              status: "pending",
            },
          ],
          platformId: "platform_789",
          subscriptionId: "subscription_101112",
          nftId: "8721",
        }

        setAgreement(mockAgreement)
      } catch (error) {
        console.error("Failed to fetch agreement:", error)
        toast({
          title: "Error",
          description: "Failed to load the split agreement. Please try again.",
          variant: "destructive",
        })
        router.push("/dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAgreement()
  }, [params.id, toast, router])

  const handleClaimPayment = async () => {
    if (!agreement) return

    setIsClaimingPayment(true)

    try {
      // Validate wallet connection
      if (!wallet.wallet?.connected) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet to claim payment.",
          variant: "destructive",
        })
        setIsClaimingPayment(false)
        return
      }

      // Claim payment on the blockchain
      const result = await blockchainService.claimPayment(agreement.subscriptionId, agreement.platformId)

      toast({
        title: "Payment claimed successfully",
        description: "Your payment has been claimed and will be transferred to your wallet.",
      })

      // Update the agreement with the new transaction
      setAgreement((prev) => {
        if (!prev) return null

        const newTransaction = {
          id: `tx_${prev.transactions.length + 1}`,
          type: "payment" as const,
          amount: prev.price,
          timestamp: new Date().toISOString(),
          txHash: result.txId,
          status: "completed" as const,
        }

        return {
          ...prev,
          transactions: [...prev.transactions, newTransaction],
        }
      })
    } catch (error) {
      console.error("Error claiming payment:", error)
      toast({
        title: "Error claiming payment",
        description: error.message || "There was a problem claiming your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsClaimingPayment(false)
    }
  }

  const handleReportIssue = () => {
    setIsReportDialogOpen(false)
    toast({
      title: "Issue reported",
      description: "Your issue has been reported. Our support team will contact you shortly.",
    })
  }

  if (!user) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Split className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Sign in to view split details</h1>
          <p className="text-muted-foreground mb-6">You need to be signed in to view split agreement details.</p>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading || !agreement) {
    return (
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading split agreement...</p>
        </div>
      </div>
    )
  }

  const isUserSeller = user.id === agreement.seller.id
  const isUserBuyer = user.id === agreement.buyer.id

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Split Agreement</h1>
          <p className="text-muted-foreground">View and manage your split agreement</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{agreement.name}</CardTitle>
                  <CardDescription>
                    {agreement.duration} month{agreement.duration > 1 ? "s" : ""} subscription
                  </CardDescription>
                </div>
                <Badge
                  className={`w-fit
                    ${agreement.status === "active" ? "bg-green-500/20 text-green-500 border-green-500/20" : ""}
                    ${agreement.status === "pending" ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" : ""}
                    ${agreement.status === "completed" ? "bg-blue-500/20 text-blue-500 border-blue-500/20" : ""}
                    ${agreement.status === "disputed" ? "bg-red-500/20 text-red-500 border-red-500/20" : ""}
                  `}
                >
                  {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden mb-6">
                <Image
                  src={agreement.image || "/placeholder.svg"}
                  alt={agreement.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                />
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Agreement Progress</span>
                    <span>{agreement.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${agreement.progress}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Price</span>
                    </div>
                    <p className="text-lg font-semibold">${agreement.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Total</span>
                    </div>
                    <p className="text-lg font-semibold">${agreement.totalAmount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">for {agreement.duration} months</p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Start Date</span>
                    </div>
                    <p className="text-lg font-semibold">{new Date(agreement.startDate).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(agreement.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">End Date</span>
                    </div>
                    <p className="text-lg font-semibold">{new Date(agreement.endDate).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(agreement.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Seller</h3>
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{agreement.seller.name}</p>
                          <p className="text-xs text-muted-foreground">Account Owner</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Wallet</span>
                          <div className="flex items-center gap-1">
                            <span className="font-mono">{agreement.seller.walletAddress}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => {
                                navigator.clipboard.writeText(agreement.seller.walletAddress)
                                toast({
                                  title: "Wallet address copied",
                                  description: "The wallet address has been copied to your clipboard.",
                                })
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Buyer</h3>
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{agreement.buyer.name}</p>
                          <p className="text-xs text-muted-foreground">Account Subscriber</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Wallet</span>
                          <div className="flex items-center gap-1">
                            <span className="font-mono">{agreement.buyer.walletAddress}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => {
                                navigator.clipboard.writeText(agreement.buyer.walletAddress)
                                toast({
                                  title: "Wallet address copied",
                                  description: "The wallet address has been copied to your clipboard.",
                                })
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="transactions">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="details">Blockchain Details</TabsTrigger>
                  </TabsList>
                  <TabsContent value="transactions" className="space-y-4 pt-4">
                    {agreement.transactions.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No transactions yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {agreement.transactions.map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center
                                  ${tx.type === "payment" ? "bg-green-500/20" : ""}
                                  ${tx.type === "refund" ? "bg-red-500/20" : ""}
                                  ${tx.type === "escrow" ? "bg-blue-500/20" : ""}
                                `}
                              >
                                {tx.type === "payment" && <DollarSign className="h-4 w-4 text-green-500" />}
                                {tx.type === "refund" && <ArrowLeft className="h-4 w-4 text-red-500" />}
                                {tx.type === "escrow" && <Shield className="h-4 w-4 text-blue-500" />}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {tx.type === "payment" && "Payment"}
                                  {tx.type === "refund" && "Refund"}
                                  {tx.type === "escrow" && "Escrow Deposit"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(tx.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${tx.amount.toFixed(2)}</p>
                              <div className="flex items-center gap-1 justify-end">
                                <Badge
                                  variant="outline"
                                  className={`text-xs
                                    ${tx.status === "completed" ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                                    ${tx.status === "pending" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : ""}
                                    ${tx.status === "failed" ? "bg-red-500/10 text-red-500 border-red-500/20" : ""}
                                  `}
                                >
                                  {tx.status}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => {
                                    navigator.clipboard.writeText(tx.txHash)
                                    toast({
                                      title: "Transaction hash copied",
                                      description: "The transaction hash has been copied to your clipboard.",
                                    })
                                  }}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="details" className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Platform ID</p>
                            <p className="text-xs text-muted-foreground">Unique identifier for the platform</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-mono text-sm">{agreement.platformId}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => {
                              navigator.clipboard.writeText(agreement.platformId)
                              toast({
                                title: "Platform ID copied",
                                description: "The platform ID has been copied to your clipboard.",
                              })
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Split className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Subscription ID</p>
                            <p className="text-xs text-muted-foreground">Unique identifier for the subscription</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-mono text-sm">{agreement.subscriptionId}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => {
                              navigator.clipboard.writeText(agreement.subscriptionId)
                              toast({
                                title: "Subscription ID copied",
                                description: "The subscription ID has been copied to your clipboard.",
                              })
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Image
                              src="/placeholder.svg?height=16&width=16&text=NFT"
                              alt="NFT"
                              width={16}
                              height={16}
                            />
                          </div>
                          <div>
                            <p className="font-medium">NFT ID</p>
                            <p className="text-xs text-muted-foreground">Unique identifier for the NFT</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-mono text-sm">#{agreement.nftId}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => {
                              navigator.clipboard.writeText(agreement.nftId)
                              toast({
                                title: "NFT ID copied",
                                description: "The NFT ID has been copied to your clipboard.",
                              })
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center pt-2">
                      <Button variant="outline" size="sm" className="gap-2" asChild>
                        <a href="https://explorer.sui.io" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          View on Sui Explorer
                        </a>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3 justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex flex-wrap gap-3">
                {isUserSeller && agreement.status === "active" && (
                  <Button
                    onClick={handleClaimPayment}
                    disabled={isClaimingPayment}
                    className="gap-2 bg-green-600 hover:bg-green-700"
                  >
                    {isClaimingPayment ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <DollarSign className="h-4 w-4" />
                    )}
                    Claim Payment
                  </Button>
                )}
                {isUserBuyer && agreement.status === "active" && (
                  <Button asChild>
                    <Link href="/account-access">Access Account</Link>
                  </Button>
                )}
                <Button variant="outline" className="gap-2 text-red-500" onClick={() => setIsReportDialogOpen(true)}>
                  Report Issue
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Split Agreement NFT</CardTitle>
              <CardDescription>Your NFT proof of agreement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                <div className="absolute inset-0 bg-grid opacity-10"></div>
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Split className="h-5 w-5 text-primary" />
                      <span className="font-semibold">neXplit NFT</span>
                    </div>
                    <div className="rounded-full bg-black/30 px-3 py-1 text-xs backdrop-blur-sm border border-white/10">
                      #{agreement.nftId}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-lg overflow-hidden">
                      <Image
                        src={agreement.image || "/placeholder.svg"}
                        alt={agreement.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="mb-4 text-2xl font-bold text-primary">{agreement.name}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Seller</div>
                        <div className="font-medium">{agreement.seller.name}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Buyer</div>
                        <div className="font-medium">{agreement.buyer.name}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Duration</div>
                        <div className="font-medium">{agreement.duration} months</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Total Cost</div>
                        <div className="font-medium">${agreement.totalAmount.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Blockchain Verified</p>
                    <p className="text-xs text-muted-foreground">This agreement is verified on the blockchain</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Time-Based Access</p>
                    <p className="text-xs text-muted-foreground">Access is granted for the specified time period</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Escrow Payments</p>
                    <p className="text-xs text-muted-foreground">
                      Payments are held in escrow and released at milestones
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button className="w-full" asChild>
                <a href="https://explorer.sui.io" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Sui Explorer
                </a>
              </Button>
              {isUserBuyer && agreement.status === "active" && (
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/account-access">Access Account</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>

      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report an Issue</DialogTitle>
            <DialogDescription>
              If you're experiencing problems with this split agreement, please let us know.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <Shield className="h-8 w-8 text-red-500" />
              <span>Access Issues</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <User className="h-8 w-8 text-yellow-500" />
              <span>Account Problems</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <DollarSign className="h-8 w-8 text-green-500" />
              <span>Payment Issues</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <Calendar className="h-8 w-8 text-blue-500" />
              <span>Duration Issues</span>
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReportIssue}>Submit Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
