import Link from "next/link";
import { getAllDatesForAdmin } from "@/services/courseDates";
import { deleteCourseDate } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDatasPage() {
  const dates = await getAllDatesForAdmin();

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Datas de Cursos</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Gere as datas de início de cada curso.
          </p>
        </div>
        <Link href="/admin/datas/nova" className="btn btn-primary">
          + Nova Data
        </Link>
      </header>

      <section className="overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)]">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
            <tr>
              <th className="px-5 py-3 text-left">Curso</th>
              <th className="px-5 py-3 text-left">Início</th>
              <th className="px-5 py-3 text-left">Horário</th>
              <th className="px-5 py-3 text-left">Vagas</th>
              <th className="px-5 py-3 text-left">Estado</th>
              <th className="px-5 py-3 text-right">Acções</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {dates.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-[var(--text-muted)]">
                  Sem datas registadas. Cria a primeira com o botão acima.
                </td>
              </tr>
            ) : null}
            {dates.map((d) => (
              <tr key={d.id}>
                <td className="px-5 py-3">
                  <div className="font-medium">
                    {d.course?.icon} {d.course?.name ?? "—"}
                  </div>
                  {d.location ? (
                    <div className="text-xs text-[var(--text-subtle)]">{d.location}</div>
                  ) : null}
                </td>
                <td className="px-5 py-3 font-mono text-sm">
                  {new Date(d.start_date).toLocaleDateString("pt-PT")}
                  {d.end_date ? (
                    <div className="text-xs text-[var(--text-subtle)]">
                      até {new Date(d.end_date).toLocaleDateString("pt-PT")}
                    </div>
                  ) : null}
                </td>
                <td className="px-5 py-3 text-[var(--text-muted)]">
                  {d.schedule ?? "—"}
                </td>
                <td className="px-5 py-3 font-mono">
                  {d.available_slots}/{d.total_slots}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`status-pill ${
                      d.status === "available"
                        ? "status-available"
                        : d.status === "few"
                        ? "status-few"
                        : "status-full"
                    }`}
                  >
                    {d.status === "available"
                      ? "disponível"
                      : d.status === "few"
                      ? "poucas vagas"
                      : d.status === "full"
                      ? "esgotado"
                      : d.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/datas/${d.id}`}
                      className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs hover:border-[var(--accent)]"
                    >
                      Editar
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteCourseDate(d.id);
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
