"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, DollarSign, Plus, Tv, User, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
// import { useWallet } from "@/components/wallet-provider"
import {
  ConnectButton,
  WalletProvider,
  useWallet,
  addressEllipsis,
  ConnectModal
} from "@suiet/wallet-kit";
import { Split } from "lucide-react"

interface ActiveSplit {
  id: string
  name: string
  service: string
  image: string
  role: "seller" | "buyer"
  price: number
  startDate: string
  endDate: string
  progress: number
  status: "active" | "pending" | "completed"
  nextPayment?: string
  nextPaymentAmount?: number
}

interface RecentActivity {
  id: string
  type: "payment" | "access" | "listing" | "purchase"
  title: string
  description: string
  timestamp: string
  amount?: number
}



export default function DashboardPage() {
  const { user } = useAuth()
  const wallet = useWallet()
  const { toast } = useToast()
  const [activeSplits, setActiveSplits] = useState<ActiveSplit[]>([])
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [stats, setStats] = useState({
    totalEarnings: 0,
    activeListings: 0,
    activeSplits: 0,
    pendingPayments: 0,
  })
  const [isLoading, setIsLoading] = useState(true)


  const { select, configuredWallets, detectedWallets } = useWallet();

  const handleConnect = (walletInfo: any) => {

    try {
      console.log(walletInfo.name);
      select(walletInfo.name);

    } catch (error) {
      const browserExtensionUrl = walletInfo.downloadUrl?.browserExtension;
      alert("hello world")

      if (browserExtensionUrl && typeof browserExtensionUrl === 'string') {
        window.location.href = browserExtensionUrl;
      } else {
        // Fallback if no URL is available
        window.location.href = '/error';
      }
    }
  }

  const [openModal, setOpenModal] = useState(false);
  const { connected, account } = useWallet();


  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // In a real app, these would be API calls
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        const mockActiveSplits: ActiveSplit[] = [
          {
            id: "split_1",
            name: "Netflix Premium",
            service: "netflix",
            image: "/placeholder.svg?height=200&width=300&text=Netflix",
            role: "seller",
            price: 17.99,
            startDate: "2025-04-15T10:30:00Z",
            endDate: "2025-07-15T10:30:00Z",
            progress: 35,
            status: "active",
            nextPayment: "2025-05-30T00:00:00Z",
            nextPaymentAmount: 17.99,
          },
          {
            id: "split_2",
            name: "Disney+ Bundle",
            service: "disney",
            image: "/placeholder.svg?height=200&width=300&text=Disney+",
            role: "buyer",
            price: 13.99,
            startDate: "2025-05-01T14:45:00Z",
            endDate: "2025-08-01T14:45:00Z",
            progress: 15,
            status: "active",
            nextPayment: "2025-06-15T00:00:00Z",
            nextPaymentAmount: 13.99,
          },
          {
            id: "split_3",
            name: "HBO Max",
            service: "hbo",
            image: "/placeholder.svg?height=200&width=300&text=HBO",
            role: "buyer",
            price: 15.99,
            startDate: "2025-05-20T09:15:00Z",
            endDate: "2025-06-20T09:15:00Z",
            progress: 0,
            status: "pending",
          },
        ]

        const mockRecentActivity: RecentActivity[] = [
          {
            id: "activity_1",
            type: "payment",
            title: "Payment Received",
            description: "Payment for Netflix Premium subscription",
            timestamp: "2025-05-15T10:30:00Z",
            amount: 17.99,
          },
          {
            id: "activity_2",
            type: "access",
            title: "Account Accessed",
            description: "Disney+ Bundle account was accessed",
            timestamp: "2025-05-14T15:45:00Z",
          },
          {
            id: "activity_3",
            type: "listing",
            title: "New Listing Created",
            description: "HBO Max subscription listed on marketplace",
            timestamp: "2025-05-10T09:15:00Z",
          },
          {
            id: "activity_4",
            type: "purchase",
            title: "Subscription Purchased",
            description: "Disney+ Bundle subscription purchased",
            timestamp: "2025-05-01T14:45:00Z",
            amount: 41.97,
          },
        ]

        const mockStats = {
          totalEarnings: 107.94,
          activeListings: 2,
          activeSplits: 3,
          pendingPayments: 1,
        }

        setActiveSplits(mockActiveSplits)
        setRecentActivity(mockRecentActivity)
        setStats(mockStats)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [toast])

  if (!user) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Sign in to view your dashboard</h1>
          <p className="text-muted-foreground mb-6">You need to be signed in to view your dashboard.</p>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/marketplace">
              <Tv className="mr-2 h-4 w-4" />
              Browse Marketplace
            </Link>
          </Button>
          <Button asChild>
            <Link href="/list-account">
              <Plus className="mr-2 h-4 w-4" />
              List Account
            </Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid gap-8">
          {/* Stats Section */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Lifetime earnings from your listings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeListings}</div>
                <p className="text-xs text-muted-foreground">Accounts you're currently sharing</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Splits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeSplits}</div>
                <p className="text-xs text-muted-foreground">Total active subscription splits</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingPayments}</div>
                <p className="text-xs text-muted-foreground">Payments ready to be claimed</p>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Section */}
          <Card>
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
              <CardDescription>Your connected blockchain wallet</CardDescription>
            </CardHeader>
            <CardContent>
              {wallet?.connected ? (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Connected Wallet</p>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Wallet className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{wallet?.address}</p>
                        {/* <p className="text-xs text-muted-foreground">{wallet.wallet.type}</p> */}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Balance</p>
                    <p className="text-xl font-bold">static 2 SUI</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={wallet?.disconnect}>
                    Disconnect
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Wallet className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    Connect your wallet to manage your listings, purchases, and payments.
                  </p>
                  <WalletProvider>
                    <div className="grid grid-cols-4 gap-3 ">

                      {[...detectedWallets, ...configuredWallets].map((walletInfo) => (

                        <button

                          className="size-10 aspect-square gap-1"
                          key={walletInfo.name}
                          // onClick={() => handleConnect(walletInfo.name)}
                          onClick={() => {
                            handleConnect(walletInfo)

                          }}
                        >
                          <img src={walletInfo.iconUrl} alt={walletInfo.name} />
                        </button>
                      ))}

                    </div>

                    {/* <ConnectButton /> */}


                    {/* <button onClick={() => setOpenModal(true)}>
                      {connected ? `Connected: ${account?.address.slice(0, 6)}...` : 'Connect Wallet'}
                    </button> */}

                    {/* Built-in Suiet modal */}
                    {/* <ConnectModal
                      open={openModal}
                      onOpenChange={setOpenModal}
                    /> */}

                  </WalletProvider>
                  {/* <Button onClick={() => wallet.connectWallet("sui")}>Connect Wallet</Button> */}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Splits Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Active Splits</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/splits">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {activeSplits.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Split className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No active splits</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any active subscription splits yet. Browse the marketplace to find accounts to share.
                  </p>
                  <Button asChild>
                    <Link href="/marketplace">Browse Marketplace</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {activeSplits.map((split) => (
                  <Card key={split.id} className="overflow-hidden">
                    <div className="relative h-36">
                      <Image
                        src={split.image || "/placeholder.svg"}
                        alt={split.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge
                          className={`
                            ${split.status === "active" ? "bg-green-500/20 text-green-500 border-green-500/20" : ""}
                            ${split.status === "pending" ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" : ""}
                            ${split.status === "completed" ? "bg-blue-500/20 text-blue-500 border-blue-500/20" : ""}
                          `}
                        >
                          {split.status.charAt(0).toUpperCase() + split.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-white/10">
                          {split.role === "seller" ? "Your Listing" : "Subscribed"}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{split.name}</CardTitle>
                      <CardDescription>${split.price.toFixed(2)} / month</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>Progress</span>
                            <span>{split.progress}%</span>
                          </div>
                          <Progress value={split.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Start Date</p>
                            <p className="font-medium">{new Date(split.startDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">End Date</p>
                            <p className="font-medium">{new Date(split.endDate).toLocaleDateString()}</p>
                          </div>
                        </div>

                        {split.nextPayment && (
                          <div className="flex items-center justify-between text-sm bg-primary/10 rounded-md p-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>Next Payment</span>
                            </div>
                            <div className="font-medium">
                              {new Date(split.nextPayment).toLocaleDateString()}
                              {split.nextPaymentAmount && (
                                <span className="ml-1 text-primary">${split.nextPaymentAmount.toFixed(2)}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" size="sm" asChild>
                        <Link href={`/splits/${split.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/activity">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Activity</CardTitle>
                <CardDescription>Your recent transactions and activities</CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivity.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-muted-foreground">No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center
                              ${activity.type === "payment" ? "bg-green-500/20" : ""}
                              ${activity.type === "access" ? "bg-blue-500/20" : ""}
                              ${activity.type === "listing" ? "bg-purple-500/20" : ""}
                              ${activity.type === "purchase" ? "bg-yellow-500/20" : ""}
                            `}
                          >
                            {activity.type === "payment" && <DollarSign className="h-5 w-5 text-green-500" />}
                            {activity.type === "access" && <User className="h-5 w-5 text-blue-500" />}
                            {activity.type === "listing" && <Plus className="h-5 w-5 text-purple-500" />}
                            {activity.type === "purchase" && <Tv className="h-5 w-5 text-yellow-500" />}
                          </div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {activity.amount && (
                          <div className="text-right">
                            <p className="font-medium">${activity.amount.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.type === "payment" ? "Received" : "Paid"}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
