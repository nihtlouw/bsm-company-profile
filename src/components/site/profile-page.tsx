import { Link } from "@tanstack/react-router";
import { FileCheck, MapPin, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/site/cta";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/lib/json-ld";
import { breadcrumbJsonLd, profileJsonLd } from "@/lib/seo";
import {
  CERTIFICATIONS,
  COMPANY,
  OFFICES,
  PROJECTS,
  CATEGORY_LABEL,
} from "@/lib/site-data";

export function ProfilePage() {
  return (
    <main>
      <JsonLd data={profileJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Beranda", path: "/" },
          { name: "Company Profile & Dokumen", path: "/profil-perusahaan" },
        ])}
      />

      <section className="bg-navy py-14 text-on-navy md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-8">
          <div>
            <p className="text-xs font-bold tracking-wide text-brand-mist">Company Profile BSM Karawang 2025 · dokumen pendukung 2025–2026</p>
            <h1 className="mt-3 max-w-[17ch] text-4xl leading-tight text-paper md:text-5xl">
              Company profile & dokumen perusahaan
            </h1>
            <p className="lead mt-4 max-w-[50ch] text-lg text-on-navy-muted">
              {COMPANY.name} bergerak di bidang mechanical, electrical, kontraktor, general supplier,
              civil, trading & EO. Halaman ini merangkum dokumentasi pekerjaan dan informasi legal
              yang tercantum pada berkas perusahaan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button asChild>
                <a href="mailto:bsmkrw.inc@gmail.com?subject=Permintaan%20Company%20Profile%20Versi%20Publik">
                  Minta company profile versi publik
                </a>
              </Button>
              <Button asChild variant="outline-light">
                <a href="mailto:bsmkrw.inc@gmail.com?subject=Permintaan%20Dokumen%20Vendor%20BSM">
                  Minta dokumen vendor
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-on-navy-muted">
              Tahun berdiri yang tercantum: 2014 · Kantor Palembang & Karawang
            </p>
          </div>
          <div className="rounded-lg border border-paper/15 bg-navy-mid p-6 shadow-panel">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-6 shrink-0 text-brand-mist" />
              <div>
                <h2 className="text-lg font-bold text-paper">Informasi berdasarkan dokumen</h2>
                <p className="mt-2 text-sm leading-relaxed text-on-navy-muted">
                  Angka jumlah proyek, persentase ketepatan waktu, testimonial, dan nama klien per
                  studi kasus tidak dicantumkan sebagai metrik pada halaman ini tanpa bukti terpisah.
                  Dokumen resmi tetap menjadi rujukan untuk tanggal, izin, dan klasifikasi usaha.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-7">
            <h2 className="text-2xl md:text-[1.9rem]">Legalitas & kualifikasi vendor</h2>
            <p className="mt-1.5 text-sm text-muted">
              Ringkasan dari NIB PT BSM 2025, surat pengukuhan PKP, dan sertifikat e-CHSEMS yang disediakan.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERTIFICATIONS.map((doc) => (
              <article key={doc.id} className="rounded-md border border-line bg-card p-5 shadow-card">
                <span className="mb-3 flex size-10 items-center justify-center rounded-[10px] bg-brand-soft text-brand">
                  <FileCheck className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-bold">{doc.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{doc.description}</p>
                <a
                  className="mt-4 inline-block text-xs font-bold text-navy-bright underline-offset-4 hover:underline"
                  href="mailto:bsmkrw.inc@gmail.com?subject=Permintaan%20Salinan%20Dokumen%20Legalitas%20BSM"
                >
                  Minta salinan resmi →
                </a>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Salinan publik ringkasan ini bukan pengganti dokumen asli. Verifikasi nomor, klasifikasi,
            dan masa berlaku melalui dokumen resmi yang berlaku pada saat pengadaan.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-7">
            <h2 className="text-2xl md:text-[1.9rem]">Dokumentasi pekerjaan elektrikal</h2>
            <p className="mt-1.5 text-sm text-muted">
              Kategori pekerjaan dan rujukan halaman dari Company Profile BSM Karawang 2025.
              Foto yang dipakai harus tetap sesuai dengan sumber; detail yang tidak tertulis tidak diasumsikan.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.map((p) => (
              <article key={p.id} className="overflow-hidden rounded-md border border-line bg-card shadow-card">
                <Link to="/proyek/$id" params={{ id: p.id }} className="block">
                  <div className="h-48 overflow-hidden bg-navy">
                    <img
                      src={p.image}
                      alt={`${p.title} — dokumentasi pekerjaan`}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = p.fallbackImage;
                      }}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-xs font-bold text-navy-bright">{CATEGORY_LABEL[p.category]}</p>
                  <h3 className="mt-1 text-base font-bold">{p.title}</h3>
                  <p className="mt-2 text-xs text-muted">{p.sourcePage}</p>
                  <Link
                    to="/proyek/$id"
                    params={{ id: p.id }}
                    className="mt-3 inline-block text-sm font-bold text-navy-bright"
                  >
                    Detail rujukan →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-card py-12">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-[1.9rem]">Alamat kantor & kontak</h2>
            <p className="mt-1.5 text-sm text-muted">Alamat dirangkum dari company profile dan NIB. Email mengikuti dokumen kantor masing-masing.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {OFFICES.map((office) => (
              <article key={office.city} className="rounded-md border border-line bg-page p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand" />
                  <div>
                    <h3 className="font-bold">{office.city}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{office.line}</p>
                    <p className="mt-3 text-sm">
                      <span className="font-semibold">Telepon:</span> {office.phone}
                    </p>
                    <a className="mt-1 inline-block text-sm font-semibold text-navy-bright" href={`mailto:${office.email}`}>
                      {office.email}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Butuh informasi sebelum mengirim brief?"
        note="Sebutkan jenis pekerjaan, lokasi, serta dokumen vendor yang dibutuhkan agar tim dapat menindaklanjuti dengan tepat."
      >
        <Button asChild>
          <Link to="/kampanye-instalasi-listrik">Ajukan permintaan survey</Link>
        </Button>
        <Button asChild variant="outline-light">
          <a href="mailto:bsmkrw.inc@gmail.com?subject=Permintaan%20Informasi%20Proyek%20BSM">
            Hubungi melalui email
          </a>
        </Button>
      </CtaBand>
    </main>
  );
}
