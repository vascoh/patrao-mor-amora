"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase/server";
import { courseSchema } from "@/lib/validation";

function parseFormData(formData: FormData) {
  const highlightsRaw = String(formData.get("highlights") ?? "");
  const highlights = highlightsRaw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return courseSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    price: formData.get("price"),
    level: formData.get("level"),
    duration: formData.get("duration"),
    age_min: formData.get("age_min") || 0,
    location: formData.get("location") || null,
    badge: formData.get("badge") || null,
    icon: formData.get("icon") || null,
    highlights,
    is_featured: formData.get("is_featured") === "on",
    is_active: formData.get("is_active") === "on"
  });
}

export async function createCourse(formData: FormData) {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: "Dados inválidos: " + JSON.stringify(parsed.error.flatten().fieldErrors) };
  }
  const supabase = getServerClient();
  const { error } = await supabase.from("courses").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePath("/admin/cursos");
  revalidatePath("/");
  redirect("/admin/cursos");
}

export async function updateCourse(id: string, formData: FormData) {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: "Dados inválidos" };
  }
  const supabase = getServerClient();
  const { error } = await supabase
    .from("courses")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/cursos");
  revalidatePath("/");
  redirect("/admin/cursos");
}

export async function deleteCourse(id: string) {
  const supabase = getServerClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/cursos");
  revalidatePath("/");
}
