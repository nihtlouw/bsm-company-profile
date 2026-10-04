import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Boxes,
  Building2,
  FileText,
  LayoutDashboard,
  Menu,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { FeedbackLayer } from "@/components/site/chrome";
import { useErp } from "@/lib/erp-store";
import { COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/erp", label: "Dasbor", icon: LayoutDashboard },
  { to: "/erp/leads", label: "Prospek", icon: Users },
  { to: "/erp/proyek", label: "Proyek", icon: Workflow },
  { to: "/erp/penawaran", label: "Penawaran", icon: FileText },
  { to: "/erp/klien", label: "Klien", icon: Building2 },
  { to: "/erp/material", label: "Material", icon: Boxes },
] as const;

export function ErpShell() {
  const [open, setOpen] = useState(false);
  const hydrate = useErp((s) => s.hydrate);
  const ready = useErp((s) => s.ready);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <div className="min-h-dvh bg-page text-ink md:grid md:grid-cols-[240px_1fr]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-header flex w-72 flex-col bg-navy text-on-navy transition-transform duration-200 md:relative md:w-auto md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-[72px] items-center gap-2.5 border-b border-paper/10 px-4">
          <img src="/logo-bsm.png" alt="" className="h-8 w-auto" />
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-paper">Portal proyek</p>
            <p className="truncate text-xs text-on-navy-muted">{COMPANY.short}</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-3" aria-label="Portal">
          {ITEMS.map((item) => {
            const active = item.to === "/erp" ? path === "/erp" : path.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-2.5 rounded-[10px] px-3 text-sm font-semibold text-on-navy-muted",
                  active && "bg-paper/10 text-paper",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-paper/10 p-3">
          <Link to="/" className="block px-3 py-2 text-xs font-semibold text-on-navy-muted hover:text-paper">
            ← Kembali ke situs
          </Link>
        </div>
      </aside>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-cta bg-navy/40 md:hidden"
          aria-label="Tutup menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-header flex h-[72px] items-center gap-3 border-b border-line bg-page/90 px-4 backdrop-blur-md md:px-8">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[10px] border border-line bg-card md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Menu portal</span>
          </button>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold">Mini ERP</p>
            <p className="truncate text-xs text-muted">Kurva S, prospek, penawaran, material</p>
          </div>
        </header>
        <div className="flex-1 px-4 py-6 md:px-8 md:py-8">
          {ready ? <Outlet /> : <ErpSkeleton />}
        </div>
      </div>
      <FeedbackLayer />
    </div>
  );
}

function ErpSkeleton() {
  return (
    <div className="grid gap-4">
      <p className="text-sm font-semibold text-muted">Memuat portal proyek…</p>
      <div className="h-24 animate-pulse rounded-md bg-line/70" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-md bg-line/70" />
        ))}
      </div>
    </div>
  );
}

export function PageTitle({
  title,
  note,
  action,
}: {
  title: string;
  note?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl">{title}</h1>
        {note ? <p className="mt-1 text-sm text-muted">{note}</p> : null}
      </div>
      {action}
    </div>
  );
}
