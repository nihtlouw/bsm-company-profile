import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildWeeks, healthOf, type CurvePoint } from "@/lib/scurve";
import { PROJECTS } from "@/lib/site-data";
import { uid } from "@/lib/utils";
import { readWebInquiries } from "@/lib/web-leads";

export const LEAD_STAGES = [
  "baru",
  "dihubungi",
  "survey",
  "penawaran",
  "menang",
  "kalah",
] as const;
export type LeadStage = (typeof LEAD_STAGES)[number];

export const LEAD_LABEL: Record<LeadStage, string> = {
  baru: "Baru",
  dihubungi: "Dihubungi",
  survey: "Survey",
  penawaran: "Penawaran",
  menang: "Menang",
  kalah: "Kalah",
};

export const PROJECT_STATUS = ["persiapan", "berjalan", "selesai", "tertahan"] as const;
export type ProjectStatus = (typeof PROJECT_STATUS)[number];

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  persiapan: "Persiapan",
  berjalan: "Berjalan",
  selesai: "Selesai",
  tertahan: "Tertahan",
};

export const QUOTE_STATUS = ["draft", "terkirim", "disetujui", "ditolak"] as const;
export type QuoteStatus = (typeof QUOTE_STATUS)[number];

export const QUOTE_LABEL: Record<QuoteStatus, string> = {
  draft: "Draft",
  terkirim: "Terkirim",
  disetujui: "Disetujui",
  ditolak: "Ditolak",
};

export type ErpClient = {
  id: string;
  name: string;
  segment: string;
  city: string;
  contact: string;
};

export type ErpLead = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  type?: string;
  location?: string;
  message?: string;
  source: string;
  stage: LeadStage;
  value: number;
  createdAt: number;
  projectId?: string;
};

export type ErpProject = {
  id: string;
  name: string;
  clientId: string;
  category: string;
  location: string;
  status: ProjectStatus;
  contractValue: number;
  durationWeeks: number;
  weeks: CurvePoint[];
  notes: string;
  image?: string;
};

export type QuoteItem = { name: string; qty: number; unit: string; price: number };

export type ErpQuote = {
  id: string;
  clientId: string;
  title: string;
  status: QuoteStatus;
  createdAt: number;
  validUntil: number;
  items: QuoteItem[];
  projectId?: string;
};

export type ErpMaterial = {
  id: string;
  name: string;
  sku: string;
  unit: string;
  stock: number;
  minStock: number;
  warehouse: "Palembang" | "Karawang";
};

type ErpState = {
  ready: boolean;
  clients: ErpClient[];
  leads: ErpLead[];
  projects: ErpProject[];
  quotes: ErpQuote[];
  materials: ErpMaterial[];
  hydrate: () => void | Promise<void>;
  ingestWebLeads: () => void;
  setLeadStage: (id: string, stage: LeadStage) => void;
  addLead: (lead: Omit<ErpLead, "id" | "createdAt" | "stage"> & { stage?: LeadStage }) => void;
  logProgress: (projectId: string, week: number, actual: number, note?: string) => void;
  setQuoteStatus: (id: string, status: QuoteStatus) => void;
  addQuote: (quote: Omit<ErpQuote, "id" | "createdAt">) => void;
  adjustStock: (id: string, delta: number) => void;
  promoteLead: (id: string) => string | null;
  promoteQuote: (id: string) => string | null;
  quoteFromLead: (id: string) => string | null;
  setProjectStatus: (id: string, status: ProjectStatus) => void;
  addProject: (input: {
    name: string;
    clientId: string;
    category: string;
    location: string;
    contractValue: number;
    durationWeeks: number;
    notes?: string;
  }) => string;
  addClient: (input: Omit<ErpClient, "id">) => string;
};

