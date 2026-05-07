import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Recruiter Follow Up Tracker | FollowUp Tracker",
  description:
    "Stay on top of candidate outreach without losing track of who needs a nudge. A lightweight recruiter follow up tracker.",
}

export default function RecruitersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-purple-50 text-purple-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
            For Recruiters
          </div>
          <h1 className="text-4xl font-bold mb-6">
            Track candidate outreach without the CRM overhead
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            FollowUp Tracker helps recruiters manage candidate pipelines and
            hiring manager relationships — fast, simple, and focused on
            follow-up discipline.
          </p>
          <Link href="/signup">
            <Button size="lg">Get started free</Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-semibold mb-4">
                Common recruiter frustrations
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Reached out to 50 candidates and can't remember who replied",
                  "ATS tools are too heavy for solo or contract recruiting work",
                  "Promising candidates go cold because you forgot to follow up",
                  "No easy way to track hiring manager check-ins across roles",
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
                A simpler system for solo recruiters
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Log outreach and see who's waiting for a reply in one view",
                  "Set follow-up dates for warm candidates at each stage",
                  "Lightweight — no ATS required, just a browser and 2 minutes",
                  "Separate tracking for candidates, hiring managers, and referrals",
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
            Recruiter workflow, simplified
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Candidate pipeline",
                description:
                  "Track every candidate with their status (lead, active, waiting, closed). See who needs a nudge.",
              },
              {
                title: "Hiring manager relationships",
                description:
                  "Keep hiring manager context and follow-up dates in one place, separate from candidates.",
              },
              {
                title: "No-reply visibility",
                description:
                  "See which outbound messages haven't gotten a reply. Follow up at the right time.",
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
            Keep your pipeline moving
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Free for up to 50 contacts. No ATS integration required.
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
