"use client";

import Image from "next/image";
import { useState } from "react";

const PHOTO = "/images/courses/seguranca.jpg";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
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
    <section className="relative overflow-hidden py-20">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={PHOTO}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#060e1a]/85 via-[#0a1628]/76 to-[#060e1a]/72" />

      <div className="container-page relative z-[2]">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="tag">Novidades Náuticas</div>
            <h3 className="mt-4 font-serif text-3xl text-white">
              Recebe novidades
              <br />
              <em className="font-light italic text-[var(--accent-light)]">e promoções</em>
            </h3>
            <div className="gold-divider" />
            <p className="text-sm text-white/72">
              Sê o primeiro a saber das novas datas, ofertas especiais e artigos
              sobre náutica.
            </p>
          </div>
          {done ? (
            <p className="font-serif text-xl font-light italic text-[var(--accent-light)]">
              Subscrito com sucesso. Obrigado!
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
                className="field-input flex-1"
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
