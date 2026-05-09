import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";
import type { SiteStat } from "@/services/content";

const FALLBACK_STATS: SiteStat[] = [
  { id: "1", key: "years_experience", value: "44+", label: "Anos de Experiência", display_order: 0 },
  { id: "2", key: "students_trained", value: "2.800+", label: "Alunos Formados", display_order: 1 },
  { id: "3", key: "approval_rate", value: "94%", label: "Taxa de Aprovação", display_order: 2 },
  { id: "4", key: "certifications", value: "9", label: "Certificações", display_order: 3 }
];

interface Props {
  stats?: SiteStat[];
}

export function Hero({ stats }: Props) {
  const displayStats = stats && stats.length > 0 ? stats : FALLBACK_STATS;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#03080f] via-[#0a1628] to-[#152e5a]">
        <svg
          className="absolute bottom-0 left-0 right-0 opacity-20"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C240,160 480,40 720,100 C960,160 1200,40 1440,100 L1440,200 L0,200 Z"
            fill="var(--accent)"
          />
          <path
            d="M0,130 C360,70 720,180 1080,80 C1260,40 1380,120 1440,100 L1440,200 L0,200 Z"
            fill="var(--accent)"
            opacity="0.4"
          />
        </svg>
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[rgba(3,8,15,0.85)] via-[rgba(6,14,26,0.7)] to-[rgba(10,22,40,0.5)]" />
      <div className="absolute bottom-0 left-0 right-0 z-[2] h-48 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      <div className="absolute inset-x-0 top-0 z-[3] h-[3px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

      <div className="container-page relative z-[4] pt-28 md:pt-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[rgba(201,168,76,0.08)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            <span className="size-1.5 animate-pulse rounded-full bg-[var(--accent-light)]" />
            Escola Certificada DGRM · Desde 1981
          </div>

          <h1 className="mt-6 font-serif text-[3rem] leading-[1.05] md:text-[5.2rem]">
            Aprende a<br />
            <em className="font-light italic text-[var(--accent-light)]">
              Navegar
            </em>{" "}
            com
            <br />
            Segurança
          </h1>

          <p className="mt-6 font-serif text-xl italic text-[var(--accent-light)]">
            Cursos Náuticos Certificados · Amora, Margem Sul
          </p>

          <p className="mt-4 max-w-xl text-base font-light text-[var(--text-muted)]">
            A escola náutica de referência na margem sul do Tejo. Formação
            certificada pela DGRM, instrutores com mais de 20 anos de
            experiência e a maior taxa de aprovação da região.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#cursos" className="btn btn-primary">
              ⚓ Ver Cursos
            </Link>
            <a
              href={whatsappLink(
                "Olá! Gostaria de obter mais informações sobre os cursos da Patrão Mor."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa"
            >
              💬 Contactar via WhatsApp
            </a>
            <Link href="/admin/login" className="btn btn-outline">
              🔐 Área Admin
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {displayStats.map((s) => (
              <div key={s.key} className="border-l border-[var(--border-strong)] pl-4">
                <div className="font-serif text-3xl font-bold text-[var(--accent-light)] md:text-4xl">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
