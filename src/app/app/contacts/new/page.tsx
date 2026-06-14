import { auth } from "@/auth"
import { ContactForm } from "@/components/contacts/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function NewContactPage() {
  const session = await auth()
  if (!session?.user?.id) {
    return (
      <div className="flex h-screen items-center justify-center">
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

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">New Contact</h1>
      <Card>
        <CardHeader>
          <CardTitle>Contact details</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  )
}
