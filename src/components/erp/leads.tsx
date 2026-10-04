import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/erp/shell";
import { StatusPill } from "@/components/erp/widgets";
import { useFeedback } from "@/lib/feedback";
import {
  LEAD_LABEL,
  LEAD_STAGES,
  type LeadStage,
  useErp,
} from "@/lib/erp-store";
import { formatDate, formatIdrShort } from "@/lib/utils";

const NEXT: Partial<Record<LeadStage, LeadStage>> = {
  baru: "dihubungi",
  dihubungi: "survey",
  survey: "penawaran",
  penawaran: "menang",
};

export function ErpLeads() {
  const leads = useErp((s) => s.leads);
  const setStage = useErp((s) => s.setLeadStage);
  const addLead = useErp((s) => s.addLead);
  const promoteLead = useErp((s) => s.promoteLead);
  const quoteFromLead = useErp((s) => s.quoteFromLead);
  const showToast = useFeedback((s) => s.showToast);
  const [openForm, setOpenForm] = useState(false);

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addLead({
      name: String(fd.get("name") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      type: String(fd.get("type") ?? "").trim(),
      location: String(fd.get("location") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      source: "manual",
      value: Number(fd.get("value") || 0),
    });
    e.currentTarget.reset();
    setOpenForm(false);
  }

  return (
    <div>
      <PageTitle
        title="Prospek & CRM"
        note="Lead dari situs (kontak + kampanye) masuk otomatis ke kolom Baru."
        action={
          <Button type="button" size="sm" onClick={() => setOpenForm((v) => !v)}>
            {openForm ? "Tutup" : "Tambah prospek"}
          </Button>
        }
      />
      {openForm ? (
        <form
          onSubmit={onAdd}
          className="mb-6 grid gap-3 rounded-md border border-line bg-card p-4 md:grid-cols-3"
        >
          <Field name="name" label="Nama" required />
          <Field name="company" label="Perusahaan" />
          <Field name="type" label="Jenis proyek" />
          <Field name="location" label="Lokasi" />
          <Field name="phone" label="Telepon" />
          <Field name="value" label="Nilai perkiraan (Rp)" />
          <div className="md:col-span-3">
            <Button type="submit" size="sm">
              Simpan
            </Button>
          </div>
        </form>
      ) : null}

      <div className="flex gap-3 overflow-x-auto pb-4">
        {LEAD_STAGES.map((stage) => {
          const rows = leads.filter((l) => l.stage === stage);
          return (
            <section
              key={stage}
              className="w-[260px] shrink-0 rounded-md border border-line bg-card p-3"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm">{LEAD_LABEL[stage]}</h2>
                <span className="text-xs font-bold tabular-nums text-muted">{rows.length}</span>
              </div>
              <div className="flex flex-col gap-2">
                {rows.map((l) => (
                  <article key={l.id} className="rounded-[10px] border border-line bg-page p-3">
                    <p className="text-sm font-bold">{l.name}</p>
                    <p className="text-xs text-muted">{l.company || l.type || l.source}</p>
                    <p className="mt-1 text-xs text-muted">
                      {l.location || "—"} · {formatDate(l.createdAt)}
                    </p>
                    {l.value ? (
                      <p className="mt-1 text-xs font-bold text-navy-mid">
                        {formatIdrShort(l.value)}
                      </p>
                    ) : null}
                    {l.message ? (
                      <p className="mt-2 line-clamp-2 text-xs text-muted">{l.message}</p>
                    ) : null}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {NEXT[l.stage] ? (
                        <button
                          type="button"
                          className="h-11 rounded-full bg-navy px-3 text-xs font-bold text-paper"
                          onClick={() => setStage(l.id, NEXT[l.stage]!)}
                        >
                          → {LEAD_LABEL[NEXT[l.stage]!]}
                        </button>
                      ) : null}
                      {l.stage === "survey" || l.stage === "penawaran" ? (
                        <button
                          type="button"
                          className="h-11 rounded-full border border-line px-3 text-xs font-bold"
                          onClick={() => {
                            const qid = quoteFromLead(l.id);
                            if (qid) showToast("Draft penawaran dibuat. Buka menu Penawaran.");
                          }}
                        >
                          Buat penawaran
                        </button>
                      ) : null}
                      {l.stage === "penawaran" ? (
                        <button
                          type="button"
                          className="h-11 rounded-full border border-line px-3 text-xs font-bold"
                          onClick={() => setStage(l.id, "kalah")}
                        >
                          Kalah
                        </button>
                      ) : null}
                      {l.stage === "menang" && !l.projectId ? (
                        <button
                          type="button"
                          className="h-11 rounded-full bg-brand px-3 text-xs font-bold text-paper"
                          onClick={() => {
                            const pid = promoteLead(l.id);
                            if (pid) showToast("Proyek kurva S dibuat dari prospek ini.");
                          }}
                        >
                          Buat proyek + kurva S
                        </button>
                      ) : null}
                      {l.projectId ? (
                        <Link
                          to="/erp/proyek/$id"
                          params={{ id: l.projectId }}
                          className="inline-flex h-11 items-center rounded-full border border-line px-3 text-xs font-bold"
                        >
                          Buka kurva S
                        </Link>
                      ) : null}
                    </div>
                  </article>
                ))}
                {!rows.length ? (
                  <p className="px-1 py-6 text-center text-xs text-muted">Kosong</p>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>
      <p className="text-xs text-muted">
        Sumber <StatusPill tone="navy">campaign_lead</StatusPill> dan{" "}
        <StatusPill tone="brand">contact_form</StatusPill> berasal dari CTA situs.
      </p>
    </div>
  );
}

function Field({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  const id = `lead-${name}`;
  return (
    <label htmlFor={id} className="text-xs font-bold">
      {label}
      <input
        id={id}
        name={name}
        required={required}
        className="mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm font-medium"
      />
    </label>
  );
}
