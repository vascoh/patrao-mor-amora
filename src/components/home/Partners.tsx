import type { Partner } from "@/services/content";

const FALLBACK: Partner[] = [
  { id: "1", name: "DGRM", icon: "🏛️", url: null, display_order: 0, is_active: true, created_at: "" },
  { id: "2", name: "Marina de Seixal", icon: "⚓", url: null, display_order: 1, is_active: true, created_at: "" },
  { id: "3", name: "Capitania do Porto de Lisboa", icon: "🚢", url: null, display_order: 2, is_active: true, created_at: "" },
  { id: "4", name: "IEFP", icon: "🎓", url: null, display_order: 3, is_active: true, created_at: "" },
  { id: "5", name: "FPN — Federação", icon: "🌊", url: null, display_order: 4, is_active: true, created_at: "" },
  { id: "6", name: "Escola Patrão Mor Oeiras", icon: "🧭", url: "https://www.patraomor.pt", display_order: 5, is_active: true, created_at: "" }
];

interface Props {
  items?: Partner[];
}

export function Partners({ items }: Props) {
  const partners = items && items.length > 0 ? items : FALLBACK;

  return (
    <section
      id="parceiros"
      className="border-y border-[var(--border)] bg-[var(--bg)] py-12"
    >
      <div className="container-page text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
          Certificações &amp; Parceiros
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((p) => {
            const content = (
              <span className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--accent)]">
                {p.icon} {p.name}
              </span>
            );
            return p.url ? (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              <span key={p.id}>{content}</span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
