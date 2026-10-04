import { b as SERVICES, g as PROFILE_PDF, m as PROFILE_FILENAME, x as SERVICE_PAGES } from "./site-data-CiDbZPVB.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./chrome-BxWKOGK8.mjs";
import { i as Route$3 } from "./router-DTYK-zly.mjs";
import { i as breadcrumbJsonLd, l as serviceJsonLd, n as JsonLd, t as CtaBand } from "./json-ld-BiX-uFvw.mjs";
import { n as PageHero, t as MarketingShell } from "./inner-page-BVgNEYgJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/layanan._slug-C_0MT2Wn.js
var import_jsx_runtime = require_jsx_runtime();
function ServiceRoute() {
	const { slug } = Route$3.useParams();
	const page = SERVICE_PAGES[slug];
	if (!page) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-16 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl",
			children: "Layanan tidak ditemukan"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-block text-sm font-bold text-navy-bright",
			children: "Kembali ke beranda"
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: serviceJsonLd(page.title, page.description, page.slug) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: breadcrumbJsonLd([{
			name: "Beranda",
			path: "/"
		}, {
			name: page.title,
			path: `/layanan/${page.slug}`
		}]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: page.eyebrow,
			title: page.title,
			lead: page.lead
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_0.8fr] md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [page.paragraphs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-[0.95rem] leading-relaxed text-ink",
				children: p
			}, p.slice(0, 24))), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 space-y-3",
				children: page.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-extrabold text-brand",
						children: i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pt-1.5 font-semibold",
						children: step
					})]
				}, step))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-md border border-line bg-card p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base",
						children: "Layanan lain"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: SERVICES.filter((s) => s.id !== slug).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/layanan/$slug",
							params: { slug: s.id },
							className: "text-sm font-bold text-navy-bright",
							children: [s.title, " →"]
						}) }, s.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: PROFILE_PDF,
						download: PROFILE_FILENAME,
						className: "mt-5 inline-block text-sm font-bold text-brand",
						children: "Unduh company profile"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CtaBand, {
			title: "Butuh survey untuk pekerjaan ini?",
			note: "Tim Palembang & Karawang merespons dalam 1×24 jam hari kerja.",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/kampanye-instalasi-listrik",
					children: "Minta survey gratis"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline-light",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/#contact",
					children: "Kirim brief"
				})
			})]
		})
	] }) });
}
//#endregion
export { ServiceRoute as component };
