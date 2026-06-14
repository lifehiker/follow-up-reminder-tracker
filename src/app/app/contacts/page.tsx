import { auth } from "@/auth"
import { db } from "@/lib/db"
import { QuickAddDialog } from "@/components/contacts/quick-add-dialog"
import { ContactTable } from "@/components/contacts/contact-table"
import { ContactFilters } from "@/components/contacts/contact-filters"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface ContactsPageProps {
  searchParams: Promise<{
    search?: string
    status?: string
    type?: string
    due?: string
    archived?: string
  }>
}

export default async function ContactsPage({ searchParams }: ContactsPageProps) {
  const session = await auth()
  if (!session?.user?.id) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Please{" "}
          <a href="/signin" className="underline text-primary">
            sign in
          </a>{" "}
          to continue.
        </p>
      </div>
    )
  }

  const params = await searchParams
  const { search, status, type, due, archived } = params

  const where: Record<string, unknown> = { userId: session.user.id }

  if (!archived) {
    where.archivedAt = null
  }

  if (status && status !== "ALL") {
    where.status = status
  }

  if (type && type !== "ALL") {
    where.relationshipType = type
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { company: { contains: search } },
    ]
  }

  if (due && due !== "ALL") {
    const now = new Date()
    const todayStart = new Date(now)
    todayStart.setHours(0, 0, 0, 0)
    const todayEnd = new Date(now)
    todayEnd.setHours(23, 59, 59, 999)
    const weekEnd = new Date(todayEnd)
    weekEnd.setDate(weekEnd.getDate() + 7)

    if (due === "OVERDUE") {
      where.nextFollowUpAt = { lt: todayStart }
    } else if (due === "TODAY") {
      where.nextFollowUpAt = { gte: todayStart, lte: todayEnd }
    } else if (due === "THIS_WEEK") {
      where.nextFollowUpAt = { gt: todayEnd, lte: weekEnd }
    } else if (due === "UNSCHEDULED") {
      where.nextFollowUpAt = null
    }
  }

  const contacts = await db.contact.findMany({
    where,
    include: {
      interactions: {
        orderBy: { happenedAt: "desc" },
        take: 1,
      },
    },
    orderBy: [
      { nextFollowUpAt: "asc" },
      { updatedAt: "desc" },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contacts</h1>
          <p className="text-muted-foreground text-sm">
            {contacts.length} contact{contacts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/app/contacts/new">
            <Button variant="outline">
              <PlusCircle className="w-4 h-4 mr-1" />
              New contact
            </Button>
          </Link>
          <QuickAddDialog />
        </div>
      </div>

      <ContactFilters />

      <div className="bg-white rounded-lg border overflow-hidden">
        <ContactTable contacts={contacts} />
      </div>
    </div>
  )
}
