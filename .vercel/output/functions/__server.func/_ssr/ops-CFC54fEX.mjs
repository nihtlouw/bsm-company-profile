import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as formatIdr, f as formatIdrShort, m as useFeedback, t as Button, u as formatDate } from "./chrome-BxWKOGK8.mjs";
import { _ as quoteAmount, b as useErp, c as QUOTE_LABEL, l as QUOTE_STATUS, s as PageTitle } from "./shell-D-hx-lq9.mjs";
import { i as StatusPill } from "./widgets-DmasVoUk.mjs";
import { t as downloadQuotePdf } from "./erp-pdf-DBHL-Mi4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ops-CFC54fEX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var QUOTE_TONE = {
	draft: "mute",
	terkirim: "navy",
	disetujui: "success",
	ditolak: "brand"
};
function ErpQuotes() {
	const quotes = useErp((s) => s.quotes);
	const clients = useErp((s) => s.clients);
	const setStatus = useErp((s) => s.setQuoteStatus);
	const addQuote = useErp((s) => s.addQuote);
	const promoteQuote = useErp((s) => s.promoteQuote);
	const showToast = useFeedback((s) => s.showToast);
	const [open, setOpen] = (0, import_react.useState)(false);
	function onAdd(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		addQuote({
			clientId: String(fd.get("clientId")),
			title: String(fd.get("title")).trim(),
			status: "draft",
			validUntil: Date.now() + 18144e5,
			items: [{
				name: String(fd.get("item") || "Paket pekerjaan"),
				qty: 1,
				unit: "ls",
				price: Number(fd.get("price") || 0)
			}]
		});
		e.currentTarget.reset();
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			title: "Penawaran",
			note: "Draft, kirim, unduh PDF, atau buat proyek kurva S dari penawaran disetujui.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				type: "button",
				onClick: () => setOpen((v) => !v),
				children: open ? "Tutup" : "Penawaran baru"
			})
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: onAdd,
			className: "mb-6 grid gap-3 rounded-md border border-line bg-card p-4 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Klien", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						name: "clientId",
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm",
						children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Judul", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "title",
						required: true,
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Item", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "item",
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Nilai (Rp)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "price",
						type: "number",
						required: true,
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "sm",
					children: "Simpan draft"
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: quotes.map((q) => {
				const client = clients.find((c) => c.id === q.clientId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-md border border-line bg-card p-4 shadow-card md:flex md:items-center md:justify-between md:gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm",
									children: q.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: QUOTE_TONE[q.status],
									children: QUOTE_LABEL[q.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: [
									client?.name,
									" · ",
									formatDate(q.createdAt),
									" · berlaku s.d. ",
									formatDate(q.validUntil)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 text-xs text-muted",
								children: q.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									item.qty,
									" ",
									item.unit,
									" ",
									item.name,
									" · ",
									formatIdr(item.qty * item.price)
								] }, item.name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-extrabold tabular-nums",
								children: formatIdr(quoteAmount(q))
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-xs font-bold md:mt-0",
							children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: q.status,
								onChange: (e) => setStatus(q.id, e.target.value),
								className: "mt-1.5 h-11 rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm",
								children: QUOTE_STATUS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: QUOTE_LABEL[s]
								}, s))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-col gap-2 md:mt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => {
										downloadQuotePdf(q, client).then(() => showToast("PDF penawaran diunduh."));
									},
									children: "Unduh PDF"
								}),
								q.status === "disetujui" && !q.projectId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									onClick: () => {
										if (promoteQuote(q.id)) showToast("Proyek kurva S dibuat dari penawaran.");
									},
									children: "Buat proyek"
								}) : null,
								q.projectId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "ghost",
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/erp/proyek/$id",
										params: { id: q.projectId },
										children: "Buka kurva S"
									})
								}) : null
							]
						})
					]
				}, q.id);
			})
		})
	] });
}
function ErpClients() {
	const clients = useErp((s) => s.clients);
	const projects = useErp((s) => s.projects);
	const quotes = useErp((s) => s.quotes);
	const addClient = useErp((s) => s.addClient);
	const showToast = useFeedback((s) => s.showToast);
	const [open, setOpen] = (0, import_react.useState)(false);
	function onAdd(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		addClient({
			name: String(fd.get("name") ?? "").trim(),
			segment: String(fd.get("segment") ?? "").trim() || "Umum",
			city: String(fd.get("city") ?? "").trim() || "—",
			contact: String(fd.get("contact") ?? "").trim() || "—"
		});
		e.currentTarget.reset();
		setOpen(false);
		showToast("Klien tersimpan.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			title: "Klien",
			note: "Fasilitas yang terhubung ke proyek dan penawaran.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				onClick: () => setOpen((v) => !v),
				children: open ? "Tutup" : "Klien baru"
			})
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: onAdd,
			className: "mb-6 grid gap-3 rounded-md border border-line bg-card p-4 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Nama", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "name",
						required: true,
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Segmen", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "segment",
						placeholder: "Fasilitas kesehatan",
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Kota", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "city",
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Kontak", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "contact",
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "sm",
					children: "Simpan"
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: clients.map((c) => {
				const nProj = projects.filter((p) => p.clientId === c.id).length;
				const nQuote = quotes.filter((q) => q.clientId === c.id).length;
				const value = projects.filter((p) => p.clientId === c.id).reduce((s, p) => s + p.contractValue, 0);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-md border border-line bg-card p-5 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-brand",
							children: c.segment
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-base",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								c.city,
								" · ",
								c.contact
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-muted",
							children: [
								nProj,
								" proyek · ",
								nQuote,
								" penawaran"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-extrabold tabular-nums",
							children: value ? formatIdrShort(value) : "Belum ada kontrak"
						})
					]
				}, c.id);
			})
		})
	] });
}
function ErpMaterials() {
	const materials = useErp((s) => s.materials);
	const adjust = useErp((s) => s.adjustStock);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
		title: "Material",
		note: "Stok gudang Palembang & Karawang. Highlight kuning jika di bawah minimum."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-md border border-line bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[640px] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "border-b border-line text-xs text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-bold",
						children: "SKU"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-bold",
						children: "Material"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-bold",
						children: "Gudang"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-bold",
						children: "Stok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-bold",
						children: "Min"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-bold",
						children: "Aksi"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: materials.map((m) => {
				const low = m.stock < m.minStock;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-mono text-xs",
							children: m.sku
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-semibold",
							children: m.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted",
							children: m.warehouse
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: low ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: "warn",
								children: `${m.stock} ${m.unit}`
							}) : `${m.stock} ${m.unit}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3 tabular-nums text-muted",
							children: [
								m.minStock,
								" ",
								m.unit
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-11 rounded-[10px] border border-line font-bold",
									onClick: () => adjust(m.id, -1),
									children: "−"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-11 rounded-[10px] border border-line font-bold",
									onClick: () => adjust(m.id, 1),
									children: "+"
								})]
							})
						})
					]
				}, m.id);
			}) })]
		})
	})] });
}
//#endregion
export { ErpMaterials as n, ErpQuotes as r, ErpClients as t };
