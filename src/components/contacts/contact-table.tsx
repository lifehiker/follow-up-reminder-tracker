"use client"

import Link from "next/link"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { archiveContact } from "@/lib/actions/contacts"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Archive, Eye } from "lucide-react"

type Contact = {
  id: string
  name: string
  email: string | null
  company: string | null
  status: string
  relationshipType: string
  nextFollowUpAt: Date | null
  reminderNote: string | null
  updatedAt: Date
  interactions: { happenedAt: Date }[]
}

interface ContactTableProps {
  contacts: Contact[]
}

const STATUS_COLORS: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  LEAD: "secondary",
  ACTIVE: "default",
  WAITING: "outline",
  CLOSED: "secondary",
  ARCHIVED: "secondary",
}

const REL_LABELS: Record<string, string> = {
  CLIENT: "Client",
  LEAD: "Lead",
  CANDIDATE: "Candidate",
  NETWORK: "Network",
  PERSONAL: "Personal",
  OTHER: "Other",
}

export function ContactTable({ contacts }: ContactTableProps) {
  const router = useRouter()

  async function handleArchive(id: string) {
    const result = await archiveContact(id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Contact archived")
      router.refresh()
    }
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No contacts found.
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Next Follow-Up</TableHead>
          <TableHead>Last Activity</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((c) => (
          <TableRow key={c.id}>
            <TableCell>
              <Link
                href={`/app/contacts/${c.id}`}
                className="font-medium hover:underline"
              >
                {c.name}
              </Link>
              {c.email && (
                <p className="text-xs text-muted-foreground">{c.email}</p>
              )}
            </TableCell>
            <TableCell className="text-sm">{c.company || "-"}</TableCell>
            <TableCell>
              <span className="text-sm">{REL_LABELS[c.relationshipType] ?? c.relationshipType}</span>
            </TableCell>
            <TableCell>
              <Badge variant={STATUS_COLORS[c.status] ?? "secondary"}>
                {c.status}
              </Badge>
            </TableCell>
            <TableCell className="text-sm">
              {c.nextFollowUpAt ? (
                <div>
                  <span
                    className={
                      new Date(c.nextFollowUpAt) < new Date()
                        ? "text-destructive font-medium"
                        : ""
                    }
                  >
                    {format(new Date(c.nextFollowUpAt), "MMM d, yyyy")}
                  </span>
                  {c.reminderNote && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {c.reminderNote}
                    </p>
                  )}
                </div>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {c.interactions[0]
                ? format(new Date(c.interactions[0].happenedAt), "MMM d")
                : "-"}
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Link href={`/app/contacts/${c.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleArchive(c.id)}
                >
                  <Archive className="w-3.5 h-3.5" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
