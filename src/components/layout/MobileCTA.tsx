"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";

export function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-[680] grid grid-cols-2 gap-2 transition md:hidden ${
        show ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <Link href="/amora#contacto" className="btn btn-primary !w-full !justify-center">
        Inscrever-me
      </Link>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar via WhatsApp"
        className="btn btn-wa !w-full !justify-center"
      >
        <span aria-hidden="true">💬</span> WhatsApp
      </a>
    </div>
  );
}
