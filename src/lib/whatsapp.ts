const FALLBACK = "351912345678";

export function whatsappNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? FALLBACK;
}

export function whatsappLink(message?: string) {
  const number = whatsappNumber();
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `https://wa.me/${number}${text}`;
}

export function whatsappForCourse(courseName: string) {
  return whatsappLink(
    `Olá! Tenho interesse no curso "${courseName}" da Patrão Mor. Podem enviar-me mais informações?`
  );
}
