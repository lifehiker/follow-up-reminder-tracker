import { NextResponse } from "next/server"
import { auth } from "@/auth"

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
