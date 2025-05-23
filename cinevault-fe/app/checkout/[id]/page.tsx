"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard, Info, Lock, Shield, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
// import { WalletConnect } from "@/components/wallet-connect"
import blockchainService from "@/lib/blockchain-service"
import { use } from "react"
import {
  ConnectButton,
  useWallet,
  WalletProvider,
  addressEllipsis,
  ConnectModal,
  useAccountBalance
} from "@suiet/wallet-kit";

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const wallet = useWallet()
  const router = useRouter()
  const searchParams = useSearchParams()
  const duration = searchParams.get("duration") || "3"

  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [listing, setListing] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState("crypto")

  const { id } = use(params);


  const { select, configuredWallets, detectedWallets } = useWallet();

  const handleConnect = (walletInfo: any) => {

    console.log(walletInfo.name);
    select(walletInfo.name);

  }

  // Credit card form state
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })

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
          image: "/placeholder.svg?height=100&width=100",
          price: 17.99,
          description: "Netflix Premium subscription with 4K UHD streaming and multiple profiles.",
          seller: {
            name: "Alex Johnson",
            rating: 4.8,
          },
          subscriptionId: "sub_123",
          platformId: "platform_456",
        })
      } catch (error) {
        toast({
          title: "Error loading checkout",
          description: "Failed to load the checkout details. Please try again.",
          variant: "destructive",
        })
        router.push(`/marketplace/${id}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchListing()
  }, [id, toast, router])

  const handleCardDetailsChange = (field: string, value: string) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (wallet.connected && paymentMethod === "crypto") {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to proceed with crypto payment.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Payment successful!",
        description: "Your purchase has been completed successfully.",
      })

      // Redirect to success page
      router.push(`/checkout/success?id=${id}`)
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCheckout = async () => {
    setIsProcessing(true)

    try {
      // Validate wallet connection
      if (!wallet.connected) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet to complete this purchase.",
          variant: "destructive",
        })
        setIsProcessing(false)
        return
      }
      blockchainService.setWallet(wallet);


      // Connect the wallet to our blockchain service
      // blockchainService.connectWallet(wallet.address || "")

      // Join the subscription on the blockchain
      const selectedDuration = Number.parseInt(duration)
      const totalAmount = Number(total.toFixed(2))

      const result = await blockchainService.purchaseSubscription(
        listing.subscriptionId,
        listing.platformId,
        selectedDuration,
        // totalAmount,
      )

      // Process payment and create the subscription
      // This would typically involve additional API calls to your backend
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Purchase successful",
        description: "Your subscription has been created and verified on the blockchain.",
      })

      // Navigate to success page
      router.push(`/checkout/success?id=${listing.id}&txId=${result.txId}`)
    } catch (error: any) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout failed",
        description: error.message || "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading || !listing) {
    return (
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </div>
    )
  }

  const subtotal = Number.parseFloat(listing.price) * Number.parseInt(duration)
  const platformFee = subtotal * 0.05
  const total = subtotal + platformFee

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/marketplace/${id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to listing</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose how you want to pay for your subscription share</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={paymentMethod} onValueChange={(value) => setPaymentMethod(value)}>
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
                </TabsList>
                <TabsContent value="crypto" className="space-y-6 pt-6">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-start gap-3">
                      <Info className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div className="text-sm">
                        <p className="font-medium">Crypto Payment</p>
                        <p className="text-muted-foreground">
                          Pay with cryptocurrency for faster processing and lower fees. Your payment will be held in
                          escrow and released according to the agreement schedule.
                        </p>
                      </div>
                    </div>
                  </div>

                  {wallet.connected ? (
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                            <Wallet className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Wallet Connected</p>
                            <p className="text-sm text-muted-foreground">
                              {wallet.address?.substring(0, 6)}...
                              {wallet.address?.substring(wallet.address.length - 4)}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Ready</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        You need to connect a wallet to pay with cryptocurrency.
                      </p>
                      {/* <WalletConnect /> */}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Select Cryptocurrency</Label>
                    <RadioGroup defaultValue="sui">
                      <div className="flex items-center space-x-2 rounded-lg border p-3">
                        <RadioGroupItem value="sui" id="sui" />
                        <Label htmlFor="sui" className="flex flex-1 items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/20">
                            <img
                              src="/placeholder.svg?height=24&width=24&text=SUI"
                              alt="SUI"
                              className="h-6 w-6 rounded-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">SUI</div>
                            <div className="text-xs text-muted-foreground">Sui Network</div>
                          </div>
                          <div className="text-sm font-medium">≈ {(total / 5).toFixed(4)} SUI</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border p-3">
                        <RadioGroupItem value="eth" id="eth" />
                        <Label htmlFor="eth" className="flex flex-1 items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/20">
                            <img
                              src="/placeholder.svg?height=24&width=24&text=ETH"
                              alt="ETH"
                              className="h-6 w-6 rounded-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">ETH</div>
                            <div className="text-xs text-muted-foreground">Ethereum</div>
                          </div>
                          <div className="text-sm font-medium">≈ {(total / 3000).toFixed(6)} ETH</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border p-3">
                        <RadioGroupItem value="usdc" id="usdc" />
                        <Label htmlFor="usdc" className="flex flex-1 items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/20">
                            <img
                              src="/placeholder.svg?height=24&width=24&text=USDC"
                              alt="USDC"
                              className="h-6 w-6 rounded-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">USDC</div>
                            <div className="text-xs text-muted-foreground">USD Coin</div>
                          </div>
                          <div className="text-sm font-medium">≈ {total.toFixed(2)} USDC</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>


              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg border">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{listing.name}</h3>
                  <p className="text-sm text-muted-foreground">{listing.description}</p>
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Duration</span>
                  <span className="font-medium">{duration} months</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Price per month</span>
                  <span>${listing.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Subtotal ({duration} months)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Platform fee (5%)</span>
                  <span>${platformFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/50 p-3">
                <div className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-4 w-4 text-primary" />
                  <div className="text-xs">
                    <p className="font-medium">Secure Escrow Payment</p>
                    <p className="text-muted-foreground">
                      Your payment will be held in escrow and released to the seller according to this schedule:
                    </p>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li className="flex items-center justify-between">
                        <span>50% at midpoint</span>
                        <span>${(total / 2).toFixed(2)}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>50% at end of period</span>
                        <span>${(total / 2).toFixed(2)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Complete Purchase"}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Secure, encrypted payment
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
