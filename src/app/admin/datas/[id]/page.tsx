import { notFound } from "next/navigation";
import Link from "next/link";
import { CourseDateForm } from "@/components/admin/CourseDateForm";
import { getAllCoursesForAdmin } from "@/services/courses";
import { getServerClient } from "@/lib/supabase/server";
import { updateCourseDate } from "../actions";
import type { CourseDate } from "@/types/database";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function EditCourseDatePage({ params }: Props) {
  const [courses, { data, error }] = await Promise.all([
    getAllCoursesForAdmin(),
    getServerClient()
      .from("course_dates")
      .select("*")
      .eq("id", params.id)
      .maybeSingle()
  ]);

  if (error || !data) notFound();

  const courseDate = data as CourseDate;

  async function update(formData: FormData) {
    "use server";
    return updateCourseDate(params.id, formData);
  }

  return (
    <div className="space-y-8">
      <header>
        <nav className="mb-3 text-xs text-[var(--text-subtle)]">
          <Link href="/admin/datas" className="hover:text-[var(--accent)]">
            ← Datas
          </Link>
        </nav>
        <h1 className="font-serif text-4xl">Editar Data</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Início:{" "}
          <span className="font-semibold text-[var(--accent)]">
            {new Date(courseDate.start_date).toLocaleDateString("pt-PT")}
          </span>
        </p>
      </header>

      <section className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-6">
        <CourseDateForm
          courseDate={courseDate}
          courses={courses}
          action={update}
          submitLabel="Guardar Alterações"
        />
      </section>
    </div>
  );
}
