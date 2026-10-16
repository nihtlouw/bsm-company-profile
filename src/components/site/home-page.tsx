import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Building2,
  Cable,
  ChevronDown,
  ClipboardList,
  Factory,
  FileCheck,
  Landmark,
  Shield,
  Wrench,
  Zap,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { CtaBand } from "@/components/site/cta";
import { ElectricalPanel } from "@/components/site/electrical-panel";
import { FaqSection } from "@/components/site/faq-section";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { useFeedback } from "@/lib/feedback";
import { faqJsonLd, orgJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/json-ld";
import {
  ABOUT_FACTS,
  CATEGORIES,
  CATEGORY_LABEL,
  CERTIFICATIONS,
  CLIENTS,
  COMPANY,
  CONTACT_INTENTS,
  GALLERY,
  HOW_IT_WORKS,
  OFFICES,
  PROFILE_FILENAME,
  PROFILE_PDF,
  PROJECTS,
  SERVICES,
  STATS,
  type ProjectCategory,
} from "@/lib/site-data";
import { cn, waLink } from "@/lib/utils";
import { saveWebInquiry } from "@/lib/web-leads";

const SERVICE_ICONS = [Zap, Cable, Shield, Wrench] as const;
const DOC_ICONS = [Landmark, BadgeCheck, FileCheck, ClipboardList] as const;

export function HomePage() {
  return (
    <main id="main" className="pb-20 md:pb-0">
      <JsonLd data={orgJsonLd()} />
      <JsonLd data={faqJsonLd()} />
      <Hero />
      <StatsStrip />
      <VendorTrust />
      <HowItWorks />
      <Services />
      <CtaBand
        title="Siap tender atau survey lokasi?"
        note="Unduh company profile untuk kelengkapan vendor, atau minta survey gratis untuk proyek instalasi baru."
      >
        <Button asChild>
          <Link to="/kampanye-instalasi-listrik">Ajukan survey lokasi</Link>
        </Button>
        <Button asChild variant="outline-light">
          <a href={PROFILE_PDF} download={PROFILE_FILENAME}>
            Unduh company profile
          </a>
        </Button>
      </CtaBand>
      <Portfolio />
      <Legalitas />
      <Gallery />
      <About />
      <Clients />
      <FaqSection />
      <Contact />
    </main>
  );
}

function SectionHead({
  id,
  title,
  note,
  action,
}: {
  id?: string;
  title: string;
  note?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7">
      <div className="flex flex-wrap items-baseline justify-between gap-5">
        <h2 id={id} className="text-2xl md:text-[1.9rem]">
          {title}
        </h2>
        {action}
      </div>
      {note ? <p className="mt-1.5 text-sm text-muted">{note}</p> : null}
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-navy py-12 text-on-navy md:py-20">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <Reveal>
          <span className="mb-5 inline-flex items-center rounded-full border border-brand/40 bg-brand/15 px-3.5 py-1.5 text-xs font-bold tracking-wide text-brand-mist">
            SEJAK {COMPANY.founded} · PALEMBANG & KARAWANG
          </span>
          <h1 className="max-w-[16ch] text-4xl leading-tight text-paper md:text-5xl">
            Kontraktor listrik rumah sakit, pabrik, dan gedung
          </h1>
          <p className="lead mt-4 max-w-[46ch] text-lg text-on-navy-muted">
            Instalasi elektrikal sesuai PUIL/SNI — panel, tray, grounding, hingga commissioning.
            Survey lokasi gratis untuk proyek baru.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button asChild>
              <Link to="/kampanye-instalasi-listrik">Minta survey gratis</Link>
            </Button>
            <Button asChild variant="outline-light">
              <Link to="/profil-perusahaan">Company profile</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-on-navy-muted">
            <a href="#projects" className="font-semibold text-paper underline-offset-4 hover:underline">
              Lihat portofolio
            </a>
            {" · "}
            <a href="#contact" className="font-semibold text-paper underline-offset-4 hover:underline">
              Kirim brief proyek
            </a>
          </p>
        </Reveal>
        <Reveal>
          <ElectricalPanel />
        </Reveal>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="border-b border-line bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-5 py-7 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-md border border-line bg-page px-4 py-4 text-left">
            <p className="text-xl font-extrabold leading-tight text-navy-mid">{s.value}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function VendorTrust() {
  return (
    <section className="border-b border-line bg-page">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-8">
        <p className="text-xs font-bold tracking-wide text-muted">Kelengkapan vendor</p>
        <div className="flex flex-wrap gap-2">
          {CERTIFICATIONS.map((c) => (
            <a
              key={c.id}
              href="#legalitas"
              className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-bold text-ink"
            >
              {c.name}
            </a>
          ))}
        </div>
        <Link to="/profil-perusahaan" className="text-xs font-bold text-navy-bright">
          Company profile PDF →
        </Link>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="alur" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHead
          title="Dari brief sampai serah terima"
          note="Empat langkah yang sama untuk rumah sakit, pabrik, dan gedung komersial."
        />
        <Reveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((s) => (
            <article
              key={s.step}
              className="rounded-md border border-line bg-card p-5 shadow-card"
            >
              <p className="text-xs font-extrabold tracking-wide text-brand">{s.step}</p>
              <h3 className="mt-2 text-[1.02rem]">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{s.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHead
          title="Layanan instalasi elektrikal"
          note="Pekerjaan elektrikal dari desain hingga serah terima — satu tim, satu tanggung jawab."
        />
        <Reveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((svc, i) => {
            const Icon = SERVICE_ICONS[i] ?? Zap;
            const expanded = open === svc.id;
            return (
              <article
                key={svc.id}
                className="rounded-md border border-line bg-card p-5 text-left shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : svc.id)}
                  className="w-full text-left"
                >
                  <span className="mb-3.5 flex size-11 items-center justify-center rounded-[11px] bg-brand-soft text-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_3px_6px_-2px_rgba(237,29,35,0.28)]">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-[1.02rem]">{svc.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{svc.subtitle}</p>
                  <div
                    className={cn(
                      "overflow-hidden transition-[max-height] duration-300",
                      expanded ? "max-h-40" : "max-h-0",
                    )}
                  >
                    <p className="mt-3 border-t border-line pt-3 text-sm text-muted">{svc.detail}</p>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-navy-bright">
                    {expanded ? "Tutup" : "Ringkasan"}
                    <ChevronDown className={cn("size-3.5 transition-transform", expanded && "rotate-180")} />
                  </span>
                </button>
                <Link
                  to="/layanan/$slug"
                  params={{ slug: svc.id }}
                  className="mt-3 inline-block text-xs font-bold text-brand"
                >
                  Halaman layanan →
                </Link>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState<"semua" | ProjectCategory>("semua");
  const openModal = useFeedback((s) => s.openModal);

  return (
    <section id="projects" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHead
          title="Portofolio proyek elektrikal"
          note="Ringkasan merujuk pada dokumentasi pekerjaan di Company Profile BSM Karawang 2025; detail yang tidak tertera pada sumber tidak diklaim."
        />
        <div className="mb-6 flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              data-filter={c.id}
              onClick={() => setFilter(c.id)}
              className={cn(
                "h-11 rounded-full border border-line bg-card px-4 text-sm font-semibold text-muted",
                filter === c.id && "border-navy-mid bg-navy-mid text-paper",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.filter((p) => filter === "semua" || p.category === filter).map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-md border border-line bg-card shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <Link to="/proyek/$id" params={{ id: p.id }} className="block">
                <div className="relative h-40 overflow-hidden bg-navy">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.subtitle}`}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = p.fallbackImage;
                    }}
                    className="size-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
                  />
                </div>
              </Link>
              <div className="px-4 py-4">
                <p className="text-xs font-bold text-navy-bright">{CATEGORY_LABEL[p.category]}</p>
                <h3 className="mt-1 text-base">{p.title}</h3>
                <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link
                    to="/proyek/$id"
                    params={{ id: p.id }}
                    className="text-sm font-bold text-navy-bright"
                  >
                    Halaman proyek →
                  </Link>
                  <button
                    type="button"
                    className="text-sm font-bold text-muted"
                    onClick={() =>
                      openModal({
                        kind: "case",
                        title: `${p.title} — ${p.subtitle}`,
                        category: CATEGORY_LABEL[p.category],
                        background: p.background,
                        solution: p.solution,
                        result: p.result,
                      })
                    }
                  >
                    Ringkas
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Legalitas() {
  const openModal = useFeedback((s) => s.openModal);
  return (
    <section id="legalitas" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHead
          title="Legalitas"
          note="Dokumen perusahaan siap diverifikasi untuk tender dan onboarding vendor."
        />
        <Reveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((doc, i) => {
            const Icon = DOC_ICONS[i] ?? FileCheck;
            return (
              <article
                key={doc.id}
                className="rounded-md border border-line bg-card p-5 shadow-card transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="mb-3 flex size-10 items-center justify-center rounded-[10px] bg-brand-soft text-brand">
                  <Icon className="size-5" />
                </span>
                <h4 className="text-sm">{doc.name}</h4>
                <p className="mt-1 text-xs text-muted">{doc.description}</p>
                <button
                  type="button"
                  className="mt-3 text-xs font-bold text-navy-bright"
                  onClick={() =>
                    openModal({
                      kind: "doc",
                      title: doc.name,
                      description: `${doc.description} Salinan resmi dikirim atas permintaan lewat formulir kontak atau email.`,
                    })
                  }
                >
                  Lihat keterangan →
                </button>
              </article>
            );
          })}
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a href={PROFILE_PDF} download={PROFILE_FILENAME}>
              Unduh company profile
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="#contact">Minta salinan legalitas</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const openModal = useFeedback((s) => s.openModal);
  return (
    <section id="galeri" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHead title="Ilustrasi lingkup pekerjaan" note="Ilustrasi vektor kategori pekerjaan; foto dokumentasi asli berasal dari Company Profile 2025 dan disiapkan dalam paket aset web." />
        <Reveal stagger className="grid grid-cols-2 gap-3.5 md:grid-cols-3">
          {GALLERY.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() =>
                openModal({
                  kind: "gallery",
                  title: g.title,
                  image: g.image,
                  fallbackImage: g.fallbackImage,
                  caption: g.caption,
                })
              }
              className="relative aspect-square overflow-hidden rounded-[14px] bg-navy"
            >
              <img
                src={g.image}
                alt={g.title}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = g.fallbackImage;
                }}
                className="size-full object-cover outline outline-1 -outline-offset-1 outline-ink/10 transition-transform duration-200 hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-navy/85 to-transparent px-2.5 pt-8 pb-2.5 text-left text-xs font-semibold text-paper">
                {g.title}
              </span>
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 md:grid-cols-2 md:px-8">
        <Reveal>
          <SectionHead title="Tentang Kami" />
          <p className="text-[0.95rem] leading-relaxed text-ink">
            {COMPANY.name} adalah general contractor & supplier yang berfokus pada electrical
            engineering dan installation. Sejak {COMPANY.founded} kami menangani instalasi
            kelistrikan untuk fasilitas kesehatan, pabrik, dan gedung komersial dari dua cabang:
            Palembang dan Karawang.
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
            Lingkup kerja mencakup panel distribusi, MCC, grounding, penerangan, hingga
            commissioning — dikoordinasikan dengan tim MEP lain agar serah terima berjalan rapi.
          </p>
          <Button asChild variant="outline">
            <Link to="/profil-perusahaan">Lihat company profile</Link>
          </Button>
        </Reveal>
        <Reveal>
          <div>
            {ABOUT_FACTS.map((f) => (
              <div key={f.label} className="border-t border-line py-4">
                <h4 className="text-xs font-bold text-muted">{f.label}</h4>
                <p className="mt-1 text-[0.95rem]">{f.value}</p>
              </div>
            ))}
            <div className="border-t border-line py-4">
              <h4 className="text-xs font-bold text-muted">Ikon segmen</h4>
              <p className="mt-2 flex flex-wrap gap-3 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="size-4 text-brand" /> Gedung
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Factory className="size-4 text-brand" /> Pabrik
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="size-4 text-brand" /> Fasilitas kritis
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section id="clients" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHead
          title="Klien & Mitra"
          note="Nama berikut tercantum pada bagian “Our Customers” dalam Company Profile BSM Karawang 2025; penggunaan logo perlu izin terpisah."
        />
        <Reveal stagger className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {CLIENTS.map((name) => (
            <div
              key={name}
              className="flex min-h-[72px] items-center justify-center rounded-xl border border-line bg-card px-3 text-center text-xs font-semibold text-ink shadow-card"
            >
              {name}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}



function Contact() {
  const showToast = useFeedback((s) => s.showToast);
  const [success, setSuccess] = useState(false);
  const [whatsAppHref, setWhatsAppHref] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const intent = String(fd.get("intent") ?? "").trim();
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      type: intent,
    };
    const next: Record<string, string> = {};
    if (!data.name) next.name = "Nama wajib diisi.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "Email tidak valid.";
    if (!data.company) next.company = "Perusahaan wajib diisi.";
    if (!intent) next.intent = "Pilih keperluan.";
    if (!data.message) next.message = "Pesan wajib diisi.";
    setErrors(next);
    if (Object.keys(next).length) return;

    saveWebInquiry({ ...data, source: "contact_form" });
    const message = `Halo, saya ${data.name} dari ${data.company}. Keperluan: ${data.type}. Email: ${data.email}. Pesan: ${data.message}`;
    setWhatsAppHref(waLink(message, COMPANY.waNumber));
    form.reset();
    setSuccess(true);
    showToast("Brief disiapkan. Klik WhatsApp untuk mengirimkannya ke tim.");
  }

  return (
    <section id="contact" className="py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-11 px-5 md:grid-cols-[1fr_1.1fr] md:px-8">
        <Reveal>
          <div className="rounded-lg bg-navy p-7 text-on-navy">
            <h2 className="text-lg text-paper">Kirim brief proyek</h2>
            <p className="mt-2 text-sm text-on-navy-muted">
              Formulir menyimpan brief pada browser ini. Untuk mengirimkannya ke tim, lanjutkan melalui WhatsApp.
              Untuk tender, sebutkan dokumen vendor yang dibutuhkan.
            </p>
            {OFFICES.map((o) => (
              <div key={o.city} className="mt-5 flex gap-3">
                <Building2 className="mt-0.5 size-4 shrink-0 text-brand-mist" />
                <p className="text-sm text-on-navy-muted">
                  <strong className="mb-0.5 block text-sm text-paper">{o.city}</strong>
                  {o.line}
                  <br />
                  <span className="mt-1 block text-paper/80">Telepon: {o.phone}</span>
                  <a className="block text-paper/80 underline underline-offset-2" href={`mailto:${o.email}`}>{o.email}</a>
                </p>
              </div>
            ))}
            <div className="mt-5 flex gap-3">
              <Zap className="mt-0.5 size-4 shrink-0 text-brand-mist" />
              <p className="text-sm text-on-navy-muted">
                <strong className="mb-0.5 block text-sm text-paper">Email & telepon</strong>
                {COMPANY.email}
                <br />
                {COMPANY.phoneDisplay}
              </p>
            </div>
            <a
              href={PROFILE_PDF}
              download={PROFILE_FILENAME}
              className="mt-6 inline-flex text-sm font-bold text-paper underline-offset-4 hover:underline"
            >
              Unduh company profile PDF →
            </a>
          </div>
        </Reveal>
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-line bg-card p-7 shadow-card"
            noValidate
          >
            {success ? (
              <div className="mb-4 rounded-xl border border-success-line bg-success-bg p-4 text-sm text-success">
                Brief sudah disiapkan, tetapi belum dikirim otomatis oleh formulir. Klik tautan WhatsApp di bawah untuk mengirimkannya ke tim.
              </div>
            ) : null}
            {whatsAppHref ? (
              <a href={whatsAppHref} target="_blank" rel="noreferrer" className="mb-4 inline-flex min-h-11 items-center rounded-md bg-wa px-4 py-2 text-sm font-bold text-white underline-offset-4 hover:underline">
                Kirim brief melalui WhatsApp
              </a>
            ) : null}
            <Field id="cName" name="name" label="Nama Lengkap" error={errors.name} />
            <Field id="cEmail" name="email" label="Email" type="email" error={errors.email} />
            <Field id="cCompany" name="company" label="Perusahaan" error={errors.company} />
            <div className="mb-4">
              <label htmlFor="cIntent" className="mb-1.5 block text-xs font-bold">
                Keperluan
              </label>
              <select
                id="cIntent"
                name="intent"
                defaultValue=""
                className={cn(
                  "w-full rounded-[10px] border-[1.5px] border-line bg-page px-3.5 py-3 text-sm",
                  errors.intent && "border-brand",
                )}
              >
                <option value="" disabled>
                  Pilih keperluan
                </option>
                {CONTACT_INTENTS.map((item) => (
                  <option key={item.id} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
              {errors.intent ? <p className="mt-1 text-xs text-brand">{errors.intent}</p> : null}
            </div>
            <Field id="cMessage" name="message" label="Pesan" textarea error={errors.message} />
            <Button type="submit" size="block">
              Kirim brief
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  textarea,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  error?: string;
}) {
  const cls = cn(
    "w-full rounded-[10px] border-[1.5px] border-line bg-page px-3.5 py-3 text-sm text-ink transition-colors focus:border-brand",
    error && "border-brand",
  );
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} name={name} rows={4} className={cn(cls, "min-h-[90px] resize-y")} />
      ) : (
        <input id={id} name={name} type={type} className={cls} />
      )}
      {error ? <p className="mt-1 text-xs text-brand">{error}</p> : null}
    </div>
  );
}
