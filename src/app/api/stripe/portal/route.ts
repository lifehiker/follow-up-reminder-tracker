import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function POST() {
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
    const sub = await db.subscription.findUnique({
      where: { userId: session.user.id },
    })

    if (!sub?.stripeCustomerId) {
      return NextResponse.json(
        { error: "No billing account found." },
        { status: 404 }
      )
    }

    const { Stripe } = await import("stripe")
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
    })

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sub.stripeCustomerId,
      return_url: `${appUrl}/app/billing`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error("[stripe/portal]", error)
    return NextResponse.json(
      { error: "Failed to create portal session." },
      { status: 500 }
    )
  }
}
