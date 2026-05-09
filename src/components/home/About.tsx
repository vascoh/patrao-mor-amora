import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: "🏛️",
    title: "Certificação DGRM",
    desc: "Escola credenciada pela Direção-Geral de Recursos Naturais, Segurança e Serviços Marítimos — os certificados têm validade nacional e europeia."
  },
  {
    icon: "🧭",
    title: "Instrutores Especializados",
    desc: "A nossa equipa é composta por instrutores com décadas de experiência no mar e em formação náutica profissional."
  },
  {
    icon: "🏆",
    title: "94% de Taxa de Aprovação",
    desc: "O nosso método de ensino garante uma das mais altas taxas de aprovação nos exames DGRM da região."
  }
];

const milestones = [
  { year: "1981", title: "Fundação", desc: "Abertura da escola náutica em Amora com os primeiros cursos de patrão." },
  { year: "1995", title: "Certificação DGRM", desc: "Reconhecimento oficial pela Direção-Geral de Recursos Marítimos." },
  { year: "2005", title: "500 Alunos", desc: "Marco de 500 alunos formados com sucesso nos exames nacionais." },
  { year: "2015", title: "Mergulho PADI", desc: "Lançamento dos cursos de mergulho certificados internacionalmente pela PADI." },
  { year: "2025", title: "2.800+ Alunos", desc: "Mais de 44 anos de excelência a formar navegadores em Portugal." }
];

export function About() {
  return (
    <section id="sobre" className="section-pad">
      <div className="container-page">

        {/* ── Grelha principal: imagem | texto ── */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Coluna da imagem */}
          <div className="relative mx-auto w-full max-w-[480px] pb-6 pr-6 lg:mx-0">
            {/* Brilho decorativo atrás */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br from-[rgba(201,168,76,0.07)] to-transparent blur-2xl"
            />

            {/* Caixa da imagem — overflow-hidden apenas aqui */}
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow)]">
              <Image
                src="/foto_patrao_mor_amora.png"
                alt="Escola náutica Patrão Mor Amora — embarcações no porto de Seixal"
                width={560}
                height={700}
                className="block h-auto w-full"
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
              />
              {/* Gradiente sobre a imagem */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#03080f]/55 via-transparent to-transparent" />
            </div>

            {/* Badge do ano — fora do overflow:hidden, posicionado no wrapper */}
            <div className="absolute bottom-0 right-0 grid size-28 place-items-center rounded-2xl bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] text-center text-[#060e1a] shadow-xl">
              <div>
                <strong className="block font-serif text-3xl font-bold leading-none">1981</strong>
                <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.12em]">
                  Fundada
                </span>
              </div>
            </div>
          </div>

          {/* Coluna de texto */}
          <div>
            <span className="section-number">01 / Sobre Nós</span>
            <div className="tag">⚓ A Nossa História</div>
            <h2 className="section-title mt-4">
              Mais de 44 anos
              <br />
              <em className="font-light italic text-[var(--accent-light)]">no mar</em>
            </h2>
            <div className="gold-divider" />
            <p className="section-sub">
              A Patrão Mor é uma das escolas náuticas mais antigas e respeitadas
              de Portugal. Desde 1981 que formamos navegadores com rigor,
              segurança e paixão pelo mar.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/40 p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-card)]/60"
                >
                  <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-[rgba(201,168,76,0.1)] text-2xl">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold">{f.title}</h4>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#cursos" className="btn btn-primary">
                Ver Todos os Cursos
              </Link>
            </div>
          </div>
        </div>

        {/* ── Marcos históricos ── */}
        <div className="mt-24">
          <div className="text-center">
            <div className="tag mx-auto">📅 A Nossa Jornada</div>
            <h3 className="mt-4 font-serif text-3xl">Marcos Históricos</h3>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/40 p-5 transition-colors hover:border-[var(--border-strong)]"
              >
                <div className="inline-flex rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] px-3 py-1 font-mono text-xs font-bold text-[#060e1a]">
                  {m.year}
                </div>
                <h4 className="mt-3 font-serif text-xl">{m.title}</h4>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
