export const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000"

export const comparePages = {
  "clay-alternative": {
    title: "Clay Alternative for Follow-Up Tracking | FollowUp Tracker",
    description:
      "A simpler Clay alternative for freelancers, recruiters, and solo operators who mainly need follow-up reminders and no-reply visibility.",
    category: "Comparison",
    pageTitle: "Why solo operators choose FollowUp Tracker over Clay",
    intro:
      "Clay is a polished personal CRM, but many solo users need a tighter workflow: who did I last contact, who has not replied, and who needs a follow-up now. FollowUp Tracker is built around that exact question.",
    sections: [
      {
        heading: "Clay is broader. FollowUp Tracker is narrower on purpose.",
        paragraphs: [
          "Clay is strong when you want a broad relationship-management system. FollowUp Tracker is for the operator who wants a daily action list tied directly to each contact timeline.",
          "That narrower scope lowers setup time and removes the pressure to maintain a heavyweight network database before the tool becomes useful.",
        ],
      },
      {
        heading: "The main workflow is due, overdue, and waiting for reply.",
        paragraphs: [
          "If you send proposals, outreach messages, candidate follow-ups, or networking notes, the next action matters more than enrichment. FollowUp Tracker keeps the dashboard centered on due dates and reply state.",
          "You can quickly log outbound and inbound touches, then see whether a conversation is waiting, active, or closed without extra CRM ceremony.",
        ],
      },
    ],
  },
  "dex-alternative": {
    title: "Dex Alternative for Follow-Up Reminders | FollowUp Tracker",
    description:
      "Compare Dex and FollowUp Tracker for lightweight outreach tracking, reminders, and no-reply workflows.",
    category: "Comparison",
    pageTitle: "A Dex alternative focused on next actions instead of network sprawl",
    intro:
      "Dex can work well for broader personal CRM use cases. FollowUp Tracker is the better fit when your main need is simple follow-up discipline across leads, candidates, clients, and networking contacts.",
    sections: [
      {
        heading: "Faster onboarding for manual outreach tracking",
        paragraphs: [
          "FollowUp Tracker keeps the contact model intentionally lean: name, company, notes, status, relationship type, interactions, and next follow-up. That means less setup and less maintenance.",
          "For solo operators managing dozens of live conversations, speed matters more than deep sync or enrichment on day one.",
        ],
      },
      {
        heading: "Built for the 'who has not replied yet?' question",
        paragraphs: [
          "The waiting-for-reply workflow makes outbound follow-up measurable. Log an outbound touch, and the contact stays visible until a reply or next action changes the state.",
          "That is especially useful for freelancers following up on proposals, recruiters chasing replies, and job seekers tracking applications.",
        ],
      },
    ],
  },
  "notion-follow-up-tracker": {
    title: "Notion Follow-Up Tracker Alternative | FollowUp Tracker",
    description:
      "Replace a brittle Notion follow-up tracker with a purpose-built outreach dashboard, timeline, and reminder workflow.",
    category: "Comparison",
    pageTitle: "When a Notion follow-up tracker starts getting in your way",
    intro:
      "Notion works until your follow-up system becomes operational. Once you need status changes, no-reply visibility, dashboard slices, and quick interaction logging, a purpose-built app is usually faster.",
    sections: [
      {
        heading: "Databases are flexible, but the workflow stays manual",
        paragraphs: [
          "In Notion, you can build tables and views, but you still spend time maintaining the system itself. FollowUp Tracker bakes the workflow into the product so you can act instead of maintain.",
          "The dashboard, waiting view, contact timeline, and daily digest already understand follow-ups without extra formulas or view setup.",
        ],
      },
      {
        heading: "A cleaner daily operating view",
        paragraphs: [
          "Instead of checking multiple filtered databases, FollowUp Tracker groups due today, overdue, upcoming, and recent activity in one place.",
          "That gives solo operators a simpler morning routine and fewer dropped conversations.",
        ],
      },
    ],
  },
} as const

