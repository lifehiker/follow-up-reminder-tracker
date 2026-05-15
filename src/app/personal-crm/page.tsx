import type { Metadata } from "next"
import { LandingPage } from "@/components/marketing/landing-page"

export const metadata: Metadata = {
  title: "Simple Personal CRM for Solo Operators | FollowUp Tracker",
  description:
    "A simple personal CRM for solo operators who mainly need contact history, follow-up reminders, and waiting-for-reply visibility.",
}

export default function PersonalCrmPage() {
  return (
    <LandingPage
      eyebrow="Simple personal CRM"
      title="A personal CRM that behaves like a daily follow-up system"
      description="Track contact history, next steps, and no-reply follow-ups without carrying the weight of a traditional CRM."
      keyword="simple personal CRM"
      heroTone="from-amber-50 via-white to-slate-50"
      painsTitle="Why most personal CRMs feel too broad"
      pains={[
        "You mainly need follow-up discipline, not life-event tracking or social enrichment.",
        "Heavy CRM workflows create maintenance work before they create value.",
        "Generic reminder apps lose the full conversation history behind each next step.",
      ]}
      solutionsTitle="What this personal CRM keeps focused"
      solutions={[
        "Every contact has a timeline, a current status, and a next follow-up.",
        "Outbound messages can move contacts into waiting-for-reply until they answer.",
        "The dashboard tells you who is due today, overdue, and recently active.",
      ]}
      sectionTitle="The personal CRM workflow"
      sectionItems={[
        {
          title: "Capture the contact",
          description:
            "Add a person, their company, and just enough context to remember why the relationship matters.",
        },
        {
          title: "Log the touchpoint",
          description:
            "Record the email, call, meeting, or note so the timeline stays usable weeks later.",
        },
        {
          title: "Schedule the next move",
          description:
            "Assign a follow-up date and short reminder note so the relationship does not drift.",
        },
      ]}
      ctaTitle="Keep the context. Lose the CRM sprawl."
      ctaBody="Start free and build a contact system that stays lightweight even as your outreach volume grows."
      ctaLabel="Start your free workspace"
    />
  )
}
