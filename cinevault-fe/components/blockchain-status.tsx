"use client"

import { useState, useEffect } from "react"
import { Check, AlertTriangle, Clock, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface BlockchainStatusProps {
  txId?: string
  platformId?: string
  subscriptionId?: string
  onRefresh?: () => void
}

export function BlockchainStatus({ txId, platformId, subscriptionId, onRefresh }: BlockchainStatusProps) {
  const [status, setStatus] = useState<"loading" | "confirmed" | "pending" | "failed">("loading")
  const [lastChecked, setLastChecked] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (txId) {
      checkTransactionStatus()
    } else {
      setStatus("pending")
    }
  }, [txId])

  const checkTransactionStatus = async () => {
    setIsRefreshing(true)
    try {
      // In a real app, this would be an API call to check the transaction status
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate a successful transaction for demo purposes
      setStatus("confirmed")
      setLastChecked(new Date())
    } catch (error) {
      console.error("Error checking transaction status:", error)
      setStatus("failed")
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleRefresh = () => {
    checkTransactionStatus()
    if (onRefresh) {
      onRefresh()
    }
  }

  const getStatusBadge = () => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-neon-green/20 text-neon-green border border-neon-green/30">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-orange-500/20 text-orange-500 border border-orange-500/30">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-500 border border-red-500/30">Failed</Badge>
      case "loading":
      default:
        return <Skeleton className="h-5 w-20" />
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "confirmed":
        return <Check className="h-5 w-5 text-neon-green" />
      case "pending":
        return <Clock className="h-5 w-5 text-orange-500" />
      case "failed":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "loading":
      default:
        return <Skeleton className="h-5 w-5 rounded-full" />
    }
  }

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          {getStatusIcon()}
          Blockchain Status
        </CardTitle>
        <CardDescription>
          {status === "loading" ? "Checking blockchain status..." : `Last checked: ${lastChecked.toLocaleTimeString()}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            {getStatusBadge()}
          </div>

          {txId && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Transaction ID</span>
              <span className="text-sm font-mono truncate max-w-[180px]">
                {txId.substring(0, 8)}...{txId.substring(txId.length - 6)}
              </span>
            </div>
          )}

          {platformId && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Platform ID</span>
              <span className="text-sm font-mono truncate max-w-[180px]">
                {platformId.substring(0, 8)}...{platformId.substring(platformId.length - 6)}
              </span>
            </div>
          )}

          {subscriptionId && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subscription ID</span>
              <span className="text-sm font-mono truncate max-w-[180px]">
                {subscriptionId.substring(0, 8)}...{subscriptionId.substring(subscriptionId.length - 6)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full border-white/10 bg-black/20 hover:bg-black/30"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" /> Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-2" /> Refresh Status
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
