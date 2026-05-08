"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-6 text-center">
      <div className="text-7xl" aria-hidden="true">🌊</div>
      <h1 className="mt-6 font-serif text-4xl font-bold md:text-5xl">
        Algo correu mal
      </h1>
      <p className="mt-4 max-w-md text-[var(--text-muted)]">
        Ocorreu um erro inesperado. Podes tentar novamente ou voltar à página
        inicial.
      </p>
      {error.digest ? (
        <p className="mt-2 font-mono text-xs text-[var(--text-subtle)]">
          Erro: {error.digest}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={reset} className="btn btn-primary">
          Tentar novamente
        </button>
        <Link href="/" className="btn btn-outline">
          ← Início
        </Link>
      </div>
    </div>
  );
}
