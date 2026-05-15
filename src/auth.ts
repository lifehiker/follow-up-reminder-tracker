import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

const googleConfigured =
  !!process.env.AUTH_GOOGLE_ID && !!process.env.AUTH_GOOGLE_SECRET

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? "follow-up-tracker-default-secret-change-in-prod",
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  providers: [
    ...(googleConfigured
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
          }),
        ]
      : []),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email as string },
          })
          if (!user || !user.password) return null
          const valid = await bcrypt.compare(
            credentials.password as string,
            user.password as string
          )
          if (!valid) return null
          return { id: user.id, email: user.email, name: user.name, image: user.image }
        } catch {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id && token.email) {
        const dbUser = await db.user.upsert({
          where: { email: token.email },
          create: {
            email: token.email,
            name: user.name ?? token.name,
            image: user.image ?? token.picture,
          },
          update: {
            name: user.name ?? token.name,
            image: user.image ?? token.picture,
          },
        })
        token.id = dbUser.id
      } else if (user?.id) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string
      return session
    },
  },
})
