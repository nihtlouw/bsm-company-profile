import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/lib/site-data";

export const Route = createFileRoute("/erp")({
  component: PortalUnavailable,
  head: () => ({
    meta: [
      { title: "Portal internal — Berjaya Sukses Makmur" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function PortalUnavailable() {
  return (
    <main className="grid min-h-dvh place-items-center bg-page px-5 py-12 text-ink">
      <section className="w-full max-w-xl rounded-lg border border-line bg-card p-8 text-center shadow-card sm:p-10">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand">
          <ShieldCheck className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-muted">Akses internal</p>
        <h1 className="mt-2 text-2xl font-extrabold">Portal proyek belum dibuka untuk publik</h1>
        <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-relaxed text-muted">
          Portal operasional {COMPANY.short} masih dalam penyiapan akses pengguna dan penyimpanan data yang aman.
          Halaman ini sementara ditutup agar data contoh tidak disalahartikan sebagai data proyek nyata.
        </p>
        <Link to="/" className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-navy px-5 py-3 text-sm font-bold text-white">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke situs perusahaan
        </Link>
      </section>
    </main>
  );
}
