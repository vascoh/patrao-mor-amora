import Link from "next/link";
import { CourseForm } from "@/components/admin/CourseForm";
import { createCourse } from "../actions";

export default function NewCoursePage() {
  return (
    <div className="space-y-8">
      <header>
        <nav className="mb-3 text-xs text-[var(--text-subtle)]">
          <Link href="/admin/cursos" className="hover:text-[var(--accent)]">
            ← Cursos
          </Link>
        </nav>
        <h1 className="font-serif text-4xl">Novo Curso</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Preenche os dados abaixo para criar um novo curso.
        </p>
      </header>

      <section className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-6">
        <CourseForm action={createCourse} submitLabel="Criar Curso" />
      </section>
    </div>
  );
}
