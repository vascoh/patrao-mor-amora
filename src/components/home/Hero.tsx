import Image from "next/image";
import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";
import type { SiteStat } from "@/services/content";

const FALLBACK_STATS: SiteStat[] = [
  { id: "1", key: "years_experience", value: "44+", label: "Anos de Experiência", display_order: 0 },
  { id: "2", key: "students_trained", value: "2.800+", label: "Alunos Formados", display_order: 1 },
  { id: "3", key: "approval_rate", value: "94%", label: "Taxa de Aprovação", display_order: 2 },
  { id: "4", key: "certifications", value: "9", label: "Certificações", display_order: 3 }
];

const HERO_PHOTO = "/images/hero/sailboat-sunset.jpg";

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
      {/* Photography background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_PHOTO}
          alt=""
          fill
          priority
          quality={85}
          className="object-cover object-[50%_55%]"
          sizes="100vw"
        />
      </div>

      {/* Layered overlays: directional + vertical */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#03080f]/95 via-[#03080f]/72 to-[#060e1a]/15" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#03080f]/70 via-transparent to-[#03080f]/45" />

      {/* Bottom blend into next section */}
      <div className="absolute bottom-0 inset-x-0 z-[2] h-56 bg-gradient-to-t from-[var(--bg)] to-transparent" />

      {/* Gold accent line at top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-[3] h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50"
      />

      <div className="container-page relative z-[4] pt-32 pb-20 md:pt-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[rgba(201,168,76,0.08)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            <span className="size-1.5 animate-pulse rounded-full bg-[var(--accent-light)]" />
            Escola Certificada DGRM · Desde 1981
          </div>

          {/* Headline */}
          <h1 className="mt-6 font-serif text-[3rem] leading-[1.04] md:text-[5rem]">
            Aprende a<br />
            <em className="font-light italic text-[var(--accent-light)]">
              Navegar
            </em>{" "}
            com
            <br />
            Segurança
          </h1>

          <p className="mt-5 font-serif text-lg italic text-[var(--accent-light)]/90 md:text-xl">
            Cursos Náuticos Certificados · Amora, Margem Sul
          </p>

          <p className="mt-4 max-w-[520px] text-base font-light leading-relaxed text-[var(--text-muted)]">
            A escola náutica de referência na margem sul do Tejo. Formação
            certificada pela DGRM, instrutores com mais de 20 anos de
            experiência e a maior taxa de aprovação da região.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/#cursos" className="btn btn-primary">
              Ver Cursos
            </Link>
            <a
              href={whatsappLink(
                "Olá! Gostaria de obter mais informações sobre os cursos da Patrão Mor."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa"
            >
              Contactar via WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-10">
            {displayStats.map((s) => (
              <div key={s.key} className="border-l-2 border-[var(--accent)]/40 pl-4">
                <div className="font-serif text-3xl font-bold text-[var(--accent-light)] md:text-[2.6rem] leading-none">
                  {s.value}
                </div>
                <div className="mt-1.5 text-[0.67rem] uppercase tracking-[0.13em] text-[var(--text-subtle)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 z-[4] hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[0.58rem] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          Explorar
        </span>
        <div className="h-10 w-px animate-pulse bg-gradient-to-b from-[var(--accent)]/60 to-transparent" />
      </div>
    </section>
  );
}
