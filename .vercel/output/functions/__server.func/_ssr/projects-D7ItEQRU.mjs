import { o as __toESM } from "../_runtime.mjs";
import { i as CATEGORY_LABEL, r as CATEGORIES } from "./site-data-CiDbZPVB.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as formatIdr, f as formatIdrShort, m as useFeedback, t as Button } from "./chrome-BxWKOGK8.mjs";
import { S as velocityOf, a as PROJECT_STATUS, b as useErp, d as delayWeeks, f as earnedValue, g as nextOpenWeek, h as lastActual, o as PROJECT_STATUS_LABEL, p as forecastFinishWeek, s as PageTitle, u as chartRows, v as remainingPct, x as variancePct, y as spiOf } from "./shell-D-hx-lq9.mjs";
import { i as StatusPill, r as SparkCurve, t as HealthBadge } from "./widgets-DmasVoUk.mjs";
import { n as downloadScurvePdf } from "./erp-pdf-DBHL-Mi4.mjs";
import { a as Line, c as Tooltip, i as Area, l as Legend, n as YAxis, o as CartesianGrid, r as XAxis, s as ResponsiveContainer, t as ComposedChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-D7ItEQRU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SCurveChart({ points }) {
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setOn(true), []);
	const data = chartRows(points);
	if (!on) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 animate-pulse rounded-md bg-line/70" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-80 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
				data,
				margin: {
					top: 8,
					right: 12,
					left: -8,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "week",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: { stroke: "var(--color-line)" },
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						domain: [0, 100],
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						tickFormatter: (v) => `${v}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						formatter: (value) => [`${Number(value ?? 0).toFixed(1)}%`, ""],
						contentStyle: {
							borderRadius: 12,
							border: "1px solid var(--color-line)",
							fontSize: 12
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "Rencana",
						stroke: "var(--color-navy-soft)",
						fill: "var(--color-navy)",
						fillOpacity: .08,
						strokeWidth: 2,
						connectNulls: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "Aktual",
						stroke: "var(--color-brand)",
						strokeWidth: 2.5,
						dot: {
							r: 3,
							fill: "var(--color-brand)"
						},
						connectNulls: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "Prakiraan",
						stroke: "var(--color-navy-soft)",
						strokeWidth: 1.8,
						strokeDasharray: "6 4",
						dot: false,
						connectNulls: true
					})
				]
			})
		})
	});
}
var STATUS_TONE = {
	persiapan: "warn",
	berjalan: "navy",
	selesai: "success",
	tertahan: "mute"
};
function ErpProjectList() {
	const projects = useErp((s) => s.projects);
	const clients = useErp((s) => s.clients);
	const addProject = useErp((s) => s.addProject);
	const showToast = useFeedback((s) => s.showToast);
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	function onAdd(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const id = addProject({
			name: String(fd.get("name") ?? "").trim(),
			clientId: String(fd.get("clientId")),
			category: String(fd.get("category") || "gedung"),
			location: String(fd.get("location") ?? "").trim(),
			contractValue: Number(fd.get("value") || 0),
			durationWeeks: Number(fd.get("weeks") || 12),
			notes: String(fd.get("notes") ?? "")
		});
		e.currentTarget.reset();
		setOpen(false);
		showToast("Proyek dibuat. Kurva S rencana sudah terisi.");
		navigate({
			to: "/erp/proyek/$id",
			params: { id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			title: "Proyek & Kurva S",
			note: "Bandingkan rencana vs aktual. Buka proyek untuk mencatat progres dan unduh laporan.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				onClick: () => setOpen((v) => !v),
				children: open ? "Tutup" : "Proyek baru"
			})
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: onAdd,
			className: "mb-6 grid gap-3 rounded-md border border-line bg-card p-4 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Nama proyek", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "name",
						required: true,
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Klien", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						name: "clientId",
						required: true,
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm",
						children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Segmen", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						name: "category",
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm",
						children: CATEGORIES.filter((c) => c.id !== "semua").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.label
						}, c.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Lokasi", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "location",
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Nilai kontrak (Rp)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "value",
						type: "number",
						min: 0,
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-bold",
					children: ["Durasi (minggu)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "weeks",
						type: "number",
						min: 4,
						max: 52,
						defaultValue: 12,
						className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "sm",
						children: "Buat kurva S"
					})
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4",
			children: projects.map((p) => {
				const client = clients.find((c) => c.id === p.clientId);
				const last = lastActual(p.weeks);
				const spi = spiOf(p.weeks);
				const finish = forecastFinishWeek(p.weeks);
				const delay = delayWeeks(p.weeks);
				const cat = p.category;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/erp/proyek/$id",
					params: { id: p.id },
					className: "grid items-center gap-4 rounded-md border border-line bg-card p-4 shadow-card md:grid-cols-[1fr_200px_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-base",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										tone: STATUS_TONE[p.status],
										children: PROJECT_STATUS_LABEL[p.status]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthBadge, { points: p.weeks })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									client?.name,
									" · ",
									CATEGORY_LABEL[cat] ?? p.category,
									" · ",
									p.location
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs tabular-nums text-muted",
								children: [
									formatIdrShort(p.contractValue),
									" · Minggu ",
									last?.week ?? 0,
									"/",
									p.durationWeeks,
									" · SPI ",
									spi ?? "—",
									finish != null ? ` · ramalan M${finish}${delay != null && delay > .2 ? ` (telat ${delay} mg)` : ""}` : ""
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkCurve, {
							points: p.weeks,
							className: "h-16"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold text-navy-bright",
							children: "Kurva S →"
						})
					]
				}, p.id);
			})
		})
	] });
}
function ErpProjectDetail({ id }) {
	const project = useErp((s) => s.projects.find((p) => p.id === id));
	const clients = useErp((s) => s.clients);
	const logProgress = useErp((s) => s.logProgress);
	const setProjectStatus = useErp((s) => s.setProjectStatus);
	const showToast = useFeedback((s) => s.showToast);
	const openWeek = nextOpenWeek(project?.weeks ?? []) ?? 1;
	const [week, setWeek] = (0, import_react.useState)(openWeek);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!project) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Proyek tidak ditemukan."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/erp/proyek",
		className: "mt-3 inline-block text-sm font-bold text-navy-bright",
		children: "← Daftar proyek"
	})] });
	const current = project;
	const client = clients.find((c) => c.id === current.clientId);
	const last = lastActual(current.weeks);
	const spi = spiOf(current.weeks);
	const variance = variancePct(current.weeks);
	const suggested = nextOpenWeek(current.weeks) ?? last?.week ?? 1;
	const cat = current.category;
	const finish = forecastFinishWeek(current.weeks);
	const delay = delayWeeks(current.weeks);
	const velocity = velocityOf(current.weeks);
	const ev = earnedValue(current.contractValue, current.weeks);
	function onLog(e) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/erp/proyek",
			className: "mb-4 inline-block text-sm font-bold text-navy-bright",
			children: "← Semua proyek"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			title: current.name,
			note: `${client?.name ?? ""} · ${CATEGORY_LABEL[cat] ?? current.category} · ${current.location}`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthBadge, { points: current.weeks }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-bold",
						children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: current.status,
							onChange: (e) => setProjectStatus(current.id, e.target.value),
							className: "ml-2 h-11 rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm font-semibold",
							children: PROJECT_STATUS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: PROJECT_STATUS_LABEL[s]
							}, s))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => void onReport(),
						disabled: busy,
						children: busy ? "Menyiapkan…" : "Unduh laporan PDF"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-md border border-line bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-muted",
							children: "Nilai kontrak"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-lg font-extrabold tabular-nums",
							children: formatIdr(current.contractValue)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: ["EV ", formatIdrShort(ev)]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-md border border-line bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-muted",
							children: "SPI (jadwal)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-lg font-extrabold tabular-nums",
							children: spi ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								"Aktual ",
								last?.actual ?? 0,
								"% vs rencana ",
								last?.planned ?? 0,
								"%"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-md border border-line bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-muted",
							children: "Ramalan selesai"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-lg font-extrabold tabular-nums",
							children: finish == null ? "—" : `M${finish}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: delay == null ? "Belum ada aktual" : delay > .2 ? `Telat ${delay} minggu vs rencana ${current.durationWeeks} mg` : delay < -.2 ? `Lebih cepat ${Math.abs(delay)} minggu` : `On-track ${current.durationWeeks} minggu`
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-md border border-line bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-muted",
							children: "Kecepatan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-lg font-extrabold tabular-nums",
							children: velocity == null ? "—" : `${velocity} pt`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								"Sisa ",
								remainingPct(current.weeks),
								"% · deviasi ",
								variance == null ? "—" : `${variance > 0 ? "+" : ""}${variance} pt`
							]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-md border border-line bg-card p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base",
						children: "Kurva S — rencana, aktual, prakiraan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 mb-4 text-xs text-muted",
						children: "Navy = rencana, merah = aktual tercatat, putus-putus = prakiraan berdasarkan kecepatan minggu terakhir."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SCurveChart, { points: current.weeks })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-md border border-line bg-card p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base",
						children: "Catat progres"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [
							"Isi persen kumulatif untuk minggu berjalan. Minggu berikutnya yang kosong: ",
							suggested,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onLog,
						className: "mt-4 grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-bold",
								children: ["Minggu", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									name: "week",
									value: week,
									onChange: (e) => setWeek(Number(e.target.value)),
									className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm",
									children: current.weeks.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: w.week,
										children: [
											"Minggu ",
											w.week,
											" · rencana ",
											w.planned,
											"%",
											w.actual != null ? ` · aktual ${w.actual}%` : ""
										]
									}, w.week))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "scurve-actual",
								className: "text-xs font-bold",
								children: ["Aktual kumulatif (%)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "scurve-actual",
									name: "actual",
									type: "number",
									min: 0,
									max: 100,
									step: .5,
									required: true,
									className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm",
									placeholder: "contoh 62"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "scurve-note",
								className: "text-xs font-bold",
								children: ["Catatan minggu", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "scurve-note",
									name: "note",
									className: "mt-1.5 h-11 w-full rounded-[10px] border-[1.5px] border-line bg-page px-3 text-sm",
									placeholder: "Kendala, material, shutdown…"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "block",
								children: "Simpan ke kurva S"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs leading-relaxed text-muted",
						children: current.notes
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 overflow-x-auto rounded-md border border-line bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[520px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-line text-xs text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-bold",
							children: "Minggu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-bold",
							children: "Rencana"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-bold",
							children: "Aktual"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-bold",
							children: "Deviasi"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-bold",
							children: "Catatan"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: current.weeks.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-2.5 tabular-nums",
							children: ["M", w.week]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-2.5 tabular-nums",
							children: [w.planned, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5 tabular-nums",
							children: w.actual == null ? "—" : `${w.actual}%`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5 tabular-nums",
							children: w.actual == null ? "—" : `${(w.actual - w.planned).toFixed(1)} pt`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5 text-xs text-muted",
							children: w.note ?? "—"
						})
					]
				}, w.week)) })]
			})
		})
	] });
}
//#endregion
export { ErpProjectList as n, ErpProjectDetail as t };
