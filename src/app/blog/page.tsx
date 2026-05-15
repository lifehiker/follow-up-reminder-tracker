import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { blogPosts } from "@/lib/marketing-content"

export const metadata: Metadata = {
  title: "Follow-Up Tracker Guides and Articles | FollowUp Tracker",
  description:
    "Practical guides on follow-up systems for freelancers, recruiters, job seekers, and solo operators.",
}

export default function BlogIndexPage() {
  const posts = Object.entries(blogPosts)

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#f8fafc,white_25%)]">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
            Blog
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Follow-up systems that hold up under real outreach
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Guides for freelancers, recruiters, job seekers, and solo operators
            who want a cleaner system than inbox stars and spreadsheets.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map(([slug, post]) => (
            <Link key={slug} href={`/blog/${slug}`}>
              <Card className="h-full border-slate-200 bg-white/90 shadow-sm transition-transform hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-slate-500">{post.category}</p>
                  <h2 className="mt-3 text-xl font-semibold">{post.pageTitle}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {post.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
