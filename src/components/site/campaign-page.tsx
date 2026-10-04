import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useFeedback } from "@/lib/feedback";
import {
  CAMPAIGN_CHECKS,
  COMPANY,
  PROJECT_TYPES,
  TESTIMONIALS,
} from "@/lib/site-data";
import { saveWebInquiry } from "@/lib/web-leads";
import { cn, waLink } from "@/lib/utils";

export function CampaignPage({
  waHref,
  setWaHref,
}: {
  waHref: string;
  setWaHref: (href: string) => void;
}) {
  const showToast = useFeedback((s) => s.showToast);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      type: String(fd.get("type") ?? "").trim(),
      loc: String(fd.get("loc") ?? "").trim(),
    };
    const next: Record<string, string> = {};
    if (!data.name) next.name = "Nama wajib diisi.";
    if (data.phone.replace(/\D/g, "").length < 8) next.phone = "Nomor WhatsApp tidak valid.";
    if (!data.type) next.type = "Pilih jenis proyek.";
    if (!data.loc) next.loc = "Lokasi wajib diisi.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const msg = `Halo, saya ${data.name} (${data.phone}) ingin minta penawaran untuk ${data.type} di ${data.loc}.`;
    saveWebInquiry({
      name: data.name,
      phone: data.phone,
      type: data.type,
      loc: data.loc,
      source: "campaign_lead",
    });
    setWaHref(waLink(msg));
    e.currentTarget.reset();
    setSuccess(true);
    showToast("Permintaan tersimpan. Klik WhatsApp untuk menindaklanjuti.");
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-linear-to-br from-navy-mid to-navy py-14 text-paper">
        <div className="relative mx-auto grid max-w-6xl items-start gap-11 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-8">
          <div>
            <span className="mb-4 inline-block rounded-md bg-brand px-3 py-1.5 text-xs font-bold text-paper">
              Promo survey lokasi
            </span>
            <h1 className="text-4xl leading-tight md:text-5xl">
              Survey instalasi listrik{" "}
              <span className="text-brand-mist">Palembang & Karawang</span>
            </h1>
            <ul className="mt-5 flex flex-col gap-2.5">
              {CAMPAIGN_CHECKS.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-on-navy-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-mist" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Button asChild>
                <a href="#lead">Minta penawaran</a>
              </Button>
              <Button asChild variant="wa">
                <a href={waHref} target="_blank" rel="noreferrer">
                  Chat WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline-light">
                <Link to="/profil-perusahaan">Company profile</Link>
              </Button>
            </div>
          </div>
          <form
            id="lead"
            onSubmit={onSubmit}
            noValidate
            className="rounded-lg bg-card p-6 text-ink shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)]"
          >
            <h3 className="text-[1.05rem]">Minta survey & penawaran</h3>
            <p className="mt-1 mb-4 text-sm text-muted">
              Isi singkat — tim {COMPANY.short} menghubungi Anda di hari kerja berikutnya.
            </p>
            {success ? (
              <div className="mb-4 rounded-xl border border-success-line bg-success-bg p-4 text-sm text-success">
                Permintaan terkirim. Tim kami akan segera menghubungi Anda.
              </div>
            ) : null}
            <LeadField id="lName" name="name" label="Nama" error={errors.name} />
            <LeadField id="lPhone" name="phone" label="Nomor WhatsApp" error={errors.phone} />
            <div className="mb-4">
              <label htmlFor="lType" className="mb-1.5 block text-xs font-bold">
                Jenis proyek
              </label>
              <select
                id="lType"
                name="type"
                className={cn(
                  "w-full rounded-[10px] border-[1.5px] border-line bg-page px-3.5 py-3 text-sm",
                  errors.type && "border-brand",
                )}
                defaultValue=""
              >
                <option value="" disabled>
                  Pilih…
                </option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.type ? <p className="mt-1 text-xs text-brand">{errors.type}</p> : null}
            </div>
            <LeadField id="lLoc" name="loc" label="Lokasi proyek" error={errors.loc} />
            <Button type="submit" size="block">
              Kirim permintaan
            </Button>
          </form>
        </div>
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 py-8 text-center md:grid-cols-4 md:px-8">
          {[
            ["15+", "Tahun pengalaman"],
            ["120+", "Proyek elektrikal"],
            ["2", "Cabang"],
            ["1×24 jam", "Respon hari kerja"],
          ].map(([n, l]) => (
            <div key={l} className="py-2">
              <p className="text-2xl font-extrabold tabular-nums text-navy-mid">{n}</p>
              <p className="mt-1 text-xs text-muted">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-14 md:grid-cols-2 md:px-8">
        {TESTIMONIALS.map((t) => (
          <blockquote
            key={t.author}
            className="rounded-md border border-line bg-card p-5 shadow-card"
          >
            <p className="mt-2.5 text-[0.95rem] italic">{t.quote}</p>
            <p className="mt-3 text-sm font-bold">
              {t.author}
              <span className="mt-0.5 block text-xs font-medium text-muted">{t.role}</span>
            </p>
          </blockquote>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-14 md:px-8">
        <p className="text-sm text-muted">
          Butuh dokumen tender?{" "}
          <Link to="/profil-perusahaan" className="font-bold text-navy-bright">
            Lihat & unduh company profile
          </Link>
          {" · "}
          <Link to="/" className="font-bold text-navy-bright">
            Lihat layanan & portofolio
          </Link>
        </p>
      </section>
    </main>
  );
}

function LeadField({
  id,
  name,
  label,
  error,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={cn(
          "w-full rounded-[10px] border-[1.5px] border-line bg-page px-3.5 py-3 text-sm",
          error && "border-brand",
        )}
      />
      {error ? <p className="mt-1 text-xs text-brand">{error}</p> : null}
    </div>
  );
}
