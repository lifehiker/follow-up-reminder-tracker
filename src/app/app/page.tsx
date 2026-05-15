import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { format, startOfDay, endOfDay, addDays, subDays } from "date-fns"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickAddDialog } from "@/components/contacts/quick-add-dialog"
import { QuickInteractionDialog } from "@/components/interactions/quick-interaction-dialog"
import { AlertTriangle, Clock, Calendar, Activity } from "lucide-react"

function statusBadge(status: string) {
  const map: Record<string, string> = {
    LEAD: "secondary",
    ACTIVE: "default",
    WAITING: "outline",
    CLOSED: "secondary",
    ARCHIVED: "secondary",
  }
  return (map[status] ?? "secondary") as
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/signin")

  const userId = session.user.id
  const now = new Date()
  const todayStart = startOfDay(now)
  const todayEnd = endOfDay(now)
  const weekEnd = addDays(now, 7)
  const recentCutoff = subDays(now, 7)

  const [overdue, dueToday, upcoming, recentlyActive, totalContacts] =
    await Promise.all([
      db.contact.findMany({
        where: {
          userId,
          archivedAt: null,
          nextFollowUpAt: { lt: todayStart },
        },
        orderBy: { nextFollowUpAt: "asc" },
        take: 10,
        include: { interactions: { orderBy: { happenedAt: "desc" }, take: 1 } },
      }),
      db.contact.findMany({
        where: {
          userId,
          archivedAt: null,
          nextFollowUpAt: { gte: todayStart, lte: todayEnd },
        },
        orderBy: { nextFollowUpAt: "asc" },
        take: 10,
        include: { interactions: { orderBy: { happenedAt: "desc" }, take: 1 } },
      }),
      db.contact.findMany({
        where: {
          userId,
          archivedAt: null,
          nextFollowUpAt: { gt: todayEnd, lte: weekEnd },
        },
        orderBy: { nextFollowUpAt: "asc" },
        take: 10,
        include: { interactions: { orderBy: { happenedAt: "desc" }, take: 1 } },
      }),
      db.contact.findMany({
        where: {
          userId,
          archivedAt: null,
          updatedAt: { gte: recentCutoff },
        },
        orderBy: { updatedAt: "desc" },
        take: 5,
        include: { interactions: { orderBy: { happenedAt: "desc" }, take: 1 } },
      }),
      db.contact.count({ where: { userId, archivedAt: null } }),
    ])

  type Contact = (typeof overdue)[0]

  function ContactRow({ contact }: { contact: Contact }) {
    const lastInteraction = contact.interactions[0]
    return (
      <div className="flex items-center justify-between py-2 border-b last:border-0">
        <div className="flex-1 min-w-0">
          <Link
            href={`/app/contacts/${contact.id}`}
            className="font-medium text-sm hover:underline truncate block"
          >
            {contact.name}
          </Link>
          {contact.company && (
            <p className="text-xs text-muted-foreground truncate">
              {contact.company}
            </p>
          )}
          {lastInteraction && (
            <p className="text-xs text-muted-foreground">
              Last:{" "}
              {format(new Date(lastInteraction.happenedAt), "MMM d")} —{" "}
              {lastInteraction.summary.slice(0, 50)}
              {lastInteraction.summary.length > 50 ? "..." : ""}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 ml-3">
          <Badge variant={statusBadge(contact.status)}>{contact.status}</Badge>
          <QuickInteractionDialog contactId={contact.id} contactName={contact.name} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            {totalContacts} active contact{totalContacts !== 1 ? "s" : ""}
          </p>
        </div>
        <QuickAddDialog />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Overdue</p>
            <p className="text-2xl font-bold text-destructive">
              {overdue.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Due today</p>
            <p className="text-2xl font-bold">{dueToday.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">This week</p>
            <p className="text-2xl font-bold">{upcoming.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total contacts</p>
            <p className="text-2xl font-bold">{totalContacts}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Overdue */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Overdue
              {overdue.length > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {overdue.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overdue.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nothing overdue.
              </p>
            ) : (
              <div>
                {overdue.map((c) => (
                  <ContactRow key={c.id} contact={c} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Due today */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="w-4 h-4" />
              Due today
              {dueToday.length > 0 && (
                <Badge className="ml-auto">{dueToday.length}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dueToday.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nothing due today.
              </p>
            ) : (
              <div>
                {dueToday.map((c) => (
                  <ContactRow key={c.id} contact={c} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-4 h-4" />
              Upcoming this week
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nothing coming up this week.
              </p>
            ) : (
              <div>
                {upcoming.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/app/contacts/${c.id}`}
                        className="font-medium text-sm hover:underline"
                      >
                        {c.name}
                      </Link>
                      {c.company && (
                        <p className="text-xs text-muted-foreground">
                          {c.company}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground ml-3">
                      {c.nextFollowUpAt
                        ? format(new Date(c.nextFollowUpAt), "MMM d")
                        : ""}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recently active */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="w-4 h-4" />
              Recently active
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentlyActive.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No recent activity.{" "}
                <Link href="/app/contacts" className="text-primary underline">
                  Add a contact
                </Link>
              </p>
            ) : (
              <div>
                {recentlyActive.map((c) => (
                  <ContactRow key={c.id} contact={c} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {overdue.length === 0 && dueToday.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              You&apos;re all caught up! No follow-ups due.
            </p>
            <QuickAddDialog />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
