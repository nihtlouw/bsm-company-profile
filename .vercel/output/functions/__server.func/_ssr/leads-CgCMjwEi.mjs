import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as formatIdrShort, m as useFeedback, t as Button, u as formatDate } from "./chrome-BxWKOGK8.mjs";
import { b as useErp, i as LEAD_STAGES, r as LEAD_LABEL, s as PageTitle } from "./shell-D-hx-lq9.mjs";
import { i as StatusPill } from "./widgets-DmasVoUk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leads-CgCMjwEi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NEXT = {
	baru: "dihubungi",
	dihubungi: "survey",
	survey: "penawaran",
	penawaran: "menang"
};
function ErpLeads() {
	const leads = useErp((s) => s.leads);
	const setStage = useErp((s) => s.setLeadStage);
	const addLead = useErp((s) => s.addLead);
	const promoteLead = useErp((s) => s.promoteLead);
	const quoteFromLead = useErp((s) => s.quoteFromLead);
	const showToast = useFeedback((s) => s.showToast);
	const [openForm, setOpenForm] = (0, import_react.useState)(false);
	function onAdd(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		addLead({
			name: String(fd.get("name") ?? "").trim(),
			company: String(fd.get("company") ?? "").trim(),
			type: String(fd.get("type") ?? "").trim(),
			location: String(fd.get("location") ?? "").trim(),
			phone: String(fd.get("phone") ?? "").trim(),
			source: "manual",
			value: Number(fd.get("value") || 0)
		});
		e.currentTarget.reset();
		setOpenForm(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			title: "Prospek & CRM",
			note: "Lead dari situs (kontak + kampanye) masuk otomatis ke kolom Baru.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				onClick: () => setOpenForm((v) => !v),
				children: openForm ? "Tutup" : "Tambah prospek"
			})
		}),
		openForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: onAdd,
			className: "mb-6 grid gap-3 rounded-md border border-line bg-card p-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "name",
					label: "Nama",
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "company",
					label: "Perusahaan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "type",
					label: "Jenis proyek"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "location",
					label: "Lokasi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "phone",
					label: "Telepon"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "value",
					label: "Nilai perkiraan (Rp)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "sm",
						children: "Simpan"
					})
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-3 overflow-x-auto pb-4",
			children: LEAD_STAGES.map((stage) => {
				const rows = leads.filter((l) => l.stage === stage);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "w-[260px] shrink-0 rounded-md border border-line bg-card p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm",
							children: LEAD_LABEL[stage]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold tabular-nums text-muted",
							children: rows.length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [rows.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-[10px] border border-line bg-page p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold",
									children: l.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: l.company || l.type || l.source
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted",
									children: [
										l.location || "—",
										" · ",
										formatDate(l.createdAt)
									]
								}),
								l.value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-bold text-navy-mid",
									children: formatIdrShort(l.value)
								}) : null,
								l.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 line-clamp-2 text-xs text-muted",
									children: l.message
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap gap-1",
									children: [
										NEXT[l.stage] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "h-11 rounded-full bg-navy px-3 text-xs font-bold text-paper",
											onClick: () => setStage(l.id, NEXT[l.stage]),
											children: ["→ ", LEAD_LABEL[NEXT[l.stage]]]
										}) : null,
										l.stage === "survey" || l.stage === "penawaran" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "h-11 rounded-full border border-line px-3 text-xs font-bold",
											onClick: () => {
												if (quoteFromLead(l.id)) showToast("Draft penawaran dibuat. Buka menu Penawaran.");
											},
											children: "Buat penawaran"
										}) : null,
										l.stage === "penawaran" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "h-11 rounded-full border border-line px-3 text-xs font-bold",
											onClick: () => setStage(l.id, "kalah"),
											children: "Kalah"
										}) : null,
										l.stage === "menang" && !l.projectId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "h-11 rounded-full bg-brand px-3 text-xs font-bold text-paper",
											onClick: () => {
												if (promoteLead(l.id)) showToast("Proyek kurva S dibuat dari prospek ini.");
											},
											children: "Buat proyek + kurva S"
										}) : null,
										l.projectId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/erp/proyek/$id",
											params: { id: l.projectId },
											className: "inline-flex h-11 items-center rounded-full border border-line px-3 text-xs font-bold",
											children: "Buka kurva S"
										}) : null
									]
								})
							]
						}, l.id)), !rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-1 py-6 text-center text-xs text-muted",
							children: "Kosong"
						}) : null]
					})]
				}, stage);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted",
			children: [
				"Sumber ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					tone: "navy",
					children: "campaign_lead"
				}),
				" dan",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					tone: "brand",
					children: "contact_form"
				}),
				" berasal dari CTA situs."
			]
		})
	] });
}
function Field({ name, label, required }) {
	const id = `lead-${name}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		htmlFor: id,
		className: "text-xs font-bold",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			name,
			required,
			className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm font-medium"
		})]
	});
}
var SplitComponent = ErpLeads;
//#endregion
export { SplitComponent as component };
