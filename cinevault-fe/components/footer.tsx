import Link from "next/link"
import { Split } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 gradient-bg">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:gap-16">
        <div className="flex flex-col gap-4 md:w-1/3">
          <Link href="/" className="flex items-center gap-2">
            <Split className="h-6 w-6 text-neon-purple" />
            <span className="font-bold">SplitStream</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            SplitStream is a secure platform for sharing OTT streaming accounts using blockchain technology. Split
            costs, set time limits, and manage access with complete transparency.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-neon-purple">Platform</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-neon-purple transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-neon-purple transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-neon-purple transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-neon-purple transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-neon-blue">Resources</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-neon-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-neon-blue transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-neon-blue transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-neon-blue transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-neon-pink">Legal</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-neon-pink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-neon-pink transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-neon-pink transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container border-t border-white/10 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} SplitStream. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-neon-purple transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-neon-blue transition-colors">
              GitHub
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-neon-pink transition-colors">
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
