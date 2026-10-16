import { Link } from "@tanstack/react-router";
import { ArrowLeft, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFeedback, type ModalState } from "@/lib/feedback";
import { COMPANY, NAV, PROFILE_FILENAME, PROFILE_PDF, SERVICES } from "@/lib/site-data";
import { cn, waLink } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "services", "projects", "legalitas", "about", "clients", "contact"];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <header
      id="siteHeader"
      className={cn(
        "sticky top-0 z-header border-b border-line bg-page/88 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md",
        scrolled && "shadow-[0_10px_28px_-18px_rgba(10,20,40,0.28)]",
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-5 md:px-8">
        <Brand />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Utama">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              data-nav
              className={cn(
                "relative px-0.5 py-1.5 text-sm font-semibold text-muted after:absolute after:right-full after:bottom-0 after:left-0 after:h-0.5 after:bg-brand after:transition-[right] after:duration-200 hover:text-ink hover:after:right-0",
                active === item.id && "text-ink after:right-0",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="hidden lg:inline-flex">
            <Link to="/profil-perusahaan">Company profile</Link>
          </Button>
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <a href="/#contact">Hubungi Kami</a>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[10px] border border-line bg-card lg:hidden"
            aria-expanded={open}
            aria-controls="mobilePanel"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobilePanel"
          className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-4 lg:hidden"
          aria-label="Mobile"
        >
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              className="border-b border-line py-3 font-semibold"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="/#faq" className="border-b border-line py-3 font-semibold" onClick={() => setOpen(false)}>
            FAQ
          </a>
          <Link
            to="/profil-perusahaan"
            className="border-b border-line py-3 font-semibold"
            onClick={() => setOpen(false)}
          >
            Company profile
          </Link>
          <Button asChild variant="outline" className="mt-2">
            <a href={PROFILE_PDF} download={PROFILE_FILENAME} onClick={() => setOpen(false)}>
              Unduh PDF
            </a>
          </Button>
          <Button asChild className="mt-2">
            <a href="/#contact" onClick={() => setOpen(false)}>
              Hubungi Kami
            </a>
          </Button>
        </nav>
      ) : null}
    </header>
  );
}

export function CampaignHeader() {
  return (
    <header className="border-b border-paper/10 bg-navy pt-[calc(18px+env(safe-area-inset-top,0px))] pb-4">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 md:px-8">
        <Brand light />
        <div className="flex items-center gap-4">
          <a
            href="tel:+6281234567890"
            className="hidden items-center gap-1.5 text-sm font-semibold text-paper sm:inline-flex"
          >
            <Phone className="size-4" />
            {COMPANY.phoneDisplay}
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-on-navy-muted hover:text-paper"
          >
            <ArrowLeft className="size-4" />
            Kembali ke situs
          </Link>
        </div>
      </div>
    </header>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img
        src="/logo-bsm.png"
        alt=""
        className="h-10 w-auto outline outline-1 -outline-offset-1 outline-ink/10"
      />
      <span className="leading-tight">
        <strong className={cn("block text-[0.98rem] font-extrabold", light ? "text-paper" : "text-ink")}>
          {COMPANY.name}
        </strong>
        <span className={cn("block text-xs font-medium", light ? "text-on-navy-muted" : "text-muted")}>
          {COMPANY.tagline}
        </span>
      </span>
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-5 bg-navy pt-12 pb-8 text-on-navy-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-8">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <img src="/logo-bsm.png" alt="" className="h-11 w-auto" />
            <strong className="text-paper">{COMPANY.name}</strong>
          </div>
          <p className="max-w-sm text-sm leading-relaxed">
            General contractor & supplier — fokus electrical engineering & installation
            untuk rumah sakit, pabrik, dan gedung komersial.
          </p>
        </div>
        <div>
          <h4 className="mb-3.5 text-sm font-extrabold text-paper">Navigasi</h4>
          <ul className="space-y-1 text-sm leading-8">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`/#${item.id}`} className="hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/#faq" className="hover:text-paper">
                FAQ
              </a>
            </li>
            <li>
              <Link to="/kampanye-instalasi-listrik" className="hover:text-paper">
                Survey instalasi gratis
              </Link>
            </li>
            <li>
              <Link to="/profil-perusahaan" className="hover:text-paper">
                Company profile
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3.5 text-sm font-extrabold text-paper">Layanan</h4>
          <ul className="space-y-1 text-sm leading-8">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link to="/layanan/$slug" params={{ slug: s.id }} className="hover:text-paper">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3.5 text-sm font-extrabold text-paper">Kontak</h4>
          <p className="text-sm leading-8">
            Palembang & Karawang
            <br />
            <a href={`mailto:${COMPANY.email}`} className="hover:text-paper">
              {COMPANY.email}
            </a>
            <br />
            <a href={`tel:+${COMPANY.waNumber}`} className="hover:text-paper">
              {COMPANY.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
      <div className="mx-auto mt-9 flex max-w-6xl flex-wrap justify-between gap-2.5 border-t border-paper/10 px-5 pt-5 text-xs md:px-8">
        <span>&copy; {new Date().getFullYear()} {COMPANY.short}.</span>
        <span>Electrical engineering & installation</span>
      </div>
    </footer>
  );
}

