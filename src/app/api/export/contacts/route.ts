import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { isPro } from "@/lib/billing"
import { db } from "@/lib/db"
import { format } from "date-fns"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const pro = await isPro(session.user.id)
  if (!pro) {
    return NextResponse.json(
      { error: "CSV export is a Pro feature. Please upgrade to download." },
      { status: 403 }
    )
  }

  const contacts = await db.contact.findMany({
    where: { userId: session.user.id },
    include: {
      interactions: {
        orderBy: { happenedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  })

  const headers = [
    "Name",
    "Email",
    "Company",
    "Title",
    "Status",
    "Relationship Type",
    "Next Follow-Up",
    "Reminder Note",
    "Last Interaction",
    "Notes",
    "Created",
  ]

  const rows = contacts.map((c) => [
    c.name,
    c.email ?? "",
    c.company ?? "",
    c.title ?? "",
    c.status,
    c.relationshipType,
    c.nextFollowUpAt ? format(new Date(c.nextFollowUpAt), "yyyy-MM-dd") : "",
    (c.reminderNote ?? "").replace(/"/g, '""'),
    c.interactions[0]
      ? format(new Date(c.interactions[0].happenedAt), "yyyy-MM-dd")
      : "",
    (c.notes ?? "").replace(/"/g, '""'),
    format(new Date(c.createdAt), "yyyy-MM-dd"),
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n")

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="contacts-${format(new Date(), "yyyy-MM-dd")}.csv"`,
    },
  })
}
