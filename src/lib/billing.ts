import { db } from "./db"

export async function getUserSubscription(userId: string) {
  return db.subscription.findUnique({ where: { userId } })
}

export async function isPro(userId: string): Promise<boolean> {
  try {
    const sub = await getUserSubscription(userId)
    if (!sub) return false
    if (sub.status === "active" && sub.stripeCurrentPeriodEnd) {
      return new Date(sub.stripeCurrentPeriodEnd) > new Date()
    }
    return false
  } catch {
    return false
  }
}

export async function checkContactLimit(
  userId: string
): Promise<{ allowed: boolean; count: number }> {
  const pro = await isPro(userId)
  if (pro) return { allowed: true, count: 0 }
  const count = await db.contact.count({ where: { userId, archivedAt: null } })
  return { allowed: count < 50, count }
}

export async function checkInteractionLimit(
  userId: string
): Promise<{ allowed: boolean; count: number }> {
  const pro = await isPro(userId)
  if (pro) return { allowed: true, count: 0 }
  const count = await db.interaction.count({ where: { userId } })
  return { allowed: count < 100, count }
}
