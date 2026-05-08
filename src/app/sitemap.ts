import type { MetadataRoute } from "next";
import { getCourseSlugs } from "@/services/courses";
import { blogPosts } from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://patraomor.pt";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courseSlugs = await getCourseSlugs();

  const courseEntries: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${siteUrl}/cursos/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7
    },
    ...courseEntries,
    ...blogEntries
  ];
}
