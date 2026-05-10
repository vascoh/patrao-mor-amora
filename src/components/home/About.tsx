import Link from "next/link";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Certificação DGRM",
    desc: "Escola credenciada pela Direção-Geral de Recursos Naturais, Segurança e Serviços Marítimos — certificados com validade nacional e europeia."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Instrutores Especializados",
    desc: "Equipa com décadas de experiência no mar e em formação náutica profissional. Método testado, resultados comprovados."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M8.56 2.9A7 7 0 0 1 19 9v1h2v4h-2l-1.5 5H9l-.5-2H5v-4h2V9a7 7 0 0 1 1.56-6.1z" />
        <path d="M14 14h-4" />
      </svg>
    ),
    title: "94% de Taxa de Aprovação",
    desc: "Uma das mais altas taxas de aprovação nos exames DGRM da região, conseguida com método de ensino rigoroso e personalizado."
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

        {/* Main grid: image | text */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Image column */}
          <div className="relative mx-auto w-full max-w-[480px] pb-8 pr-8 lg:mx-0">
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br from-[rgba(201,168,76,0.08)] to-transparent blur-2xl"
            />

            {/* Main image */}
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/foto_patrao_mor_amora.jpg"
                alt="Escola náutica Patrão Mor Amora — embarcações no porto de Seixal"
                width={560}
                height={700}
                loading="eager"
                decoding="async"
                className="block h-auto w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03080f]/50 via-transparent to-transparent" />
            </div>

            {/* Year badge */}
            <div className="absolute bottom-0 right-0 grid size-28 place-items-center rounded-2xl bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] text-center text-[#060e1a] shadow-xl">
              <div>
                <strong className="block font-serif text-3xl font-bold leading-none">1981</strong>
                <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.12em]">
                  Fundada
                </span>
              </div>
            </div>

          </div>

          {/* Text column */}
          <div>
            <span className="section-number">01 / Sobre Nós</span>
            <div className="tag">A Nossa História</div>
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

            <div className="mt-8 flex flex-col gap-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/40 p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-card)]/70"
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-[rgba(201,168,76,0.1)] text-[var(--accent)]">
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

        {/* Historical milestones */}
        <div className="mt-24">
          <div className="text-center">
            <div className="tag mx-auto">A Nossa Jornada</div>
            <h3 className="mt-4 font-serif text-3xl">Marcos Históricos</h3>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="group rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/40 p-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-card)]/70"
              >
                <div className="inline-flex rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] px-3 py-1 font-mono text-xs font-bold text-[#060e1a]">
                  {m.year}
                </div>
                <h4 className="mt-3 font-serif text-xl">{m.title}</h4>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{m.desc}</p>
                {i < milestones.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="mt-4 hidden h-px w-full bg-gradient-to-r from-[var(--accent)]/20 to-transparent lg:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
