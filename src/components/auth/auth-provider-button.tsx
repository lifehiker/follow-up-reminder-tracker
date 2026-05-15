"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function AuthProviderButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => signIn("google", { callbackUrl: "/app" })}
    >
      Continue with Google
    </Button>
  )
}
