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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createContact } from "@/lib/actions/contacts"
import { toast } from "sonner"
import { Plus } from "lucide-react"

export function QuickAddDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    relationshipType: "OTHER" as const,
    nextFollowUpAt: "",
  })

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await createContact({
        name: form.name,
        email: form.email,
        company: form.company,
        title: "",
        notes: "",
        relationshipType: form.relationshipType,
        status: "LEAD",
        nextFollowUpAt: form.nextFollowUpAt || null,
      })
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success("Contact added!")
      setOpen(false)
      setForm({ name: "", email: "", company: "", relationshipType: "OTHER", nextFollowUpAt: "" })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button><Plus className="w-4 h-4 mr-1" />Add contact</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick add contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="qa-name">Name *</Label>
            <Input
              id="qa-name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
              disabled={loading}
              placeholder="Full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qa-email">Email</Label>
            <Input
              id="qa-email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              disabled={loading}
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qa-company">Company</Label>
            <Input
              id="qa-company"
              value={form.company}
              onChange={(e) => set("company", e.target.value)}
              disabled={loading}
              placeholder="Company name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qa-type">Relationship Type</Label>
            <Select
              value={form.relationshipType}
              onValueChange={(v) => set("relationshipType", v as typeof form.relationshipType)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: "CLIENT", label: "Client" },
                  { value: "LEAD", label: "Lead" },
                  { value: "CANDIDATE", label: "Candidate" },
                  { value: "NETWORK", label: "Network" },
                  { value: "PERSONAL", label: "Personal" },
                  { value: "OTHER", label: "Other" },
                ].map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="qa-followup">Next Follow-Up Date</Label>
            <Input
              id="qa-followup"
              type="date"
              value={form.nextFollowUpAt}
              onChange={(e) => set("nextFollowUpAt", e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Adding..." : "Add contact"}
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
