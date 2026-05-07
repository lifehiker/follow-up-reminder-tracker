import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsForm } from "@/components/settings/settings-form"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/signin")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) redirect("/signin")

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile & Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm
            defaultValues={{
              name: user.name ?? "",
              timezone: user.timezone,
              digestEnabled: user.digestEnabled,
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
