import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  // Verify cron secret
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const authHeader = req.headers.get("authorization")
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  if (!process.env.RESEND_API_KEY) {
    console.log("[cron/daily-digest] RESEND_API_KEY not set, skipping")
    return NextResponse.json({ ok: true, skipped: true })
  }

  try {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)
    const fromEmail = process.env.EMAIL_FROM ?? "noreply@followuptracker.app"

    const now = new Date()
    const startOfToday = new Date(now)
    startOfToday.setHours(0, 0, 0, 0)

    // Get users with digest enabled
    const users = await db.user.findMany({
      where: { digestEnabled: true, email: { not: undefined } },
    })

    let sent = 0
    const errors: string[] = []

    for (const user of users) {
      try {
        const contacts = await db.contact.findMany({
          where: {
            userId: user.id,
            archivedAt: null,
            nextFollowUpAt: { lte: now },
          },
          orderBy: { nextFollowUpAt: "asc" },
          take: 20,
        })

        if (contacts.length === 0) continue

        const overdueContacts = contacts.filter(
          (c) => c.nextFollowUpAt && new Date(c.nextFollowUpAt) < startOfToday
        )
        const todayContacts = contacts.filter(
          (c) =>
            c.nextFollowUpAt &&
            new Date(c.nextFollowUpAt) >= startOfToday
        )

        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

        const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; }
h1 { font-size: 20px; margin-bottom: 4px; }
h2 { font-size: 15px; margin: 20px 0 8px; }
.contact { padding: 8px 12px; border-left: 3px solid #e5e7eb; margin-bottom: 6px; }
.contact.overdue { border-color: #ef4444; }
.contact a { color: #111; text-decoration: none; font-weight: 600; }
.meta { font-size: 12px; color: #6b7280; }
.btn { display: inline-block; background: #111; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 20px; }
</style></head>
<body>
<h1>Follow-up digest for ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h1>
<p style="color:#6b7280">Hi ${user.name ?? "there"}, here are your follow-ups for today.</p>

${
  overdueContacts.length > 0
    ? `<h2>⚠️ Overdue (${overdueContacts.length})</h2>
${overdueContacts
  .map(
    (c) => `
<div class="contact overdue">
  <a href="${appUrl}/app/contacts/${c.id}">${c.name}</a>
  ${c.company ? `<span class="meta"> · ${c.company}</span>` : ""}
  <div class="meta">Due: ${c.nextFollowUpAt ? new Date(c.nextFollowUpAt).toLocaleDateString() : ""}</div>
</div>`
  )
  .join("")}`
    : ""
}

${
  todayContacts.length > 0
    ? `<h2>📅 Due today (${todayContacts.length})</h2>
${todayContacts
  .map(
    (c) => `
<div class="contact">
  <a href="${appUrl}/app/contacts/${c.id}">${c.name}</a>
  ${c.company ? `<span class="meta"> · ${c.company}</span>` : ""}
</div>`
  )
  .join("")}`
    : ""
}

<a href="${appUrl}/app" class="btn">Open dashboard</a>
<p style="font-size:12px;color:#9ca3af;margin-top:20px">
  You're receiving this because you have daily digest enabled.
  <a href="${appUrl}/app/settings" style="color:#6b7280">Manage preferences</a>
</p>
</body>
</html>`

        await resend.emails.send({
          from: fromEmail,
          to: user.email!,
          subject: `${contacts.length} follow-up${contacts.length !== 1 ? "s" : ""} due — FollowUp Tracker`,
          html,
        })
        sent++
      } catch (err) {
        errors.push(`${user.email}: ${err}`)
      }
    }

    return NextResponse.json({ ok: true, sent, errors })
  } catch (error) {
    console.error("[cron/daily-digest]", error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
