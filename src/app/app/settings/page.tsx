import { auth } from "@/auth"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsForm } from "@/components/settings/settings-form"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) {
    // Avoid redirect() during streaming which sends 500 on mobile.
    // Middleware guards /app/* for unauthenticated users; this handles the edge
    // case where the JWT passes middleware but session.user.id is missing.
    return (
      <div className="max-w-lg space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Please{" "}
          <a href="/signin" className="underline text-primary">
            sign in
          </a>{" "}
          to continue.
        </p>
      </div>
    )
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) {
    // User record missing (stale JWT after DB reset) — avoid redirect() during streaming
    // which leaves the page body empty on mobile. Show a sign-in prompt instead.
    return (
      <div className="max-w-lg space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Your session has expired.{" "}
          <a href="/signin" className="underline text-primary">
            Sign in again
          </a>{" "}
          to continue.
        </p>
      </div>
    )
  }

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
