import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticlePage } from "@/components/marketing/article-page"
import { blogPosts } from "@/lib/marketing-content"

type BlogPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug as keyof typeof blogPosts]
  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <ArticlePage
      category={post.category}
      title={post.pageTitle}
      description={post.description}
      intro={post.intro}
      sections={post.sections}
    />
  )
}
