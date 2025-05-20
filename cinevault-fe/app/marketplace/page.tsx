import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, DollarSign, Filter, Package, Search, Star, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function MarketplacePage() {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6 text-purple-600" />
              <span className="">SplitStream</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <div className="px-6 py-4">
              <h2 className="mb-4 text-lg font-semibold">Filters</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="movies" />
                      <label htmlFor="movies" className="text-sm">
                        Movies & TV
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="music" />
                      <label htmlFor="music" className="text-sm">
                        Music
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gaming" />
                      <label htmlFor="gaming" className="text-sm">
                        Gaming
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="family" />
                      <label htmlFor="family" className="text-sm">
                        Family
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premium" />
                      <label htmlFor="premium" className="text-sm">
                        Premium
                      </label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Services</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="netflix" />
                      <label htmlFor="netflix" className="text-sm">
                        Netflix
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="disney" />
                      <label htmlFor="disney" className="text-sm">
                        Disney+
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hbo" />
                      <label htmlFor="hbo" className="text-sm">
                        HBO Max
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="spotify" />
                      <label htmlFor="spotify" className="text-sm">
                        Spotify
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="amazon" />
                      <label htmlFor="amazon" className="text-sm">
                        Amazon Prime
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="youtube" />
                      <label htmlFor="youtube" className="text-sm">
                        YouTube Premium
                      </label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label htmlFor="min-price" className="text-xs text-muted-foreground">
                        Min
                      </label>
                      <Input id="min-price" type="number" placeholder="0" className="h-8" />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="max-price" className="text-xs text-muted-foreground">
                        Max
                      </label>
                      <Input id="max-price" type="number" placeholder="50" className="h-8" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Duration</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="1-3" />
                      <label htmlFor="1-3" className="text-sm">
                        1-3 months
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="3-6" />
                      <label htmlFor="3-6" className="text-sm">
                        3-6 months
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="6-12" />
                      <label htmlFor="6-12" className="text-sm">
                        6-12 months
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="12+" />
                      <label htmlFor="12+" className="text-sm">
                        12+ months
                      </label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="4k" />
                      <label htmlFor="4k" className="text-sm">
                        4K UHD
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hd" />
                      <label htmlFor="hd" className="text-sm">
                        HD Quality
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="no-ads" />
                      <label htmlFor="no-ads" className="text-sm">
                        No Ads
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="downloads" />
                      <label htmlFor="downloads" className="text-sm">
                        Downloads
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="multiple-profiles" />
                      <label htmlFor="multiple-profiles" className="text-sm">
                        Multiple Profiles
                      </label>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Link href="/" className="lg:hidden">
            <Package className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search streaming services..."
                className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
              />
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-1 lg:hidden">
            <Filter className="h-3.5 w-3.5" />
            <span>Filters</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full border w-8 h-8" aria-label="Toggle user menu">
            <img
              src="/placeholder.svg?height=32&width=32"
              width="32"
              height="32"
              className="rounded-full"
              alt="Avatar"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Marketplace</h1>
              <p className="text-muted-foreground">Browse and find streaming accounts to split</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="duration">Longest Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {streamingServices.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <Image src={service.image || "/placeholder.svg"} alt={service.name} className="object-cover" fill />
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-white/90 text-black hover:bg-white/80">{service.category}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-xl font-bold text-white">{service.name}</h3>
                    <div className="flex items-center gap-1 text-white/90">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{service.rating}</span>
                      <span className="text-xs text-white/70">({service.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-bold">${service.price.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground">/ month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">{service.duration} available</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="bg-slate-100 dark:bg-slate-800">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button className="w-full">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 py-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              4
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              5
            </Button>
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}

const streamingServices = [
  {
    id: 1,
    name: "Netflix Premium",
    category: "Movies & TV",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.9,
    reviews: 128,
    price: 17.99,
    duration: "6 months",
    description: "Share a Netflix Premium account with 4K UHD and multiple profiles.",
    features: ["4K UHD", "Multiple Profiles", "No Ads", "Downloads"],
  },
  {
    id: 2,
    name: "Disney+ Bundle",
    category: "Family",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.7,
    reviews: 94,
    price: 13.99,
    duration: "12 months",
    description: "Disney+ bundle with Hulu and ESPN+ for all your entertainment needs.",
    features: ["Disney+", "Hulu", "ESPN+", "Family Friendly"],
  },
  {
    id: 3,
    name: "HBO Max",
    category: "Premium",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    reviews: 76,
    price: 15.99,
    duration: "3 months",
    description: "Access to HBO Max with all premium content and new releases.",
    features: ["New Releases", "Exclusive Content", "4K UHD", "No Ads"],
  },
  {
    id: 4,
    name: "Spotify Family",
    category: "Music",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.6,
    reviews: 112,
    price: 14.99,
    duration: "9 months",
    description: "Spotify Family plan with up to 6 accounts and premium features.",
    features: ["6 Accounts", "Ad-Free", "Offline Listening", "High Quality"],
  },
  {
    id: 5,
    name: "Amazon Prime",
    category: "All-in-One",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.5,
    reviews: 89,
    price: 12.99,
    duration: "12 months",
    description: "Full Amazon Prime membership with Video, Music, and shipping benefits.",
    features: ["Prime Video", "Prime Music", "Free Shipping", "Prime Reading"],
  },
  {
    id: 6,
    name: "YouTube Premium",
    category: "Video",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.4,
    reviews: 67,
    price: 11.99,
    duration: "6 months",
    description: "Ad-free YouTube experience with background play and downloads.",
    features: ["Ad-Free", "Background Play", "Downloads", "YouTube Music"],
  },
  {
    id: 7,
    name: "Apple TV+",
    category: "Premium",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.3,
    reviews: 58,
    price: 9.99,
    duration: "12 months",
    description: "Apple's streaming service with original shows and movies.",
    features: ["Original Content", "4K HDR", "Family Sharing", "No Ads"],
  },
  {
    id: 8,
    name: "Paramount+",
    category: "Movies & TV",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.2,
    reviews: 45,
    price: 10.99,
    duration: "6 months",
    description: "Stream Paramount content including CBS, MTV, and more.",
    features: ["Live TV", "Sports", "Movies", "Original Series"],
  },
]
