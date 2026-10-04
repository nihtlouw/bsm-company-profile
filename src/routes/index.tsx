import { createFileRoute } from "@tanstack/react-router";
import { StickyCta } from "@/components/site/cta";
import {
  FeedbackLayer,
  MAIN_WA,
  SiteFooter,
  SiteHeader,
  WhatsAppFloat,
} from "@/components/site/chrome";
import { HomePage } from "@/components/site/home-page";
import { COMPANY, SEO } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: SEO.homeTitle },
      { name: "description", content: SEO.homeDescription },
      { name: "keywords", content: "kontraktor listrik, instalasi listrik rumah sakit, panel distribusi, MCC, grounding, Palembang, Karawang" },
      { name: "author", content: COMPANY.name },
    ],
  }),
});

function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-modal focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-paper"
      >
        Lewati ke konten
      </a>
      <SiteHeader />
      <HomePage />
      <SiteFooter />
      <StickyCta />
      <WhatsAppFloat href={MAIN_WA} />
      <FeedbackLayer />
    </>
  );
}
