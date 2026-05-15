"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { checkContactLimit } from "@/lib/billing"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().optional().or(z.literal("")),
  company: z.string().optional(),
  title: z.string().optional(),
  notes: z.string().optional(),
  reminderNote: z.string().max(280, "Reminder note must be 280 characters or less").optional(),
  relationshipType: z
    .enum(["CLIENT", "LEAD", "CANDIDATE", "NETWORK", "PERSONAL", "OTHER"])
    .default("OTHER"),
  status: z
    .enum(["LEAD", "ACTIVE", "WAITING", "CLOSED", "ARCHIVED"])
    .default("LEAD"),
  nextFollowUpAt: z.string().optional().nullable(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export async function createContact(data: ContactFormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const { allowed, count } = await checkContactLimit(session.user.id)
  if (!allowed) {
    return {
      error: `You've reached the free tier limit of 50 contacts (you have ${count}). Upgrade to Pro for unlimited contacts.`,
      limitReached: true,
    }
  }

  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Validation error" }
  }

  const contact = await db.contact.create({
    data: {
      userId: session.user.id,
      name: parsed.data.name,
      email: parsed.data.email || null,
      company: parsed.data.company || null,
      title: parsed.data.title || null,
      notes: parsed.data.notes || null,
      reminderNote: parsed.data.reminderNote || null,
      relationshipType: parsed.data.relationshipType,
      status: parsed.data.status,
      nextFollowUpAt: parsed.data.nextFollowUpAt
        ? new Date(parsed.data.nextFollowUpAt)
        : null,
    },
  })

  revalidatePath("/app/contacts")
  revalidatePath("/app")
  return { success: true, contact }
}

export async function updateContact(id: string, data: ContactFormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const existing = await db.contact.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) return { error: "Contact not found" }

  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Validation error" }
  }

  const contact = await db.contact.update({
    where: { id },
    data: {
      name: parsed.data.name,
      email: parsed.data.email || null,
      company: parsed.data.company || null,
      title: parsed.data.title || null,
      notes: parsed.data.notes || null,
      reminderNote: parsed.data.reminderNote || null,
      relationshipType: parsed.data.relationshipType,
      status: parsed.data.status,
      nextFollowUpAt: parsed.data.nextFollowUpAt
        ? new Date(parsed.data.nextFollowUpAt)
        : null,
    },
  })

  revalidatePath(`/app/contacts/${id}`)
  revalidatePath("/app/contacts")
  revalidatePath("/app")
  return { success: true, contact }
}

export async function archiveContact(id: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const existing = await db.contact.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) return { error: "Contact not found" }

  await db.contact.update({
    where: { id },
    data: { archivedAt: new Date(), status: "ARCHIVED" },
  })

  revalidatePath("/app/contacts")
  revalidatePath("/app")
  return { success: true }
}

export async function unarchiveContact(id: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const existing = await db.contact.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) return { error: "Contact not found" }

  await db.contact.update({
    where: { id },
    data: { archivedAt: null, status: "ACTIVE" },
  })

  revalidatePath(`/app/contacts/${id}`)
  revalidatePath("/app/contacts")
  return { success: true }
}

export async function deleteContact(id: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const existing = await db.contact.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) return { error: "Contact not found" }

  await db.contact.delete({ where: { id } })

  revalidatePath("/app/contacts")
  revalidatePath("/app")
  return { success: true }
}

export async function getContacts(filters?: {
  search?: string
  status?: string
  relationshipType?: string
  due?: string
  includeArchived?: boolean
}) {
  const session = await auth()
  if (!session?.user?.id) return []

  const where: Record<string, unknown> = { userId: session.user.id }

  if (!filters?.includeArchived) {
    where.archivedAt = null
  }

  if (filters?.status && filters.status !== "ALL") {
    where.status = filters.status
  }

  if (filters?.relationshipType && filters.relationshipType !== "ALL") {
    where.relationshipType = filters.relationshipType
  }

  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search } },
      { email: { contains: filters.search } },
      { company: { contains: filters.search } },
    ]
  }

  if (filters?.due && filters.due !== "ALL") {
    const now = new Date()
    const todayStart = new Date(now)
    todayStart.setHours(0, 0, 0, 0)
    const todayEnd = new Date(now)
    todayEnd.setHours(23, 59, 59, 999)
    const weekEnd = new Date(todayEnd)
    weekEnd.setDate(weekEnd.getDate() + 7)

    if (filters.due === "OVERDUE") {
      where.nextFollowUpAt = { lt: todayStart }
    }
    if (filters.due === "TODAY") {
      where.nextFollowUpAt = { gte: todayStart, lte: todayEnd }
    }
    if (filters.due === "THIS_WEEK") {
      where.nextFollowUpAt = { gt: todayEnd, lte: weekEnd }
    }
    if (filters.due === "UNSCHEDULED") {
      where.nextFollowUpAt = null
    }
  }

  return db.contact.findMany({
    where,
    include: {
      interactions: {
        orderBy: { happenedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  })
}

export async function getContact(id: string) {
  const session = await auth()
  if (!session?.user?.id) return null

  return db.contact.findFirst({
    where: { id, userId: session.user.id },
    include: {
      interactions: {
        orderBy: { happenedAt: "desc" },
      },
    },
  })
}
