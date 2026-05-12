import type { MetadataRoute } from "next";
import { getCourseSlugs } from "@/services/courses";
import { getBlogPosts } from "@/services/blog";
import { blogPosts as staticPosts } from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://patraomor.pt";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courseSlugs, dbPosts] = await Promise.all([getCourseSlugs(), getBlogPosts()]);
  const posts = dbPosts.length > 0 ? dbPosts : staticPosts;

  const courseEntries: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${siteUrl}/cursos/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
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
      url: `${siteUrl}/amora`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
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
