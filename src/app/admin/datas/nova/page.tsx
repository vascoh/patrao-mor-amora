import Link from "next/link";
import { CourseDateForm } from "@/components/admin/CourseDateForm";
import { getAllCoursesForAdmin } from "@/services/courses";
import { createCourseDate } from "../actions";

export default async function NewCourseDatePage() {
  const courses = await getAllCoursesForAdmin();

  return (
    <div className="space-y-8">
      <header>
        <nav className="mb-3 text-xs text-[var(--text-subtle)]">
          <Link href="/admin/datas" className="hover:text-[var(--accent)]">
            ← Datas
          </Link>
        </nav>
        <h1 className="font-serif text-4xl">Nova Data</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Adiciona uma nova data de início para um curso.
        </p>
      </header>

      <section className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-6">
        <CourseDateForm
          courses={courses}
          action={createCourseDate}
          submitLabel="Criar Data"
        />
      </section>
    </div>
  );
}
