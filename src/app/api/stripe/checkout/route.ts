import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 503 }
    )
  }

  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { plan } = await req.json()
    const { Stripe } = await import("stripe")
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
    })

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

    const priceId =
      plan === "yearly"
        ? process.env.STRIPE_PRICE_YEARLY
        : process.env.STRIPE_PRICE_MONTHLY

    if (!priceId) {
      return NextResponse.json(
        { error: "Price not configured." },
        { status: 503 }
      )
    }

    // Get or create stripe customer
    let sub = await db.subscription.findUnique({
      where: { userId: session.user.id },
    })

    let customerId = sub?.stripeCustomerId

    if (!customerId) {
      const user = await db.user.findUnique({ where: { id: session.user.id } })
      const customer = await stripe.customers.create({
        email: user?.email ?? undefined,
        name: user?.name ?? undefined,
        metadata: { userId: session.user.id },
      })
      customerId = customer.id

      if (!sub) {
        await db.subscription.create({
          data: { userId: session.user.id, stripeCustomerId: customerId },
        })
      } else {
        await db.subscription.update({
          where: { userId: session.user.id },
          data: { stripeCustomerId: customerId },
        })
      }
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/app/billing?success=1`,
      cancel_url: `${appUrl}/app/billing?canceled=1`,
      metadata: { userId: session.user.id },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("[stripe/checkout]", error)
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    )
  }
}
