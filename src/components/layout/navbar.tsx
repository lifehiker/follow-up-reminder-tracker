"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex h-14 items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          FollowUp Tracker
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/freelancers" className="text-muted-foreground hover:text-foreground transition-colors">
            Freelancers
          </Link>
          <Link href="/job-seekers" className="text-muted-foreground hover:text-foreground transition-colors">
            Job Seekers
          </Link>
          <Link href="/recruiters" className="text-muted-foreground hover:text-foreground transition-colors">
            Recruiters
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/signin">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get started free</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
