# FORGE PRD Tasks

## Status: COMPLETE ✅

---

## Phase 1: Foundation ✅

- [x] Initialize Next.js 15 App Router project with TypeScript, Tailwind, ESLint
- [x] Install dependencies (Prisma, NextAuth, Stripe, Resend, Zod, etc.)
- [x] Install and configure shadcn/ui components
- [x] Set up Prisma with SQLite (via libsql adapter for Prisma 7 compatibility)
- [x] Configure `next.config.ts` with `output: "standalone"`
- [x] Set up `binaryTargets` in `prisma/schema.prisma`

## Phase 2: Data Model ✅

- [x] `User` model: id, name, email, password, image, timezone, digestEnabled
- [x] `Subscription` model: stripeCustomerId, stripeSubscriptionId, stripePriceId, stripeCurrentPeriodEnd, status
- [x] `Contact` model: name, email, company, title, notes, relationshipType, status, nextFollowUpAt, archivedAt
- [x] `Interaction` model: type, direction, summary, happenedAt
- [x] Database indexes on `(userId, nextFollowUpAt)`, `(userId, status)`, `(userId, happenedAt)`
- [x] Prisma generate and db push

## Phase 3: Auth ✅

- [x] NextAuth v5 with Credentials provider (email + password)
- [x] bcryptjs for password hashing
- [x] JWT session strategy
- [x] `src/auth.ts` with default secret fallback
- [x] `src/proxy.ts` middleware for route protection (edge-compatible, uses `getToken`)
- [x] `/api/auth/[...nextauth]` route handler
- [x] `/api/auth/register` route for user signup
- [x] Signin page (`/signin`)
- [x] Signup page (`/signup`) with `SignUpForm` component

## Phase 4: Core App Shell ✅

- [x] `src/app/app/layout.tsx` — authenticated layout with `SessionProvider`
- [x] `src/components/layout/sidebar.tsx` — nav: Dashboard, Contacts, Waiting, Settings, Billing
- [x] `src/components/layout/navbar.tsx` — public nav
- [x] `src/components/layout/footer.tsx` — public footer

## Phase 5: Contact CRUD ✅

- [x] `src/lib/actions/contacts.ts` — server actions: createContact, updateContact, archiveContact, unarchiveContact, deleteContact
- [x] `src/components/contacts/contact-form.tsx` — create/edit form with all fields
- [x] `src/components/contacts/contact-table.tsx` — table with status badges, next follow-up date, last interaction
- [x] `src/components/contacts/contact-filters.tsx` — search, status, relationship type filters
- [x] `src/components/contacts/quick-add-dialog.tsx` — quick-add modal from dashboard/contacts page
- [x] `src/components/contacts/archive-contact-button.tsx` — archive/unarchive action
- [x] `/app/contacts` — contact list with search & filters
- [x] `/app/contacts/new` — full create form page
- [x] `/app/contacts/[id]` — contact detail with tabs: Timeline + Edit

## Phase 6: Interaction Logging ✅

- [x] `src/lib/actions/interactions.ts` — createInteraction server action
- [x] `src/components/interactions/interaction-timeline.tsx` — reverse-chronological timeline
- [x] `src/components/interactions/add-interaction-dialog.tsx` — modal for contact detail page
- [x] `src/components/interactions/quick-interaction-dialog.tsx` — quick log from dashboard

## Phase 7: Dashboard ✅

- [x] `/app` — dashboard with 4 sections: Overdue, Due Today, Upcoming This Week, Recently Active
- [x] Server-side queries for each section
- [x] Stat cards (overdue count, due today, this week, total contacts)
- [x] Inline "log interaction" quick action per contact row
- [x] Quick-add contact button

## Phase 8: Waiting for Reply ✅

- [x] `/app/waiting` — Pro-gated page
- [x] Derived logic: latest outbound > latest inbound = waiting
- [x] Filter by 3+ / 7+ / 14+ days
- [x] Shows upgrade prompt for free users

## Phase 9: Billing ✅

- [x] `src/lib/billing.ts` — isPro, getUserSubscription, checkContactLimit, checkInteractionLimit
- [x] Free tier: 50 contacts, 100 interactions
- [x] `src/components/billing/upgrade-dialog.tsx` — shown when limits hit
- [x] `src/components/billing/billing-actions.tsx` — checkout/portal client component
- [x] `/app/billing` — plan display, usage bars, upgrade/manage buttons
- [x] `/api/stripe/checkout` — lazy Stripe init, creates checkout session
- [x] `/api/stripe/portal` — lazy Stripe init, creates billing portal session
- [x] `/api/webhooks/stripe` — handles subscription events, updates DB

## Phase 10: Settings ✅

- [x] `src/lib/actions/settings.ts` — updateSettings server action
- [x] `src/components/settings/settings-form.tsx` — name, timezone, digest toggle
- [x] `/app/settings` — settings page

## Phase 11: Email Digest ✅

- [x] `/api/cron/daily-digest` — POST endpoint, lazy Resend init
- [x] Protected by `CRON_SECRET` header (optional)
- [x] Sends HTML email with overdue + due-today contacts
- [x] Skips gracefully if `RESEND_API_KEY` not set

## Phase 12: CSV Export ✅

- [x] `/api/export/contacts` — Pro-only CSV download
- [x] Fields: name, email, company, title, status, relationshipType, nextFollowUpAt, last interaction, notes, createdAt

## Phase 13: Marketing Pages ✅

- [x] `/` — Homepage with hero, pain/solution, features, segments, testimonials, CTA
- [x] `/pricing` — Pricing page with free/pro plans, FAQ
- [x] `/freelancers` — Freelancer segment landing page
- [x] `/job-seekers` — Job seeker segment landing page
- [x] `/recruiters` — Recruiter segment landing page
- [x] Next.js `metadata` exports on all public pages

## Phase 14: Deployment ✅

- [x] `Dockerfile` — 3-stage build (deps → builder → runner), Prisma generate in builder, db push in CMD
- [x] `output: "standalone"` in `next.config.ts`
- [x] `.env.example` with all required variables
- [x] `HUMAN_INPUT_NEEDED.md` — documents required external credentials

## Phase 15: Quality ✅

- [x] Zod validation on all server actions
- [x] Toast notifications via `sonner`
- [x] Empty states on all lists
- [x] Loading states on forms
- [x] `npm run build` passes cleanly
- [x] Dev server starts without errors
