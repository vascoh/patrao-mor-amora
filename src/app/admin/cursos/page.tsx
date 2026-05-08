import Link from "next/link";
import { getAllCoursesForAdmin } from "@/services/courses";
import { deleteCourse } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await getAllCoursesForAdmin();

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Cursos</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Adiciona, edita ou desactiva cursos.
          </p>
        </div>
        <Link href="/admin/cursos/novo" className="btn btn-primary">
          + Novo Curso
        </Link>
      </header>

      <section className="overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)]">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
            <tr>
              <th className="px-5 py-3 text-left">Curso</th>
              <th className="px-5 py-3 text-left">Categoria</th>
              <th className="px-5 py-3 text-left">Preço</th>
              <th className="px-5 py-3 text-left">Estado</th>
              <th className="px-5 py-3 text-right">Acções</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {courses.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-[var(--text-muted)]"
                >
                  Sem cursos. Cria o primeiro com o botão acima.
                </td>
              </tr>
            ) : null}
            {courses.map((c) => (
              <tr key={c.id}>
                <td className="px-5 py-3">
                  <div className="font-medium">
                    {c.icon} {c.name}
                  </div>
                  <div className="text-xs text-[var(--text-subtle)]">
                    /cursos/{c.slug}
                  </div>
                </td>
                <td className="px-5 py-3 text-[var(--text-muted)]">
                  {c.category}
                </td>
                <td className="px-5 py-3 font-mono">
                  € {Number(c.price).toFixed(0)}
                </td>
                <td className="px-5 py-3">
                  {c.is_active ? (
                    <span className="status-pill status-available">activo</span>
                  ) : (
                    <span className="status-pill status-full">oculto</span>
                  )}
                  {c.is_featured ? (
                    <span className="ml-2 status-pill status-few">★ destaque</span>
                  ) : null}
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/cursos/${c.id}`}
                      className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs hover:border-[var(--accent)]"
                    >
                      Editar
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteCourse(c.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="rounded-md border border-rose-500/40 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-500/10"
                      >
                        Remover
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
