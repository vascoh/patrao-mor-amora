"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  { strong: "Inscrições Abertas", rest: "— Patrão Local Junho 2025" },
  { strong: "Últimas 3 vagas", rest: "para Patrão de Costa — Julho 2025" },
  { strong: "Escola certificada DGRM", rest: "desde 1981" },
  { strong: "Taxa de aprovação 94%", rest: "acima da média nacional" },
  { strong: "Novo curso Meteorologia Náutica", rest: "Setembro 2025" },
  { strong: "Mergulho PADI Open Water", rest: "inscrições abertas" }
];

export function AnnouncementBar() {
  const [paused, setPaused] = useState(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced.current) setPaused(true);
  }, []);

  return (
    <div
      className="relative z-[920] overflow-hidden border-b border-[var(--border)] bg-gradient-to-r from-[#03080f] via-[#0a1628] to-[#03080f] py-2.5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => !prefersReduced.current && setPaused(false)}
    >
      {/* Screen-reader content: static, always accessible */}
      <p className="sr-only">
        {items.map((i) => `${i.strong} ${i.rest}`).join(". ")}
      </p>

      {/* Visual marquee — hidden from assistive tech */}
      <div
        aria-hidden="true"
        className={`flex w-max gap-12 whitespace-nowrap ${
          paused ? "[animation-play-state:paused]" : "animate-marquee"
        }`}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]"
          >
            <span className="block size-1.5 rounded-full bg-[var(--accent)]" />
            <strong className="text-[var(--accent-light)]">{item.strong}</strong>{" "}
            {item.rest}
          </span>
        ))}
      </div>
    </div>
  );
}