export const blogPosts = {
  "best-follow-up-tracker-for-freelancers": {
    title: "Best Follow Up Tracker for Freelancers | FollowUp Tracker",
    description:
      "A practical guide to choosing a freelancer follow-up tracker that keeps proposals, leads, and client check-ins moving.",
    category: "Freelancer workflow",
    pageTitle: "What makes the best follow-up tracker for freelancers",
    intro:
      "Freelancers do not need a team CRM full of sales admin. They need a system that remembers who to follow up with, when to do it, and what happened last time.",
    sections: [
      {
        heading: "The tool should reduce memory load, not add more admin",
        paragraphs: [
          "A freelancer follow-up tracker should let you add a lead, log the last touch, and schedule the next one in less than a minute.",
          "If the tool demands too many fields before it becomes useful, you will eventually fall back to Gmail stars, drafts, or a spreadsheet.",
        ],
      },
      {
        heading: "The dashboard should answer one question quickly",
        paragraphs: [
          "At the start of the day, you should know who is overdue, who is due today, and who is waiting for a reply. That is the operational core.",
          "Everything else is secondary to helping you restart important conversations at the right moment.",
        ],
      },
    ],
  },
  "track-client-follow-ups-without-a-crm": {
    title: "How to Track Client Follow Ups Without a CRM | FollowUp Tracker",
    description:
      "Track proposals, check-ins, and no-response contacts without adopting a heavyweight CRM.",
    category: "Freelancer workflow",
    pageTitle: "How to track client follow-ups without adopting a full CRM",
    intro:
      "Most solo operators do not need pipelines, deal stages, and team permissions. They need a repeatable routine for proposals, check-ins, and dormant clients.",
    sections: [
      {
        heading: "Keep the contact record simple",
        paragraphs: [
          "Use a small number of fields: name, company, notes, relationship type, current status, and next follow-up date.",
          "That gives you enough context to act without turning the tool into a data-entry job.",
        ],
      },
      {
        heading: "Every outbound touch should create a next step",
        paragraphs: [
          "After you send a proposal or check-in, assign a follow-up date immediately. If they reply sooner, great. If not, the reminder is already there.",
          "That one rule removes most missed follow-ups.",
        ],
      },
    ],
  },
  "job-application-follow-up-tracker": {
    title: "Job Application Follow Up Tracker Guide | FollowUp Tracker",
    description:
      "A job application follow-up tracker helps you manage applications, networking contacts, and interview check-ins in one system.",
    category: "Job search",
    pageTitle: "A practical job application follow-up tracker system",
    intro:
      "Job searches create a hidden operations problem. You are not just applying; you are coordinating application dates, interview thank-yous, recruiter check-ins, and networking follow-ups.",
    sections: [
      {
        heading: "Track companies and people together",
        paragraphs: [
          "Treat each contact as a person in your process: recruiter, hiring manager, referral, or networking contact. That keeps follow-ups connected to real conversations instead of just company rows.",
          "Use notes and relationship type to clarify whether the next step is an application check-in, thank-you, or reconnect message.",
        ],
      },
      {
        heading: "Use waiting-for-reply as a decision view",
        paragraphs: [
          "After an outreach email or thank-you note, the contact belongs in a waiting view until you hear back or it is time to nudge again.",
          "This prevents the common problem of losing active applications in an overloaded spreadsheet.",
        ],
      },
    ],
  },
  "no-response-follow-up-email-system": {
    title: "How to Manage No-Response Contacts | FollowUp Tracker",
    description:
      "Build a no-response follow-up system for leads, clients, candidates, and networking outreach.",
    category: "Outreach discipline",
    pageTitle: "A simple no-response follow-up system that does not fall apart",
    intro:
      "The hardest conversations to track are the ones that go quiet. If there is no reply, your system has to remember the relationship for you.",
    sections: [
      {
        heading: "Separate no-response from general reminders",
        paragraphs: [
          "A good workflow distinguishes between a scheduled follow-up and a conversation that is explicitly waiting for a response.",
          "That extra status improves clarity because you can see who is stalled, not just who is due.",
        ],
      },
      {
        heading: "Log the outbound touch immediately",
        paragraphs: [
          "The moment you send the email, record it as outbound and attach the next follow-up date. Then the system can surface the contact automatically.",
          "Without that step, you rely on memory and inbox archaeology.",
        ],
      },
    ],
  },
  "personal-crm-vs-reminder-app": {
    title: "Personal CRM vs Reminder App | FollowUp Tracker",
    description:
      "Understand when a reminder app is too simple and when a personal CRM is too broad for follow-up-heavy work.",
    category: "Buying guide",
    pageTitle: "Personal CRM vs reminder app: what solo operators actually need",
    intro:
      "Reminder apps are great at dates, but they do not preserve relationship context. Personal CRMs keep more context, but many of them drift into lifestyle or networking management that slows down day-to-day follow-up work.",
    sections: [
      {
        heading: "Reminder apps lose the conversation history",
        paragraphs: [
          "A task saying 'follow up with Sarah' does not tell you what happened last, what you sent, or whether Sarah already replied.",
          "That missing context is why many reminder systems break down under real outreach volume.",
        ],
      },
      {
        heading: "The right middle ground is contact-centric follow-up",
        paragraphs: [
          "A lightweight follow-up tracker keeps the next step attached to the person and their interaction history.",
          "That preserves context while staying much simpler than a team CRM or broad personal networking platform.",
        ],
      },
    ],
  },
} as const
