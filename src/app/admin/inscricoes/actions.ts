"use server";

import { revalidatePath } from "next/cache";
import { getServerClient } from "@/lib/supabase/server";
import type { EnrollmentStatus } from "@/types/database";

export async function updateEnrollmentStatus(id: string, status: EnrollmentStatus) {
  const supabase = getServerClient();
  const { error } = await supabase
    .from("enrollments")
    .update({ status })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/inscricoes");
  revalidatePath("/admin");
}

export async function deleteEnrollment(id: string) {
  const supabase = getServerClient();
  const { error } = await supabase.from("enrollments").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/inscricoes");
  revalidatePath("/admin");
}
