"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, Key, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BlockchainStatus } from "@/components/blockchain-status"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const txId = searchParams.get("txId")

  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      // Auto-redirect after countdown
      router.push("/account-access")
    }
  }, [countdown, router])

  return (
    <div className="container max-w-lg py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neon-green/20 border border-neon-green/30 mb-4">
          <Check className="h-10 w-10 text-neon-green" />
        </div>
        <h1 className="text-3xl font-bold">Purchase Successful!</h1>
        <p className="text-muted-foreground mt-2">Your subscription has been created and verified on the blockchain</p>
      </div>

      <Card className="glass-effect border-white/5 neon-border mb-6">
        <CardHeader>
          <CardTitle>Transaction Complete</CardTitle>
          <CardDescription>Your subscription details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-medium">#{id || "N/A"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Transaction ID</span>
            <span className="font-mono text-sm truncate max-w-[200px]">{txId || "Processing..."}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium text-neon-green">Confirmed</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">NFT Status</span>
            <span className="font-medium text-neon-blue">Minted</span>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button
            className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-opacity"
            onClick={() => router.push("/account-access")}
          >
            <Key className="h-4 w-4 mr-2" /> Access Your Account
          </Button>
          <Button
            variant="outline"
            className="w-full border-white/10 bg-black/20 hover:bg-black/30"
            onClick={() => router.push("/splits/" + id)}
          >
            <Package className="h-4 w-4 mr-2" /> View Split Agreement
          </Button>
        </CardFooter>
      </Card>

      <BlockchainStatus txId={txId || undefined} />

      <div className="mt-6 text-center">
        <p className="text-muted-foreground">Redirecting to Account Access in {countdown} seconds...</p>
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/marketplace">Browse More</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
