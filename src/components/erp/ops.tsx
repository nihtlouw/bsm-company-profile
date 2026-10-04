import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageTitle } from "@/components/erp/shell";
import { StatusPill } from "@/components/erp/widgets";
import { Button } from "@/components/ui/button";
import { downloadQuotePdf } from "@/lib/erp-pdf";
import { useFeedback } from "@/lib/feedback";
import {
  QUOTE_LABEL,
  QUOTE_STATUS,
  quoteAmount,
  useErp,
  type QuoteStatus,
} from "@/lib/erp-store";
import { formatDate, formatIdr, formatIdrShort } from "@/lib/utils";

const QUOTE_TONE: Record<QuoteStatus, "mute" | "navy" | "success" | "brand"> = {
  draft: "mute",
  terkirim: "navy",
  disetujui: "success",
  ditolak: "brand",
};

export function ErpQuotes() {
  const quotes = useErp((s) => s.quotes);
  const clients = useErp((s) => s.clients);
  const setStatus = useErp((s) => s.setQuoteStatus);
  const addQuote = useErp((s) => s.addQuote);
  const promoteQuote = useErp((s) => s.promoteQuote);
  const showToast = useFeedback((s) => s.showToast);
  const [open, setOpen] = useState(false);

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addQuote({
      clientId: String(fd.get("clientId")),
      title: String(fd.get("title")).trim(),
      status: "draft",
      validUntil: Date.now() + 1000 * 60 * 60 * 24 * 21,
      items: [
        {
          name: String(fd.get("item") || "Paket pekerjaan"),
          qty: 1,
          unit: "ls",
          price: Number(fd.get("price") || 0),
        },
      ],
    });
    e.currentTarget.reset();
    setOpen(false);
  }

  return (
    <div>
      <PageTitle
        title="Penawaran"
        note="Draft, kirim, unduh PDF, atau buat proyek kurva S dari penawaran disetujui."
        action={
          <Button size="sm" type="button" onClick={() => setOpen((v) => !v)}>
            {open ? "Tutup" : "Penawaran baru"}
          </Button>
        }
      />
      {open ? (
        <form
          onSubmit={onAdd}
          className="mb-6 grid gap-3 rounded-md border border-line bg-card p-4 md:grid-cols-2"
        >
          <label className="text-xs font-bold">
            Klien
            <select
              name="clientId"
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
            Judul
            <input
              name="title"
              required
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            />
          </label>
          <label className="text-xs font-bold">
            Item
            <input
              name="item"
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            />
          </label>
          <label className="text-xs font-bold">
            Nilai (Rp)
            <input
              name="price"
              type="number"
              required
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            />
          </label>
          <Button type="submit" size="sm">
            Simpan draft
          </Button>
        </form>
      ) : null}
      <div className="grid gap-3">
        {quotes.map((q) => {
          const client = clients.find((c) => c.id === q.clientId);
          return (
            <article
              key={q.id}
              className="rounded-md border border-line bg-card p-4 shadow-card md:flex md:items-center md:justify-between md:gap-4"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm">{q.title}</h2>
                  <StatusPill tone={QUOTE_TONE[q.status]}>{QUOTE_LABEL[q.status]}</StatusPill>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {client?.name} · {formatDate(q.createdAt)} · berlaku s.d. {formatDate(q.validUntil)}
                </p>
                <ul className="mt-2 text-xs text-muted">
                  {q.items.map((item) => (
                    <li key={item.name}>
                      {item.qty} {item.unit} {item.name} · {formatIdr(item.qty * item.price)}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm font-extrabold tabular-nums">
                  {formatIdr(quoteAmount(q))}
                </p>
              </div>
              <label className="mt-3 block text-xs font-bold md:mt-0">
                Status
                <select
                  value={q.status}
                  onChange={(e) => setStatus(q.id, e.target.value as QuoteStatus)}
                  className="mt-1.5 h-11 rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
                >
                  {QUOTE_STATUS.map((s) => (
                    <option key={s} value={s}>
                      {QUOTE_LABEL[s]}
                    </option>
                  ))}
                </select>
              </label>
              <div className="mt-3 flex flex-col gap-2 md:mt-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    void downloadQuotePdf(q, client).then(() =>
                      showToast("PDF penawaran diunduh."),
                    );
                  }}
                >
                  Unduh PDF
                </Button>
                {q.status === "disetujui" && !q.projectId ? (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      const pid = promoteQuote(q.id);
                      if (pid) showToast("Proyek kurva S dibuat dari penawaran.");
                    }}
                  >
                    Buat proyek
                  </Button>
                ) : null}
                {q.projectId ? (
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/erp/proyek/$id" params={{ id: q.projectId }}>
                      Buka kurva S
                    </Link>
                  </Button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function ErpClients() {
  const clients = useErp((s) => s.clients);
  const projects = useErp((s) => s.projects);
  const quotes = useErp((s) => s.quotes);
  const addClient = useErp((s) => s.addClient);
  const showToast = useFeedback((s) => s.showToast);
  const [open, setOpen] = useState(false);

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addClient({
      name: String(fd.get("name") ?? "").trim(),
      segment: String(fd.get("segment") ?? "").trim() || "Umum",
      city: String(fd.get("city") ?? "").trim() || "—",
      contact: String(fd.get("contact") ?? "").trim() || "—",
    });
    e.currentTarget.reset();
    setOpen(false);
    showToast("Klien tersimpan.");
  }

  return (
    <div>
      <PageTitle
        title="Klien"
        note="Fasilitas yang terhubung ke proyek dan penawaran."
        action={
          <Button type="button" size="sm" onClick={() => setOpen((v) => !v)}>
            {open ? "Tutup" : "Klien baru"}
          </Button>
        }
      />
      {open ? (
        <form
          onSubmit={onAdd}
          className="mb-6 grid gap-3 rounded-md border border-line bg-card p-4 md:grid-cols-2"
        >
          <label className="text-xs font-bold">
            Nama
            <input
              name="name"
              required
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            />
          </label>
          <label className="text-xs font-bold">
            Segmen
            <input
              name="segment"
              placeholder="Fasilitas kesehatan"
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            />
          </label>
          <label className="text-xs font-bold">
            Kota
            <input
              name="city"
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            />
          </label>
          <label className="text-xs font-bold">
            Kontak
            <input
              name="contact"
              className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
            />
          </label>
          <Button type="submit" size="sm">
            Simpan
          </Button>
        </form>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c) => {
          const nProj = projects.filter((p) => p.clientId === c.id).length;
          const nQuote = quotes.filter((q) => q.clientId === c.id).length;
          const value = projects
            .filter((p) => p.clientId === c.id)
            .reduce((s, p) => s + p.contractValue, 0);
          return (
            <article key={c.id} className="rounded-md border border-line bg-card p-5 shadow-card">
              <p className="text-xs font-bold text-brand">{c.segment}</p>
              <h2 className="mt-1 text-base">{c.name}</h2>
              <p className="mt-1 text-sm text-muted">
                {c.city} · {c.contact}
              </p>
              <p className="mt-4 text-xs text-muted">
                {nProj} proyek · {nQuote} penawaran
              </p>
              <p className="mt-1 text-sm font-extrabold tabular-nums">
                {value ? formatIdrShort(value) : "Belum ada kontrak"}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function ErpMaterials() {
  const materials = useErp((s) => s.materials);
  const adjust = useErp((s) => s.adjustStock);

  return (
    <div>
      <PageTitle
        title="Material"
        note="Stok gudang Palembang & Karawang. Highlight kuning jika di bawah minimum."
      />
      <div className="overflow-x-auto rounded-md border border-line bg-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-bold">SKU</th>
              <th className="px-4 py-3 font-bold">Material</th>
              <th className="px-4 py-3 font-bold">Gudang</th>
              <th className="px-4 py-3 font-bold">Stok</th>
              <th className="px-4 py-3 font-bold">Min</th>
              <th className="px-4 py-3 font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((m) => {
              const low = m.stock < m.minStock;
              return (
                <tr key={m.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{m.sku}</td>
                  <td className="px-4 py-3 font-semibold">{m.name}</td>
                  <td className="px-4 py-3 text-muted">{m.warehouse}</td>
                  <td className="px-4 py-3 tabular-nums">
                    {low ? (
                      <StatusPill tone="warn">
                        {`${m.stock} ${m.unit}`}
                      </StatusPill>
                    ) : (
                      `${m.stock} ${m.unit}`
                    )}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-muted">
                    {m.minStock} {m.unit}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="size-11 rounded-[10px] border border-line font-bold"
                        onClick={() => adjust(m.id, -1)}
                      >
                        −
                      </button>
                      <button
                        type="button"
                        className="size-11 rounded-[10px] border border-line font-bold"
                        onClick={() => adjust(m.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
