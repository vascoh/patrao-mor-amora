import { getServerClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types/database";

export type { BlogPost };

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  if (error) {
    console.error("[getBlogPosts]", error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

export async function getAllBlogPostsForAdmin(): Promise<BlogPost[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) {
    console.error("[getAllBlogPostsForAdmin]", error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) {
    console.error("[getBlogPostBySlug]", error.message);
    return null;
  }
  return (data ?? null) as BlogPost | null;
}

export async function getBlogPostByIdForAdmin(id: string): Promise<BlogPost | null> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("[getBlogPostByIdForAdmin]", error.message);
    return null;
  }
  return (data ?? null) as BlogPost | null;
}

export function formatPublishedDate(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("pt-PT", { day: "numeric", month: "short", year: "numeric" });
}
