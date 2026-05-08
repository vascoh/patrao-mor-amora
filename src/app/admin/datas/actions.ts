"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase/server";
import { courseDateSchema } from "@/lib/validation";

function parseFormData(formData: FormData) {
  return courseDateSchema.safeParse({
    course_id: formData.get("course_id"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date") || null,
    schedule: formData.get("schedule") || null,
    location: formData.get("location") || null,
    total_slots: formData.get("total_slots"),
    available_slots: formData.get("available_slots"),
    notes: formData.get("notes") || null
  });
}

export async function createCourseDate(formData: FormData) {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: "Dados inválidos: " + JSON.stringify(parsed.error.flatten().fieldErrors) };
  }
  const status = deriveStatus(
    Number(parsed.data.available_slots),
    Number(parsed.data.total_slots)
  );
  const supabase = getServerClient();
  const { error } = await supabase
    .from("course_dates")
    .insert({ ...parsed.data, status });
  if (error) return { error: error.message };
  revalidatePath("/admin/datas");
  revalidatePath("/");
  redirect("/admin/datas");
}

export async function updateCourseDate(id: string, formData: FormData) {
  const parsed = parseFormData(formData);
  if (!parsed.success) return { error: "Dados inválidos" };
  const status = deriveStatus(
    Number(parsed.data.available_slots),
    Number(parsed.data.total_slots)
  );
  const supabase = getServerClient();
  const { error } = await supabase
    .from("course_dates")
    .update({ ...parsed.data, status })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/datas");
  revalidatePath("/");
  redirect("/admin/datas");
}

export async function deleteCourseDate(id: string) {
  const supabase = getServerClient();
  const { error } = await supabase.from("course_dates").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/datas");
  revalidatePath("/");
}

function deriveStatus(available: number, total: number): string {
  if (available === 0) return "full";
  if (available <= Math.ceil(total * 0.25)) return "few";
  return "available";
}
