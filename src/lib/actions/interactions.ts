"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { checkInteractionLimit } from "@/lib/billing"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const interactionSchema = z.object({
  contactId: z.string(),
  type: z.enum(["EMAIL", "REPLY", "CALL", "MEETING", "NOTE"]).default("NOTE"),
  direction: z.enum(["OUTBOUND", "INBOUND", "NONE"]).default("NONE"),
  summary: z.string().min(1, "Summary is required"),
  happenedAt: z.string().optional(),
})

export type InteractionFormData = z.infer<typeof interactionSchema>

export async function createInteraction(data: InteractionFormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const { allowed, count } = await checkInteractionLimit(session.user.id)
  if (!allowed) {
    return {
      error: `You've reached the free tier limit of 100 interactions (you have ${count}). Upgrade to Pro for unlimited interactions.`,
      limitReached: true,
    }
  }

  const parsed = interactionSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Validation error" }
  }

  // Verify contact belongs to user
  const contact = await db.contact.findFirst({
    where: { id: parsed.data.contactId, userId: session.user.id },
  })
  if (!contact) return { error: "Contact not found" }

  const interaction = await db.interaction.create({
    data: {
      contactId: parsed.data.contactId,
      userId: session.user.id,
      type: parsed.data.type,
      direction: parsed.data.direction,
      summary: parsed.data.summary,
      happenedAt: parsed.data.happenedAt
        ? new Date(parsed.data.happenedAt)
        : new Date(),
    },
  })

  // Update contact's updatedAt and status based on direction
  const updateData: Record<string, unknown> = { updatedAt: new Date() }
  if (parsed.data.direction === "INBOUND" && contact.status === "WAITING") {
    updateData.status = "ACTIVE"
  }
  if (parsed.data.direction === "OUTBOUND") {
    updateData.status = "WAITING"
  }

  await db.contact.update({ where: { id: contact.id }, data: updateData })

  revalidatePath(`/app/contacts/${contact.id}`)
  revalidatePath("/app/contacts")
  revalidatePath("/app")
  revalidatePath("/app/waiting")
  return { success: true, interaction }
}

export async function deleteInteraction(id: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const existing = await db.interaction.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) return { error: "Interaction not found" }

  await db.interaction.delete({ where: { id } })

  revalidatePath(`/app/contacts/${existing.contactId}`)
  revalidatePath("/app")
  revalidatePath("/app/waiting")
  return { success: true }
}
