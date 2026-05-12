import type { Metadata } from "next";
import { HubPageClient } from "./HubPageClient";

export const metadata: Metadata = {
  title: "Patrão Mor — Formação Náutica",
  description: "Patrão Mor — Formação Náutica Certificada pela DGRM. Escolha a sua escola: Patrão Mor Amora ou Patrão Mor Oeiras.",
  keywords: ["patrão mor", "escola náutica", "formação náutica", "DGRM", "Amora", "Oeiras"],
  alternates: { canonical: "https://patraomor.pt" },
  openGraph: {
    title: "Patrão Mor — Formação Náutica",
    description: "Formação Náutica Certificada DGRM. Dois locais. Uma só paixão pelo mar.",
    url: "https://patraomor.pt",
    type: "website",
    locale: "pt_PT"
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrão Mor — Formação Náutica",
    description: "Formação Náutica Certificada DGRM. Dois locais. Uma só paixão pelo mar."
  }
};

export default function HubPage() {
  return <HubPageClient />;
}
