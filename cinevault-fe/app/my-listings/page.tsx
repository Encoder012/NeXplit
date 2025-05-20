"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpDown, Check, Edit, Eye, Filter, Grid, List, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

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

interface Listing {
  id: string
  name: string
  service: string
  image: string
  price: number
  status: "active" | "pending" | "inactive"
  createdAt: string
  views: number
  subscribers: number
  revenue: number
  nextPayment?: string
}

export default function MyListingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending" | "inactive">("all")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "price-high" | "price-low" | "popular">("newest")

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        const mockListings: Listing[] = [
          {
            id: "listing_1",
            name: "Netflix Premium",
            service: "netflix",
            image: "/placeholder.svg?height=200&width=300&text=Netflix",
            price: 17.99,
            status: "active",
            createdAt: "2025-04-15T10:30:00Z",
            views: 245,
            subscribers: 3,
            revenue: 107.94,
            nextPayment: "2025-05-20T00:00:00Z",
          },
          {
            id: "listing_2",
            name: "Disney+ Bundle",
            service: "disney",
            image: "/placeholder.svg?height=200&width=300&text=Disney+",
            price: 13.99,
            status: "active",
            createdAt: "2025-04-10T14:45:00Z",
            views: 187,
            subscribers: 2,
            revenue: 55.96,
            nextPayment: "2025-05-25T00:00:00Z",
          },
          {
            id: "listing_3",
            name: "HBO Max",
            service: "hbo",
            image: "/placeholder.svg?height=200&width=300&text=HBO",
            price: 15.99,
            status: "pending",
            createdAt: "2025-05-05T09:15:00Z",
            views: 78,
            subscribers: 0,
            revenue: 0,
          },
          {
            id: "listing_4",
            name: "Spotify Family",
            service: "spotify",
            image: "/placeholder.svg?height=200&width=300&text=Spotify",
            price: 14.99,
            status: "inactive",
            createdAt: "2025-03-20T16:30:00Z",
            views: 132,
            subscribers: 1,
            revenue: 29.98,
          },
        ]

        setListings(mockListings)
      } catch (error) {
        console.error("Failed to fetch listings:", error)
        toast({
          title: "Error",
          description: "Failed to load your listings. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchListings()
  }, [toast])

  const handleDeleteListing = async (id: string) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setListings((prev) => prev.filter((listing) => listing.id !== id))

      toast({
        title: "Listing deleted",
        description: "Your listing has been successfully deleted.",
      })
    } catch (error) {
      console.error("Failed to delete listing:", error)
      toast({
        title: "Error",
        description: "Failed to delete listing. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredListings = listings.filter((listing) => {
    // Filter by search query
    if (searchQuery && !listing.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by status
    if (statusFilter !== "all" && listing.status !== statusFilter) {
      return false
    }

    return true
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "price-high":
        return b.price - a.price
      case "price-low":
        return a.price - b.price
      case "popular":
        return b.views - a.views
      default:
        return 0
    }
  })

  if (!user) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <List className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Sign in to view your listings</h1>
          <p className="text-muted-foreground mb-6">You need to be signed in to view your listings.</p>
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
          <h1 className="text-2xl font-bold">My Listings</h1>
          <p className="text-muted-foreground">Manage your streaming account listings</p>
        </div>
        <Button asChild>
          <Link href="/list-account">
            <Plus className="mr-2 h-4 w-4" />
            New Listing
          </Link>
        </Button>
      </div>

      <div className="grid gap-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search listings..."
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
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                  <Check className={`mr-2 h-4 w-4 ${statusFilter === "inactive" ? "opacity-100" : "opacity-0"}`} />
                  Inactive
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
                <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                  <Check className={`mr-2 h-4 w-4 ${sortBy === "price-high" ? "opacity-100" : "opacity-0"}`} />
                  Price (High to Low)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                  <Check className={`mr-2 h-4 w-4 ${sortBy === "price-low" ? "opacity-100" : "opacity-0"}`} />
                  Price (Low to High)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("popular")}>
                  <Check className={`mr-2 h-4 w-4 ${sortBy === "popular" ? "opacity-100" : "opacity-0"}`} />
                  Most Popular
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
            <TabsTrigger value="all">All ({listings.length})</TabsTrigger>
            <TabsTrigger value="active">
              Active ({listings.filter((listing) => listing.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({listings.filter((listing) => listing.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive ({listings.filter((listing) => listing.status === "inactive").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : sortedListings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <List className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No listings found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your filters or search query."
                      : "You haven't created any listings yet."}
                  </p>
                  {!searchQuery && statusFilter === "all" && (
                    <Button asChild>
                      <Link href="/list-account">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Listing
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge
                          className={`
                            ${listing.status === "active" ? "bg-green-500/20 text-green-500 border-green-500/20" : ""}
                            ${listing.status === "pending" ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" : ""}
                            ${listing.status === "inactive" ? "bg-red-500/20 text-red-500 border-red-500/20" : ""}
                          `}
                        >
                          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{listing.name}</CardTitle>
                      <CardDescription>${listing.price.toFixed(2)} / month</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Views</p>
                          <p className="font-medium">{listing.views}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Subscribers</p>
                          <p className="font-medium">{listing.subscribers}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-medium">${listing.revenue.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Payment</p>
                          <p className="font-medium">
                            {listing.nextPayment ? new Date(listing.nextPayment).toLocaleDateString() : "N/A"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/my-listings/${listing.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/my-listings/${listing.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteListing(listing.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedListings.map((listing) => (
                  <Card key={listing.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-32 sm:h-auto sm:w-48">
                          <Image
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 192px"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{listing.name}</h3>
                              <p className="text-sm text-muted-foreground">${listing.price.toFixed(2)} / month</p>
                            </div>
                            <Badge
                              className={`
                                ${listing.status === "active" ? "bg-green-500/20 text-green-500 border-green-500/20" : ""}
                                ${listing.status === "pending" ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" : ""}
                                ${listing.status === "inactive" ? "bg-red-500/20 text-red-500 border-red-500/20" : ""}
                              `}
                            >
                              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Views</p>
                              <p className="font-medium">{listing.views}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Subscribers</p>
                              <p className="font-medium">{listing.subscribers}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Revenue</p>
                              <p className="font-medium">${listing.revenue.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Next Payment</p>
                              <p className="font-medium">
                                {listing.nextPayment ? new Date(listing.nextPayment).toLocaleDateString() : "N/A"}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                              Created on {new Date(listing.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/my-listings/${listing.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Details
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/my-listings/${listing.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDeleteListing(listing.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            {/* Same content structure as "all" tab but filtered for active listings */}
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            {/* Same content structure as "all" tab but filtered for pending listings */}
          </TabsContent>

          <TabsContent value="inactive" className="mt-0">
            {/* Same content structure as "all" tab but filtered for inactive listings */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
