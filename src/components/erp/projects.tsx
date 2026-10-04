import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SCurveChart } from "@/components/erp/s-curve-chart";
import { PageTitle } from "@/components/erp/shell";
import { HealthBadge, SparkCurve, StatusPill } from "@/components/erp/widgets";
import { Button } from "@/components/ui/button";
import { useFeedback } from "@/lib/feedback";
import { downloadScurvePdf } from "@/lib/erp-pdf";
import {
  PROJECT_STATUS,
  PROJECT_STATUS_LABEL,
  useErp,
  type ProjectStatus,
} from "@/lib/erp-store";
import {
  delayWeeks,
  earnedValue,
  forecastFinishWeek,
  lastActual,
  nextOpenWeek,
  remainingPct,
  spiOf,
  variancePct,
  velocityOf,
} from "@/lib/scurve";
import { CATEGORIES, CATEGORY_LABEL, type ProjectCategory } from "@/lib/site-data";
import { formatIdr, formatIdrShort } from "@/lib/utils";

const STATUS_TONE: Record<ProjectStatus, "navy" | "success" | "warn" | "mute"> = {
  persiapan: "warn",
  berjalan: "navy",
  selesai: "success",
  tertahan: "mute",
};

export function ErpProjectList() {
  const projects = useErp((s) => s.projects);
  const clients = useErp((s) => s.clients);
  const addProject = useErp((s) => s.addProject);
  const showToast = useFeedback((s) => s.showToast);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const id = addProject({
      name: String(fd.get("name") ?? "").trim(),
      clientId: String(fd.get("clientId")),
      category: String(fd.get("category") || "gedung"),
      location: String(fd.get("location") ?? "").trim(),
      contractValue: Number(fd.get("value") || 0),
      durationWeeks: Number(fd.get("weeks") || 12),
      notes: String(fd.get("notes") ?? ""),
    });
    e.currentTarget.reset();
    setOpen(false);
    showToast("Proyek dibuat. Kurva S rencana sudah terisi.");
    void navigate({ to: "/erp/proyek/$id", params: { id } });
  }

  return (
    <div>
      <PageTitle
        title="Proyek & Kurva S"
        note="Bandingkan rencana vs aktual. Buka proyek untuk mencatat progres dan unduh laporan."
        action={
          <Button type="button" size="sm" onClick={() => setOpen((v) => !v)}>
            {open ? "Tutup" : "Proyek baru"}
          </Button>
        }
      />
      {open ? (
        <form
          onSubmit={onAdd}
          className="mb-6 grid gap-3 rounded-md border border-line bg-card p-4 md:grid-cols-2"
        >
          <label className="text-xs font-bold">
            Nama proyek
            <input
              name="name"
              required
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            />
          </label>
          <label className="text-xs font-bold">
            Klien
            <select
              name="clientId"
              required
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold">
            Segmen
            <select
              name="category"
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            >
              {CATEGORIES.filter((c) => c.id !== "semua").map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold">
            Lokasi
            <input
              name="location"
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            />
          </label>
          <label className="text-xs font-bold">
            Nilai kontrak (Rp)
            <input
              name="value"
              type="number"
              min={0}
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            />
          </label>
          <label className="text-xs font-bold">
            Durasi (minggu)
            <input
              name="weeks"
              type="number"
              min={4}
              max={52}
              defaultValue={12}
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            />
          </label>
          <div className="md:col-span-2">
            <Button type="submit" size="sm">
              Buat kurva S
            </Button>
          </div>
        </form>
      ) : null}
      <div className="grid gap-4">
        {projects.map((p) => {
          const client = clients.find((c) => c.id === p.clientId);
          const last = lastActual(p.weeks);
          const spi = spiOf(p.weeks);
          const finish = forecastFinishWeek(p.weeks);
          const delay = delayWeeks(p.weeks);
          const cat = p.category as ProjectCategory;
          return (
            <Link
              key={p.id}
              to="/erp/proyek/$id"
              params={{ id: p.id }}
              className="grid items-center gap-4 rounded-md border border-line bg-card p-4 shadow-card md:grid-cols-[1fr_200px_auto]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base">{p.name}</h2>
                  <StatusPill tone={STATUS_TONE[p.status]}>
                    {PROJECT_STATUS_LABEL[p.status]}
                  </StatusPill>
                  <HealthBadge points={p.weeks} />
                </div>
                <p className="mt-1 text-sm text-muted">
                  {client?.name} · {CATEGORY_LABEL[cat] ?? p.category} · {p.location}
                </p>
                <p className="mt-2 text-xs tabular-nums text-muted">
                  {formatIdrShort(p.contractValue)} · Minggu {last?.week ?? 0}/{p.durationWeeks} ·
                  SPI {spi ?? "—"}
                  {finish != null
                    ? ` · ramalan M${finish}${delay != null && delay > 0.2 ? ` (telat ${delay} mg)` : ""}`
                    : ""}
                </p>
              </div>
              <SparkCurve points={p.weeks} className="h-16" />
              <span className="text-sm font-bold text-navy-bright">Kurva S →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function ErpProjectDetail({ id }: { id: string }) {
  const project = useErp((s) => s.projects.find((p) => p.id === id));
  const clients = useErp((s) => s.clients);
  const logProgress = useErp((s) => s.logProgress);
  const setProjectStatus = useErp((s) => s.setProjectStatus);
  const showToast = useFeedback((s) => s.showToast);
  const openWeek = nextOpenWeek(project?.weeks ?? []) ?? 1;
  const [week, setWeek] = useState(openWeek);
  const [busy, setBusy] = useState(false);

  if (!project) {
    return (
      <div>
        <p className="text-sm text-muted">Proyek tidak ditemukan.</p>
        <Link to="/erp/proyek" className="mt-3 inline-block text-sm font-bold text-navy-bright">
          ← Daftar proyek
        </Link>
      </div>
    );
  }

  const current = project;
  const client = clients.find((c) => c.id === current.clientId);
  const last = lastActual(current.weeks);
  const spi = spiOf(current.weeks);
  const variance = variancePct(current.weeks);
  const suggested = nextOpenWeek(current.weeks) ?? last?.week ?? 1;
  const cat = current.category as ProjectCategory;
  const finish = forecastFinishWeek(current.weeks);
  const delay = delayWeeks(current.weeks);
  const velocity = velocityOf(current.weeks);
  const ev = earnedValue(current.contractValue, current.weeks);

  function onLog(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const w = Number(fd.get("week"));
    const actual = Number(fd.get("actual"));
    const note = String(fd.get("note") ?? "");
    if (!w || Number.isNaN(actual)) return;
    logProgress(current.id, w, actual, note);
    showToast(`Progres minggu ${w} tersimpan: ${actual}%`);
    setWeek(w);
  }

  async function onReport() {
    setBusy(true);
    try {
      await downloadScurvePdf(current, client);
      showToast("Laporan kurva S diunduh.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <Link to="/erp/proyek" className="mb-4 inline-block text-sm font-bold text-navy-bright">
        ← Semua proyek
      </Link>
      <PageTitle
        title={current.name}
        note={`${client?.name ?? ""} · ${CATEGORY_LABEL[cat] ?? current.category} · ${current.location}`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <HealthBadge points={current.weeks} />
            <label className="text-xs font-bold">
              Status
              <select
                value={current.status}
                onChange={(e) => setProjectStatus(current.id, e.target.value as ProjectStatus)}
                className="ml-2 h-11 rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm font-semibold"
              >
                {PROJECT_STATUS.map((s) => (
                  <option key={s} value={s}>
                    {PROJECT_STATUS_LABEL[s]}
                  </option>
                ))}
              </select>
            </label>
            <Button type="button" variant="outline" size="sm" onClick={() => void onReport()} disabled={busy}>
              {busy ? "Menyiapkan…" : "Unduh laporan PDF"}
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-md border border-line bg-card p-4">
          <p className="text-xs font-bold text-muted">Nilai kontrak</p>
          <p className="mt-1 text-lg font-extrabold tabular-nums">{formatIdr(current.contractValue)}</p>
          <p className="text-xs text-muted">EV {formatIdrShort(ev)}</p>
        </article>
        <article className="rounded-md border border-line bg-card p-4">
          <p className="text-xs font-bold text-muted">SPI (jadwal)</p>
          <p className="mt-1 text-lg font-extrabold tabular-nums">{spi ?? "—"}</p>
          <p className="text-xs text-muted">
            Aktual {last?.actual ?? 0}% vs rencana {last?.planned ?? 0}%
          </p>
        </article>
        <article className="rounded-md border border-line bg-card p-4">
          <p className="text-xs font-bold text-muted">Ramalan selesai</p>
          <p className="mt-1 text-lg font-extrabold tabular-nums">
            {finish == null ? "—" : `M${finish}`}
          </p>
          <p className="text-xs text-muted">
            {delay == null
              ? "Belum ada aktual"
              : delay > 0.2
                ? `Telat ${delay} minggu vs rencana ${current.durationWeeks} mg`
                : delay < -0.2
                  ? `Lebih cepat ${Math.abs(delay)} minggu`
                  : `On-track ${current.durationWeeks} minggu`}
          </p>
        </article>
        <article className="rounded-md border border-line bg-card p-4">
          <p className="text-xs font-bold text-muted">Kecepatan</p>
          <p className="mt-1 text-lg font-extrabold tabular-nums">
            {velocity == null ? "—" : `${velocity} pt`}
          </p>
          <p className="text-xs text-muted">Sisa {remainingPct(current.weeks)}% · deviasi {variance == null ? "—" : `${variance > 0 ? "+" : ""}${variance} pt`}</p>
        </article>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-md border border-line bg-card p-5 shadow-card">
          <h2 className="text-base">Kurva S — rencana, aktual, prakiraan</h2>
          <p className="mt-1 mb-4 text-xs text-muted">
            Navy = rencana, merah = aktual tercatat, putus-putus = prakiraan berdasarkan kecepatan
            minggu terakhir.
          </p>
          <SCurveChart points={current.weeks} />
        </section>
        <section className="rounded-md border border-line bg-card p-5 shadow-card">
          <h2 className="text-base">Catat progres</h2>
          <p className="mt-1 text-xs text-muted">
            Isi persen kumulatif untuk minggu berjalan. Minggu berikutnya yang kosong: {suggested}.
          </p>
          <form onSubmit={onLog} className="mt-4 grid gap-3">
            <label className="text-xs font-bold">
              Minggu
              <select
                name="week"
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
              >
                {current.weeks.map((w) => (
                  <option key={w.week} value={w.week}>
                    Minggu {w.week} · rencana {w.planned}%
                    {w.actual != null ? ` · aktual ${w.actual}%` : ""}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="scurve-actual" className="text-xs font-bold">
              Aktual kumulatif (%)
              <input
                id="scurve-actual"
                name="actual"
                type="number"
                min={0}
                max={100}
                step={0.5}
                required
                className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
                placeholder="contoh 62"
              />
            </label>
            <label htmlFor="scurve-note" className="text-xs font-bold">
              Catatan minggu
              <input
                id="scurve-note"
                name="note"
                className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
                placeholder="Kendala, material, shutdown…"
              />
            </label>
            <Button type="submit" size="block">
              Simpan ke kurva S
            </Button>
          </form>
          <p className="mt-4 text-xs leading-relaxed text-muted">{current.notes}</p>
        </section>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-line bg-card">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-line text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-bold">Minggu</th>
              <th className="px-4 py-3 font-bold">Rencana</th>
              <th className="px-4 py-3 font-bold">Aktual</th>
              <th className="px-4 py-3 font-bold">Deviasi</th>
              <th className="px-4 py-3 font-bold">Catatan</th>
            </tr>
          </thead>
          <tbody>
            {current.weeks.map((w) => (
              <tr key={w.week} className="border-b border-line last:border-0">
                <td className="px-4 py-2.5 tabular-nums">M{w.week}</td>
                <td className="px-4 py-2.5 tabular-nums">{w.planned}%</td>
                <td className="px-4 py-2.5 tabular-nums">{w.actual == null ? "—" : `${w.actual}%`}</td>
                <td className="px-4 py-2.5 tabular-nums">
                  {w.actual == null ? "—" : `${(w.actual - w.planned).toFixed(1)} pt`}
                </td>
                <td className="px-4 py-2.5 text-xs text-muted">{w.note ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
