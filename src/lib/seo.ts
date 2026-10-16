import { COMPANY, FAQ, OFFICES, SERVICES } from "@/lib/site-data";

const ORIGIN = "https://berjaya-company-profile.vercel.app";

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: COMPANY.name,
    alternateName: COMPANY.short,
    url: ORIGIN,
    logo: `${ORIGIN}/logo-bsm.png`,
    image: `${ORIGIN}/og.jpg`,
    foundingDate: String(COMPANY.founded),
    email: COMPANY.email,
    telephone: `+${COMPANY.waNumber}`,
    description:
      "Kontraktor elektrikal untuk rumah sakit, pabrik, dan gedung komersial. Instalasi listrik, panel distribusi, grounding, dan commissioning.",
    areaServed: ["Palembang", "Karawang", "Indonesia"],
    address: OFFICES.map((o) => ({
      "@type": "PostalAddress",
      addressLocality: o.city,
      streetAddress: o.line,
      addressCountry: "ID",
    })),
    knowsAbout: SERVICES.map((s) => s.title),
    sameAs: [`https://wa.me/${COMPANY.waNumber}`],
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceJsonLd(title: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url: `${ORIGIN}/layanan/${slug}`,
    provider: {
      "@type": "GeneralContractor",
      name: COMPANY.name,
    },
    areaServed: "ID",
    serviceType: "Electrical installation",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${ORIGIN}${item.path}`,
    })),
  };
}

export function profileJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: "Company Profile PT Berjaya Sukses Makmur",
    encodingFormat: "application/pdf",
    url: `${ORIGIN}/company-profile-public-safe-2025.pdf`,
    inLanguage: "id",
    about: "Electrical engineering and installation contractor",
    author: {
      "@type": "GeneralContractor",
      name: COMPANY.name,
      url: ORIGIN,
    },
  };
}

export function projectJsonLd(p: {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  location: string;
  result: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${p.title} — ${p.subtitle}`,
    description: p.result,
    dateCreated: String(p.year),
    locationCreated: {
      "@type": "Place",
      name: p.location,
    },
    url: `${ORIGIN}/proyek/${p.id}`,
    creator: {
      "@type": "GeneralContractor",
      name: COMPANY.name,
      url: ORIGIN,
    },
  };
}
