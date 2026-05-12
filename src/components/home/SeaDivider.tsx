import Image from "next/image";
import Link from "next/link";

const PHOTO = "/images/shared/sea-bg.jpg";

export function SeaDivider() {
  return (
    <div className="relative h-[320px] overflow-hidden md:h-[400px]">
      <Image
        src={PHOTO}
        alt="Barco a vela em águas calmas — Patrão Mor Amora"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Deep overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#03080f]/78 via-[#03080f]/44 to-[#03080f]/58" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
        <div className="gold-divider mx-auto" />
        <blockquote className="font-serif text-2xl font-light italic text-white/90 md:text-3xl">
          &ldquo;O mar não te dá o que queres; dá-te o que mereces.&rdquo;
        </blockquote>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
          44 anos a formar navegadores em Portugal
        </p>
        <Link
          href="/amora#cursos"
          className="btn btn-primary"
        >
          Iniciar a Minha Jornada
        </Link>
      </div>
    </div>
  );
}
