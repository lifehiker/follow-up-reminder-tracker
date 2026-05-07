"use server"

import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export async function registerUser(data: {
  name: string
  email: string
  password: string
}) {
  const existing = await db.user.findUnique({ where: { email: data.email } })
  if (existing) {
    return { error: "An account with this email already exists." }
  }
  const hashedPassword = await bcrypt.hash(data.password, 10)
  await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  })
  return { success: true }
}

export async function loginUser(data: { email: string; password: string }) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/app",
    })
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes("NEXT_REDIRECT")
    ) {
      throw error
    }
    return { error: "Invalid email or password." }
  }
}
