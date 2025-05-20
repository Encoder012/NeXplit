"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LogOut, User, Settings, Bell, Split } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
// import { useWallet } from "@/components/wallet-provider"
import {
  ConnectButton,
  useWallet,
  addressEllipsis,
} from "@suiet/wallet-kit";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { wallet, disconnectWallet } = useWallet()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false
    return pathname.startsWith(path)
  }

  const handleLogout = () => {
    // Disconnect wallet if connected
    if (wallet?.connected) {
      disconnectWallet()
    }

    // Logout user
    logout()
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Split className="h-5 w-5" />
            </div>
            <span className="hidden font-bold sm:inline-block">neXplit</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/features"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/features") ? "text-primary" : "text-muted-foreground"
                }`}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/pricing") ? "text-primary" : "text-muted-foreground"
                }`}
            >
              Pricing
            </Link>
            <Link
              href="/marketplace"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/marketplace") ? "text-primary" : "text-muted-foreground"
                }`}
            >
              Marketplace
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/notifications">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || ""} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Account Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            <Link
              href="/features"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-secondary ${isActive("/features") ? "bg-secondary text-primary" : "text-muted-foreground"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-secondary ${isActive("/pricing") ? "bg-secondary text-primary" : "text-muted-foreground"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/marketplace"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-secondary ${isActive("/marketplace") ? "bg-secondary text-primary" : "text-muted-foreground"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Marketplace
            </Link>

            {!user && (
              <>
                <div className="border-t my-2"></div>
                <div className="flex flex-col gap-2 px-4 py-2">
                  <Button variant="outline" asChild className="w-full justify-center">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      Log in
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-center">
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign up
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
