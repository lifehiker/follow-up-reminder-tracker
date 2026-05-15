import type { MetadataRoute } from "next"
import { blogPosts, comparePages, siteUrl } from "@/lib/marketing-content"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/pricing",
    "/freelancers",
    "/job-seekers",
    "/recruiters",
    "/personal-crm",
    "/keep-in-touch",
    "/signin",
    "/signup",
    "/blog",
  ]

  const compareRoutes = Object.keys(comparePages).map((slug) => `/compare/${slug}`)
  const blogRoutes = Object.keys(blogPosts).map((slug) => `/blog/${slug}`)

  return [...staticRoutes, ...compareRoutes, ...blogRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }))
}
