import { Link } from "react-router-dom";
import { MarketingShell } from "@/components/site/inner-page";
import { SeoHead } from "@/lib/seo-head";
import { COMPANY } from "@/lib/site-data";

export function NotFoundPage() {
  return (
    <MarketingShell>
      <SeoHead title={`Halaman tidak ditemukan | ${COMPANY.short}`} description={COMPANY.tagline} />
      <main className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <p className="text-xs font-bold tracking-wide text-brand">404</p>
        <h1 className="mt-2 text-3xl">Halaman tidak ditemukan</h1>
        <p className="mt-3 max-w-md text-muted">
          Tautan mungkin sudah berubah. Kembali ke beranda atau unduh company profile.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm font-bold text-navy-bright">
          Kembali ke beranda →
        </Link>
      </main>
    </MarketingShell>
  );
}
