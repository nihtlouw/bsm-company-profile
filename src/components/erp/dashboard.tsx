import { Link } from "@tanstack/react-router";
import { HealthBadge, KpiCard, SparkCurve } from "@/components/erp/widgets";
import { PageTitle } from "@/components/erp/shell";
import {
  LEAD_LABEL,
  LEAD_STAGES,
  quoteAmount,
  useErp,
} from "@/lib/erp-store";
import { delayWeeks, forecastFinishWeek, healthOf, lastActual, spiOf } from "@/lib/scurve";
import { formatDate, formatIdrShort } from "@/lib/utils";

export function ErpDashboard() {
  const leads = useErp((s) => s.leads);
  const projects = useErp((s) => s.projects);
  const quotes = useErp((s) => s.quotes);
  const materials = useErp((s) => s.materials);
  const clients = useErp((s) => s.clients);

  const pipeline = leads.filter((l) => !["menang", "kalah"].includes(l.stage));
  const pipelineValue = pipeline.reduce((s, l) => s + l.value, 0);
  const active = projects.filter((p) => p.status === "berjalan" || p.status === "persiapan");
  const behind = active.filter((p) => healthOf(p.weeks) === "terlambat");
  const quoteOpen = quotes
    .filter((q) => q.status === "terkirim" || q.status === "draft")
    .reduce((s, q) => s + quoteAmount(q), 0);
  const low = materials.filter((m) => m.stock < m.minStock);
  const freshLeads = leads.filter((l) => l.stage === "baru");
  const expiring = quotes.filter(
    (q) =>
      (q.status === "terkirim" || q.status === "draft") &&
      q.validUntil - Date.now() < 1000 * 60 * 60 * 24 * 7,
  );

  const actions: { key: string; label: string; href: string; tone: "warn" | "navy" | "brand" }[] = [
    ...behind.map((p) => ({
      key: `behind-${p.id}`,
      label: `${p.name} di belakang kurva`,
      href: `/erp/proyek/${p.id}`,
      tone: "warn" as const,
    })),
    ...expiring.map((q) => ({
      key: `quote-${q.id}`,
      label: `${q.title} berakhir ${formatDate(q.validUntil)}`,
      href: "/erp/penawaran",
      tone: "brand" as const,
    })),
    ...freshLeads.map((l) => ({
      key: `lead-${l.id}`,
      label: `Prospek baru: ${l.company || l.name}`,
      href: "/erp/leads",
      tone: "navy" as const,
    })),
  ];

  return (
    <div>
      <PageTitle
        title="Dasbor operasional"
        note="Tindakan hari ini, kurva S, dan pipa prospek dari situs."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="Prospek aktif"
          value={String(pipeline.length)}
          hint={formatIdrShort(pipelineValue) + " nilai perkiraan"}
        />
        <KpiCard
          label="Proyek berjalan"
          value={String(active.length)}
          hint={behind.length ? `${behind.length} di belakang kurva` : "Semua on-track"}
        />
        <KpiCard label="Penawaran terbuka" value={formatIdrShort(quoteOpen)} hint="Draft + terkirim" />
        <KpiCard
          label="Perlu tindakan"
          value={String(actions.length)}
          hint={low.length ? `${low.length} SKU di bawah min` : "Kurva, penawaran, prospek"}
        />
      </div>

      {actions.length ? (
        <section className="mt-8">
          <h2 className="mb-3 text-base">Perlu tindakan</h2>
          <ul className="rounded-md border border-line bg-card">
            {actions.slice(0, 6).map((a) => (
              <li key={a.key} className="border-b border-line last:border-b-0">
                <a
                  href={a.href}
                  className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold"
                >
                  <span>{a.label}</span>
                  <span className="shrink-0 text-xs font-bold text-navy-bright">Buka →</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <section>
          <h2 className="mb-3 text-base">Kurva S — proyek aktif</h2>
          <div className="grid gap-3">
            {active.map((p) => {
              const last = lastActual(p.weeks);
              const spi = spiOf(p.weeks);
              const client = clients.find((c) => c.id === p.clientId);
              const finish = forecastFinishWeek(p.weeks);
              const delay = delayWeeks(p.weeks);
              return (
                <Link
                  key={p.id}
                  to="/erp/proyek/$id"
                  params={{ id: p.id }}
                  className="grid gap-3 rounded-md border border-line bg-card p-4 shadow-card md:grid-cols-[1fr_180px]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm">{p.name}</h3>
                      <HealthBadge points={p.weeks} />
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      {client?.name} · {p.location} · {formatIdrShort(p.contractValue)}
                    </p>
                    <p className="mt-2 text-xs tabular-nums text-muted">
                      Aktual {last?.actual ?? 0}% · Rencana {last?.planned ?? 0}% · SPI {spi ?? "—"}
                      {finish != null
                        ? ` · ramalan M${finish}${delay != null && delay > 0.2 ? ` telat ${delay} mg` : ""}`
                        : ""}
                    </p>
                  </div>
                  <SparkCurve points={p.weeks} className="h-14" />
                </Link>
              );
            })}
          </div>
        </section>
        <section>
          <h2 className="mb-3 text-base">Pipa prospek</h2>
          <ul className="rounded-md border border-line bg-card">
            {LEAD_STAGES.filter((s) => s !== "kalah").map((stage) => {
              const rows = leads.filter((l) => l.stage === stage);
              return (
                <li
                  key={stage}
                  className="flex items-center justify-between border-b border-line px-4 py-3 last:border-b-0"
                >
                  <span className="text-sm font-semibold">{LEAD_LABEL[stage]}</span>
                  <span className="text-sm font-extrabold tabular-nums text-navy-mid">
                    {rows.length}
                  </span>
                </li>
              );
            })}
          </ul>
          {low.length ? (
            <div className="mt-6">
              <h2 className="mb-3 text-base">Stok menipis</h2>
              <ul className="rounded-md border border-warn-line bg-warn-bg">
                {low.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center justify-between border-b border-warn-line/60 px-4 py-3 text-sm last:border-b-0"
                  >
                    <span className="font-semibold text-warn">{m.name}</span>
                    <span className="tabular-nums text-warn">
                      {m.stock} {m.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
