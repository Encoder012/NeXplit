import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = {
    general: [
      {
        question: "What is SplitStream?",
        answer:
          "SplitStream is a secure platform that allows users to share their streaming subscriptions using blockchain technology. Our platform encrypts account credentials, creates smart contracts for sharing agreements, and handles payments through escrow to ensure a safe and fair experience for everyone.",
      },
      {
        question: "How does SplitStream work?",
        answer:
          "Account owners list their streaming services with available time slots. Buyers browse listings and select the service and time period they want. Once a match is made, the buyer's payment is held in escrow, and the account credentials are securely shared. Payments are released to the seller at predefined milestones throughout the sharing period.",
      },
      {
        question: "Is SplitStream legal?",
        answer:
          "SplitStream operates within the terms of service for most streaming platforms, which typically allow account sharing within certain limits. We encourage all users to review the terms of service for their specific streaming platforms. Our platform is designed to facilitate legitimate account sharing, not circumvent subscription fees.",
      },
      {
        question: "Which streaming services can I share on SplitStream?",
        answer:
          "SplitStream supports all major streaming services including Netflix, Disney+, HBO Max, Spotify, Amazon Prime, YouTube Premium, Apple TV+, and many more. If you have a subscription service you'd like to share that isn't listed, you can still create a custom listing.",
      },
    ],
    security: [
      {
        question: "How does SplitStream keep my account credentials secure?",
        answer:
          "We use Mysten Labs SEAL encryption technology to encrypt your credentials. This means your login details are never stored in plain text and can only be decrypted by authorized users during the agreed sharing period. Additionally, all transactions are secured on the Sui blockchain.",
      },
      {
        question: "Can the buyer change my password or account details?",
        answer:
          "No. Our platform implements access controls that prevent buyers from changing account passwords, email addresses, or other critical account details. You can also set specific restrictions on what the buyer can access within your account.",
      },
      {
        question: "What happens if someone misuses my account?",
        answer:
          "If a buyer misuses your account, you can immediately revoke access through our platform. We also have a dispute resolution system where our team will investigate any reported misuse. Buyers who violate our terms of service are removed from the platform and may forfeit their escrowed payments.",
      },
      {
        question: "How does the blockchain aspect improve security?",
        answer:
          "The blockchain provides an immutable record of all sharing agreements and transactions. This creates transparency and accountability for all parties. Smart contracts automatically enforce the terms of the agreement, including payment schedules and access periods, without requiring trust between parties.",
      },
    ],
    payments: [
      {
        question: "How do payments work on SplitStream?",
        answer:
          "When a buyer agrees to share your account, they pay the full amount upfront. This payment is held in escrow and released to you in installments at predefined milestones throughout the sharing period. This ensures that you get paid even if the buyer stops using your account.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept all major credit cards, PayPal, and various cryptocurrencies including Bitcoin, Ethereum, and Sui. All payments are processed securely through our platform.",
      },
      {
        question: "Are there any fees for using SplitStream?",
        answer:
          "Yes, SplitStream charges a small transaction fee on successful sharing agreements. The fee varies based on your subscription plan: Basic (3%), Pro (1.5%), or Business (0.5%). There are no fees for listing your account or browsing available listings.",
      },
      {
        question: "What happens if a buyer requests a refund?",
        answer:
          "Refunds are handled through our dispute resolution system. If a legitimate issue arises (such as the account being inaccessible), we'll investigate and may issue a partial or full refund from the escrowed funds. For the seller's protection, refunds are only issued for valid reasons according to our terms of service.",
      },
    ],
    technical: [
      {
        question: "Do I need technical knowledge to use SplitStream?",
        answer:
          "No, SplitStream is designed to be user-friendly for everyone. Our platform handles all the complex blockchain and encryption technology behind the scenes. You just need to create an account, list your streaming service or browse available listings, and follow the simple steps to complete a sharing agreement.",
      },
      {
        question: "Do I need a crypto wallet to use SplitStream?",
        answer:
          "While having a crypto wallet enhances your experience and allows for more payment options, it's not required. You can use SplitStream with traditional payment methods like credit cards and PayPal. If you want to use cryptocurrency, we support various wallets including MetaMask, Phantom, and Sui Wallet.",
      },
      {
        question: "How do I connect my streaming account to SplitStream?",
        answer:
          "You don't need to directly connect your streaming account to SplitStream. Instead, you securely enter your credentials when creating a listing, and our platform encrypts this information. The encrypted credentials are only shared with authorized buyers during the agreed sharing period.",
      },
      {
        question: "Is SplitStream available on mobile devices?",
        answer:
          "Yes, SplitStream is fully responsive and works on all devices including smartphones and tablets. We also offer native mobile apps for iOS and Android for an enhanced mobile experience.",
      },
    ],
  }

  return (
    <main className="flex-1">
      <section className="py-20 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <Badge className="mb-4 inline-block bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Support Center
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about SplitStream's platform and services
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="border-gradient p-4 bg-card rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <nav className="space-y-2">
                    <a
                      href="#general"
                      className="block px-3 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      General
                    </a>
                    <a
                      href="#security"
                      className="block px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary transition-colors"
                    >
                      Security
                    </a>
                    <a
                      href="#payments"
                      className="block px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary transition-colors"
                    >
                      Payments
                    </a>
                    <a
                      href="#technical"
                      className="block px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary transition-colors"
                    >
                      Technical
                    </a>
                  </nav>
                </div>
                <div className="border-gradient p-4 bg-card rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Need more help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Can't find the answer you're looking for? Contact our support team for assistance.
                  </p>
                  <Button className="w-full" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-12">
              <section id="general">
                <h2 className="text-2xl font-bold mb-6">General Questions</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.general.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`general-${index}`}
                      className="border-gradient bg-card rounded-xl overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 transition-colors text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              <section id="security">
                <h2 className="text-2xl font-bold mb-6">Security</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.security.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`security-${index}`}
                      className="border-gradient bg-card rounded-xl overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 transition-colors text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              <section id="payments">
                <h2 className="text-2xl font-bold mb-6">Payments</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.payments.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`payments-${index}`}
                      className="border-gradient bg-card rounded-xl overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 transition-colors text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              <section id="technical">
                <h2 className="text-2xl font-bold mb-6">Technical</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.technical.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`technical-${index}`}
                      className="border-gradient bg-card rounded-xl overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 transition-colors text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>
          </div>

          <div
            className="mt-20 border-gradient p-8 bg-card rounded-xl shadow-blue animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Our support team is available 24/7 to help you with any questions or issues you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Contact Support
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/documentation">View Documentation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