const clients: ErpClient[] = [
  {
    id: "c-rspad",
    name: "RSPAD Gatot Soebroto",
    segment: "Fasilitas kesehatan",
    city: "Jakarta",
    contact: "Andi Wijaya",
  },
  {
    id: "c-rsud",
    name: "RSUD Palembang",
    segment: "Fasilitas kesehatan",
    city: "Palembang",
    contact: "Bagian Umum",
  },
  {
    id: "c-kiic",
    name: "KIIC Karawang",
    segment: "Kawasan industri",
    city: "Karawang",
    contact: "Plant Engineer",
  },
  {
    id: "c-elektronik",
    name: "Pabrik Elektronik Cikarang",
    segment: "Manufaktur",
    city: "Cikarang",
    contact: "Sari Lestari",
  },
  {
    id: "c-office",
    name: "Developer Perkantoran",
    segment: "Gedung komersial",
    city: "Karawang",
    contact: "Project Manager",
  },
];

function seedProjects(): ErpProject[] {
  const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
  return [
    {
      id: "rspad",
      name: "Panel distribusi RSPAD",
      clientId: "c-rspad",
      category: "rumah-sakit",
      location: "Jakarta",
      status: "berjalan",
      contractValue: 2_400_000_000,
      durationWeeks: 16,
      weeks: buildWeeks({ total: 16, actualThrough: 11, lagWeeks: 1.2 }).map((w) =>
        w.week === 11 ? { ...w, note: "Menunggu material SDP cadangan." } : w,
      ),
      notes: "Area rawat inap baru. Koordinasi MEP untuk shutdown malam.",
      image: byId.rspad?.image,
    },
    {
      id: "factory",
      name: "Instalasi pabrik KIIC",
      clientId: "c-kiic",
      category: "pabrik",
      location: "Karawang",
      status: "berjalan",
      contractValue: 3_100_000_000,
      durationWeeks: 14,
      weeks: buildWeeks({ total: 14, actualThrough: 8, lagWeeks: 0 }),
      notes: "MCC lini 2. FAT selesai, instalasi lapangan berjalan.",
      image: byId.factory?.image,
    },
    {
      id: "commercial",
      name: "Distribusi gedung 12 lantai",
      clientId: "c-office",
      category: "gedung",
      location: "Karawang",
      status: "berjalan",
      contractValue: 4_800_000_000,
      durationWeeks: 20,
      weeks: buildWeeks({ total: 20, actualThrough: 9, lagWeeks: -1.1 }),
      notes: "Panel per lantai. Lebih cepat di zona basement.",
      image: byId.commercial?.image,
    },
    {
      id: "puskesmas",
      name: "Instalasi Puskesmas Kecamatan",
      clientId: "c-rsud",
      category: "rumah-sakit",
      location: "Palembang",
      status: "selesai",
      contractValue: 890_000_000,
      durationWeeks: 10,
      weeks: buildWeeks({ total: 10, actualThrough: 10, lagWeeks: 0 }),
      notes: "Serah terima selesai. Maintenance 3 bulan berjalan.",
      image: byId.puskesmas?.image,
    },
    {
      id: "elektronik",
      name: "Panel & grounding pabrik elektronik",
      clientId: "c-elektronik",
      category: "pabrik",
      location: "Cikarang",
      status: "persiapan",
      contractValue: 1_600_000_000,
      durationWeeks: 12,
      weeks: buildWeeks({ total: 12, actualThrough: 2, lagWeeks: 0.4 }),
      notes: "Menunggu akses ruang listrik dari owner.",
      image: byId.elektronik?.image,
    },
  ];
}

