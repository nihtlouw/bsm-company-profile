import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import {
  FeedbackLayer,
  MAIN_WA,
  SiteFooter,
  SiteHeader,
  WhatsAppFloat,
} from "@/components/site/chrome";
import { StickyCta } from "@/components/site/cta";
import { Button } from "@/components/ui/button";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <StickyCta />
      <WhatsAppFloat href={MAIN_WA} />
      <FeedbackLayer />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="bg-navy py-12 text-on-navy md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-xs font-bold tracking-wide text-brand-mist">{eyebrow}</p>
        <h1 className="mt-3 max-w-[18ch] text-4xl leading-tight text-paper md:text-5xl">{title}</h1>
        <p className="lead mt-4 max-w-[52ch] text-lg text-on-navy-muted">{lead}</p>
        <div className="mt-8 flex flex-wrap gap-3.5">
          <Button asChild>
            <Link to="/kampanye-instalasi-listrik">Ajukan survey lokasi</Link>
          </Button>
          <Button asChild variant="outline-light">
            <Link to="/profil-perusahaan">Company profile</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
