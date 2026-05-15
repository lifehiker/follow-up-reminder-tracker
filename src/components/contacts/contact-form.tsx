"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createContact, updateContact, ContactFormData } from "@/lib/actions/contacts"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Contact = {
  id: string
  name: string
  email: string | null
  company: string | null
  title: string | null
  notes: string | null
  reminderNote: string | null
  relationshipType: string
  status: string
  nextFollowUpAt: Date | null
}

interface ContactFormProps {
  contact?: Contact
  onSuccess?: () => void
}

const RELATIONSHIP_TYPES = [
  { value: "CLIENT", label: "Client" },
  { value: "LEAD", label: "Lead" },
  { value: "CANDIDATE", label: "Candidate" },
  { value: "NETWORK", label: "Network" },
  { value: "PERSONAL", label: "Personal" },
  { value: "OTHER", label: "Other" },
]

const STATUSES = [
  { value: "LEAD", label: "Lead" },
  { value: "ACTIVE", label: "Active" },
  { value: "WAITING", label: "Waiting" },
  { value: "CLOSED", label: "Closed" },
  { value: "ARCHIVED", label: "Archived" },
]

function formatDateForInput(date: Date | null): string {
  if (!date) return ""
  return new Date(date).toISOString().split("T")[0]
}

export function ContactForm({ contact, onSuccess }: ContactFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: contact?.name ?? "",
    email: contact?.email ?? "",
    company: contact?.company ?? "",
    title: contact?.title ?? "",
    notes: contact?.notes ?? "",
    reminderNote: contact?.reminderNote ?? "",
    relationshipType: (contact?.relationshipType as ContactFormData["relationshipType"]) ?? "OTHER",
    status: (contact?.status as ContactFormData["status"]) ?? "LEAD",
    nextFollowUpAt: formatDateForInput(contact?.nextFollowUpAt ?? null),
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const result = contact
        ? await updateContact(contact.id, formData)
        : await createContact(formData)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(contact ? "Contact updated!" : "Contact created!")
      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/app/contacts")
      }
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  function set<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => set("name", e.target.value)}
            required
            disabled={loading}
            placeholder="Full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email ?? ""}
            onChange={(e) => set("email", e.target.value)}
            disabled={loading}
            placeholder="email@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company ?? ""}
            onChange={(e) => set("company", e.target.value)}
            disabled={loading}
            placeholder="Company name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title ?? ""}
            onChange={(e) => set("title", e.target.value)}
            disabled={loading}
            placeholder="Job title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="relationshipType">Relationship Type</Label>
          <Select
            value={formData.relationshipType}
            onValueChange={(v) =>
              set("relationshipType", v as ContactFormData["relationshipType"])
            }
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RELATIONSHIP_TYPES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(v) =>
              set("status", v as ContactFormData["status"])
            }
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="nextFollowUpAt">Next Follow-Up Date</Label>
          <Input
            id="nextFollowUpAt"
            type="date"
            value={formData.nextFollowUpAt ?? ""}
            onChange={(e) => set("nextFollowUpAt", e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="reminderNote">Reminder Note</Label>
          <Input
            id="reminderNote"
            value={formData.reminderNote ?? ""}
            onChange={(e) => set("reminderNote", e.target.value)}
            disabled={loading}
            placeholder="Example: send proposal bump on Tuesday"
            maxLength={280}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes ?? ""}
          onChange={(e) => set("notes", e.target.value)}
          disabled={loading}
          placeholder="Any notes about this contact..."
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : contact
            ? "Update contact"
            : "Create contact"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
