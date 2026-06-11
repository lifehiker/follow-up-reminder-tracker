import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Bell,
  Clock,
  Users,
  MessageSquare,
  TrendingUp,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Follow Up Tracker - Never Miss a Follow-Up | FollowUp Tracker",
  description:
    "Track contact history, set follow-up reminders, and see who needs a reply next. A lightweight follow-up tracker for freelancers, recruiters, and job seekers.",
}

const features = [
  {
    icon: Bell,
    title: "Follow-Up Reminders",
    description:
      "Set a next follow-up date for every contact. Get a daily digest of who needs attention.",
  },
  {
    icon: Clock,
    title: "No-Reply Tracking",
    description:
      "See who hasn't replied to your outbound messages. Never let a lead go cold again.",
  },
  {
    icon: Users,
    title: "Contact Management",
    description:
      "Organize contacts by relationship type, status, and custom notes. Simple and fast.",
  },
  {
    icon: MessageSquare,
    title: "Interaction Timeline",
    description:
      "Log every email, call, and meeting. See the full history for any contact at a glance.",
  },
  {
    icon: TrendingUp,
    title: "Dashboard Views",
    description:
      "See what's due today, what's overdue, and what's coming up this week — all in one place.",
  },
  {
    icon: CheckCircle,
    title: "Quick Add Workflow",
    description:
      "Add a contact and set a follow-up in seconds. No heavy CRM setup required.",
  },
]

const testimonials = [
  {
    quote:
      "I used to track client follow-ups in a spreadsheet. This is so much better. I can see exactly who needs a reply and when.",
    author: "Sarah M.",
    role: "Freelance Designer",
  },
  {
    quote:
      "As a recruiter, I'm managing dozens of candidates at once. This keeps me on top of every conversation without the CRM overhead.",
    author: "James T.",
    role: "Talent Recruiter",
  },
  {
    quote:
      "Job searching is exhausting. Having one place to track all my applications, follow-ups, and interviews saved my sanity.",
    author: "Alex R.",
    role: "Job Seeker",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Free to start • No credit card required
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Stop losing track of follow-ups.
            <br />
            <span className="text-primary">Start closing conversations.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A lightweight follow-up tracker for solo outreach. Log interactions,
            set reminders, and see exactly who needs a reply — without a bloated
            CRM.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              Get started free
            </Link>
            <Link href="/pricing" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto")}>
              See pricing
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Up to 50 contacts free. No credit card needed.
          </p>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Email stars and spreadsheets aren&apos;t a system.
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Miss follow-ups because reminders are disconnected from contact history",
                  "Search old emails to remember what happened last with a client",
                  "Full CRMs are too complex and expensive for solo outreach",
                  "Generic reminder apps don't track interaction history or status",
                ].map((pain, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    {pain}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">
                FollowUp Tracker gives you a simple system.
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "See who needs a follow-up today, all in one dashboard",
                  "Full interaction timeline for every contact — no searching",
                  "Lightweight setup: add contacts and reminders in seconds",
                  "Track who hasn't replied to your outbound messages",
                ].map((solution, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <feature.icon className="w-8 h-8 mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Built for solo outreach
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Perfect for anyone managing 30–300 relationships and follow-ups each
            month.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                segment: "Freelancers & Agency Owners",
                description:
                  "Track leads, clients, and referrals. Never let a proposal go unacknowledged.",
                href: "/freelancers",
              },
              {
                segment: "Job Seekers",
                description:
                  "Manage applications, networking contacts, and interview follow-ups in one place.",
                href: "/job-seekers",
              },
              {
                segment: "Recruiters",
                description:
                  "Stay on top of candidate outreach without losing track of who needs a nudge.",
                href: "/recruiters",
              },
            ].map((segment) => (
              <Link key={segment.segment} href={segment.href}>
                <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{segment.segment}</h3>
                    <p className="text-sm text-muted-foreground">
                      {segment.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            What users say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.author}>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-sm">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start tracking follow-ups today
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Free for up to 50 contacts. Upgrade to Pro for unlimited contacts,
            interactions, and CSV export.
          </p>
          <Link href="/signup" className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}>
            Get started free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
