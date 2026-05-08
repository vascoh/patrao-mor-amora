import { getServerClient } from "@/lib/supabase/server";
import type { Course } from "@/types/database";

export async function getCourses(): Promise<Course[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("price", { ascending: true });

  if (error) {
    console.error("[getCourses]", error.message);
    return [];
  }
  return (data ?? []) as Course[];
}

export async function getAllCoursesForAdmin(): Promise<Course[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[getAllCoursesForAdmin]", error.message);
    return [];
  }
  return (data ?? []) as Course[];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("[getCourseBySlug]", error.message);
    return null;
  }
  return (data ?? null) as Course | null;
}

export async function getCourseSlugs(): Promise<string[]> {
  const supabase = getServerClient();
  const { data } = await supabase
    .from("courses")
    .select("slug")
    .eq("is_active", true);
  return (data ?? []).map((c) => c.slug as string);
}
