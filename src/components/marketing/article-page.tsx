import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

type ArticleSection = {
  heading: string
  paragraphs: readonly string[]
}

export function ArticlePage({
  category,
  title,
  description,
  intro,
  sections,
}: {
  category: string
  title: string
  description: string
  intro: string
  sections: readonly ArticleSection[]
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#f8fafc,white_30%)]">
      <Navbar />
      <main className="flex-1 px-4 py-16">
        <article className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white/85 p-8 shadow-sm backdrop-blur md:p-12">
          <div className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
            {category}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-balance">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
          <p className="mt-8 text-base leading-7 text-slate-700">{intro}</p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base leading-7 text-slate-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-semibold">Put the system into practice</h2>
            <p className="mt-3 text-slate-300">
              Use FollowUp Tracker to keep contact history, next steps, and no-reply
              follow-ups in one place.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup">
                <Button>Start free</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary">See pricing</Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
