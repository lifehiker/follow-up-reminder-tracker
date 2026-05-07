import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Job Search Follow Up Tracker | FollowUp Tracker",
  description:
    "Track job applications, networking contacts, and interview follow-ups in one place. A lightweight follow-up tracker for job seekers.",
}

export default function JobSeekersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
            For Job Seekers
          </div>
          <h1 className="text-4xl font-bold mb-6">
            Track every application and never miss a follow-up
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            FollowUp Tracker helps job seekers stay organized across dozens of
            applications, networking contacts, and interview stages — without
            the spreadsheet chaos.
          </p>
          <Link href="/signup">
            <Button size="lg">Get started free</Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            The job search follow-up problem
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-semibold mb-4">Does this happen to you?</h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Applied to 30 jobs and lost track of where each one stands",
                  "Had a great networking call but forgot to follow up a week later",
                  "An interviewer said 'we'll be in touch' and you never heard back",
                  "Your spreadsheet has 10 tabs and still misses important details",
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
                FollowUp Tracker organizes your search
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Track every application with status, company, and next action",
                  "Log every networking conversation and set a check-in reminder",
                  "See which applications are 'waiting for reply' at a glance",
                  "Daily digest tells you exactly who to follow up with today",
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
            Your job search, organized
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Applications",
                description:
                  "Track every company you've applied to. Set a follow-up date 1–2 weeks out.",
              },
              {
                title: "Networking contacts",
                description:
                  "Log every coffee chat, LinkedIn message, and referral. Know who to reconnect with.",
              },
              {
                title: "Interview stages",
                description:
                  "Track where you are in each process. Never miss a thank-you note or check-in.",
              },
            ].map((use) => (
              <Card key={use.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{use.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {use.description}
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
            Land your next role with better follow-up discipline
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Free for up to 50 contacts. Perfect for an active job search.
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
