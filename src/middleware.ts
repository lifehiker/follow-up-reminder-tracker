import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export default async function proxy(req: NextRequest) {
  const isAppPath = req.nextUrl.pathname.startsWith("/app")

  if (isAppPath) {
    const token = await getToken({
      req,
      secret:
        process.env.AUTH_SECRET ??
        "follow-up-tracker-default-secret-change-in-prod",
    })
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
