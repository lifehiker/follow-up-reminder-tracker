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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createInteraction } from "@/lib/actions/interactions"
import { toast } from "sonner"
import { Plus } from "lucide-react"

interface AddInteractionDialogProps {
  contactId: string
  contactName: string
}

export function AddInteractionDialog({
  contactId,
  contactName,
}: AddInteractionDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    type: "NOTE" as const,
    direction: "NONE" as const,
    summary: "",
    happenedAt: new Date().toISOString().split("T")[0],
  })

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await createInteraction({
        contactId,
        type: form.type,
        direction: form.direction,
        summary: form.summary,
        happenedAt: form.happenedAt,
      })
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success("Interaction logged!")
      setOpen(false)
      setForm({
        type: "NOTE",
        direction: "NONE",
        summary: "",
        happenedAt: new Date().toISOString().split("T")[0],
      })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm"><Plus className="w-4 h-4 mr-1" />Log interaction</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log interaction with {contactName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interaction-type">Type</Label>
              <Select
                value={form.type}
                onValueChange={(v) => set("type", v as typeof form.type)}
                disabled={loading}
              >
                <SelectTrigger id="interaction-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EMAIL">Email</SelectItem>
                  <SelectItem value="REPLY">Reply</SelectItem>
                  <SelectItem value="CALL">Call</SelectItem>
                  <SelectItem value="MEETING">Meeting</SelectItem>
                  <SelectItem value="NOTE">Note</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interaction-direction">Direction</Label>
              <Select
                value={form.direction}
                onValueChange={(v) =>
                  set("direction", v as typeof form.direction)
                }
                disabled={loading}
              >
                <SelectTrigger id="interaction-direction">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OUTBOUND">Outbound</SelectItem>
                  <SelectItem value="INBOUND">Inbound</SelectItem>
                  <SelectItem value="NONE">N/A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interaction-date">Date</Label>
            <Input
              id="interaction-date"
              type="date"
              value={form.happenedAt}
              onChange={(e) => set("happenedAt", e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interaction-summary">Summary *</Label>
            <Textarea
              id="interaction-summary"
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              required
              disabled={loading}
              placeholder="What happened? What was discussed or agreed?"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Logging..." : "Log interaction"}
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
