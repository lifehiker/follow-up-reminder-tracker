import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { isPro, getUserSubscription, checkContactLimit, checkInteractionLimit } from "@/lib/billing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BillingActions } from "@/components/billing/billing-actions"
import { CheckCircle, XCircle } from "lucide-react"

export default async function BillingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/signin")

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) {
    // User record missing (stale JWT after DB reset) — avoid redirect() during streaming
    // which leaves the page body empty on mobile. Show a sign-in prompt instead.
    return (
      <div className="max-w-lg space-y-6">
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Your session has expired.{" "}
          <a href="/signin" className="underline text-primary">
            Sign in again
          </a>{" "}
          to continue.
        </p>
      </div>
    )
  }

  const [pro, sub, contactLimit, interactionLimit] = await Promise.all([
    isPro(session.user.id),
    getUserSubscription(session.user.id),
    checkContactLimit(session.user.id),
    checkInteractionLimit(session.user.id),
  ])

  const proFeatures = [
    { text: "Unlimited contacts", included: true },
    { text: "Unlimited interactions", included: true },
    { text: "Waiting-for-reply view", included: true },
    { text: "CSV export", included: true },
    { text: "Priority support", included: true },
  ]

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Billing</h1>

      {/* Current plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            Current plan
            <Badge variant={pro ? "default" : "secondary"}>
              {pro ? "Pro" : "Free"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!pro && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Usage on free plan:
              </p>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Contacts</span>
                  <span
                    className={
                      !contactLimit.allowed ? "text-destructive font-medium" : ""
                    }
                  >
                    {contactLimit.count} / 50
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      !contactLimit.allowed ? "bg-destructive" : "bg-primary"
                    }`}
                    style={{
                      width: `${Math.min((contactLimit.count / 50) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Interactions</span>
                  <span
                    className={
                      !interactionLimit.allowed
                        ? "text-destructive font-medium"
                        : ""
                    }
                  >
                    {interactionLimit.count} / 100
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      !interactionLimit.allowed
                        ? "bg-destructive"
                        : "bg-primary"
                    }`}
                    style={{
                      width: `${Math.min(
                        (interactionLimit.count / 100) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {pro && sub?.stripeCurrentPeriodEnd && (
            <p className="text-sm text-muted-foreground">
              Renews on{" "}
              {new Date(sub.stripeCurrentPeriodEnd).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </p>
          )}

          <BillingActions isPro={pro} hasSubscription={!!sub?.stripeSubscriptionId} />
        </CardContent>
      </Card>

      {/* Pro features */}
      {!pro && (
        <Card>
          <CardHeader>
            <CardTitle>Upgrade to Pro — $12/month</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {proFeatures.map((f) => (
                <li key={f.text} className="flex items-center gap-2 text-sm">
                  {f.included ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-muted-foreground" />
                  )}
                  {f.text}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              Also available: $96/year (save 33%)
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
