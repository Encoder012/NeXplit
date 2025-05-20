import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
  return (
    <main className="flex-1">
      <section className="py-20 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <Badge className="mb-4 inline-block bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Pricing Plans
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works best for you. All plans include access to our secure blockchain-based sharing
              platform.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {/* Basic Plan */}
            <div className="border-gradient bg-card rounded-xl shadow-blue overflow-hidden transition-transform hover:translate-y-[-5px]">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-medium mb-1">Basic</h3>
                <p className="text-muted-foreground text-sm mb-4">For occasional sharers</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/signup?plan=basic">Get Started</Link>
                </Button>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Up to 3 active listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Basic encryption for credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Standard transaction fees (3%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="border-gradient bg-card rounded-xl shadow-blue-lg overflow-hidden transition-transform hover:translate-y-[-5px] relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-violet-500"></div>
              <div className="absolute -top-4 right-4">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-medium mb-1">Pro</h3>
                <p className="text-muted-foreground text-sm mb-4">For regular sharers</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-violet-500 hover:opacity-90 transition-opacity">
                  <Link href="/signup?plan=pro">Get Started</Link>
                </Button>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Up to 10 active listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Advanced encryption for credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Reduced transaction fees (1.5%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Priority email & chat support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Detailed analytics & reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Featured listings (2/month)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Custom sharing schedules</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Business Plan */}
            <div className="border-gradient bg-card rounded-xl shadow-blue overflow-hidden transition-transform hover:translate-y-[-5px]">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-medium mb-1">Business</h3>
                <p className="text-muted-foreground text-sm mb-4">For power users & teams</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/signup?plan=business">Get Started</Link>
                </Button>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Unlimited active listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Military-grade encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Minimal transaction fees (0.5%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>24/7 priority support with dedicated manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Advanced analytics & API access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Featured listings (unlimited)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Team accounts & permissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>White-label options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We offer tailored enterprise solutions for businesses with specific requirements. Contact our sales team
              to discuss your needs.
            </p>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our pricing and plans
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="border-gradient p-6 bg-card rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Can I change plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your
                next billing cycle.
              </p>
            </div>
            <div className="border-gradient p-6 bg-card rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Are there any hidden fees?</h3>
              <p className="text-muted-foreground">
                No, our pricing is completely transparent. The only additional costs are the transaction fees mentioned
                in the plan details, which apply when you successfully share an account.
              </p>
            </div>
            <div className="border-gradient p-6 bg-card rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied with our
                service, contact our support team within 14 days of your purchase.
              </p>
            </div>
            <div className="border-gradient p-6 bg-card rounded-xl">
              <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and various cryptocurrencies including Bitcoin, Ethereum, and
                Sui.
              </p>
            </div>
            <div className="border-gradient p-6 bg-card rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                We offer a 7-day free trial for our Pro plan. No credit card required to start your trial.
              </p>
            </div>
            <div className="border-gradient p-6 bg-card rounded-xl">
              <h3 className="text-xl font-semibold mb-3">What happens if I exceed my plan limits?</h3>
              <p className="text-muted-foreground">
                If you exceed your plan's listing limits, you'll be notified and given the option to upgrade or remove
                some listings to stay within your current plan's limits.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-muted-foreground mb-6">Still have questions? Our support team is here to help.</p>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
