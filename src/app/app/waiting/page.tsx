import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { isPro } from "@/lib/billing"
import { format, subDays } from "date-fns"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { QuickInteractionDialog } from "@/components/interactions/quick-interaction-dialog"
import { Lock, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WaitingPageProps {
  searchParams: Promise<{ days?: string }>
}

export default async function WaitingPage({ searchParams }: WaitingPageProps) {
  const session = await auth()
  if (!session?.user?.id) redirect("/signin")

  const pro = await isPro(session.user.id)

  if (!pro) {
    return (
      <div className="max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Waiting for Reply</h1>
        <Card>
          <CardContent className="py-12 text-center">
            <Lock className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold mb-2">Pro feature</h2>
            <p className="text-muted-foreground mb-6">
              The waiting-for-reply view is available on the Pro plan. Upgrade
              to see all contacts who haven&apos;t replied to your outbound
              messages.
            </p>
            <Link href="/app/billing">
              <Button>Upgrade to Pro</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const params = await searchParams
  const daysFilter = parseInt(params.days ?? "0")
  const cutoffDate = daysFilter > 0 ? subDays(new Date(), daysFilter) : null

  // Find contacts where the latest interaction is OUTBOUND
  // and there's no INBOUND interaction after it
  const contacts = await db.contact.findMany({
    where: {
      userId: session.user.id,
      archivedAt: null,
      status: { not: "CLOSED" },
    },
    include: {
      interactions: {
        orderBy: { happenedAt: "desc" },
        take: 5,
      },
    },
  })

  const waitingContacts = contacts.filter((contact) => {
    const interactions = contact.interactions
    if (interactions.length === 0) return false

    const latestOutbound = interactions.find((i) => i.direction === "OUTBOUND")
    if (!latestOutbound) return false

    const latestInbound = interactions.find((i) => i.direction === "INBOUND")

    // If there's an inbound after the outbound, not waiting
    if (
      latestInbound &&
      new Date(latestInbound.happenedAt) > new Date(latestOutbound.happenedAt)
    ) {
      return false
    }

    // Filter by days if specified
    if (cutoffDate && new Date(latestOutbound.happenedAt) > cutoffDate) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Waiting for Reply</h1>
          <p className="text-muted-foreground text-sm">
            {waitingContacts.length} contact
            {waitingContacts.length !== 1 ? "s" : ""} haven&apos;t replied to
            your outbound messages
          </p>
        </div>
        <div className="flex gap-2">
          {[
            { label: "All", days: "0" },
            { label: "3+ days", days: "3" },
            { label: "7+ days", days: "7" },
            { label: "14+ days", days: "14" },
          ].map((f) => (
            <Link
              key={f.days}
              href={`/app/waiting?days=${f.days}`}
              className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
                (params.days ?? "0") === f.days
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white border-border hover:bg-accent"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      {waitingContacts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Clock className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              No contacts waiting for a reply.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {waitingContacts.map((contact) => {
            const latestOutbound = contact.interactions.find(
              (i) => i.direction === "OUTBOUND"
            )
            const daysSinceOutbound = latestOutbound
              ? Math.floor(
                  (Date.now() -
                    new Date(latestOutbound.happenedAt).getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              : 0

            return (
              <div
                key={contact.id}
                className="bg-white border rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/app/contacts/${contact.id}`}
                    className="font-medium hover:underline"
                  >
                    {contact.name}
                  </Link>
                  {contact.company && (
                    <p className="text-sm text-muted-foreground">
                      {contact.company}
                    </p>
                  )}
                  {latestOutbound && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Last outbound:{" "}
                      {format(
                        new Date(latestOutbound.happenedAt),
                        "MMM d, yyyy"
                      )}{" "}
                      · {latestOutbound.summary.slice(0, 60)}
                      {latestOutbound.summary.length > 60 ? "..." : ""}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <Badge
                    variant={
                      daysSinceOutbound >= 14
                        ? "destructive"
                        : daysSinceOutbound >= 7
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {daysSinceOutbound}d ago
                  </Badge>
                  <QuickInteractionDialog
                    contactId={contact.id}
                    contactName={contact.name}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
