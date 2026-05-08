import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-6 text-center">
      <div className="text-8xl" aria-hidden="true">⚓</div>
      <h1 className="mt-6 font-serif text-5xl font-bold md:text-7xl">404</h1>
      <p className="mt-4 font-serif text-2xl italic text-[var(--accent-light)]">
        Página não encontrada
      </p>
      <p className="mt-4 max-w-md text-[var(--text-muted)]">
        Esta página não existe ou foi movida. Navega de volta à página inicial
        para encontrar o que procuras.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          ← Voltar ao início
        </Link>
        <Link href="/#cursos" className="btn btn-outline">
          Ver Cursos
        </Link>
      </div>
    </div>
  );
}
