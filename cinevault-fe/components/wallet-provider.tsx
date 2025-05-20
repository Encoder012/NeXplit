"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

// Define wallet types
export type WalletType = "sui" | "metamask" | "phantom" | "walletconnect"

export interface WalletInfo {
  address: string
  type: WalletType
  balance: string
  connected: boolean
}

interface WalletContextType {
  wallet: WalletInfo | null
  connecting: boolean
  connectWallet: (type: WalletType) => Promise<string>
  disconnectWallet: () => void
  signTransaction: (transaction: any) => Promise<string>
  sendTransaction: (transaction: any) => Promise<{ txId: string; success: boolean }>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [connecting, setConnecting] = useState(false)
  const { toast } = useToast()

  // Check for existing wallet connection on load
  useEffect(() => {
    const savedWallet = localStorage.getItem("nexplit-wallet")
    if (savedWallet) {
      try {
        const parsedWallet = JSON.parse(savedWallet)
        setWallet(parsedWallet)

        // Verify the connection is still valid
        verifyWalletConnection(parsedWallet)
      } catch (error) {
        console.error("Failed to restore wallet connection:", error)
        localStorage.removeItem("nexplit-wallet")
      }
    }
  }, [])

  // Verify wallet connection is still valid
  const verifyWalletConnection = async (walletInfo: WalletInfo) => {
    try {
      // This would typically check if the wallet is still connected
      // For now, we'll just simulate a check
      const isConnected = await checkWalletConnection(walletInfo.type, walletInfo.address)

      if (!isConnected) {
        setWallet(null)
        localStorage.removeItem("nexplit-wallet")
        toast({
          title: "Wallet disconnected",
          description: "Your wallet connection has expired. Please reconnect.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error verifying wallet connection:", error)
    }
  }

  // Mock function to check wallet connection
  const checkWalletConnection = async (type: WalletType, address: string): Promise<boolean> => {
    // In a real implementation, this would check if the wallet is still connected
    return true
  }

  // Connect to wallet
  const connectWallet = async (type: WalletType): Promise<string> => {
    setConnecting(true)

    try {
      // In a real implementation, this would connect to the actual wallet
      // For now, we'll simulate a connection
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a mock address based on wallet type
      const address = generateMockAddress(type)

      // Get mock balance
      const balance = await getMockBalance(address)

      const walletInfo: WalletInfo = {
        address,
        type,
        balance,
        connected: true,
      }

      setWallet(walletInfo)
      localStorage.setItem("nexplit-wallet", JSON.stringify(walletInfo))

      return address
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setConnecting(false)
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet(null)
    localStorage.removeItem("nexplit-wallet")
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  // Sign transaction
  const signTransaction = async (transaction: any): Promise<string> => {
    if (!wallet) {
      throw new Error("Wallet not connected")
    }

    try {
      // In a real implementation, this would sign the transaction with the wallet
      // For now, we'll simulate signing
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`
    } catch (error) {
      console.error("Failed to sign transaction:", error)
      toast({
        title: "Signing failed",
        description: "Failed to sign transaction. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  // Send transaction
  const sendTransaction = async (transaction: any): Promise<{ txId: string; success: boolean }> => {
    if (!wallet) {
      throw new Error("Wallet not connected")
    }

    try {
      // In a real implementation, this would send the transaction to the blockchain
      // For now, we'll simulate sending
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const txId = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`

      toast({
        title: "Transaction sent",
        description: "Your transaction has been sent to the blockchain.",
      })

      return { txId, success: true }
    } catch (error) {
      console.error("Failed to send transaction:", error)
      toast({
        title: "Transaction failed",
        description: "Failed to send transaction. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  // Helper functions
  const generateMockAddress = (type: WalletType): string => {
    const prefix = type === "sui" ? "0x" : type === "metamask" ? "0x" : "0x"
    return `${prefix}${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`
  }

  const getMockBalance = async (address: string): Promise<string> => {
    // In a real implementation, this would get the actual balance
    return (Math.random() * 10).toFixed(4)
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connecting,
        connectWallet,
        disconnectWallet,
        signTransaction,
        sendTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
