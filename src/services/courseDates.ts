import { getServerClient } from "@/lib/supabase/server";
import type { CourseDate, CourseDateWithCourse } from "@/types/database";

export async function getUpcomingDates(): Promise<CourseDateWithCourse[]> {
  const supabase = getServerClient();
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("course_dates")
    .select(
      "*, course:courses!course_dates_course_id_fkey(id,slug,name,category,icon)"
    )
    .gte("start_date", today)
    .order("start_date", { ascending: true });

  if (error) {
    console.error("[getUpcomingDates]", error.message);
    return [];
  }
  return (data ?? []) as unknown as CourseDateWithCourse[];
}

export async function getAllDatesForAdmin(): Promise<CourseDateWithCourse[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("course_dates")
    .select(
      "*, course:courses!course_dates_course_id_fkey(id,slug,name,category,icon)"
    )
    .order("start_date", { ascending: false });
  if (error) {
    console.error("[getAllDatesForAdmin]", error.message);
    return [];
  }
  return (data ?? []) as unknown as CourseDateWithCourse[];
}

export async function getDatesForCourse(
  courseId: string
): Promise<CourseDate[]> {
  const supabase = getServerClient();
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("course_dates")
    .select("*")
    .eq("course_id", courseId)
    .gte("start_date", today)
    .order("start_date", { ascending: true });
  if (error) return [];
  return (data ?? []) as CourseDate[];
}
