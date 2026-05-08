"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "📊 Dashboard", exact: true },
  { href: "/admin/cursos", label: "🎓 Cursos" },
  { href: "/admin/datas", label: "📅 Calendário" },
  { href: "/admin/leads", label: "📋 Leads" },
  { href: "/admin/inscricoes", label: "✅ Inscrições" }
];

export function AdminNav({ email }: { email: string | null }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const supabase = getBrowserClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="sticky top-0 z-10 flex h-screen w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[#03080f] p-5">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-md bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] font-serif text-lg font-bold text-[#060e1a]">
          ⚓
        </div>
        <div>
          <strong className="block font-serif text-base">Patrão Mor</strong>
          <span className="text-[0.65rem] uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Painel Admin
          </span>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {links.map((l) => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[rgba(201,168,76,0.12)] text-[var(--accent-light)]"
                  : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text)]"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-md border border-[var(--border)] bg-[var(--bg-card)] p-3">
        <div className="truncate text-xs font-semibold">{email ?? "—"}</div>
        <button
          type="button"
          onClick={logout}
          className="mt-2 text-xs text-[var(--text-muted)] hover:text-rose-400"
        >
          Terminar sessão →
        </button>
      </div>
      <Link
        href="/"
        className="mt-3 block text-center text-xs text-[var(--text-subtle)] hover:text-[var(--accent)]"
      >
        ← Voltar ao site público
      </Link>
    </aside>
  );
}
