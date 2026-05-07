# Human Input Needed

The app runs fully without any of these credentials. External services degrade gracefully.

---

## 1. Stripe (for payments)

The billing UI renders, but checkout and portal buttons return an error if Stripe is not configured.

**What you need:**
1. Create a [Stripe account](https://stripe.com)
2. Create two products/prices in Stripe Dashboard:
   - Pro Monthly: $12/month recurring
   - Pro Yearly: $96/year recurring
3. Set up a webhook endpoint pointing to `https://yourdomain.com/api/webhooks/stripe`
   - Subscribe to events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

**Environment variables to set:**
```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_MONTHLY=price_...    # monthly price ID
STRIPE_PRICE_YEARLY=price_...     # yearly price ID
```

---

## 2. Resend (for daily digest emails)

The daily digest cron job skips silently if `RESEND_API_KEY` is not set.

**What you need:**
1. Create a [Resend account](https://resend.com)
2. Verify your sending domain
3. Create an API key

**Environment variables to set:**
```bash
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com    # must be verified in Resend
```

**Cron setup:**
Hit `POST /api/cron/daily-digest` daily (e.g., 8am UTC) with:
```
Authorization: Bearer YOUR_CRON_SECRET
```

Set `CRON_SECRET` to any random string to protect the endpoint.

---

## 3. App URL

Set this to your deployed domain for correct redirect URLs in Stripe and email links:

```bash
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## 4. Auth Secret (production)

A default secret is baked into the Docker image for zero-config startup. **Override it in production** to keep sessions secure:

```bash
AUTH_SECRET=$(openssl rand -base64 32)
```

---

## Summary: Minimum viable production setup

```bash
# Required for auth security (override default)
AUTH_SECRET=<openssl rand -base64 32>

# Required for billing
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_YEARLY=price_...

# Required for email digest
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com
CRON_SECRET=<random string>

# Required for correct URLs
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Database (default is /data/app.db in Docker — SQLite, no external service needed)
# DATABASE_URL=file:/data/app.db
```
