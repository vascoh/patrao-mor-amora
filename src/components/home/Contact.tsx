import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { whatsappLink } from "@/lib/whatsapp";
import type { Course } from "@/types/database";

const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "212 345 678";
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "geral@patraomor.pt";

const cards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-[var(--accent)]">
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Morada",
    body: (
      <>
        Escola Náutica Patrão Mor
        <br />
        Amora, Seixal — Margem Sul
        <br />
        2840 — Amora
      </>
    )
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-[var(--accent)]">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
      </svg>
    ),
    title: "Telefone / WhatsApp",
    body: (
      <>
        <a href={`tel:+351${phone.replace(/\s/g, "")}`}>{phone}</a>
        <br />
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)]"
        >
          WhatsApp directo
        </a>
      </>
    )
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-[var(--accent)]">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    title: "Email",
    body: (
      <>
        <a href={`mailto:${email}`}>{email}</a>
        <br />
        <a href="mailto:inscricoes@patraomor.pt">inscricoes@patraomor.pt</a>
      </>
    )
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-[var(--accent)]">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Horário",
    body: (
      <>
        Segunda a Sexta: 9h–19h
        <br />
        Sábado: 9h–13h
      </>
    )
  }
];

export function Contact({ courses }: { courses: Course[] }) {
  return (
    <section id="contacto" className="section-pad bg-[var(--bg-card)] relative overflow-hidden">
      {/* Atmospheric hero backdrop — very subtle */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/images/hero/sailboat-sunset.jpg"
          alt=""
          fill
          className="object-cover object-[50%_40%] opacity-[0.04]"
          sizes="100vw"
          quality={40}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-card)]/50 via-transparent to-[var(--bg-card)]/50" />
      </div>
      <div className="container-page relative z-[1]">

        {/* Section header */}
        <span className="section-number">06 / Contacto</span>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="tag">Estamos aqui para ajudar</div>
            <h2 className="section-title mt-3">Fala Connosco</h2>
            <div className="gold-divider" />
            <p className="section-sub">
              Tens alguma dúvida? Fala connosco — estamos disponíveis de
              segunda a sábado.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">

          {/* LEFT — school photo + contact info cards */}
          <div className="flex flex-col gap-6">

            {/* School photo with 1981 badge */}
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/foto_patrao_mor_amora.jpg"
                alt="Escola náutica Patrão Mor Amora — embarcações no porto de Seixal"
                width={560}
                height={380}
                loading="lazy"
                decoding="async"
                className="block h-64 w-full object-cover md:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03080f]/48 via-[#03080f]/12 to-transparent" />

            </div>

            {/* Contact info cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {cards.map((c) => (
                <div
                  key={c.title}
                  className="flex gap-3 rounded-[12px] border border-[var(--border)] bg-[var(--bg)] p-4 transition-colors duration-200 hover:border-[var(--border-strong)]"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[rgba(201,168,76,0.08)]">
                    {c.icon}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    <h4 className="text-base font-semibold text-[var(--text)]">
                      {c.title}
                    </h4>
                    {c.body}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form + WhatsApp CTA */}
          <div className="flex flex-col gap-6">
            <ContactForm
              courseOptions={courses.map((c) => ({
                value: c.name,
                label: c.name
              }))}
            />

            {/* WhatsApp CTA — navy/gold, no green */}
            <div className="rounded-[16px] border border-[var(--border-strong)] bg-[var(--bg)] p-6">
              <h4 className="font-serif text-xl text-[var(--text)]">
                Resposta em minutos via WhatsApp
              </h4>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Envia-nos uma mensagem agora e recebe toda a informação sobre
                preços, datas e inscrições.
              </p>
              <a
                href={whatsappLink(
                  "Olá! Gostaria de obter mais informações sobre os cursos da Patrão Mor."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa mt-4 w-full justify-center"
              >
                Enviar Mensagem WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
