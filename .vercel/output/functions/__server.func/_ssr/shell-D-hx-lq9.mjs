import { o as __toESM } from "../_runtime.mjs";
import { _ as PROJECTS, s as COMPANY } from "./site-data-CiDbZPVB.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link, g as Outlet, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Boxes, S as Building2, a as Users, d as Menu, f as LayoutDashboard, i as Workflow, m as FileText, n as X } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { i as FeedbackLayer, l as cn, p as uid } from "./chrome-BxWKOGK8.mjs";
import { t as readWebInquiries } from "./web-leads-DIWlxCqh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-D-hx-lq9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function round1(n) {
	return Math.round(n * 10) / 10;
}
/** Normalized logistic S-curve, 0 at t=0 and 100 at t=1. */
function logisticPct(t, mid = .48, k = 10) {
	const sigmoid = (x) => 1 / (1 + Math.exp(-k * (x - mid)));
	const a = sigmoid(0);
	const b = sigmoid(1);
	return (sigmoid(Math.min(1, Math.max(0, t))) - a) / (b - a) * 100;
}
function buildWeeks(opts) {
	const { total, actualThrough, lagWeeks = 0, mid = .48, k = 10 } = opts;
	return Array.from({ length: total }, (_, i) => {
		const week = i + 1;
		const planned = round1(logisticPct(week / total, mid, k));
		let actual = null;
		if (week <= actualThrough) {
			const t = (week - lagWeeks) / total;
			actual = round1(Math.max(0, Math.min(100, logisticPct(t, mid, k))));
			if (week === total && actualThrough >= total) actual = 100;
			if (week === actualThrough && actualThrough < total) actual = round1(Math.min(actual, planned + 8));
		}
		return {
			week,
			planned: week === total ? 100 : planned,
			actual
		};
	});
}
function lastActual(points) {
	for (let i = points.length - 1; i >= 0; i--) if (points[i].actual != null) return points[i];
	return null;
}
function spiOf(points) {
	const last = lastActual(points);
	if (!last || last.planned <= 0 || last.actual == null) return null;
	return round1(last.actual / last.planned);
}
function healthOf(points) {
	const last = lastActual(points);
	if (!last || last.actual == null) return "belum";
	if (last.actual >= 99.5 && last.week >= points.length) return "selesai";
	const spi = last.actual / last.planned;
	if (spi >= 1.05) return "maju";
	if (spi >= .95) return "on-track";
	return "terlambat";
}
function variancePct(points) {
	const last = lastActual(points);
	if (!last || last.actual == null) return null;
	return round1(last.actual - last.planned);
}
function nextOpenWeek(points) {
	return points.find((p) => p.actual == null)?.week ?? null;
}
function remainingPct(points) {
	const last = lastActual(points);
	if (!last || last.actual == null) return 100;
	return round1(Math.max(0, 100 - last.actual));
}
/** Points of progress per week, from the last two logged weeks (or average). */
function velocityOf(points) {
	const logged = points.filter((p) => p.actual != null);
	if (logged.length >= 2) {
		const a = logged[logged.length - 2];
		const b = logged[logged.length - 1];
		const dw = b.week - a.week;
		if (dw <= 0) return null;
		return round1((b.actual - a.actual) / dw);
	}
	if (logged.length === 1 && logged[0].week > 0) return round1(logged[0].actual / logged[0].week);
	return null;
}
/** Estimated week number when actual hits 100%. */
function forecastFinishWeek(points) {
	const last = lastActual(points);
	if (!last || last.actual == null) return null;
	if (last.actual >= 99.5) return last.week;
	const v = velocityOf(points);
	if (v && v > .15) return round1(last.week + (100 - last.actual) / v);
	const spi = spiOf(points);
	if (spi && spi > 0) return round1(points.length / spi);
	return null;
}
function delayWeeks(points) {
	const finish = forecastFinishWeek(points);
	if (finish == null) return null;
	return round1(finish - points.length);
}
function earnedValue(contract, points) {
	const last = lastActual(points);
	if (!last || last.actual == null) return 0;
	return Math.round(contract * last.actual / 100);
}
function chartRows(points) {
	const last = lastActual(points);
	const v = velocityOf(points);
	const finish = forecastFinishWeek(points);
	const extra = finish != null ? Math.ceil(finish) : points.length;
	const total = Math.min(Math.max(points.length, extra), points.length + 6);
	const rows = [];
	for (let i = 1; i <= total; i++) {
		const src = points[i - 1];
		const planned = src?.planned ?? (i >= points.length ? 100 : null);
		const actual = src?.actual ?? null;
		let forecast = null;
		if (last && last.actual != null && v && v > 0) {
			if (i <= last.week) forecast = i === last.week ? last.actual : null;
			else forecast = round1(Math.min(100, last.actual + v * (i - last.week)));
		}
		rows.push({
			week: `M${i}`,
			weekNum: i,
			Rencana: planned,
			Aktual: actual,
			Prakiraan: forecast
		});
	}
	return rows;
}
var HEALTH_LABEL = {
	maju: "Lebih cepat",
	"on-track": "Sesuai rencana",
	terlambat: "Terlambat",
	selesai: "Selesai",
	belum: "Belum mulai"
};
var LEAD_STAGES = [
	"baru",
	"dihubungi",
	"survey",
	"penawaran",
	"menang",
	"kalah"
];
var LEAD_LABEL = {
	baru: "Baru",
	dihubungi: "Dihubungi",
	survey: "Survey",
	penawaran: "Penawaran",
	menang: "Menang",
	kalah: "Kalah"
};
var PROJECT_STATUS = [
	"persiapan",
	"berjalan",
	"selesai",
	"tertahan"
];
var PROJECT_STATUS_LABEL = {
	persiapan: "Persiapan",
	berjalan: "Berjalan",
	selesai: "Selesai",
	tertahan: "Tertahan"
};
var QUOTE_STATUS = [
	"draft",
	"terkirim",
	"disetujui",
	"ditolak"
];
var QUOTE_LABEL = {
	draft: "Draft",
	terkirim: "Terkirim",
	disetujui: "Disetujui",
	ditolak: "Ditolak"
};
var clients = [
	{
		id: "c-rspad",
		name: "RSPAD Gatot Soebroto",
		segment: "Fasilitas kesehatan",
		city: "Jakarta",
		contact: "Andi Wijaya"
	},
	{
		id: "c-rsud",
		name: "RSUD Palembang",
		segment: "Fasilitas kesehatan",
		city: "Palembang",
		contact: "Bagian Umum"
	},
	{
		id: "c-kiic",
		name: "KIIC Karawang",
		segment: "Kawasan industri",
		city: "Karawang",
		contact: "Plant Engineer"
	},
	{
		id: "c-elektronik",
		name: "Pabrik Elektronik Cikarang",
		segment: "Manufaktur",
		city: "Cikarang",
		contact: "Sari Lestari"
	},
	{
		id: "c-office",
		name: "Developer Perkantoran",
		segment: "Gedung komersial",
		city: "Karawang",
		contact: "Project Manager"
	}
];
function seedProjects() {
	const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
	return [
		{
			id: "rspad",
			name: "Panel distribusi RSPAD",
			clientId: "c-rspad",
			category: "rumah-sakit",
			location: "Jakarta",
			status: "berjalan",
			contractValue: 24e8,
			durationWeeks: 16,
			weeks: buildWeeks({
				total: 16,
				actualThrough: 11,
				lagWeeks: 1.2
			}).map((w) => w.week === 11 ? {
				...w,
				note: "Menunggu material SDP cadangan."
			} : w),
			notes: "Area rawat inap baru. Koordinasi MEP untuk shutdown malam.",
			image: byId.rspad?.image
		},
		{
			id: "factory",
			name: "Instalasi pabrik KIIC",
			clientId: "c-kiic",
			category: "pabrik",
			location: "Karawang",
			status: "berjalan",
			contractValue: 31e8,
			durationWeeks: 14,
			weeks: buildWeeks({
				total: 14,
				actualThrough: 8,
				lagWeeks: 0
			}),
			notes: "MCC lini 2. FAT selesai, instalasi lapangan berjalan.",
			image: byId.factory?.image
		},
		{
			id: "commercial",
			name: "Distribusi gedung 12 lantai",
			clientId: "c-office",
			category: "gedung",
			location: "Karawang",
			status: "berjalan",
			contractValue: 48e8,
			durationWeeks: 20,
			weeks: buildWeeks({
				total: 20,
				actualThrough: 9,
				lagWeeks: -1.1
			}),
			notes: "Panel per lantai. Lebih cepat di zona basement.",
			image: byId.commercial?.image
		},
		{
			id: "puskesmas",
			name: "Instalasi Puskesmas Kecamatan",
			clientId: "c-rsud",
			category: "rumah-sakit",
			location: "Palembang",
			status: "selesai",
			contractValue: 89e7,
			durationWeeks: 10,
			weeks: buildWeeks({
				total: 10,
				actualThrough: 10,
				lagWeeks: 0
			}),
			notes: "Serah terima selesai. Maintenance 3 bulan berjalan.",
			image: byId.puskesmas?.image
		},
		{
			id: "elektronik",
			name: "Panel & grounding pabrik elektronik",
			clientId: "c-elektronik",
			category: "pabrik",
			location: "Cikarang",
			status: "persiapan",
			contractValue: 16e8,
			durationWeeks: 12,
			weeks: buildWeeks({
				total: 12,
				actualThrough: 2,
				lagWeeks: .4
			}),
			notes: "Menunggu akses ruang listrik dari owner.",
			image: byId.elektronik?.image
		}
	];
}
var seedLeads = [
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
		value: 42e7,
		createdAt: Date.now() - 3456e5
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
		value: 115e7,
		createdAt: Date.now() - 7776e5
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
		value: 275e6,
		createdAt: Date.now() - 648e5
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
		value: 185e7,
		createdAt: Date.now() - 1728e5
	}
];
var seedQuotes = [
	{
		id: "q-1",
		clientId: "c-elektronik",
		title: "Grounding area produksi — revisi 2",
		status: "terkirim",
		createdAt: Date.now() - 5184e5,
		validUntil: Date.now() + 1728e5,
		items: [
			{
				name: "Grounding rod 3m",
				qty: 24,
				unit: "bh",
				price: 85e4
			},
			{
				name: "Kabel BC 70mm",
				qty: 180,
				unit: "m",
				price: 95e3
			},
			{
				name: "Pengujian tahanan tanah",
				qty: 1,
				unit: "ls",
				price: 12e6
			}
		]
	},
	{
		id: "q-2",
		clientId: "c-office",
		title: "Panel lantai 8–12",
		status: "disetujui",
		createdAt: Date.now() - 1728e6,
		validUntil: Date.now() + 432e6,
		items: [{
			name: "SDP 400A",
			qty: 5,
			unit: "set",
			price: 48e6
		}, {
			name: "Instalasi & testing",
			qty: 1,
			unit: "ls",
			price: 95e6
		}]
	},
	{
		id: "q-3",
		clientId: "c-rsud",
		title: "Penerangan IGD — draft",
		status: "draft",
		createdAt: Date.now() - 864e5,
		validUntil: Date.now() + 18144e5,
		items: [{
			name: "LED panel 40W",
			qty: 86,
			unit: "bh",
			price: 21e4
		}]
	}
];
var seedMaterials = [
	{
		id: "m1",
		name: "NYY 4×16 mm²",
		sku: "CBL-NYY-416",
		unit: "m",
		stock: 420,
		minStock: 200,
		warehouse: "Karawang"
	},
	{
		id: "m2",
		name: "NYA 2.5 mm²",
		sku: "CBL-NYA-25",
		unit: "m",
		stock: 80,
		minStock: 150,
		warehouse: "Palembang"
	},
	{
		id: "m3",
		name: "Cable tray 300 mm",
		sku: "TRY-300",
		unit: "m",
		stock: 64,
		minStock: 40,
		warehouse: "Karawang"
	},
	{
		id: "m4",
		name: "MCCB 250A",
		sku: "BRK-250",
		unit: "bh",
		stock: 6,
		minStock: 8,
		warehouse: "Palembang"
	},
	{
		id: "m5",
		name: "MCB 16A",
		sku: "BRK-16",
		unit: "bh",
		stock: 140,
		minStock: 60,
		warehouse: "Palembang"
	},
	{
		id: "m6",
		name: "Busbar Cu 40×10",
		sku: "BUS-4010",
		unit: "m",
		stock: 18,
		minStock: 12,
		warehouse: "Karawang"
	},
	{
		id: "m7",
		name: "LED panel 40W",
		sku: "LGT-40",
		unit: "bh",
		stock: 35,
		minStock: 40,
		warehouse: "Palembang"
	},
	{
		id: "m8",
		name: "Grounding rod 3m",
		sku: "GND-3M",
		unit: "bh",
		stock: 22,
		minStock: 10,
		warehouse: "Karawang"
	}
];
function quoteAmount(q) {
	return q.items.reduce((s, i) => s + i.qty * i.price, 0);
}
function seed() {
	return {
		clients,
		leads: seedLeads,
		projects: seedProjects(),
		quotes: seedQuotes,
		materials: seedMaterials
	};
}
var useErp = create()(persist((set, get) => ({
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
		const extra = [];
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
				createdAt: w.at
			});
		}
		if (extra.length) set({ leads: [...extra, ...get().leads] });
	},
	setLeadStage: (id, stage) => set({ leads: get().leads.map((l) => l.id === id ? {
		...l,
		stage
	} : l) }),
	addLead: (lead) => set({ leads: [{
		...lead,
		id: uid("lead"),
		stage: lead.stage ?? "baru",
		createdAt: Date.now()
	}, ...get().leads] }),
	logProgress: (projectId, week, actual, note) => set({ projects: get().projects.map((p) => {
		if (p.id !== projectId) return p;
		const weeks = p.weeks.map((w) => w.week === week ? {
			...w,
			actual: Math.max(0, Math.min(100, actual)),
			note: note?.trim() ? note.trim() : w.note
		} : w);
		const last = [...weeks].reverse().find((w) => w.actual != null);
		let status = p.status;
		if (last?.actual != null && last.actual >= 99.5 && last.week >= weeks.length) status = "selesai";
		else if ((last?.actual ?? 0) > 0) status = p.status === "selesai" ? "berjalan" : p.status === "persiapan" ? "berjalan" : p.status;
		return {
			...p,
			weeks,
			status
		};
	}) }),
	setQuoteStatus: (id, status) => set({ quotes: get().quotes.map((q) => q.id === id ? {
		...q,
		status
	} : q) }),
	addQuote: (quote) => set({ quotes: [{
		...quote,
		id: uid("q"),
		createdAt: Date.now()
	}, ...get().quotes] }),
	adjustStock: (id, delta) => set({ materials: get().materials.map((m) => m.id === id ? {
		...m,
		stock: Math.max(0, m.stock + delta)
	} : m) }),
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
				contact: lead.name
			};
			clients = [client, ...clients];
		}
		const type = (lead.type || "").toLowerCase();
		const category = type.includes("sakit") || type.includes("klinik") ? "rumah-sakit" : type.includes("pabrik") || type.includes("gudang") ? "pabrik" : "gedung";
		const durationWeeks = 12;
		const project = {
			id: uid("prj"),
			name: lead.type ? `${lead.type} — ${companyName}` : companyName,
			clientId: client.id,
			category,
			location: lead.location || "—",
			status: "persiapan",
			contractValue: lead.value || 0,
			durationWeeks,
			weeks: buildWeeks({
				total: durationWeeks,
				actualThrough: 0
			}),
			notes: lead.message || `Dibentuk dari prospek ${lead.name}.`
		};
		set({
			clients,
			projects: [project, ...get().projects],
			leads: get().leads.map((l) => l.id === id ? {
				...l,
				stage: "menang",
				projectId: project.id
			} : l)
		});
		return project.id;
	},
	promoteQuote: (id) => {
		const quote = get().quotes.find((q) => q.id === id);
		if (!quote) return null;
		if (quote.projectId) return quote.projectId;
		const value = quoteAmount(quote);
		const project = {
			id: uid("prj"),
			name: quote.title,
			clientId: quote.clientId,
			category: "gedung",
			location: get().clients.find((c) => c.id === quote.clientId)?.city ?? "—",
			status: "persiapan",
			contractValue: value,
			durationWeeks: 12,
			weeks: buildWeeks({
				total: 12,
				actualThrough: 0
			}),
			notes: `Dari penawaran ${quote.id}.`
		};
		set({
			projects: [project, ...get().projects],
			quotes: get().quotes.map((q) => q.id === id ? {
				...q,
				status: "disetujui",
				projectId: project.id
			} : q)
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
				contact: lead.name
			};
			clients = [client, ...clients];
		}
		const quote = {
			id: uid("q"),
			clientId: client.id,
			title: lead.type ? `${lead.type} — ${companyName}` : companyName,
			status: "draft",
			createdAt: Date.now(),
			validUntil: Date.now() + 18144e5,
			items: [{
				name: lead.message || lead.type || "Paket pekerjaan elektrikal",
				qty: 1,
				unit: "ls",
				price: lead.value || 0
			}]
		};
		set({
			clients,
			quotes: [quote, ...get().quotes],
			leads: get().leads.map((l) => l.id === id ? {
				...l,
				stage: "penawaran"
			} : l)
		});
		return quote.id;
	},
	setProjectStatus: (id, status) => set({ projects: get().projects.map((p) => p.id === id ? {
		...p,
		status
	} : p) }),
	addProject: (input) => {
		const durationWeeks = Math.max(4, Math.min(52, Math.round(input.durationWeeks) || 12));
		const project = {
			id: uid("prj"),
			name: input.name.trim(),
			clientId: input.clientId,
			category: input.category,
			location: input.location.trim() || "—",
			status: "persiapan",
			contractValue: Math.max(0, input.contractValue),
			durationWeeks,
			weeks: buildWeeks({
				total: durationWeeks,
				actualThrough: 0
			}),
			notes: input.notes?.trim() ?? ""
		};
		set({ projects: [project, ...get().projects] });
		return project.id;
	},
	addClient: (input) => {
		const client = {
			...input,
			id: uid("c")
		};
		set({ clients: [client, ...get().clients] });
		return client.id;
	}
}), {
	name: "bsm-erp-v2",
	skipHydration: true,
	partialize: (s) => ({
		clients: s.clients,
		leads: s.leads,
		projects: s.projects,
		quotes: s.quotes,
		materials: s.materials
	})
}));
var ITEMS = [
	{
		to: "/erp",
		label: "Dasbor",
		icon: LayoutDashboard
	},
	{
		to: "/erp/leads",
		label: "Prospek",
		icon: Users
	},
	{
		to: "/erp/proyek",
		label: "Proyek",
		icon: Workflow
	},
	{
		to: "/erp/penawaran",
		label: "Penawaran",
		icon: FileText
	},
	{
		to: "/erp/klien",
		label: "Klien",
		icon: Building2
	},
	{
		to: "/erp/material",
		label: "Material",
		icon: Boxes
	}
];
function ErpShell() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const hydrate = useErp((s) => s.hydrate);
	const ready = useErp((s) => s.ready);
	const path = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [path]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-page text-ink md:grid md:grid-cols-[240px_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("fixed inset-y-0 left-0 z-header flex w-72 flex-col bg-navy text-on-navy transition-transform duration-200 md:relative md:w-auto md:translate-x-0", open ? "translate-x-0" : "-translate-x-full md:translate-x-0"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-[72px] items-center gap-2.5 border-b border-paper/10 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/logo-bsm.png",
							alt: "",
							className: "h-8 w-auto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-extrabold text-paper",
								children: "Portal proyek"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-on-navy-muted",
								children: COMPANY.short
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-col gap-1 p-3",
						"aria-label": "Portal",
						children: ITEMS.map((item) => {
							const active = item.to === "/erp" ? path === "/erp" : path.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-2.5 rounded-[10px] px-3 text-sm font-semibold text-on-navy-muted", active && "bg-paper/10 text-paper"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-auto border-t border-paper/10 p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "block px-3 py-2 text-xs font-semibold text-on-navy-muted hover:text-paper",
							children: "← Kembali ke situs"
						})
					})
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "fixed inset-0 z-cta bg-navy/40 md:hidden",
				"aria-label": "Tutup menu",
				onClick: () => setOpen(false)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-header flex h-[72px] items-center gap-3 border-b border-line bg-page/90 px-4 backdrop-blur-md md:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline-flex size-11 items-center justify-center rounded-[10px] border border-line bg-card md:hidden",
						onClick: () => setOpen((v) => !v),
						children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Menu portal"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-extrabold",
							children: "Mini ERP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted",
							children: "Kurva S, prospek, penawaran, material"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 px-4 py-6 md:px-8 md:py-8",
					children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErpSkeleton, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackLayer, {})
		]
	});
}
function ErpSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-muted",
				children: "Memuat portal proyek…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-md bg-line/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 animate-pulse rounded-md bg-line/70" }, i))
			})
		]
	});
}
function PageTitle({ title, note, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl",
			children: title
		}), note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: note
		}) : null] }), action]
	});
}
//#endregion
export { velocityOf as S, quoteAmount as _, PROJECT_STATUS as a, useErp as b, QUOTE_LABEL as c, delayWeeks as d, earnedValue as f, nextOpenWeek as g, lastActual as h, LEAD_STAGES as i, QUOTE_STATUS as l, healthOf as m, HEALTH_LABEL as n, PROJECT_STATUS_LABEL as o, forecastFinishWeek as p, LEAD_LABEL as r, PageTitle as s, ErpShell as t, chartRows as u, remainingPct as v, variancePct as x, spiOf as y };
