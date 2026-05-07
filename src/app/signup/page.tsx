import type { Metadata } from "next"
import Link from "next/link"
import { SignUpForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Sign Up - FollowUp Tracker",
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-bold text-xl">
            FollowUp Tracker
          </Link>
          <h1 className="text-2xl font-semibold mt-6 mb-1">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Free for up to 50 contacts
          </p>
        </div>
        <SignUpForm />
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