const seedLeads: ErpLead[] = [
  {
    id: "lead-seed-1",
    name: "Budi Santoso",
    email: "budi@klinikharapan.id",
    phone: "0812-1100-2211",
    company: "Klinik Harapan",
    type: "Rumah Sakit",
    location: "Palembang",
    message: "Butuh panel SDP dan penerangan IGD.",
    source: "manual",
    stage: "survey",
    value: 420_000_000,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },
  {
    id: "lead-seed-2",
    name: "Rina Kusuma",
    email: "rina@logistikprima.co.id",
    phone: "0813-4455-6677",
    company: "Gudang Logistik Prima",
    type: "Pabrik",
    location: "Karawang",
    message: "Tray kabel dan MCC packing line.",
    source: "campaign_lead",
    stage: "penawaran",
    value: 1_150_000_000,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
  },
  {
    id: "lead-seed-3",
    name: "Hendra",
    company: "Mall Palembang Square",
    type: "Gedung Komersial",
    location: "Palembang",
    email: "hendra@mps.id",
    message: "Retrofit penerangan basement.",
    source: "contact_form",
    stage: "baru",
    value: 275_000_000,
    createdAt: Date.now() - 1000 * 60 * 60 * 18,
  },
  {
    id: "lead-seed-4",
    name: "Dewi Pratiwi",
    email: "dewi@rsmitra.id",
    phone: "0812-7788-9900",
    company: "RS Mitra Palembang",
    type: "Rumah Sakit",
    location: "Palembang",
    message: "Panel IGD dan cadangan daya. Tender dimenangkan, siap kick-off.",
    source: "manual",
    stage: "menang",
    value: 1_850_000_000,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
];

const seedQuotes: ErpQuote[] = [
  {
    id: "q-1",
    clientId: "c-elektronik",
    title: "Grounding area produksi — revisi 2",
    status: "terkirim",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
    validUntil: Date.now() + 1000 * 60 * 60 * 24 * 2,
    items: [
      { name: "Grounding rod 3m", qty: 24, unit: "bh", price: 850_000 },
      { name: "Kabel BC 70mm", qty: 180, unit: "m", price: 95_000 },
      { name: "Pengujian tahanan tanah", qty: 1, unit: "ls", price: 12_000_000 },
    ],
  },
  {
    id: "q-2",
    clientId: "c-office",
    title: "Panel lantai 8–12",
    status: "disetujui",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
    validUntil: Date.now() + 1000 * 60 * 60 * 24 * 5,
    items: [
      { name: "SDP 400A", qty: 5, unit: "set", price: 48_000_000 },
      { name: "Instalasi & testing", qty: 1, unit: "ls", price: 95_000_000 },
    ],
  },
  {
    id: "q-3",
    clientId: "c-rsud",
    title: "Penerangan IGD — draft",
    status: "draft",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    validUntil: Date.now() + 1000 * 60 * 60 * 24 * 21,
    items: [{ name: "LED panel 40W", qty: 86, unit: "bh", price: 210_000 }],
  },
];

const seedMaterials: ErpMaterial[] = [
  { id: "m1", name: "NYY 4×16 mm²", sku: "CBL-NYY-416", unit: "m", stock: 420, minStock: 200, warehouse: "Karawang" },
  { id: "m2", name: "NYA 2.5 mm²", sku: "CBL-NYA-25", unit: "m", stock: 80, minStock: 150, warehouse: "Palembang" },
  { id: "m3", name: "Cable tray 300 mm", sku: "TRY-300", unit: "m", stock: 64, minStock: 40, warehouse: "Karawang" },
  { id: "m4", name: "MCCB 250A", sku: "BRK-250", unit: "bh", stock: 6, minStock: 8, warehouse: "Palembang" },
  { id: "m5", name: "MCB 16A", sku: "BRK-16", unit: "bh", stock: 140, minStock: 60, warehouse: "Palembang" },
  { id: "m6", name: "Busbar Cu 40×10", sku: "BUS-4010", unit: "m", stock: 18, minStock: 12, warehouse: "Karawang" },
  { id: "m7", name: "LED panel 40W", sku: "LGT-40", unit: "bh", stock: 35, minStock: 40, warehouse: "Palembang" },
  { id: "m8", name: "Grounding rod 3m", sku: "GND-3M", unit: "bh", stock: 22, minStock: 10, warehouse: "Karawang" },
];

function quoteAmount(q: ErpQuote) {
  return q.items.reduce((s, i) => s + i.qty * i.price, 0);
}

export { quoteAmount, healthOf };

function seed() {
  return {
    clients,
    leads: seedLeads,
    projects: seedProjects(),
    quotes: seedQuotes,
    materials: seedMaterials,
  };
}

export const useErp = create<ErpState>()(
  persist(
    (set, get) => ({
      ready: false,
      ...seed(),
      hydrate: async () => {
        await useErp.persist.rehydrate();
        get().ingestWebLeads();
        set({ ready: true });
      },
      ingestWebLeads: () => {
        const web = readWebInquiries();
        if (!web.length) return;
        const existing = new Set(get().leads.map((l) => l.id));
        const extra: ErpLead[] = [];
        for (const w of web) {
          if (existing.has(w.id)) continue;
          extra.push({
            id: w.id,
            name: w.name,
            email: w.email,
            phone: w.phone,
            company: w.company,
            type: w.type,
            location: w.loc,
            message: w.message,
            source: w.source,
            stage: "baru",
            value: 0,
            createdAt: w.at,
          });
        }
        if (extra.length) set({ leads: [...extra, ...get().leads] });
      },
      setLeadStage: (id, stage) =>
        set({ leads: get().leads.map((l) => (l.id === id ? { ...l, stage } : l)) }),
      addLead: (lead) =>
        set({
          leads: [
            {
              ...lead,
              id: uid("lead"),
              stage: lead.stage ?? "baru",
              createdAt: Date.now(),
            },
            ...get().leads,
          ],
        }),
      logProgress: (projectId, week, actual, note) =>
        set({
          projects: get().projects.map((p) => {
            if (p.id !== projectId) return p;
            const weeks = p.weeks.map((w) =>
              w.week === week
                ? {
                    ...w,
                    actual: Math.max(0, Math.min(100, actual)),
                    note: note?.trim() ? note.trim() : w.note,
                  }
                : w,
            );
            const last = [...weeks].reverse().find((w) => w.actual != null);
            let status: ProjectStatus = p.status;
            if (last?.actual != null && last.actual >= 99.5 && last.week >= weeks.length) {
              status = "selesai";
            } else if ((last?.actual ?? 0) > 0) {
              status = p.status === "selesai" ? "berjalan" : p.status === "persiapan" ? "berjalan" : p.status;
            }
            return { ...p, weeks, status };
          }),
        }),
      setQuoteStatus: (id, status) =>
        set({ quotes: get().quotes.map((q) => (q.id === id ? { ...q, status } : q)) }),
      addQuote: (quote) =>
        set({
          quotes: [{ ...quote, id: uid("q"), createdAt: Date.now() }, ...get().quotes],
        }),
      adjustStock: (id, delta) =>
        set({
          materials: get().materials.map((m) =>
            m.id === id ? { ...m, stock: Math.max(0, m.stock + delta) } : m,
          ),
        }),
      promoteLead: (id) => {
        const lead = get().leads.find((l) => l.id === id);
        if (!lead) return null;
        if (lead.projectId) return lead.projectId;
        const companyName = (lead.company || lead.name).trim();
        let clients = get().clients;
        let client = clients.find((c) => c.name.toLowerCase() === companyName.toLowerCase());
        if (!client) {
          client = {
            id: uid("c"),
            name: companyName,
            segment: lead.type || "Proyek baru",
            city: lead.location || "—",
            contact: lead.name,
          };
          clients = [client, ...clients];
        }
        const type = (lead.type || "").toLowerCase();
        const category = type.includes("sakit") || type.includes("klinik")
          ? "rumah-sakit"
          : type.includes("pabrik") || type.includes("gudang")
            ? "pabrik"
            : "gedung";
        const durationWeeks = 12;
        const project: ErpProject = {
          id: uid("prj"),
          name: lead.type ? `${lead.type} — ${companyName}` : companyName,
          clientId: client.id,
          category,
          location: lead.location || "—",
          status: "persiapan",
          contractValue: lead.value || 0,
          durationWeeks,
          weeks: buildWeeks({ total: durationWeeks, actualThrough: 0 }),
          notes: lead.message || `Dibentuk dari prospek ${lead.name}.`,
        };
        set({
          clients,
          projects: [project, ...get().projects],
          leads: get().leads.map((l) =>
            l.id === id ? { ...l, stage: "menang", projectId: project.id } : l,
          ),
        });
        return project.id;
      },
      promoteQuote: (id) => {
        const quote = get().quotes.find((q) => q.id === id);
        if (!quote) return null;
        if (quote.projectId) return quote.projectId;
        const value = quoteAmount(quote);
        const project: ErpProject = {
          id: uid("prj"),
          name: quote.title,
          clientId: quote.clientId,
          category: "gedung",
          location: get().clients.find((c) => c.id === quote.clientId)?.city ?? "—",
          status: "persiapan",
          contractValue: value,
          durationWeeks: 12,
          weeks: buildWeeks({ total: 12, actualThrough: 0 }),
          notes: `Dari penawaran ${quote.id}.`,
        };
        set({
          projects: [project, ...get().projects],
          quotes: get().quotes.map((q) =>
            q.id === id ? { ...q, status: "disetujui", projectId: project.id } : q,
          ),
        });
        return project.id;
      },
      quoteFromLead: (id) => {
        const lead = get().leads.find((l) => l.id === id);
        if (!lead) return null;
        const companyName = (lead.company || lead.name).trim();
        let clients = get().clients;
        let client = clients.find((c) => c.name.toLowerCase() === companyName.toLowerCase());
        if (!client) {
          client = {
            id: uid("c"),
            name: companyName,
            segment: lead.type || "Proyek baru",
            city: lead.location || "—",
            contact: lead.name,
          };
          clients = [client, ...clients];
        }
        const quote: ErpQuote = {
          id: uid("q"),
          clientId: client.id,
          title: lead.type ? `${lead.type} — ${companyName}` : companyName,
          status: "draft",
          createdAt: Date.now(),
          validUntil: Date.now() + 1000 * 60 * 60 * 24 * 21,
          items: [
            {
              name: lead.message || lead.type || "Paket pekerjaan elektrikal",
              qty: 1,
              unit: "ls",
              price: lead.value || 0,
            },
          ],
        };
        set({
          clients,
          quotes: [quote, ...get().quotes],
          leads: get().leads.map((l) => (l.id === id ? { ...l, stage: "penawaran" } : l)),
        });
        return quote.id;
      },
      setProjectStatus: (id, status) =>
        set({
          projects: get().projects.map((p) => (p.id === id ? { ...p, status } : p)),
        }),
      addProject: (input) => {
        const durationWeeks = Math.max(4, Math.min(52, Math.round(input.durationWeeks) || 12));
        const project: ErpProject = {
          id: uid("prj"),
          name: input.name.trim(),
          clientId: input.clientId,
          category: input.category,
          location: input.location.trim() || "—",
          status: "persiapan",
          contractValue: Math.max(0, input.contractValue),
          durationWeeks,
          weeks: buildWeeks({ total: durationWeeks, actualThrough: 0 }),
          notes: input.notes?.trim() ?? "",
        };
        set({ projects: [project, ...get().projects] });
        return project.id;
      },
      addClient: (input) => {
        const client: ErpClient = { ...input, id: uid("c") };
        set({ clients: [client, ...get().clients] });
        return client.id;
      },
    }),
    {
      name: "bsm-erp-v2",
      skipHydration: true,
      partialize: (s) => ({
        clients: s.clients,
        leads: s.leads,
        projects: s.projects,
        quotes: s.quotes,
        materials: s.materials,
      }),
    },
  ),
);
