import { auth } from "@/auth"
import { Sidebar } from "@/components/layout/sidebar"
import { SessionProvider } from "next-auth/react"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user?.id) {
    // Avoid redirect() during streaming which sends 200 with empty body on mobile.
    // Middleware already guards /app/* for unauthenticated users; this handles
    // the edge case where the JWT passes middleware but session.user.id is missing.
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
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
    <SessionProvider session={session}>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SessionProvider>
  )
}
