import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ContactForm } from "@/components/contacts/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function NewContactPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/signin")

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
