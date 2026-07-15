import { NextResponse } from "next/server"
import NextAuth from "next-auth"
import authConfig from "@/auth.config"

// IMPORTANT: do not import from "@/auth" here. That module pulls in Prisma and
// bcryptjs, which use Node's fs module and crash the edge runtime (every
// request 500s with "The edge runtime does not support Node.js 'fs' module").
// This lightweight instance built from the edge-safe config is enough to
// read/verify the JWT session cookie.
const { auth } = NextAuth(authConfig)

export default auth(function middleware(req) {
  const isAppPath = req.nextUrl.pathname.startsWith("/app")

  if (isAppPath && !req.auth) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
