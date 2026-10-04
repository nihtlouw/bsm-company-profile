import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/cta";
import { MarketingShell, PageHero } from "@/components/site/inner-page";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/lib/json-ld";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { COMPANY, PROFILE_FILENAME, PROFILE_PDF, SERVICE_PAGES, SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/layanan/$slug")({
  component: ServiceRoute,
  head: ({ params }) => {
    const page = SERVICE_PAGES[params.slug];
    return {
      meta: [
        { title: page ? `${page.title} | ${COMPANY.short}` : COMPANY.name },
        {
          name: "description",
          content: page?.description ?? "Layanan elektrikal PT Berjaya Sukses Makmur.",
        },
      ],
    };
  },
});

function ServiceRoute() {
  const { slug } = Route.useParams();
  const page = SERVICE_PAGES[slug];

  if (!page) {
    return (
      <MarketingShell>
        <main className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h1 className="text-2xl">Layanan tidak ditemukan</h1>
          <Link to="/" className="mt-4 inline-block text-sm font-bold text-navy-bright">
            Kembali ke beranda
          </Link>
        </main>
      </MarketingShell>
    );
  }

  return (
    <MarketingShell>
      <main>
        <JsonLd data={serviceJsonLd(page.title, page.description, page.slug)} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Beranda", path: "/" },
            { name: page.title, path: `/layanan/${page.slug}` },
          ])}
        />
        <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_0.8fr] md:px-8">
          <article>
            {page.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mb-4 text-[0.95rem] leading-relaxed text-ink">
                {p}
              </p>
            ))}
            <ol className="mt-6 space-y-3">
              {page.steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-extrabold text-brand">
                    {i + 1}
                  </span>
                  <span className="pt-1.5 font-semibold">{step}</span>
                </li>
              ))}
            </ol>
          </article>
          <aside className="rounded-md border border-line bg-card p-5 shadow-card">
            <h2 className="text-base">Layanan lain</h2>
            <ul className="mt-3 space-y-2">
              {SERVICES.filter((s) => s.id !== slug).map((s) => (
                <li key={s.id}>
                  <Link
                    to="/layanan/$slug"
                    params={{ slug: s.id }}
                    className="text-sm font-bold text-navy-bright"
                  >
                    {s.title} →
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={PROFILE_PDF}
              download={PROFILE_FILENAME}
              className="mt-5 inline-block text-sm font-bold text-brand"
            >
              Unduh company profile
            </a>
          </aside>
        </section>
        <CtaBand
          title="Butuh survey untuk pekerjaan ini?"
          note="Tim Palembang & Karawang merespons dalam 1×24 jam hari kerja."
        >
          <Button asChild>
            <Link to="/kampanye-instalasi-listrik">Minta survey gratis</Link>
          </Button>
          <Button asChild variant="outline-light">
            <a href="/#contact">Kirim brief</a>
          </Button>
        </CtaBand>
      </main>
    </MarketingShell>
  );
}
