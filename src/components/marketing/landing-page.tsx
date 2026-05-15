import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

type LandingPageProps = {
  eyebrow: string
  title: string
  description: string
  keyword: string
  heroTone: string
  painsTitle: string
  pains: string[]
  solutionsTitle: string
  solutions: string[]
  sectionTitle: string
  sectionItems: Array<{ title: string; description: string }>
  ctaTitle: string
  ctaBody: string
  ctaLabel: string
}

export function LandingPage({
  eyebrow,
  title,
  description,
  keyword,
  heroTone,
  painsTitle,
  pains,
  solutionsTitle,
  solutions,
  sectionTitle,
  sectionItems,
  ctaTitle,
  ctaBody,
  ctaLabel,
}: LandingPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <section className={`px-4 py-20 bg-gradient-to-b ${heroTone}`}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-white/60 bg-white/70 px-4 py-1 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
            {eyebrow}
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View pricing
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Built around {keyword}, not generic CRM busywork.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">{painsTitle}</h2>
            <ul className="space-y-3 text-slate-600">
              {pains.map((pain) => (
                <li key={pain} className="flex items-start gap-3">
                  <span className="mt-0.5 text-rose-600">✗</span>
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold">{solutionsTitle}</h2>
            <ul className="space-y-3 text-slate-600">
              {solutions.map((solution) => (
                <li key={solution} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fafc,white)] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-3xl font-semibold">{sectionTitle}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {sectionItems.map((item, index) => (
              <Card key={item.title} className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 font-semibold">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-4 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold">{ctaTitle}</h2>
          <p className="mt-4 text-base leading-7 text-slate-300">{ctaBody}</p>
          <Link href="/signup" className="mt-8 inline-block">
            <Button size="lg" variant="secondary">
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
