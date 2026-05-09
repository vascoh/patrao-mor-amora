"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase/server";

type ActionResult = { error: string } | void;

interface PostData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  icon: string;
  read_time: string;
  published_at: string;
  display_order: number;
  is_published: boolean;
}

function parseFormData(formData: FormData): { error: string } | { data: PostData } {
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!slug || !title || !excerpt || !content) {
    return { error: "Campos obrigatórios em falta (slug, título, excerto, conteúdo)." };
  }

  return {
    data: {
      slug,
      title,
      excerpt,
      content,
      tag: String(formData.get("tag") ?? "Náutica").trim(),
      icon: String(formData.get("icon") ?? "📝").trim(),
      read_time: String(formData.get("read_time") ?? "5 min").trim(),
      published_at: String(formData.get("published_at") ?? new Date().toISOString().slice(0, 10)),
      display_order: parseInt(String(formData.get("display_order") ?? "0"), 10),
      is_published: formData.get("is_published") === "on"
    }
  };
}

export async function createBlogPost(formData: FormData): Promise<ActionResult> {
  const result = parseFormData(formData);
  if ("error" in result) return result;

  const supabase = getServerClient();
  const { error } = await supabase.from("blog_posts").insert(result.data);
  if (error) return { error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData): Promise<ActionResult> {
  const result = parseFormData(formData);
  if ("error" in result) return result;

  const supabase = getServerClient();
  const { error } = await supabase.from("blog_posts").update(result.data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string): Promise<ActionResult> {
  const supabase = getServerClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
