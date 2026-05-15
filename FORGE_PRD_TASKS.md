# FORGE PRD Tasks

Status legend: `[x]` complete, `[-]` partially complete, `[ ]` not complete

This checklist is ordered by implementation dependency: foundation -> data/auth -> core workflows -> secondary workflows -> marketing/pages -> deployment -> QA.

## 1. Foundation

- [x] Read `PRD.md` end-to-end
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end
- [x] Read relevant installed Next.js guidance and CLI/docs surface for the current runtime version
  Note: the repo instruction referenced `node_modules/next/dist/docs/`, but `next@15.5.18` in this workspace does not ship that directory. Validation was done against the installed package surface plus real build/runtime behavior.
- [x] Review the existing repository, modified worktree, and current feature coverage
- [x] Confirm `next.config.ts` uses `output: "standalone"`
- [x] Confirm build-safe behavior: no `next/font/google`, no module-scope third-party SDK init, no build-time network dependency

## 2. Data Model

- [x] Validate Prisma schema for `User`
- [x] Validate Prisma schema for `Subscription`
- [x] Validate Prisma schema for `Contact`
- [x] Validate Prisma schema for `Interaction`
- [x] Confirm soft archive support on contacts
- [x] Confirm follow-up date and reminder note fields
- [x] Confirm indexes for `userId`, `nextFollowUpAt`, `status`, and `archivedAt`
- [x] Confirm local database bootstrap path works for build/dev

## 3. Auth

- [x] Protected app routes redirect unauthenticated users
- [x] Credentials-based local fallback auth works without external credentials
- [x] Google OAuth path exists and is only shown when env is configured
- [x] OAuth and credentials sessions resolve to a persisted local `User` row for protected app data ownership
- [x] Verify end-to-end signup/signin/signout flows in the running app
- [x] Re-check PRD auth copy and polish on auth pages after runtime testing

## 4. Core App Shell

- [x] Public site layout exists
- [x] Protected `/app` layout exists
- [x] Navbar/sidebar/footer navigation exists
- [x] Responsive shell styling is present
- [x] Visually review shell polish in the running dev server

## 5. Dashboard

- [x] Due today section
- [x] Overdue section
- [x] Upcoming this week section
- [x] Recently active section
- [x] Quick-add entry point from dashboard
- [x] Quick interaction entry point from dashboard
- [x] Verify dashboard counts, ordering, empty states, and interaction shortcuts in-browser

## 6. Contact Management

- [x] Create contact flow
- [x] Edit contact flow
- [x] Archive contact flow
- [x] Delete contact path
- [x] Contact fields: name, email, company, title, notes, relationship type, status
- [x] Dedicated new contact page
- [x] Quick-add contact modal/form
- [x] Contacts index page
- [x] Search by name/email/company
- [x] Filter by status
- [x] Filter by relationship type
- [x] Filter by due state
- [x] Verify create/edit/archive/delete/search/filter behavior in the running app

## 7. Contact Detail and Timeline

- [x] Contact detail route `/app/contacts/[id]`
- [x] Chronological interaction timeline
- [x] Edit contact tab/form
- [x] Reminder date display
- [x] Reminder note display
- [x] Add interaction from contact page
- [x] Interaction dialog labels are bound to controls for keyboard, screen-reader, and automated form usage
- [x] Verify timeline clarity, sorting, and edit/add flows in-browser

## 8. Interaction Log

- [x] Manual interaction creation
- [x] Interaction types: email sent, reply received, call, meeting, note
- [x] Direction tracking: outbound, inbound, none
- [x] Timestamp support
- [x] Interaction deletion
- [x] Free-tier interaction gating
- [x] Verify interaction add/delete flows and waiting-state side effects in-browser

## 9. Follow-Up Reminders

- [x] Next follow-up date per contact
- [x] Optional reminder note per contact
- [x] Reminder data surfaces in dashboard and contact detail
- [x] Verify reminder editing, due grouping, and overdue behavior with live data

## 10. No-Reply / Waiting Workflow

- [x] Outbound interaction can move contact into waiting state
- [x] Inbound interaction can move waiting contact back to active
- [x] Waiting-for-reply page exists
- [x] Pro gating exists for waiting view
- [x] Verify waiting logic matches latest interaction semantics with live test data

## 11. Billing / Subscription Gating

