import { HEALTH_LABEL, healthOf, type CurveHealth, type CurvePoint } from "@/lib/scurve";
import { cn } from "@/lib/utils";

export function HealthBadge({
  points,
  health,
}: {
  points?: CurvePoint[];
  health?: CurveHealth;
}) {
  const h = health ?? (points ? healthOf(points) : "belum");
  const cls: Record<CurveHealth, string> = {
    maju: "bg-success-bg text-success",
    "on-track": "bg-navy/10 text-navy-mid",
    terlambat: "bg-brand-soft text-brand-deep",
    selesai: "bg-line text-muted",
    belum: "bg-warn-bg text-warn",
  };
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold", cls[h])}>
      {HEALTH_LABEL[h]}
    </span>
  );
}

export function SparkCurve({ points, className }: { points: CurvePoint[]; className?: string }) {
  const w = 168;
  const h = 52;
  const pad = 3;
  const x = (i: number) => pad + (i / Math.max(1, points.length - 1)) * (w - pad * 2);
  const y = (v: number) => h - pad - (v / 100) * (h - pad * 2);
  const planned = points.map((p, i) => `${x(i)},${y(p.planned)}`).join(" ");
  const actual = points
    .filter((p) => p.actual != null)
    .map((p) => `${x(p.week - 1)},${y(p.actual ?? 0)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("w-full", className)} aria-hidden>
      <polyline fill="none" stroke="var(--color-navy-soft)" strokeWidth="1.6" points={planned} />
      {actual ? (
        <polyline fill="none" stroke="var(--color-brand)" strokeWidth="2.2" points={actual} />
      ) : null}
    </svg>
  );
}

export function KpiCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <article className="rounded-md border border-line bg-card p-5 shadow-card">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-2 text-2xl font-extrabold tabular-nums text-navy-mid">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </article>
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: "navy" | "brand" | "success" | "warn" | "mute";
  children: string;
}) {
  const cls = {
    navy: "bg-navy/10 text-navy-mid",
    brand: "bg-brand-soft text-brand-deep",
    success: "bg-success-bg text-success",
    warn: "bg-warn-bg text-warn",
    mute: "bg-line text-muted",
  }[tone];
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold", cls)}>
      {children}
    </span>
  );
}
