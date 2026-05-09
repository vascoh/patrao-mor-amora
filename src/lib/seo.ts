import type { Course, CourseDate, CourseLevel, BlogPost } from "@/types/database";

// ─── Site configuration ───────────────────────────────────────────────────────

const raw = (process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "212 345 678").replace(/\s/g, "");

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://patraomor.pt",
  name: "Patrão Mor Amora",
  legalName: "Patrão Mor Amora — Escola Náutica, Lda.",
  tagline: "Escola Náutica Certificada DGRM",
  description:
    "Escola náutica certificada pela DGRM desde 1981. Cursos de Patrão Local, Patrão de Costa, Alto Mar, Vela e Mergulho PADI em Amora, Seixal, Margem Sul.",
  phone: `+351${raw}`,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "geral@patraomor.pt",
  foundingDate: "1981",
  address: {
    streetAddress: "Marina de Seixal",
    addressLocality: "Amora",
    addressRegion: "Setúbal",
    postalCode: "2835",
    addressCountry: "PT",
  },
  geo: { latitude: "38.6292", longitude: "-9.1058" },
  priceRange: "€€",
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL as string | undefined,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL as string | undefined,
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL as string | undefined,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const levelLabel: Record<CourseLevel, string> = {
  iniciante: "Beginner",
  intermedio: "Intermediate",
  avancado: "Advanced",
  profissional: "Professional",
};

function upcomingDates(dates: CourseDate[]) {
  const now = new Date();
  return dates.filter((d) => new Date(d.start_date) > now);
}

// ─── JSON-LD builders ─────────────────────────────────────────────────────────

export function buildOrgJsonLd() {
  const { url, name, legalName, description, phone, email, foundingDate, address, geo, priceRange, social } =
    siteConfig;

  const sameAs = [social.facebook, social.instagram, social.youtube].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": `${url}/#organization`,
    name,
    legalName,
    description,
    url,
    logo: {
      "@type": "ImageObject",
      url: `${url}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    telephone: phone,
    email,
    foundingDate,
    address: { "@type": "PostalAddress", ...address },
    geo: { "@type": "GeoCoordinates", ...geo },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    priceRange,
    currenciesAccepted: "EUR",
    areaServed: ["Amora", "Seixal", "Almada", "Setúbal", "Lisboa"],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function buildWebSiteJsonLd() {
  const { url, name } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name,
    url,
    inLanguage: "pt-PT",
    publisher: { "@id": `${url}/#organization` },
  };
}

export function buildCourseJsonLd(course: Course, dates: CourseDate[] = []) {
  const { url } = siteConfig;
  const courseUrl = `${url}/cursos/${course.slug}`;
  const future = upcomingDates(dates);

  const instances = future.slice(0, 5).map((d) => ({
    "@type": "CourseInstance",
    courseMode: "onsite",
    startDate: d.start_date,
    ...(d.end_date ? { endDate: d.end_date } : {}),
    location: {
      "@type": "Place",
      name: d.location ?? siteConfig.address.addressLocality,
      address: {
        "@type": "PostalAddress",
        addressLocality: d.location ?? siteConfig.address.addressLocality,
        addressCountry: "PT",
      },
    },
    offers: {
      "@type": "Offer",
      price: Number(course.price),
      priceCurrency: "EUR",
      availability:
        d.available_slots > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      url: courseUrl,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${courseUrl}/#course`,
    name: course.name,
    description: course.description,
    url: courseUrl,
    image: `${courseUrl}/opengraph-image`,
    inLanguage: "pt-PT",
    educationalLevel: levelLabel[course.level],
    provider: { "@id": `${url}/#organization` },
    offers: {
      "@type": "Offer",
      price: Number(course.price),
      priceCurrency: "EUR",
      availability:
        future.length > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      url: courseUrl,
      seller: { "@id": `${url}/#organization` },
    },
    ...(instances.length ? { hasCourseInstance: instances } : {}),
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildArticleJsonLd(post: BlogPost) {
  const { url } = siteConfig;
  const articleUrl = `${url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}/#article`,
    headline: post.title,
    description: post.excerpt,
    url: articleUrl,
    inLanguage: "pt-PT",
    datePublished: post.published_at,
    image: `${articleUrl}/opengraph-image`,
    author: {
      "@type": "Organization",
      "@id": `${url}/#organization`,
    },
    publisher: { "@id": `${url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    isPartOf: { "@id": `${url}/#website` },
  };
}

export function buildFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
