"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CheckCircle } from "lucide-react"

interface UpgradeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reason?: string
}

export function UpgradeDialog({ open, onOpenChange, reason }: UpgradeDialogProps) {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade(plan: "monthly" | "yearly") {
    setLoading(true)
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
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade to Pro</DialogTitle>
          <DialogDescription>
            {reason ??
              "You've reached the free tier limit. Upgrade to Pro for unlimited access."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 my-2">
          {[
            "Unlimited contacts",
            "Unlimited interactions",
            "Waiting-for-reply view",
            "CSV export",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              {f}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={() => handleUpgrade("monthly")} disabled={loading}>
            Upgrade Monthly — $12/mo
          </Button>
          <Button
            variant="outline"
            onClick={() => handleUpgrade("yearly")}
            disabled={loading}
          >
            Upgrade Yearly — $96/yr (save 33%)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
