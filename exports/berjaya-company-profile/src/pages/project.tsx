import { Link, useParams } from "react-router-dom";
import { CtaBand } from "@/components/site/cta";
import { MarketingShell, PageHero } from "@/components/site/inner-page";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/lib/json-ld";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo";
import { SeoHead } from "@/lib/seo-head";
import {
  CATEGORY_LABEL,
  COMPANY,
  PROFILE_PDF,
  PROJECTS,
} from "@/lib/site-data";

export function ProjectRoute() {
  const { id = "" } = useParams();
  const p = PROJECTS.find((x) => x.id === id);

  if (!p) {
    return (
      <MarketingShell>
        <SeoHead title={COMPANY.name} description="Portofolio proyek elektrikal PT Berjaya Sukses Makmur." />
        <main className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h1 className="text-2xl">Proyek tidak ditemukan</h1>
          <Link to="/" className="mt-4 inline-block text-sm font-bold text-navy-bright">
            Kembali ke beranda
          </Link>
        </main>
      </MarketingShell>
    );
  }

  return (
    <MarketingShell>
      <SeoHead
        title={`${p.title} — ${p.subtitle} | ${COMPANY.short}`}
        description={`${p.subtitle}. ${p.result}`}
      />
      <main>
        <JsonLd data={projectJsonLd(p)} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Beranda", path: "/" },
            { name: p.title, path: `/proyek/${p.id}` },
          ])}
        />
        <PageHero
          eyebrow={`${CATEGORY_LABEL[p.category]} · ${p.sourcePage}`}
          title={`${p.title} — ${p.subtitle}`}
          lead={p.background}
        />
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:px-8">
          <article>
            <img
              src={p.image}
              alt={p.title + " — " + p.subtitle}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = p.fallbackImage;
              }}
              className="aspect-video w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-ink/10"
            />
            <h2 className="mt-8 text-lg">Latar belakang</h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.background}</p>
            <h2 className="mt-6 text-lg">Solusi</h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.solution}</p>
            <h2 className="mt-6 text-lg">Catatan dokumentasi</h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.result}</p>
            <p className="mt-3 text-xs leading-relaxed text-muted">Sumber: {p.sourcePage}. Nama fasilitas, tanggal pelaksanaan, nilai kontrak, dan hasil terukur tidak disimpulkan bila tidak tercantum pada halaman sumber.</p>
          </article>
          <aside className="rounded-md border border-line bg-card p-5 shadow-card">
            <p className="text-xs font-bold text-navy-bright">{CATEGORY_LABEL[p.category]}</p>
            <h2 className="mt-2 text-base">{p.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.sourcePage}</p>
            <p className="mt-4 text-xs font-bold text-muted">Lingkup</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {p.scope.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Ringkasan ini merujuk pada dokumentasi sumber. Informasi yang tidak tercantum pada halaman sumber tidak diasumsikan.
            </p>
            <Button asChild className="mt-5" size="block">
              <Link to="/kampanye-instalasi-listrik">Ajukan diskusi proyek</Link>
            </Button>
            <Button asChild variant="outline" className="mt-3" size="block">
              <a href={PROFILE_PDF}>
                Minta company profile via email
              </a>
            </Button>
          </aside>
        </section>
        <CtaBand
          title="Punya fasilitas dengan kebutuhan serupa?"
          note="Kirim brief melalui WhatsApp atau email untuk mengonfirmasi ruang lingkup pekerjaan."
        >
          <Button asChild>
            <a href="/#contact">Kirim brief</a>
          </Button>
        </CtaBand>
      </main>
    </MarketingShell>
  );
}
