import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// Stripe removed current_period_end in newer API versions; use billing_cycle_anchor as fallback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPeriodEnd(subscription: any): Date {
  const ts =
    subscription.current_period_end ??
    subscription.billing_cycle_anchor ??
    Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
  return new Date(ts * 1000)
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.log("[stripe/webhook] Stripe not configured, skipping")
    return NextResponse.json({ ok: true })
  }

  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  try {
    const { Stripe } = await import("stripe")
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
    })

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const userId = session.metadata?.userId
        const subscriptionId = session.subscription as string

        if (!userId || !subscriptionId) break

        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        await db.subscription.upsert({
          where: { userId },
          create: {
            userId,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscriptionId,
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: getPeriodEnd(subscription),
            status: subscription.status,
          },
          update: {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscriptionId,
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: getPeriodEnd(subscription),
            status: subscription.status,
          },
        })
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object
        const customerId = subscription.customer as string

        const sub = await db.subscription.findFirst({
          where: { stripeCustomerId: customerId },
        })
        if (!sub) break

        await db.subscription.update({
          where: { id: sub.id },
          data: {
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: getPeriodEnd(subscription),
            status: subscription.status,
          },
        })
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object
        const customerId = subscription.customer as string

        const sub = await db.subscription.findFirst({
          where: { stripeCustomerId: customerId },
        })
        if (!sub) break

        await db.subscription.update({
          where: { id: sub.id },
          data: { status: "canceled", stripeSubscriptionId: null },
        })
        break
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[stripe/webhook]", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    )
  }
}
