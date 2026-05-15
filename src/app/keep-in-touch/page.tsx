import type { Metadata } from "next"
import { LandingPage } from "@/components/marketing/landing-page"

export const metadata: Metadata = {
  title: "Keep in Touch App for Relationship Reminders | FollowUp Tracker",
  description:
    "A keep in touch app that helps you remember networking follow-ups, check-ins, and relationship reminders without losing context.",
}

export default function KeepInTouchPage() {
  return (
    <LandingPage
      eyebrow="Keep in touch app"
      title="Stay in touch with the right people at the right time"
      description="Use relationship reminders that stay connected to real contact history, not scattered notes and generic tasks."
      keyword="keep in touch app"
      heroTone="from-teal-50 via-white to-slate-50"
      painsTitle="Why keeping in touch is harder than it sounds"
      pains={[
        "You remember people when it is too late, not when a timely check-in would help.",
        "Networking reminders live in task apps with no context from the last conversation.",
        "You lose momentum with referrals, collaborators, and warm leads because there is no single system.",
      ]}
      solutionsTitle="A relationship reminder system with context"
      solutions={[
        "Store each contact with notes, relationship type, and a follow-up cadence.",
        "Review recent activity and upcoming check-ins from one dashboard.",
        "Use reminder notes to remember why this follow-up matters before you reach out.",
      ]}
      sectionTitle="How to use it as a keep-in-touch system"
      sectionItems={[
        {
          title: "Group by relationship type",
          description:
            "Separate clients, network contacts, collaborators, candidates, and personal relationships without needing multiple tools.",
        },
        {
          title: "Track the last interaction",
          description:
            "Log calls, notes, and emails so every future check-in starts with the right context.",
        },
        {
          title: "Schedule meaningful nudges",
          description:
            "Create reminder notes like 'check in after conference season' or 'ask about Q3 hiring plans'.",
        },
      ]}
      ctaTitle="Make staying in touch systematic"
      ctaBody="FollowUp Tracker gives you enough structure to stay consistent without turning relationship management into admin work."
      ctaLabel="Track relationships for free"
    />
  )
}
