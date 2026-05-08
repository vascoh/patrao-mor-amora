import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "212345678";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "geral@patraomor.pt";

  return (
    <footer className="border-t border-[var(--border)] bg-[#03080f] pt-20">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-[10px] bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] font-serif text-xl font-bold text-[#060e1a]">
                ⚓
              </div>
              <div className="leading-tight">
                <strong className="block font-serif text-lg">Patrão Mor Amora</strong>
                <span className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Escola Náutica · DGRM
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm font-light text-[var(--text-muted)]">
              Escola náutica certificada pela DGRM em atividade contínua desde
              1981. Formamos navegadores com rigor, segurança e paixão pelo mar
              na margem sul do Tejo.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { href: process.env.NEXT_PUBLIC_FACEBOOK_URL, label: "f", title: "Facebook" },
                { href: process.env.NEXT_PUBLIC_INSTAGRAM_URL, label: "📷", title: "Instagram" },
                { href: process.env.NEXT_PUBLIC_YOUTUBE_URL, label: "▶", title: "YouTube" },
                { href: whatsappLink(), label: "💬", title: "WhatsApp" }
              ]
                .filter((s) => s.href)
                .map((s) => (
                  <a
                    key={s.title}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.title}
                    className="grid size-10 place-items-center rounded-md border border-[var(--border)] bg-white/5 text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {s.label}
                  </a>
                ))}
            </div>
          </div>

          <FooterCol
            title="Cursos"
            items={[
              ["/cursos/patrao-local", "Patrão Local"],
              ["/cursos/patrao-costa", "Patrão de Costa"],
              ["/cursos/alto-mar", "Patrão de Alto Mar"],
              ["/cursos/marinheiro", "Marinheiro"],
              ["/cursos/vela", "Vela"],
              ["/cursos/padi", "PADI Open Water"],
              ["/cursos/seguranca", "Segurança no Mar"]
            ]}
          />

          <FooterCol
            title="Escola"
            items={[
              ["/#sobre", "Sobre Nós"],
              ["/#calendario", "Calendário"],
              ["/#testemunhos", "Testemunhos"],
              ["/#simulador", "Qual Carta Preciso?"],
              ["/#blog", "Blog Náutico"],
              ["/admin", "🔐 Área Admin"]
            ]}
          />

          <FooterCol
            title="Contacto"
            items={[
              [`tel:+351${phone.replace(/\s/g, "")}`, `📞 ${phone}`],
              [whatsappLink(), `💬 WhatsApp`],
              [`mailto:${email}`, `✉️ ${email}`],
              ["/#contacto", "📍 Amora, Seixal"],
              ["/#faq", "❓ FAQ"]
            ]}
          />
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] py-6 text-xs text-[var(--text-subtle)]">
          <p>© {new Date().getFullYear()} Patrão Mor Amora — Escola Náutica, Lda. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacidade">Política de Privacidade</Link>
            <Link href="/termos">Termos de Utilização</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <div>
      <h5 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[var(--text)]">
        {title}
      </h5>
      <ul className="flex flex-col gap-2 text-sm text-[var(--text-muted)]">
        {items.map(([href, label]) => (
          <li key={href + label}>
            <Link
              href={href}
              className="transition hover:text-[var(--accent)]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
