"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import type { WalletType } from "@/components/wallet-provider"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  walletAddress?: string
  walletType?: WalletType
  walletConnected: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUserWallet: (address: string, type: WalletType) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem("nexplit-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to restore user session:", error)
        localStorage.removeItem("nexplit-user")
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        walletConnected: false,
      }

      setUser(mockUser)
      localStorage.setItem("nexplit-user", JSON.stringify(mockUser))

      toast({
        title: "Login successful",
        description: "Welcome back to neXplit!",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        walletConnected: false,
      }

      setUser(mockUser)
      localStorage.setItem("nexplit-user", JSON.stringify(mockUser))

      toast({
        title: "Signup successful",
        description: "Welcome to neXplit!",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Signup error:", error)
      toast({
        title: "Signup failed",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("nexplit-user")
    router.push("/")
  }

  const updateUserWallet = async (address: string, type: WalletType) => {
    if (!user) return

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedUser = {
        ...user,
        walletAddress: address,
        walletType: type,
        walletConnected: true,
      }

      setUser(updatedUser)
      localStorage.setItem("nexplit-user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Failed to update user wallet:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUserWallet }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
