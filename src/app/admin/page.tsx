import { getEnrollments, getEnrollmentStats } from "@/services/enrollments";
import { getLeadStats } from "@/services/leads";
import { getServerClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/shared/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [enrollments, enrollStats, leadStats] = await Promise.all([
    getEnrollments(8),
    getEnrollmentStats(),
    getLeadStats()
  ]);

  const supabase = getServerClient();
  const { count: activeCourses } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  const stats = [
    { num: enrollStats.month, label: "Inscrições este mês" },
    { num: leadStats.last30, label: "Leads (30 dias)" },
    { num: enrollStats.pending, label: "Inscrições pendentes" },
    { num: activeCourses ?? 0, label: "Cursos activos" }
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-4xl">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Visão geral do site e da operação.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-5"
          >
            <div className="font-serif text-4xl font-bold text-[var(--accent-light)]">
              {s.num}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-serif text-2xl">Últimas inscrições</h2>
        <div className="mt-4 overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)]">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
              <tr>
                <th className="px-5 py-3 text-left">Nome</th>
                <th className="px-5 py-3 text-left">Curso</th>
                <th className="px-5 py-3 text-left">Data</th>
                <th className="px-5 py-3 text-left">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {enrollments.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-[var(--text-muted)]"
                  >
                    Sem inscrições recentes.
                  </td>
                </tr>
              ) : null}
              {enrollments.map((e) => (
                <tr key={e.id}>
                  <td className="px-5 py-3 font-medium">{e.user_name}</td>
                  <td className="px-5 py-3 text-[var(--text-muted)]">
                    {e.course?.name ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-[var(--text-muted)]">
                    {new Date(e.created_at).toLocaleDateString("pt-PT")}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={e.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

