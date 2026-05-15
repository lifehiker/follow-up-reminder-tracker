import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/contacts/contact-form"
import { InteractionTimeline } from "@/components/interactions/interaction-timeline"
import { AddInteractionDialog } from "@/components/interactions/add-interaction-dialog"
import { ArchiveContactButton } from "@/components/contacts/archive-contact-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, Building, Mail, Calendar } from "lucide-react"

interface ContactDetailPageProps {
  params: Promise<{ id: string }>
}

const STATUS_COLORS: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  LEAD: "secondary",
  ACTIVE: "default",
  WAITING: "outline",
  CLOSED: "secondary",
  ARCHIVED: "secondary",
}

export default async function ContactDetailPage({ params }: ContactDetailPageProps) {
  const session = await auth()
  if (!session?.user?.id) redirect("/signin")

  const { id } = await params

  const contact = await db.contact.findFirst({
    where: { id, userId: session.user.id },
    include: {
      interactions: {
        orderBy: { happenedAt: "desc" },
      },
    },
  })

  if (!contact) notFound()

  const REL_LABELS: Record<string, string> = {
    CLIENT: "Client",
    LEAD: "Lead",
    CANDIDATE: "Candidate",
    NETWORK: "Network",
    PERSONAL: "Personal",
    OTHER: "Other",
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/contacts" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{contact.name}</h1>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant={STATUS_COLORS[contact.status] ?? "secondary"}>
              {contact.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {REL_LABELS[contact.relationshipType] ?? contact.relationshipType}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <AddInteractionDialog contactId={contact.id} contactName={contact.name} />
          <ArchiveContactButton
            contactId={contact.id}
            isArchived={!!contact.archivedAt}
          />
        </div>
      </div>

      {/* Quick info */}
      <div className="flex flex-wrap gap-4 text-sm">
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Mail className="w-4 h-4" />
            {contact.email}
          </a>
        )}
        {contact.company && (
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Building className="w-4 h-4" />
            {contact.company}
            {contact.title ? ` · ${contact.title}` : ""}
          </span>
        )}
        {contact.nextFollowUpAt && (
          <div
            className={`flex items-start gap-1.5 ${
              new Date(contact.nextFollowUpAt) < new Date()
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            <Calendar className="w-4 h-4 mt-0.5" />
            <div>
              <div>
                Follow-up: {format(new Date(contact.nextFollowUpAt), "MMM d, yyyy")}
              </div>
              {contact.reminderNote && (
                <div className="text-xs opacity-80">{contact.reminderNote}</div>
              )}
            </div>
          </div>
        )}
      </div>

      {contact.notes && (
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {contact.notes}
            </p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="timeline">
        <TabsList>
          <TabsTrigger value="timeline">
            Timeline ({contact.interactions.length})
          </TabsTrigger>
          <TabsTrigger value="edit">Edit contact</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Interaction history</h2>
            <AddInteractionDialog contactId={contact.id} contactName={contact.name} />
          </div>
          {contact.interactions.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <p>No interactions yet.</p>
                <p className="text-sm mt-1">
                  Log your first interaction to start tracking this contact.
                </p>
              </CardContent>
            </Card>
          ) : (
            <InteractionTimeline interactions={contact.interactions} />
          )}
        </TabsContent>

        <TabsContent value="edit" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Edit contact details</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm contact={contact} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
