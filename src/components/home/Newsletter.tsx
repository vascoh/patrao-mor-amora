"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Persistido como lead com source=newsletter
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "(newsletter)",
        phone: "(newsletter)",
        email,
        message: "Subscrição newsletter",
        privacy: true,
        source: "newsletter"
      })
    }).catch(() => {});
    setDone(true);
  }

  return (
    <section className="bg-gradient-to-r from-[#0a1628] via-[#0e2040] to-[#0a1628] py-14">
      <div className="container-page">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-3xl">Recebe novidades e promoções</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Sê o primeiro a saber das novas datas, ofertas especiais e artigos
              sobre náutica.
            </p>
          </div>
          {done ? (
            <p className="text-sm font-semibold text-[var(--accent-light)]">
              ✅ Subscrito com sucesso. Obrigado!
            </p>
          ) : (
            <form
              onSubmit={submit}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O teu melhor email"
                required
                className="field-input"
              />
              <button type="submit" className="btn btn-primary">
                Subscrever
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
