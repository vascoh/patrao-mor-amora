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

const stats = [
  { value: "1981", label: "Fundada" },
  { value: "+5000", label: "Alunos Formados" },
  { value: "94%", label: "Taxa de Aprovação" },
  { value: "44+", label: "Anos de Experiência" }
];

const milestones = [
  { year: "1981", title: "Fundação", desc: "Abertura da escola náutica em Amora com os primeiros cursos de patrão." },
  { year: "1995", title: "Certificação DGRM", desc: "Reconhecimento oficial pela Direção-Geral de Recursos Marítimos." },
  { year: "2005", title: "500 Alunos", desc: "Marco de 500 alunos formados com sucesso nos exames nacionais." },
  { year: "2025", title: "2.800+ Alunos", desc: "Mais de 44 anos de excelência a formar navegadores em Portugal." }
];

export function About() {
  return (
    <section id="sobre" className="section-pad">
      <div className="container-page">

        {/* Section header */}
        <span className="section-number">01 / Sobre Nós</span>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="section-title">
              Mais de 44 anos
              <br />
              <em className="font-light italic text-[var(--accent-light)]">no mar</em>
            </h2>
            <div className="gold-divider mt-5" />
            <p className="section-sub mt-4">
              A Patrão Mor é uma das escolas náuticas mais antigas e respeitadas
              de Portugal. Desde 1981 que formamos navegadores com rigor,
              segurança e paixão pelo mar na margem sul do Tejo.
            </p>
          </div>
          <div className="tag shrink-0">A Nossa História</div>
        </div>

        {/* Stats row — gap-px trick for clean gold separators */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.12)] md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.value}
              className="flex flex-col justify-center bg-[var(--bg)] px-8 py-10"
            >
              <div className="font-serif text-[2.8rem] font-bold leading-none text-[var(--accent-light)] md:text-[3.4rem]">
                {s.value}
              </div>
              <div className="mt-3 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-subtle)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/40 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-card)]"
            >
              <div className="mb-5 grid size-12 place-items-center rounded-xl border border-[var(--border)] bg-[rgba(201,168,76,0.06)] text-[var(--accent)] transition-colors duration-300 group-hover:border-[var(--border-strong)] group-hover:bg-[rgba(201,168,76,0.1)]">
                {f.icon}
              </div>
              <h4 className="font-serif text-xl">{f.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/#cursos" className="btn btn-primary">
            Ver Todos os Cursos
          </Link>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <div className="text-center">
            <div className="tag mx-auto">A Nossa Jornada</div>
            <h3 className="mt-4 font-serif text-3xl">Marcos Históricos</h3>
          </div>

          <div className="relative mt-14">
            {/* Connecting line — desktop only */}
            <div
              aria-hidden="true"
              className="absolute top-[1.375rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.35)] to-transparent hidden lg:block"
            />

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Dot */}
                  <div className="relative z-[1] grid size-11 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--bg)]">
                    <div className="size-2.5 rounded-full bg-[var(--accent)]" />
                  </div>

                  {/* Year badge */}
                  <div className="mt-4 inline-flex rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] px-3.5 py-1 font-mono text-xs font-bold text-[#060e1a]">
                    {m.year}
                  </div>

                  <h4 className="mt-3 font-serif text-xl">{m.title}</h4>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
