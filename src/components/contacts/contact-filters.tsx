"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useCallback, useTransition } from "react"
import { Search, X } from "lucide-react"

export function ContactFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== "ALL") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        router.push(`/app/contacts?${params.toString()}`)
      })
    },
    [router, searchParams]
  )

  const clearFilters = () => {
    startTransition(() => {
      router.push("/app/contacts")
    })
  }

  const hasFilters =
    searchParams.has("search") ||
    searchParams.has("status") ||
    searchParams.has("type")

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
          className="pl-9 w-64"
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => {
            const val = e.target.value
            updateFilter("search", val)
          }}
        />
      </div>

      <Select
        value={searchParams.get("status") ?? "ALL"}
        onValueChange={(v) => updateFilter("status", v ?? "ALL")}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All statuses</SelectItem>
          <SelectItem value="LEAD">Lead</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="WAITING">Waiting</SelectItem>
          <SelectItem value="CLOSED">Closed</SelectItem>
          <SelectItem value="ARCHIVED">Archived</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("type") ?? "ALL"}
        onValueChange={(v) => updateFilter("type", v ?? "ALL")}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All types</SelectItem>
          <SelectItem value="CLIENT">Client</SelectItem>
          <SelectItem value="LEAD">Lead</SelectItem>
          <SelectItem value="CANDIDATE">Candidate</SelectItem>
          <SelectItem value="NETWORK">Network</SelectItem>
          <SelectItem value="PERSONAL">Personal</SelectItem>
          <SelectItem value="OTHER">Other</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}
