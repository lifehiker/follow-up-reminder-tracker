"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createInteraction } from "@/lib/actions/interactions"
import { toast } from "sonner"
import { MessageSquarePlus } from "lucide-react"

interface QuickInteractionDialogProps {
  contactId: string
  contactName: string
}

export function QuickInteractionDialog({
  contactId,
  contactName,
}: QuickInteractionDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState("")
  const [direction, setDirection] = useState<"OUTBOUND" | "INBOUND" | "NONE">("NONE")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await createInteraction({
        contactId,
        type: "NOTE",
        direction,
        summary,
        happenedAt: new Date().toISOString().split("T")[0],
      })
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success("Interaction logged!")
      setOpen(false)
      setSummary("")
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="icon" className="h-7 w-7"><MessageSquarePlus className="w-3.5 h-3.5" /></Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick log — {contactName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>Direction</Label>
            <Select
              value={direction}
              onValueChange={(v) => setDirection(v as typeof direction)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OUTBOUND">Outbound (I contacted them)</SelectItem>
                <SelectItem value="INBOUND">Inbound (they contacted me)</SelectItem>
                <SelectItem value="NONE">N/A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Summary *</Label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              disabled={loading}
              placeholder="What happened?"
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Logging..." : "Log"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
