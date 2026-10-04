import { StickyCta } from "@/components/site/cta";
import {
  FeedbackLayer,
  MAIN_WA,
  SiteFooter,
  SiteHeader,
  WhatsAppFloat,
} from "@/components/site/chrome";
import { HomePage } from "@/components/site/home-page";
import { SeoHead } from "@/lib/seo-head";
import { SEO } from "@/lib/site-data";

export function HomeRoute() {
  return (
    <>
      <SeoHead title={SEO.homeTitle} description={SEO.homeDescription} />
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
