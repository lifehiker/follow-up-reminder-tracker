"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateSettings } from "@/lib/actions/settings"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Vancouver",
  "America/Toronto",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Amsterdam",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Dubai",
  "Australia/Sydney",
  "Pacific/Auckland",
]

interface SettingsFormProps {
  defaultValues: {
    name: string
    timezone: string
    digestEnabled: boolean
  }
}

export function SettingsForm({ defaultValues }: SettingsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(defaultValues.name)
  const [timezone, setTimezone] = useState(defaultValues.timezone)
  const [digestEnabled, setDigestEnabled] = useState(defaultValues.digestEnabled)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await updateSettings({ name, timezone, digestEnabled })
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Settings saved!")
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Display Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <Select value={timezone} onValueChange={(v) => setTimezone(v ?? "UTC")} disabled={loading}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TIMEZONES.map((tz) => (
              <SelectItem key={tz} value={tz}>
                {tz}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Used to calculate your daily digest email timing.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="digestEnabled"
          checked={digestEnabled}
          onCheckedChange={(checked) => setDigestEnabled(checked === true)}
          disabled={loading}
        />
        <div>
          <Label htmlFor="digestEnabled">Daily digest email</Label>
          <p className="text-xs text-muted-foreground">
            Receive a daily email with contacts due for follow-up.
          </p>
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save settings"}
      </Button>
    </form>
  )
}