- [x] Free-tier contact limit
- [x] Free-tier interaction limit
- [x] Billing page
- [x] Stripe checkout route
- [x] Stripe billing portal route
- [x] Stripe webhook route
- [x] Safe fallback behavior without Stripe credentials
- [x] Pro-gated waiting view
- [x] Pro-gated CSV export
- [x] Verify billing UI and fallback responses in the running app

## 12. Settings

- [x] Profile settings
- [x] Email digest toggle
- [x] Time zone setting
- [x] Settings form labels are bound to controls
- [x] Billing access path from app navigation/settings flow
- [x] Verify settings save flow in-browser

## 13. Email / Cron / External Integration Fallbacks

- [x] Daily digest route exists
- [x] Resend client is lazy-initialized inside the handler
- [x] Digest route safely skips when Resend credentials are unavailable
- [x] Stripe routes safely fail with explicit configuration errors when secrets are unavailable
- [x] Confirm cron/deployment instructions are documented clearly

## 14. Export / Storage

- [x] CSV export route exists
- [x] CSV includes key contact/reminder fields
- [x] CSV escaping handles quotes in every exported field
- [x] Local SQLite/libSQL-compatible storage path exists
- [x] Verify CSV export response and escaping

## 15. Marketing / SEO Pages

- [x] Homepage
- [x] Pricing page
- [x] `/freelancers`
- [x] `/recruiters`
- [x] `/job-seekers`
- [x] `/personal-crm`
- [x] `/keep-in-touch`
- [x] `/compare/clay-alternative`
- [x] `/compare/dex-alternative`
- [x] `/compare/notion-follow-up-tracker`
- [x] Blog index and required blog posts
- [x] Robots metadata route
- [x] Sitemap metadata route
- [x] Re-check page-level metadata, internal links, and visual polish across public pages

## 16. Deployment

- [x] Production Dockerfile exists
- [x] Dockerfile uses standalone Next output
- [x] Dockerfile avoids copying missing directories only when they exist
- [x] Runtime DB bootstrap path exists
- [ ] Verify `docker build .` if Docker is available
- [x] Re-check runtime container assumptions against current repo contents

## 17. Verification / QA

- [x] Run `npm run build`
- [x] Fix all build/runtime/type issues until build passes
- [x] Start the dev server
- [x] Smoke-test primary public and protected routes
- [x] Test interactive flows: auth, contacts, reminders, interactions, filters, settings, billing/export fallbacks
- [x] Visually review each implemented page/component and polish any weak UI

## 18. Completion Artifacts

- [x] Update this checklist after each major phase
- [x] Refresh `HUMAN_INPUT_NEEDED.md` for real credential requirements only
- [x] Create or refresh `FORGE_COMPLETION_AUDIT.md` mapping each major PRD requirement to implementation
- [x] Only declare `FORGE_BUILD_COMPLETE` after build passes, dev server runs, primary routes are smoke-tested, and the app is production-ready

## Final verification notes

- `npm install` completed successfully and restored the missing local dependency tree.
- `npm run lint` passes after the final auth/export/accessibility fixes.
- `npm run build` passes on `next@15.5.18` after the final fixes.
- `npm run dev -- --hostname 127.0.0.1 --port 3001` starts successfully in this environment; port 3000 was already occupied.
- Public routes smoke-tested: `/`, `/pricing`, `/signin`, `robots.txt`, and `sitemap.xml`.
- Auth smoke-tested with a real local registration plus credentials sign-in flow for `smoke-1778845689@example.com`.
- Protected routes smoke-tested with an authenticated cookie-backed session: `/app`, `/app/contacts`, `/app/contacts/[id]`, `/app/settings`, and `/app/waiting`.
- Data-backed UI smoke-tested with seeded overdue, due-today, and upcoming contacts plus interaction history.
- Browser screenshots captured and reviewed for `/`, `/pricing`, `/signin`, `/app`, `/app/contacts`, `/app/contacts/[id]`, and `/app/settings`.
- Browser-driven interaction QA completed with Playwright: credentials sign-in, quick-add contact creation, contact detail navigation, interaction logging, settings save, billing page, and waiting-page upgrade state.
- Fallback API behavior verified:
  `GET /api/export/contacts` returns `403` for free users,
  `POST /api/stripe/checkout` returns `503` when Stripe is not configured,
  `POST /api/cron/daily-digest` returns `{ "ok": true, "skipped": true }` without Resend.
- `docker build .` was attempted, but this environment cannot access `/var/run/docker.sock`, so container build execution could not be completed here.
