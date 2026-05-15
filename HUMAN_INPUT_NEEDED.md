# HUMAN INPUT NEEDED

The app runs locally without external credentials using:

- SQLite via `DATABASE_URL="file:./dev.db"`
- Email/password auth fallback
- Guarded Stripe routes that return a clear configuration error
- Guarded daily digest route that skips when Resend is unavailable

Provide the following only when you want the full production integrations enabled.

## 1. Core production config

- `NEXT_PUBLIC_APP_URL`
  Use your real public origin, for example `https://followups.example.com`.
- `AUTH_SECRET`
  Generate with `openssl rand -base64 32`.

## 2. Google OAuth

Required to match the PRD’s Google OAuth auth path.

- Create a Google OAuth client in Google Cloud.
- Add the authorized redirect URI:
  `https://your-domain.com/api/auth/callback/google`
- Set:
  - `AUTH_GOOGLE_ID`
  - `AUTH_GOOGLE_SECRET`

Without these, the app continues to work with local email/password auth.

## 3. Stripe billing

Required for real paid upgrades and customer portal access.

- Create Stripe products/prices for:
  - monthly plan
  - yearly plan
- Set:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_PRICE_MONTHLY`
  - `STRIPE_PRICE_YEARLY`
- Point Stripe webhooks to:
  `https://your-domain.com/api/webhooks/stripe`

Without these, billing pages still render and upgrade actions fail gracefully with `503 Stripe is not configured.`

## 4. Resend email

Required for real daily digest delivery.

- Set:
  - `RESEND_API_KEY`
  - `EMAIL_FROM`

Without these, the cron endpoint returns success with `skipped: true`.

## 5. Cron protection and scheduler

Recommended for production digest runs.

- Set `CRON_SECRET`
- Configure your scheduler to `POST`:
  `https://your-domain.com/api/cron/daily-digest`
- Send header:
  `Authorization: Bearer <CRON_SECRET>`
