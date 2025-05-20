import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Shield, Split, Wallet, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-mesh py-20 md:py-32">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <Badge className="mb-4 inline-block w-fit mx-auto lg:mx-0">Secure Streaming Account Sharing</Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Share Streaming <span className="text-gradient">Subscriptions</span> Securely
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                neXplit uses blockchain technology to create secure, transparent agreements for sharing your streaming
                accounts with complete control and privacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="h-12 px-8">
                  <Link href="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-12 px-8">
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-8 mt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-secondary"
                      >
                        <Image
                          src={`/placeholder.svg?height=32&width=32&text=${i}`}
                          alt={`User ${i}`}
                          width={32}
                          height={32}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">1,000+</span> users already joined
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Encrypted credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Blockchain security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Smart contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Escrow payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Time-based access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Dispute resolution</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-card border rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Split className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Split Agreement</span>
                      </div>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        NFT #8721
                      </Badge>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Netflix Premium</h3>
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">Active</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 bg-secondary/50 rounded-lg p-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Seller</p>
                          <p className="text-sm font-medium">0x71C...9E3F</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Buyer</p>
                          <p className="text-sm font-medium">0x8A2...1D7B</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Price</p>
                          <p className="text-sm font-medium">$24.99 USD</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Duration</p>
                          <p className="text-sm font-medium">3 months</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Agreement Progress</span>
                          <span className="text-xs font-medium">53%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "53%" }}></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">First Payment</p>
                          <p className="text-sm font-medium">Jun 25, 2025</p>
                        </div>
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Final Payment</p>
                          <p className="text-sm font-medium">Aug 10, 2025</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-1.5">
                          <Shield className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium">Secured by Blockchain</span>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Escrowed
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative overflow-hidden" id="features">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Advanced <span className="text-gradient">Features</span> for Secure Sharing
            </h2>
            <p className="text-xl text-muted-foreground">
              neXplit combines cutting-edge blockchain technology with user-friendly features to make subscription
              sharing secure, fair, and transparent.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="border bg-card rounded-xl shadow-sm p-6 card-hover">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Encryption</h3>
              <p className="text-muted-foreground">
                Your credentials are encrypted using Mysten Labs SEAL and stored securely on the blockchain.
              </p>
            </div>

            <div className="border bg-card rounded-xl shadow-sm p-6 card-hover">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Split className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Splitting</h3>
              <p className="text-muted-foreground">
                Split costs fairly based on usage time with transparent pricing and automatic calculations.
              </p>
            </div>

            <div className="border bg-card rounded-xl shadow-sm p-6 card-hover">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Wallet className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Escrow Payments</h3>
              <p className="text-muted-foreground">
                Funds are held in escrow and released automatically at predefined milestones.
              </p>
            </div>

            <div className="border bg-card rounded-xl shadow-sm p-6 card-hover">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Time-Based Access</h3>
              <p className="text-muted-foreground">
                Share access for specific time intervals with automatic expiration when the period ends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-mesh relative overflow-hidden" id="how-it-works">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              How <span className="text-gradient">neXplit</span> Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Our blockchain-powered platform makes sharing streaming accounts secure, fair, and transparent.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card border rounded-xl shadow-sm p-6 card-hover">
              <div className="mb-6">
                <div className="text-5xl font-bold text-primary/20">01</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">List Your Account</h3>
              <p className="text-muted-foreground mb-4">
                Securely list your streaming account with your desired terms. Your credentials are encrypted using
                advanced technology.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Encrypted credentials</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Set your own price</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Define available time periods</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border rounded-xl shadow-sm p-6 card-hover">
              <div className="mb-6">
                <div className="text-5xl font-bold text-primary/20">02</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Buyer Selects Split</h3>
              <p className="text-muted-foreground mb-4">
                Buyers browse available accounts and select their desired time interval. Our platform calculates a fair
                price based on the subscription cost and split time.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Browse available accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Choose time interval</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Transparent pricing</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border rounded-xl shadow-sm p-6 card-hover">
              <div className="mb-6">
                <div className="text-5xl font-bold text-primary/20">03</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">NFT Creation & Payment</h3>
              <p className="text-muted-foreground mb-4">
                The buyer deposits the full split amount, which is escrowed in a Split Agreement NFT. This NFT is
                transferred to the buyer and contains all agreement details.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Secure escrow payment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">NFT contains all agreement details</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Blockchain-verified transaction</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border rounded-xl shadow-sm p-6 card-hover">
              <div className="mb-6">
                <div className="text-5xl font-bold text-primary/20">04</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Access & Payments</h3>
              <p className="text-muted-foreground mb-4">
                The buyer gains access to the encrypted credentials. Payments are automatically released to the seller
                at predefined milestones, ensuring fairness for both parties.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Secure credential access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Automatic milestone payments</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Dispute resolution system</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Ready to Start <span className="text-gradient">Sharing</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users already sharing their streaming accounts securely with neXplit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="h-12 px-8">
                <Link href="/signup">Create Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8">
                <Link href="/marketplace">Browse Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
