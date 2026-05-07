"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  timezone: z.string(),
  digestEnabled: z.boolean(),
})

export async function updateSettings(data: z.infer<typeof settingsSchema>) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const parsed = settingsSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Validation error" }
  }

  await db.user.update({
    where: { id: session.user.id },
    data: {
      name: parsed.data.name,
      timezone: parsed.data.timezone,
      digestEnabled: parsed.data.digestEnabled,
    },
  })

  revalidatePath("/app/settings")
  return { success: true }
}
