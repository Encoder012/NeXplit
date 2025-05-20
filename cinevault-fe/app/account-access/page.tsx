"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowUpDown,
  Check,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Filter,
  Grid,
  List,
  Search,
  Shield,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

interface AccessItem {
  id: string
  name: string
  service: string
  image: string
  seller: string
  credentials: {
    email: string
    password: string
    profilePin?: string
  }
  startDate: string
  endDate: string
  progress: number
  status: "active" | "expired" | "pending"
  serviceUrl: string
}

export default function AccountAccessPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [accessItems, setAccessItems] = useState<AccessItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "expired" | "pending">("all")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "expiring-soon">("newest")
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchAccessItems = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        const mockAccessItems: AccessItem[] = [
          {
            id: "access_1",
            name: "Netflix Premium",
            service: "netflix",
            image: "/placeholder.svg?height=200&width=300&text=Netflix",
            seller: "Alex Johnson",
            credentials: {
              email: "shared.account@example.com",
              password: "SecurePassword123",
              profilePin: "1234",
            },
            startDate: "2025-04-15T10:30:00Z",
            endDate: "2025-07-15T10:30:00Z",
            progress: 35,
            status: "active",
            serviceUrl: "https://netflix.com",
          },
          {
            id: "access_2",
            name: "Disney+ Bundle",
            service: "disney",
            image: "/placeholder.svg?height=200&width=300&text=Disney+",
            seller: "Sarah Miller",
            credentials: {
              email: "disney.shared@example.com",
              password: "DisneyMagic2025",
            },
            startDate: "2025-05-01T14:45:00Z",
            endDate: "2025-08-01T14:45:00Z",
            progress: 15,
            status: "active",
            serviceUrl: "https://disneyplus.com",
          },
          {
            id: "access_3",
            name: "HBO Max",
            service: "hbo",
            image: "/placeholder.svg?height=200&width=300&text=HBO",
            seller: "Michael Brown",
            credentials: {
              email: "hbo.access@example.com",
              password: "HBOSecure!2025",
            },
            startDate: "2025-05-20T09:15:00Z",
            endDate: "2025-06-20T09:15:00Z",
            progress: 0,
            status: "pending",
            serviceUrl: "https://hbomax.com",
          },
          {
            id: "access_4",
            name: "Spotify Family",
            service: "spotify",
            image: "/placeholder.svg?height=200&width=300&text=Spotify",
            seller: "Jessica Wilson",
            credentials: {
              email: "spotify.family@example.com",
              password: "MusicLover2025!",
            },
            startDate: "2025-02-15T16:30:00Z",
            endDate: "2025-05-15T16:30:00Z",
            progress: 100,
            status: "expired",
            serviceUrl: "https://spotify.com",
          },
        ]

        setAccessItems(mockAccessItems)

        // Initialize password visibility state
        const passwordVisibility: Record<string, boolean> = {}
        mockAccessItems.forEach((item) => {
          passwordVisibility[item.id] = false
        })
        setShowPasswords(passwordVisibility)
      } catch (error) {
        console.error("Failed to fetch access items:", error)
        toast({
          title: "Error",
          description: "Failed to load your account access. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccessItems()
  }, [toast])

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: `${type} copied`,
      description: `The ${type.toLowerCase()} has been copied to your clipboard.`,
    })
  }

  const filteredAccessItems = accessItems.filter((item) => {
    // Filter by search query
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by status
    if (statusFilter !== "all" && item.status !== statusFilter) {
      return false
    }

    return true
  })

  const sortedAccessItems = [...filteredAccessItems].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      case "oldest":
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      case "expiring-soon":
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      default:
        return 0
    }
  })

  if (!user) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Sign in to view your account access</h1>
          <p className="text-muted-foreground mb-6">You need to be signed in to view your account access.</p>
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
          <h1 className="text-2xl font-bold">Account Access</h1>
          <p className="text-muted-foreground">Access your shared streaming accounts</p>
        </div>
        <Button asChild>
          <Link href="/marketplace">
            <Plus className="mr-2 h-4 w-4" />
            Browse Marketplace
          </Link>
        </Button>
      </div>

      <div className="grid gap-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search accounts..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  <Check className={`mr-2 h-4 w-4 ${statusFilter === "all" ? "opacity-100" : "opacity-0"}`} />
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  <Check className={`mr-2 h-4 w-4 ${statusFilter === "active" ? "opacity-100" : "opacity-0"}`} />
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  <Check className={`mr-2 h-4 w-4 ${statusFilter === "pending" ? "opacity-100" : "opacity-0"}`} />
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("expired")}>
                  <Check className={`mr-2 h-4 w-4 ${statusFilter === "expired" ? "opacity-100" : "opacity-0"}`} />
                  Expired
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  <Check className={`mr-2 h-4 w-4 ${sortBy === "newest" ? "opacity-100" : "opacity-0"}`} />
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                  <Check className={`mr-2 h-4 w-4 ${sortBy === "oldest" ? "opacity-100" : "opacity-0"}`} />
                  Oldest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("expiring-soon")}>
                  <Check className={`mr-2 h-4 w-4 ${sortBy === "expiring-soon" ? "opacity-100" : "opacity-0"}`} />
                  Expiring Soon
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="all">All ({accessItems.length})</TabsTrigger>
            <TabsTrigger value="active">
              Active ({accessItems.filter((item) => item.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({accessItems.filter((item) => item.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired ({accessItems.filter((item) => item.status === "expired").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : sortedAccessItems.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No accounts found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your filters or search query."
                      : "You don't have access to any accounts yet."}
                  </p>
                  {!searchQuery && statusFilter === "all" && (
                    <Button asChild>
                      <Link href="/marketplace">Browse Marketplace</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedAccessItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge
                          className={`
                            ${item.status === "active" ? "bg-green-500/20 text-green-500 border-green-500/20" : ""}
                            ${item.status === "pending" ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" : ""}
                            ${item.status === "expired" ? "bg-red-500/20 text-red-500 border-red-500/20" : ""}
                          `}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>From {item.seller}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>Access Progress</span>
                            <span>{item.progress}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Start Date</p>
                            <p className="font-medium">{new Date(item.startDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">End Date</p>
                            <p className="font-medium">{new Date(item.endDate).toLocaleDateString()}</p>
                          </div>
                        </div>

                        {item.status === "active" && (
                          <div className="space-y-2 border rounded-md p-3 bg-secondary/20">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium">Credentials</p>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => togglePasswordVisibility(item.id)}
                                >
                                  {showPasswords[item.id] ? (
                                    <EyeOff className="h-3 w-3" />
                                  ) : (
                                    <Eye className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <p className="text-xs text-muted-foreground">Email:</p>
                                <div className="flex items-center gap-1">
                                  <p className="text-xs">{item.credentials.email}</p>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => copyToClipboard(item.credentials.email, "Email")}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-xs text-muted-foreground">Password:</p>
                                <div className="flex items-center gap-1">
                                  <p className="text-xs">
                                    {showPasswords[item.id] ? item.credentials.password : "••••••••••••"}
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => copyToClipboard(item.credentials.password, "Password")}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              {item.credentials.profilePin && (
                                <div className="flex justify-between items-center">
                                  <p className="text-xs text-muted-foreground">PIN:</p>
                                  <div className="flex items-center gap-1">
                                    <p className="text-xs">
                                      {showPasswords[item.id] ? item.credentials.profilePin : "••••"}
                                    </p>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => copyToClipboard(item.credentials.profilePin, "PIN")}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" asChild>
                        <a href={item.serviceUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Access Service
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedAccessItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-32 sm:h-auto sm:w-48">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 192px"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge
                              className={`
                                ${item.status === "active" ? "bg-green-500/20 text-green-500 border-green-500/20" : ""}
                                ${item.status === "pending" ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" : ""}
                                ${item.status === "expired" ? "bg-red-500/20 text-red-500 border-red-500/20" : ""}
                              `}
                            >
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">From {item.seller}</p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <a href={item.serviceUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Access Service
                              </a>
                            </Button>
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>Access Progress</span>
                              <span>{item.progress}%</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Start Date</p>
                              <p className="font-medium">{new Date(item.startDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">End Date</p>
                              <p className="font-medium">{new Date(item.endDate).toLocaleDateString()}</p>
                            </div>

                            {item.status === "active" && (
                              <>
                                <div>
                                  <p className="text-muted-foreground">Email</p>
                                  <div className="flex items-center gap-1">
                                    <p className="font-medium">{item.credentials.email}</p>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => copyToClipboard(item.credentials.email, "Email")}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Password</p>
                                  <div className="flex items-center gap-1">
                                    <p className="font-medium">
                                      {showPasswords[item.id] ? item.credentials.password : "••••••••••••"}
                                    </p>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => togglePasswordVisibility(item.id)}
                                    >
                                      {showPasswords[item.id] ? (
                                        <EyeOff className="h-3 w-3" />
                                      ) : (
                                        <Eye className="h-3 w-3" />
                                      )}
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => copyToClipboard(item.credentials.password, "Password")}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          {item.credentials.profilePin && item.status === "active" && (
                            <div className="mt-2 text-sm">
                              <p className="text-muted-foreground">Profile PIN</p>
                              <div className="flex items-center gap-1">
                                <p className="font-medium">
                                  {showPasswords[item.id] ? item.credentials.profilePin : "••••"}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => copyToClipboard(item.credentials.profilePin, "PIN")}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            {/* Same content structure as "all" tab but filtered for active items */}
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            {/* Same content structure as "all" tab but filtered for pending items */}
          </TabsContent>

          <TabsContent value="expired" className="mt-0">
            {/* Same content structure as "all" tab but filtered for expired items */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
