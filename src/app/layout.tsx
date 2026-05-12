import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, DM_Mono } from "next/font/google";
import Script from "next/script";
import { buildOrgJsonLd, buildWebSiteJsonLd, siteConfig } from "@/lib/seo";
import { CookieConsent } from "@/components/shared/CookieConsent";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap"
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

const { url: siteUrl, name, description } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Patrão Mor Amora — Escola Náutica Certificada DGRM",
    template: "%s · Patrão Mor Amora"
  },
  description,
  keywords: [
    "escola náutica",
    "escola náutica Seixal",
    "escola náutica Amora",
    "escola náutica margem sul",
    "patrão local",
    "patrão de costa",
    "patrão de alto mar",
    "cursos náuticos Lisboa",
    "cursos náuticos Seixal",
    "cursos náuticos Almada",
    "carta de navegador",
    "carta náutica",
    "patrão local Amora",
    "DGRM certificado",
    "cursos mergulho PADI",
    "escola vela"
  ],
  authors: [{ name, url: siteUrl }],
  creator: name,
  publisher: name,
  category: "education",
  openGraph: {
    title: "Patrão Mor Amora — Escola Náutica Certificada DGRM",
    description,
    locale: "pt_PT",
    type: "website",
    url: siteUrl,
    siteName: name
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrão Mor Amora — Escola Náutica Certificada DGRM",
    description,
    site: "@patraomor"
  },
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION
  }
};

export const viewport: Viewport = {
  themeColor: "#f4f7fb",
  width: "device-width",
  initialScale: 1
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const fbId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const orgLd = buildOrgJsonLd();
const websiteLd = buildWebSiteJsonLd();

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      data-theme="light"
      className={`${outfit.variable} ${cormorant.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Global structured data — crawled on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#060e1a]"
        >
          Saltar para o conteúdo
        </a>

        {children}

        {gaId ? (
          <>
            {/* Google Consent Mode v2 — default denied until user accepts */}
            <Script id="consent-default" strategy="beforeInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`gtag('js', new Date());gtag('config','${gaId}',{send_page_view:false});`}
            </Script>
          </>
        ) : null}
        {fbId ? (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${fbId}');fbq('track','PageView');`}
          </Script>
        ) : null}
        <CookieConsent />
      </body>
    </html>
  );
}
