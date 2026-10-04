import { _ as PROJECTS, g as PROFILE_PDF, i as CATEGORY_LABEL, m as PROFILE_FILENAME } from "./site-data-CiDbZPVB.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./chrome-BxWKOGK8.mjs";
import { r as Route$2 } from "./router-DTYK-zly.mjs";
import { c as projectJsonLd, i as breadcrumbJsonLd, n as JsonLd, t as CtaBand } from "./json-ld-BiX-uFvw.mjs";
import { n as PageHero, t as MarketingShell } from "./inner-page-BVgNEYgJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/proyek._id-KaZsUgGw.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectRoute() {
	const { id } = Route$2.useParams();
	const p = PROJECTS.find((x) => x.id === id);
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-16 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl",
			children: "Proyek tidak ditemukan"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-block text-sm font-bold text-navy-bright",
			children: "Kembali ke beranda"
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: projectJsonLd(p) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: breadcrumbJsonLd([{
			name: "Beranda",
			path: "/"
		}, {
			name: p.title,
			path: `/proyek/${p.id}`
		}]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: `${CATEGORY_LABEL[p.category]} · ${p.year} · ${p.location}`,
			title: `${p.title} — ${p.subtitle}`,
			lead: p.background
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.image,
					alt: `${p.title} — ${p.subtitle}`,
					className: "aspect-video w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-ink/10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 text-lg",
					children: "Latar belakang"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[0.95rem] leading-relaxed text-muted",
					children: p.background
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 text-lg",
					children: "Solusi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[0.95rem] leading-relaxed text-muted",
					children: p.solution
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 text-lg",
					children: "Hasil"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[0.95rem] leading-relaxed text-muted",
					children: p.result
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-md border border-line bg-card p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-navy-bright",
						children: CATEGORY_LABEL[p.category]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-base",
						children: p.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-2 gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs font-bold text-muted",
							children: "Tahun"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-0.5 font-semibold",
							children: p.year
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs font-bold text-muted",
							children: "Lokasi"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-0.5 font-semibold",
							children: p.location
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs font-bold text-muted",
						children: "Lingkup"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1.5 text-sm",
						children: p.scope.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" }), item]
						}, item))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Ringkasan untuk tender. Company profile memuat portofolio lengkap."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-5",
						size: "block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/kampanye-instalasi-listrik",
							children: "Minta survey serupa"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-3",
						size: "block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: PROFILE_PDF,
							download: PROFILE_FILENAME,
							children: "Unduh company profile"
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Punya fasilitas dengan kebutuhan serupa?",
			note: "Kirim brief atau minta survey lokasi gratis.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/#contact",
					children: "Kirim brief"
				})
			})
		})
	] }) });
}
//#endregion
export { ProjectRoute as component };
