"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { archiveContact, unarchiveContact } from "@/lib/actions/contacts"
import { toast } from "sonner"
import { Archive, ArchiveRestore } from "lucide-react"

interface ArchiveContactButtonProps {
  contactId: string
  isArchived: boolean
}

export function ArchiveContactButton({
  contactId,
  isArchived,
}: ArchiveContactButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const result = isArchived
        ? await unarchiveContact(contactId)
        : await archiveContact(contactId)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(isArchived ? "Contact unarchived" : "Contact archived")
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick} disabled={loading}>
      {isArchived ? (
        <>
          <ArchiveRestore className="w-4 h-4 mr-1" />
          Unarchive
        </>
      ) : (
        <>
          <Archive className="w-4 h-4 mr-1" />
          Archive
        </>
      )}
    </Button>
  )
}
