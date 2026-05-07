import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing - FollowUp Tracker",
  description:
    "Simple, transparent pricing. Free for up to 50 contacts. Pro at $12/month for unlimited everything.",
}

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started tracking follow-ups at no cost.",
    features: [
      { text: "Up to 50 contacts", included: true },
      { text: "Up to 100 interactions", included: true },
      { text: "Daily digest reminders", included: true },
      { text: "Dashboard views", included: true },
      { text: "Interaction timeline", included: true },
      { text: "Unlimited contacts", included: false },
      { text: "Waiting-for-reply view", included: false },
      { text: "CSV export", included: false },
    ],
    cta: "Get started free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    yearlyPrice: "$96/year (save 33%)",
    description: "For active outreach — unlimited contacts and interactions.",
    features: [
      { text: "Unlimited contacts", included: true },
      { text: "Unlimited interactions", included: true },
      { text: "Daily digest reminders", included: true },
      { text: "Dashboard views", included: true },
      { text: "Interaction timeline", included: true },
      { text: "Waiting-for-reply view", included: true },
      { text: "CSV export", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Start Pro free trial",
    href: "/signup",
    highlight: true,
  },
]

const faqs = [
  {
    q: "What happens when I hit the free tier limit?",
    a: "You can still access all your existing contacts and interactions. You just won't be able to add new ones until you upgrade or archive some contacts.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel your Pro subscription at any time from your billing settings. You'll retain access until the end of your billing period.",
  },
  {
    q: "Is there an annual plan?",
    a: "Yes. You can subscribe annually for $96/year, which saves you 2 months compared to monthly billing.",
  },
  {
    q: "Do I need a credit card for the free plan?",
    a: "No. The free plan requires no credit card. Just sign up with your email and password.",
  },
  {
    q: "What does CSV export include?",
    a: "The CSV export includes all your contacts with their status, relationship type, last interaction date, and next follow-up date.",
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Simple, honest pricing</h1>
          <p className="text-xl text-muted-foreground">
            Start free. Upgrade when you need more.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.highlight ? "border-primary border-2" : ""}
              >
                <CardHeader>
                  {plan.highlight && (
                    <Badge className="w-fit mb-2">Most Popular</Badge>
                  )}
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">
                      /{plan.period}
                    </span>
                  </div>
                  {plan.yearlyPrice && (
                    <p className="text-sm text-muted-foreground">
                      or {plan.yearlyPrice}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-2 text-sm">
                        {f.included ? (
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span
                          className={
                            f.included ? "" : "text-muted-foreground"
                          }
                        >
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href} className="block">
                    <Button
                      className="w-full"
                      variant={plan.highlight ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
