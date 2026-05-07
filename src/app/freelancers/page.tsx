import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Follow Up Tracker for Freelancers | FollowUp Tracker",
  description:
    "Track contact history, set follow-up reminders, and see who needs a reply next. A lightweight client follow-up reminder app for freelancers.",
}

export default function FreelancersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
            For Freelancers & Agency Owners
          </div>
          <h1 className="text-4xl font-bold mb-6">
            Never miss a client follow-up again
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            FollowUp Tracker helps freelancers and agency owners stay on top of
            leads, proposals, and client check-ins — without spreadsheets or a
            bloated CRM.
          </p>
          <Link href="/signup">
            <Button size="lg">Get started free</Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            The freelancer follow-up problem
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-semibold mb-4">Sound familiar?</h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "A lead went quiet after a great discovery call — you forgot to follow up",
                  "You sent a proposal 2 weeks ago and haven't heard back, but can't find the email",
                  "You're tracking client check-ins in a Notion doc that nobody updates",
                  "You miss re-engaging a past client who might have new work",
                ].map((pain, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">✗</span>
                    {pain}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">
                FollowUp Tracker fixes this
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Set a follow-up reminder right when you send a proposal",
                  "See exactly who hasn't replied to your outbound messages",
                  "Get a daily email digest of who needs attention today",
                  "Full interaction timeline for every lead and client",
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

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            How freelancers use FollowUp Tracker
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Add a lead",
                description:
                  "After a discovery call or email intro, add them as a contact with their company and relationship type.",
              },
              {
                step: "2",
                title: "Log the interaction",
                description:
                  "Mark it as an outbound email or call. Set a follow-up date for one week out.",
              },
              {
                step: "3",
                title: "Get reminded",
                description:
                  "When the follow-up date arrives, you'll see them on your dashboard and get a daily digest email.",
              },
            ].map((step) => (
              <Card key={step.step}>
                <CardContent className="p-6">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stop losing deals to forgotten follow-ups
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Free for up to 50 contacts. Set up in minutes.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary">
              Start tracking for free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
