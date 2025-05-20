"use client"

import { useEffect, useState } from "react"
// import { useWallet as useWalletContext } from "@/components/wallet-provider"
import {
  ConnectButton,
  useWallet as useWalletContext,
  addressEllipsis,
} from "@suiet/wallet-kit";

export function useWallet() {
  const walletContext = useWalletContext()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check if wallet context is initialized
    if (walletContext) {
      setIsReady(true)
    }
  }, [walletContext])

  return {
    ...walletContext,
    isReady,
    isConnected: !!walletContext.wallet?.connected,
    address: walletContext.wallet?.address || null,
    balance: walletContext.wallet?.balance || "0",
    walletType: walletContext.wallet?.type || null,
  }
}
