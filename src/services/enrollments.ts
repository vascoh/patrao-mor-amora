import { getServerClient } from "@/lib/supabase/server";
import type { Enrollment } from "@/types/database";

export interface EnrollmentRow extends Enrollment {
  course: { name: string; slug: string } | null;
  course_date: { start_date: string } | null;
}

export async function getEnrollments(limit = 200): Promise<EnrollmentRow[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("enrollments")
    .select(
      "*, course:courses(name,slug), course_date:course_dates(start_date)"
    )
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[getEnrollments]", error.message);
    return [];
  }
  return (data ?? []) as unknown as EnrollmentRow[];
}

export async function getEnrollmentStats() {
  const supabase = getServerClient();
  const since = new Date();
  since.setDate(1);
  const { count: monthCount } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .gte("created_at", since.toISOString());
  const { count: pendingCount } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");
  return {
    month: monthCount ?? 0,
    pending: pendingCount ?? 0
  };
}
