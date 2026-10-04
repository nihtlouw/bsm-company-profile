import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as formatIdrShort, u as formatDate } from "./chrome-BxWKOGK8.mjs";
import { _ as quoteAmount, b as useErp, d as delayWeeks, h as lastActual, i as LEAD_STAGES, m as healthOf, p as forecastFinishWeek, r as LEAD_LABEL, s as PageTitle, y as spiOf } from "./shell-D-hx-lq9.mjs";
import { n as KpiCard, r as SparkCurve, t as HealthBadge } from "./widgets-DmasVoUk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/erp-Cimw8Mt_.js
var import_jsx_runtime = require_jsx_runtime();
function ErpDashboard() {
	const leads = useErp((s) => s.leads);
	const projects = useErp((s) => s.projects);
	const quotes = useErp((s) => s.quotes);
	const materials = useErp((s) => s.materials);
	const clients = useErp((s) => s.clients);
	const pipeline = leads.filter((l) => !["menang", "kalah"].includes(l.stage));
	const pipelineValue = pipeline.reduce((s, l) => s + l.value, 0);
	const active = projects.filter((p) => p.status === "berjalan" || p.status === "persiapan");
	const behind = active.filter((p) => healthOf(p.weeks) === "terlambat");
	const quoteOpen = quotes.filter((q) => q.status === "terkirim" || q.status === "draft").reduce((s, q) => s + quoteAmount(q), 0);
	const low = materials.filter((m) => m.stock < m.minStock);
	const freshLeads = leads.filter((l) => l.stage === "baru");
	const expiring = quotes.filter((q) => (q.status === "terkirim" || q.status === "draft") && q.validUntil - Date.now() < 6048e5);
	const actions = [
		...behind.map((p) => ({
			key: `behind-${p.id}`,
			label: `${p.name} di belakang kurva`,
			href: `/erp/proyek/${p.id}`,
			tone: "warn"
		})),
		...expiring.map((q) => ({
			key: `quote-${q.id}`,
			label: `${q.title} berakhir ${formatDate(q.validUntil)}`,
			href: "/erp/penawaran",
			tone: "brand"
		})),
		...freshLeads.map((l) => ({
			key: `lead-${l.id}`,
			label: `Prospek baru: ${l.company || l.name}`,
			href: "/erp/leads",
			tone: "navy"
		}))
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			title: "Dasbor operasional",
			note: "Tindakan hari ini, kurva S, dan pipa prospek dari situs."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Prospek aktif",
					value: String(pipeline.length),
					hint: formatIdrShort(pipelineValue) + " nilai perkiraan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Proyek berjalan",
					value: String(active.length),
					hint: behind.length ? `${behind.length} di belakang kurva` : "Semua on-track"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Penawaran terbuka",
					value: formatIdrShort(quoteOpen),
					hint: "Draft + terkirim"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Perlu tindakan",
					value: String(actions.length),
					hint: low.length ? `${low.length} SKU di bawah min` : "Kurva, penawaran, prospek"
				})
			]
		}),
		actions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-base",
				children: "Perlu tindakan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "rounded-md border border-line bg-card",
				children: actions.slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border-b border-line last:border-b-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: a.href,
						className: "flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs font-bold text-navy-bright",
							children: "Buka →"
						})]
					})
				}, a.key))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-base",
				children: "Kurva S — proyek aktif"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: active.map((p) => {
					const last = lastActual(p.weeks);
					const spi = spiOf(p.weeks);
					const client = clients.find((c) => c.id === p.clientId);
					const finish = forecastFinishWeek(p.weeks);
					const delay = delayWeeks(p.weeks);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/erp/proyek/$id",
						params: { id: p.id },
						className: "grid gap-3 rounded-md border border-line bg-card p-4 shadow-card md:grid-cols-[1fr_180px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthBadge, { points: p.weeks })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: [
									client?.name,
									" · ",
									p.location,
									" · ",
									formatIdrShort(p.contractValue)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs tabular-nums text-muted",
								children: [
									"Aktual ",
									last?.actual ?? 0,
									"% · Rencana ",
									last?.planned ?? 0,
									"% · SPI ",
									spi ?? "—",
									finish != null ? ` · ramalan M${finish}${delay != null && delay > .2 ? ` telat ${delay} mg` : ""}` : ""
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkCurve, {
							points: p.weeks,
							className: "h-14"
						})]
					}, p.id);
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-base",
					children: "Pipa prospek"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "rounded-md border border-line bg-card",
					children: LEAD_STAGES.filter((s) => s !== "kalah").map((stage) => {
						const rows = leads.filter((l) => l.stage === stage);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between border-b border-line px-4 py-3 last:border-b-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold",
								children: LEAD_LABEL[stage]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-extrabold tabular-nums text-navy-mid",
								children: rows.length
							})]
						}, stage);
					})
				}),
				low.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-base",
						children: "Stok menipis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "rounded-md border border-warn-line bg-warn-bg",
						children: low.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between border-b border-warn-line/60 px-4 py-3 text-sm last:border-b-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-warn",
								children: m.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-warn",
								children: [
									m.stock,
									" ",
									m.unit
								]
							})]
						}, m.id))
					})]
				}) : null
			] })]
		})
	] });
}
var SplitComponent = ErpDashboard;
//#endregion
export { SplitComponent as component };
