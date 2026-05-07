"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface BillingActionsProps {
  isPro: boolean
  hasSubscription: boolean
}

export function BillingActions({ isPro, hasSubscription }: BillingActionsProps) {
  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const [loadingPortal, setLoadingPortal] = useState(false)

  async function handleUpgrade(plan: "monthly" | "yearly") {
    setLoadingCheckout(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error ?? "Failed to start checkout.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setLoadingCheckout(false)
    }
  }

  async function handlePortal() {
    setLoadingPortal(true)
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error ?? "Failed to open billing portal.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setLoadingPortal(false)
    }
  }

  if (isPro && hasSubscription) {
    return (
      <Button
        variant="outline"
        onClick={handlePortal}
        disabled={loadingPortal}
      >
        {loadingPortal ? "Loading..." : "Manage subscription"}
      </Button>
    )
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button onClick={() => handleUpgrade("monthly")} disabled={loadingCheckout}>
        {loadingCheckout ? "Loading..." : "Upgrade Monthly — $12/mo"}
      </Button>
      <Button
        variant="outline"
        onClick={() => handleUpgrade("yearly")}
        disabled={loadingCheckout}
      >
        Upgrade Yearly — $96/yr
      </Button>
    </div>
  )
}
