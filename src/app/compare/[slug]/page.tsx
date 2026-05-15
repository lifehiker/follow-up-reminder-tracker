import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { comparePages } from "@/lib/marketing-content"
import { ArticlePage } from "@/components/marketing/article-page"

type ComparePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(comparePages).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ComparePageProps): Promise<Metadata> {
  const { slug } = await params
  const page = comparePages[slug as keyof typeof comparePages]
  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params
  const page = comparePages[slug as keyof typeof comparePages]

  if (!page) {
    notFound()
  }

  return (
    <ArticlePage
      category={page.category}
      title={page.pageTitle}
      description={page.description}
      intro={page.intro}
      sections={page.sections}
    />
  )
}