export function WhatsAppFloat({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed right-5 bottom-[calc(88px+env(safe-area-inset-bottom,0px))] z-float flex size-14 items-center justify-center rounded-full bg-wa text-paper shadow-wa transition-transform duration-150 hover:scale-105 md:bottom-[calc(20px+env(safe-area-inset-bottom,0px))]"
      aria-label="Chat WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden>
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.5 2 2.02 6.48 2.02 12c0 1.76.46 3.48 1.34 5L2 22l5.15-1.35A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.99-7.09zM12.04 20.15c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.06.8.82-2.98-.2-.31A8.13 8.13 0 0 1 3.9 12c0-4.48 3.65-8.12 8.14-8.12 2.17 0 4.21.85 5.75 2.38a8.08 8.08 0 0 1 2.38 5.75c0 4.48-3.65 8.14-8.13 8.14zm4.46-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.37-.43.12-.14.16-.24.24-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.2 3.7.59.25 1.04.41 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
      </svg>
    </a>
  );
}

export function FeedbackLayer() {
  const modal = useFeedback((s) => s.modal);
  const toast = useFeedback((s) => s.toast);
  const closeModal = useFeedback((s) => s.closeModal);

  useEffect(() => {
    if (!modal) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [modal, closeModal]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-modal flex items-center justify-center bg-navy/60 p-5 backdrop-blur-sm transition-opacity duration-200",
          modal ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        {modal ? <ModalBox modal={modal} onClose={closeModal} /> : null}
      </div>
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed bottom-7 left-1/2 z-toast -translate-x-1/2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-paper shadow-toast transition-[opacity,transform] duration-200",
          toast ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        )}
      >
        {toast}
      </div>
    </>
  );
}

function ModalBox({
  modal,
  onClose,
}: {
  modal: Exclude<ModalState, null>;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="max-h-[85vh] w-full max-w-lg overflow-auto rounded-lg bg-card p-7 shadow-card"
    >
      <button
        type="button"
        onClick={onClose}
        className="float-right p-1 text-2xl leading-none text-muted"
        aria-label="Tutup"
      >
        ×
      </button>
      {modal.kind === "case" ? (
        <>
          <p className="text-xs font-bold text-navy-bright">{modal.category}</p>
          <h3 className="mt-1.5 clear-both text-xl">{modal.title}</h3>
          <ModalSection title="Latar Belakang" body={modal.background} />
          <ModalSection title="Solusi" body={modal.solution} />
          <ModalSection title="Hasil" body={modal.result} />
        </>
      ) : null}
      {modal.kind === "gallery" ? (
        <>
          <p className="text-xs font-bold text-navy-bright">Galeri Foto PT</p>
          <h3 className="mt-1.5 clear-both text-xl">{modal.title}</h3>
          <img
            src={modal.image}
            alt={modal.title}
            className="mt-4 aspect-square w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
          <p className="mt-3 text-sm text-muted">{modal.caption}</p>
        </>
      ) : null}
      {modal.kind === "doc" ? (
        <>
          <p className="text-xs font-bold text-navy-bright">Legalitas</p>
          <h3 className="mt-1.5 clear-both text-xl">{modal.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">{modal.description}</p>
          <p className="mt-3 text-sm text-ink">
            Salinan dokumen tersedia atas permintaan resmi melalui formulir kontak.
          </p>
        </>
      ) : null}
    </div>
  );
}

function ModalSection({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-4">
      <h5 className="text-xs font-bold text-muted">{title}</h5>
      <p className="mt-1 text-sm">{body}</p>
    </div>
  );
}

export const MAIN_WA = waLink(
  "Halo, saya ingin bertanya tentang layanan Berjaya Sukses Makmur.",
  COMPANY.waNumber,
);
export const CAMPAIGN_WA = waLink(
  "Halo, saya ingin mengajukan pertanyaan atau penawaran untuk pekerjaan elektrikal.",
  COMPANY.waNumber,
);
