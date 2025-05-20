// import type React from "react"
'use client'
import React from "react"



import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WalletProvider } from '@suiet/wallet-kit';

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "neXplit | Share Streaming Accounts Securely",
//   description: "Share your streaming accounts securely with blockchain technology",
//   generator: 'v0.dev'
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn("min-h-screen antialiased bg-black text-white", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <WalletProvider>
            <AuthProvider>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </div>
              <Toaster />
            </AuthProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
