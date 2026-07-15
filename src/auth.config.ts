import type { NextAuthConfig } from "next-auth"

// Edge-safe NextAuth config: no database, no bcrypt, no Node-only imports.
// middleware.ts builds its own NextAuth instance from this so the edge bundle
// never pulls in Prisma/fs (which crashes the edge runtime with a 500).
// src/auth.ts spreads this and adds the real providers + db callbacks.
export default {
  secret:
    process.env.AUTH_SECRET ?? "follow-up-tracker-default-secret-change-in-prod",
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  providers: [],
} satisfies NextAuthConfig
