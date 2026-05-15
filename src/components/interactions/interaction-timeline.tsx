"use client"

import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { deleteInteraction } from "@/lib/actions/interactions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Trash2, Mail, Phone, Video, MessageSquare, FileText } from "lucide-react"

type Interaction = {
  id: string
  type: string
  direction: string
  summary: string
  happenedAt: Date
}

interface InteractionTimelineProps {
  interactions: Interaction[]
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  EMAIL: <Mail className="w-4 h-4" />,
  REPLY: <Mail className="w-4 h-4" />,
  CALL: <Phone className="w-4 h-4" />,
  MEETING: <Video className="w-4 h-4" />,
  NOTE: <FileText className="w-4 h-4" />,
}

const DIRECTION_LABELS: Record<string, { label: string; class: string }> = {
  OUTBOUND: { label: "Outbound", class: "bg-blue-50 text-blue-700" },
  INBOUND: { label: "Inbound", class: "bg-green-50 text-green-700" },
  NONE: { label: "", class: "" },
}

const TYPE_LABELS: Record<string, string> = {
  EMAIL: "Email",
  REPLY: "Reply",
  CALL: "Call",
  MEETING: "Meeting",
  NOTE: "Note",
}

export function InteractionTimeline({ interactions }: InteractionTimelineProps) {
  const router = useRouter()

  async function handleDelete(id: string) {
    const confirmed = confirm("Delete this interaction?")
    if (!confirmed) return

    const result = await deleteInteraction(id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Interaction deleted")
      router.refresh()
    }
  }

  return (
    <div className="space-y-3">
      {interactions.map((interaction, index) => {
        const dir = DIRECTION_LABELS[interaction.direction]
        return (
          <div
            key={interaction.id}
            className="relative pl-6 pb-3"
          >
            {/* Timeline line */}
            {index < interactions.length - 1 && (
              <div className="absolute left-2 top-6 bottom-0 w-px bg-border" />
            )}
            {/* Timeline dot */}
            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-white border-2 border-border flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>

            <div className="bg-white border rounded-lg p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-muted-foreground">
                    {TYPE_ICONS[interaction.type] ?? <MessageSquare className="w-4 h-4" />}
                  </span>
                  <span className="text-sm font-medium">
                    {TYPE_LABELS[interaction.type] ?? interaction.type}
                  </span>
                  {dir && dir.label && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded font-medium ${dir.class}`}
                    >
                      {dir.label}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(interaction.happenedAt), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive flex-shrink-0"
                  onClick={() => handleDelete(interaction.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <p className="text-sm mt-2 text-foreground">
                {interaction.summary}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
