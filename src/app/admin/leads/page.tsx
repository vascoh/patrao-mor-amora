import { getLeads, getLeadStats } from "@/services/leads";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const [leads, stats] = await Promise.all([getLeads(200), getLeadStats()]);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Leads</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Contactos recebidos pelo formulário do site.
          </p>
        </div>
        <a
          href="/api/leads/export"
          className="btn btn-outline !px-4 !py-2 !text-sm"
        >
          ↓ Exportar CSV
        </a>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <div className="font-serif text-4xl font-bold text-[var(--accent-light)]">
            {stats.last30}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Últimos 30 dias
          </div>
        </div>
        <div className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <div className="font-serif text-4xl font-bold text-[var(--accent-light)]">
            {stats.total}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Total acumulado
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)]">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
            <tr>
              <th className="px-5 py-3 text-left">Data</th>
              <th className="px-5 py-3 text-left">Nome</th>
              <th className="px-5 py-3 text-left">Contacto</th>
              <th className="px-5 py-3 text-left">Curso</th>
              <th className="px-5 py-3 text-left">Mensagem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-[var(--text-muted)]">
                  Sem leads ainda.
                </td>
              </tr>
            ) : null}
            {leads.map((l) => (
              <tr key={l.id}>
                <td className="px-5 py-3 font-mono text-xs text-[var(--text-subtle)]">
                  {new Date(l.created_at).toLocaleDateString("pt-PT")}
                </td>
                <td className="px-5 py-3 font-medium">{l.name}</td>
                <td className="px-5 py-3">
                  <a
                    href={`mailto:${l.email}`}
                    className="block text-[var(--accent)] hover:underline"
                  >
                    {l.email}
                  </a>
                  <a
                    href={`tel:${l.phone}`}
                    className="block text-xs text-[var(--text-subtle)] hover:text-[var(--text)]"
                  >
                    {l.phone}
                  </a>
                </td>
                <td className="px-5 py-3 text-[var(--text-muted)]">
                  {l.course_interest ?? "—"}
                </td>
                <td className="max-w-xs px-5 py-3 text-xs text-[var(--text-muted)]">
                  <p className="line-clamp-2">{l.message || "—"}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
