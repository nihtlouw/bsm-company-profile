import { Link } from "@tanstack/react-router";
import { Download, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CtaBand } from "@/components/site/cta";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/lib/json-ld";
import { breadcrumbJsonLd, profileJsonLd } from "@/lib/seo";
import {
  COMPANY,
  PROFILE_FILENAME,
  PROFILE_PAGES,
  PROFILE_PDF,
} from "@/lib/site-data";

export function ProfilePage() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i == null ? i : Math.min(PROFILE_PAGES.length - 1, i + 1)));
      if (e.key === "ArrowLeft") setOpen((i) => (i == null ? i : Math.max(0, i - 1)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <main>
      <JsonLd data={profileJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Beranda", path: "/" },
          { name: "Company Profile", path: "/profil-perusahaan" },
        ])}
      />
      <section className="bg-navy py-14 text-on-navy md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.15fr_0.85fr] md:px-8">
          <div>
            <p className="text-xs font-bold tracking-wide text-brand-mist">Dokumen resmi 2026</p>
            <h1 className="mt-3 max-w-[16ch] text-4xl leading-tight text-paper md:text-5xl">
              Company profile siap unduh
            </h1>
            <p className="lead mt-4 max-w-[48ch] text-lg text-on-navy-muted">
              Delapan halaman A4: legalitas, layanan elektrikal, portofolio rumah sakit & pabrik,
              plus kendali proyek kurva S. Lampiran untuk tender dan vendor registration.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button asChild>
                <a href={PROFILE_PDF} download={PROFILE_FILENAME}>
                  <Download className="size-4" />
                  Unduh PDF
                </a>
              </Button>
              <Button asChild variant="outline-light">
                <a href="/#contact">Minta salinan legalitas</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-on-navy-muted">
              {COMPANY.name} · Palembang & Karawang · {PROFILE_PAGES.length} halaman
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(0)}
            className="overflow-hidden rounded-lg border border-paper/15 bg-navy-mid text-left shadow-panel"
          >
            <img
              src={PROFILE_PAGES[0].src}
              alt="Sampul company profile PT Berjaya Sukses Makmur"
              className="aspect-sheet w-full object-cover object-top"
            />
          </button>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="text-2xl">Isi dokumen</h2>
          <p className="mt-1.5 text-sm text-muted">Klik halaman untuk memperbesar. Unduh untuk salinan penuh.</p>
          <Reveal stagger className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {PROFILE_PAGES.map((page, i) => (
              <button
                key={page.src}
                type="button"
                onClick={() => setOpen(i)}
                className="group overflow-hidden rounded-md border border-line bg-card text-left shadow-card"
              >
                <img
                  src={page.src}
                  alt={`${page.title} — halaman ${i + 1}`}
                  className="aspect-sheet w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <span className="block px-3 py-3">
                  <span className="block text-xs font-bold tracking-wide text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 block text-sm font-bold">{page.title}</span>
                  <span className="mt-0.5 block text-xs text-muted">{page.note}</span>
                </span>
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:grid-cols-3 md:px-8">
          {[
            { title: "Untuk tender", body: "Legalitas NIB, SBU, SIUJK, SMK3 dirangkum siap dilampirkan." },
            { title: "Untuk owner", body: "Portofolio fasilitas kritis plus cara kerja dan kurva S." },
            { title: "Untuk vendor reg", body: "Kontak dua cabang, email, dan ajakan kerja sama di halaman terakhir." },
          ].map((item) => (
            <article key={item.title} className="rounded-md border border-line bg-card p-5 shadow-card">
              <FileText className="size-4 text-brand" />
              <h3 className="mt-3 text-base">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Butuh survey sebelum mengirim brief?"
        note="Tim Palembang & Karawang merespons dalam 1×24 jam hari kerja."
      >
        <Button asChild>
          <Link to="/kampanye-instalasi-listrik">Minta survey gratis</Link>
        </Button>
        <Button asChild variant="outline-light">
          <a href={PROFILE_PDF} download={PROFILE_FILENAME}>
            Unduh PDF
          </a>
        </Button>
      </CtaBand>

      {open != null ? (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center bg-navy/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={PROFILE_PAGES[open].title}
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-h-[90dvh] w-full max-w-3xl overflow-auto rounded-lg bg-card p-3 shadow-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between gap-3 px-1">
              <p className="text-sm font-bold">
                {PROFILE_PAGES[open].title}
                <span className="ml-2 text-xs font-medium text-muted">
                  {open + 1} / {PROFILE_PAGES.length}
                </span>
              </p>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-[10px] border border-line"
                onClick={() => setOpen(null)}
              >
                <X className="size-5" />
                <span className="sr-only">Tutup</span>
              </button>
            </div>
            <img
              src={PROFILE_PAGES[open].src}
              alt={PROFILE_PAGES[open].title}
              className="w-full rounded-md"
            />
            <div className="mt-3 flex justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={open === 0}
                onClick={() => setOpen(open - 1)}
              >
                Sebelumnya
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={open === PROFILE_PAGES.length - 1}
                onClick={() => setOpen(open + 1)}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
