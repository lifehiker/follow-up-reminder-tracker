import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="font-bold mb-3">FollowUp Tracker</div>
            <p className="text-sm text-muted-foreground">
              A lightweight follow-up tracker for solo outreach.
            </p>
          </div>
          <div>
            <div className="font-semibold text-sm mb-3">Product</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="/signup" className="hover:text-foreground">Get Started</Link></li>
              <li><Link href="/personal-crm" className="hover:text-foreground">Personal CRM</Link></li>
              <li><Link href="/keep-in-touch" className="hover:text-foreground">Keep in Touch</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm mb-3">Use Cases</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/freelancers" className="hover:text-foreground">Freelancers</Link></li>
              <li><Link href="/job-seekers" className="hover:text-foreground">Job Seekers</Link></li>
              <li><Link href="/recruiters" className="hover:text-foreground">Recruiters</Link></li>
              <li><Link href="/compare/clay-alternative" className="hover:text-foreground">Clay Alternative</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm mb-3">Resources</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/blog/best-follow-up-tracker-for-freelancers" className="hover:text-foreground">Freelancer Guide</Link></li>
              <li><Link href="/blog/job-application-follow-up-tracker" className="hover:text-foreground">Job Search Guide</Link></li>
              <li><Link href="/signin" className="hover:text-foreground">Sign In</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} FollowUp Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
