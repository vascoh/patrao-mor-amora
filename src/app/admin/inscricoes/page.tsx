import { getEnrollments, getEnrollmentStats } from "@/services/enrollments";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { updateEnrollmentStatus, deleteEnrollment } from "./actions";

export const dynamic = "force-dynamic";

const statusActions = [
  { label: "Confirmar", status: "confirmed" as const, style: "border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10" },
  { label: "Cancelar", status: "cancelled" as const, style: "border-rose-500/40 text-rose-300 hover:bg-rose-500/10" },
  { label: "Concluído", status: "completed" as const, style: "border-blue-500/40 text-blue-300 hover:bg-blue-500/10" }
];

export default async function AdminInscricoesPage() {
  const [enrollments, stats] = await Promise.all([
    getEnrollments(200),
    getEnrollmentStats()
  ]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Inscrições</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Gere e actualiza o estado das inscrições.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <div className="font-serif text-4xl font-bold text-[var(--accent-light)]">
            {stats.month}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Este mês
          </div>
        </div>
        <div className="rounded-[16px] border border-amber-500/20 bg-[var(--bg-card)] p-5">
          <div className="font-serif text-4xl font-bold text-amber-300">
            {stats.pending}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Pendentes
          </div>
        </div>
      </div>

      <section className="overflow-x-auto rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)]">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
            <tr>
              <th className="px-5 py-3 text-left">Data</th>
              <th className="px-5 py-3 text-left">Nome</th>
              <th className="px-5 py-3 text-left">Contacto</th>
              <th className="px-5 py-3 text-left">Curso</th>
              <th className="px-5 py-3 text-left">Estado</th>
              <th className="px-5 py-3 text-right">Acções</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-[var(--text-muted)]">
                  Sem inscrições ainda.
                </td>
              </tr>
            ) : null}
            {enrollments.map((e) => (
              <tr key={e.id} className="group">
                <td className="px-5 py-3 font-mono text-xs text-[var(--text-subtle)]">
                  {new Date(e.created_at).toLocaleDateString("pt-PT")}
                </td>
                <td className="px-5 py-3 font-medium">{e.user_name}</td>
                <td className="px-5 py-3">
                  <a
                    href={`mailto:${e.email}`}
                    className="block text-[var(--accent)] hover:underline"
                  >
                    {e.email}
                  </a>
                  <a
                    href={`tel:${e.phone}`}
                    className="block text-xs text-[var(--text-subtle)] hover:text-[var(--text)]"
                  >
                    {e.phone}
                  </a>
                </td>
                <td className="px-5 py-3 text-[var(--text-muted)]">
                  {e.course?.name ?? "—"}
                  {e.course_date?.start_date ? (
                    <div className="text-xs text-[var(--text-subtle)]">
                      {new Date(e.course_date.start_date).toLocaleDateString("pt-PT")}
                    </div>
                  ) : null}
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={e.status} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {statusActions
                      .filter((a) => a.status !== e.status)
                      .map((a) => (
                        <form
                          key={a.status}
                          action={async () => {
                            "use server";
                            await updateEnrollmentStatus(e.id, a.status);
                          }}
                        >
                          <button
                            type="submit"
                            className={`rounded-md border px-2.5 py-1 text-xs transition ${a.style}`}
                          >
                            {a.label}
                          </button>
                        </form>
                      ))}
                    <form
                      action={async () => {
                        "use server";
                        await deleteEnrollment(e.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="rounded-md border border-rose-500/20 px-2.5 py-1 text-xs text-rose-400/60 transition hover:border-rose-500/50 hover:text-rose-300"
                      >
                        ✕
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
