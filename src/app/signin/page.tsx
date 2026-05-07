import type { Metadata } from "next"
import Link from "next/link"
import { SignInForm } from "@/components/auth/signin-form"

export const metadata: Metadata = {
  title: "Sign In - FollowUp Tracker",
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-bold text-xl">
            FollowUp Tracker
          </Link>
          <h1 className="text-2xl font-semibold mt-6 mb-1">Welcome back</h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your account
          </p>
        </div>
        <SignInForm />
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  )
}
