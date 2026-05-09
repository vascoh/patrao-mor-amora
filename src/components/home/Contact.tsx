import { ContactForm } from "@/components/forms/ContactForm";
import { whatsappLink } from "@/lib/whatsapp";
import type { Course } from "@/types/database";

const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "212 345 678";
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "geral@patraomor.pt";

const cards = [
  {
    icon: "📍",
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
    icon: "📞",
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
    icon: "✉️",
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
    icon: "⏰",
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
    <section id="contacto" className="section-pad bg-[var(--bg-card)]">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="section-number">06 / Contacto</span>
            <div className="tag">📍 Estamos aqui para ajudar</div>
            <h2 className="section-title mt-3">Fala Connosco</h2>
            <div className="gold-divider" />
            <p className="section-sub">
              Tens alguma dúvida? Fala connosco — estamos disponíveis de
              segunda a sábado.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {cards.map((c) => (
                <div
                  key={c.title}
                  className="flex gap-3 rounded-[12px] border border-[var(--border)] bg-[var(--bg)] p-4"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[rgba(201,168,76,0.1)] text-lg">
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

            <div className="mt-8 rounded-[16px] bg-gradient-to-br from-[#1ebe5a] to-[#0f8b3f] p-6 text-white shadow-[0_10px_40px_rgba(37,211,102,0.25)]">
              <h4 className="font-serif text-2xl">
                💬 Resposta em minutos via WhatsApp
              </h4>
              <p className="mt-1 text-sm text-white/80">
                Envia-nos uma mensagem agora e recebe toda a informação sobre
                preços, datas e inscrições.
              </p>
              <a
                href={whatsappLink(
                  "Olá! Gostaria de obter mais informações sobre os cursos da Patrão Mor."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-4 w-full justify-center border border-white/30 bg-white/15 text-white hover:bg-white/25"
              >
                💬 Enviar Mensagem WhatsApp
              </a>
            </div>

            <div className="mt-6 overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)]">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/shared/sea-bg.jpg"
                  alt="Localização Patrão Mor Amora"
                  className="h-full w-full object-cover object-center opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03080f]/95 via-[#03080f]/50 to-[#03080f]/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-3xl">📍</div>
                    <p className="font-serif text-xl font-light text-white">Amora, Seixal</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--accent)]">Margem Sul do Tejo</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[rgba(201,168,76,0.1)] text-lg">
                  🗺️
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                  <p className="font-semibold text-[var(--text)]">Como chegar</p>
                  <p>Escola Náutica Patrão Mor · Amora, Seixal · 2840</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Amora+Seixal+Portugal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto shrink-0 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                >
                  Abrir Mapa ↗
                </a>
              </div>
            </div>
          </div>

          <ContactForm
            courseOptions={courses.map((c) => ({
              value: c.name,
              label: c.name
            }))}
          />
        </div>
      </div>
    </section>
  );
}
