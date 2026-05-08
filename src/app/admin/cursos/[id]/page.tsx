import { notFound } from "next/navigation";
import Link from "next/link";
import { CourseForm } from "@/components/admin/CourseForm";
import { getServerClient } from "@/lib/supabase/server";
import { updateCourse } from "../actions";
import type { Course } from "@/types/database";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function EditCoursePage({ params }: Props) {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (error || !data) notFound();

  const course = data as Course;

  async function update(formData: FormData) {
    "use server";
    return updateCourse(params.id, formData);
  }

  return (
    <div className="space-y-8">
      <header>
        <nav className="mb-3 text-xs text-[var(--text-subtle)]">
          <Link href="/admin/cursos" className="hover:text-[var(--accent)]">
            ← Cursos
          </Link>
        </nav>
        <h1 className="font-serif text-4xl">Editar Curso</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          <span className="font-semibold text-[var(--accent)]">{course.name}</span>{" "}
          · slug: <code className="font-mono text-xs">{course.slug}</code>
        </p>
      </header>

      <section className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-6">
        <CourseForm
          course={course}
          action={update}
          submitLabel="Guardar Alterações"
        />
      </section>
    </div>
  );
}
