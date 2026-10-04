import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as MAIN_WA, c as WhatsAppFloat, i as FeedbackLayer, o as SiteFooter, s as SiteHeader, t as Button } from "./chrome-BxWKOGK8.mjs";
import { r as StickyCta } from "./json-ld-BiX-uFvw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inner-page-BVgNEYgJ.js
var import_jsx_runtime = require_jsx_runtime();
function MarketingShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
		children,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyCta, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFloat, { href: MAIN_WA }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackLayer, {})
	] });
}
function PageHero({ eyebrow, title, lead }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-navy py-12 text-on-navy md:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-wide text-brand-mist",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-[18ch] text-4xl leading-tight text-paper md:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lead mt-4 max-w-[52ch] text-lg text-on-navy-muted",
					children: lead
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/kampanye-instalasi-listrik",
							children: "Minta survey gratis"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline-light",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/profil-perusahaan",
							children: "Company profile"
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { PageHero as n, MarketingShell as t };
