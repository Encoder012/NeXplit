"use client"

import { useState, useEffect } from "react"
import { Wallet, ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useWallet, type WalletType } from "@/components/wallet-provider"

import { useAuth } from "@/components/auth-provider"


// import {
//   ConnectButton,
//   useWallet,
//   addressEllipsis,
// } from "@suiet/wallet-kit";

export function WalletConnect({ onSuccess }: { onSuccess?: () => void }) {
  const { wallet, connecting, connectWallet } = useWallet()
  const { updateUserWallet } = useAuth()
  const { toast } = useToast()
  const [walletOptions, setWalletOptions] = useState<{ id: WalletType; name: string; icon: string }[]>([])
  const [connectingWalletId, setConnectingWalletId] = useState<WalletType | null>(null)

  useEffect(() => {
    // Available wallet options
    setWalletOptions([
      { id: "sui", name: "Sui Wallet", icon: "/placeholder.svg?height=40&width=40&text=Sui" },
      { id: "metamask", name: "MetaMask", icon: "/placeholder.svg?height=40&width=40&text=MM" },
      { id: "phantom", name: "Phantom", icon: "/placeholder.svg?height=40&width=40&text=Ph" },
      { id: "walletconnect", name: "WalletConnect", icon: "/placeholder.svg?height=40&width=40&text=WC" },
    ])
  }, [])

  const handleConnect = async (walletId: WalletType) => {
    if (wallet?.connected) {
      toast({
        title: "Wallet already connected",
        description: `You already have a wallet connected: ${wallet.address.substring(
          0,
          6,
        )}...${wallet.address.substring(wallet.address.length - 4)}`,
      })
      if (onSuccess) onSuccess()
      return
    }

    setConnectingWalletId(walletId)

    try {
      // Connect wallet
      const address = await connectWallet(walletId)

      // Update user profile with wallet info
      await updateUserWallet(address, walletId)

      toast({
        title: "Wallet connected successfully",
        description: "Your wallet has been connected to neXplit.",
      })

      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Wallet connection error:", error)
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setConnectingWalletId(null)
    }
  }

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="text-xl">Connect Your Wallet</CardTitle>
        <CardDescription>
          Connect your blockchain wallet to enable secure transactions and access to your NFT agreements
        </CardDescription>
      </CardHeader>
      <CardContent>
        {wallet?.connected ? (
          <div className="flex flex-col items-center justify-center space-y-4 p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Check className="h-8 w-8" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">Wallet Connected</h3>
              <p className="text-sm text-muted-foreground">
                {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Balance: {wallet.balance} {wallet.type === "sui" ? "SUI" : wallet.type === "metamask" ? "ETH" : "SOL"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-500" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-500">Important</p>
                  <p className="text-muted-foreground">
                    Connecting a wallet is required to create or purchase streaming account shares. Your wallet will be
                    used to sign transactions and store your NFT agreements.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {walletOptions.map((wallet) => (
                <Button
                  key={wallet.id}
                  variant="outline"
                  className="flex h-14 w-full items-center justify-between border-white/10 bg-black/20 hover:bg-black/30 hover:text-primary"
                  onClick={() => handleConnect(wallet.id)}
                  disabled={connecting || connectingWalletId !== null}
                >
                  <div className="flex items-center gap-3">
                    <img src={wallet.icon || "/placeholder.svg"} alt={wallet.name} className="h-8 w-8 rounded-md" />
                    <span>{wallet.name}</span>
                  </div>
                  {connectingWalletId === wallet.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Wallet className="h-3 w-3" />
          Powered by neXplit Blockchain
        </div>
      </CardFooter>
    </Card>
  )
}
