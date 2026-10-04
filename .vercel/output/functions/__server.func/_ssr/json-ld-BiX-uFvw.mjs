import { o as __toESM } from "../_runtime.mjs";
import { b as SERVICES, l as FAQ, p as OFFICES, s as COMPANY } from "./site-data-CiDbZPVB.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Download, c as Send, u as MessageCircle } from "../_libs/lucide-react.mjs";
import { l as cn, t as Button } from "./chrome-BxWKOGK8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/json-ld-BiX-uFvw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CtaBand({ title, note, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-5 py-10 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-lg bg-navy px-6 py-8 text-on-navy md:flex-row md:items-center md:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl text-paper md:text-2xl",
				children: title
			}), note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-on-navy-muted",
				children: note
			}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3",
				children
			})]
		})
	});
}
function StickyCta() {
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const contact = document.getElementById("contact");
			const contactVisible = contact ? contact.getBoundingClientRect().top < window.innerHeight - 80 : false;
			setShow(window.scrollY > 420 && !contactVisible);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("fixed inset-x-0 bottom-0 z-cta border-t border-paper/10 bg-navy/95 pt-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] backdrop-blur-md transition-[transform,opacity] duration-200 md:hidden", show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl gap-2 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/kampanye-instalasi-listrik",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), "Survey"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: "outline-light",
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/profil-perusahaan",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Profil"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: "wa",
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#contact",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), "Brief"]
					})
				})
			]
		})
	});
}
var ORIGIN = "https://berjayasuksesmakmur.co.id";
function orgJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "GeneralContractor",
		name: COMPANY.name,
		alternateName: COMPANY.short,
		url: ORIGIN,
		logo: `${ORIGIN}/logo-bsm.png`,
		image: `${ORIGIN}/og.jpg`,
		foundingDate: String(COMPANY.founded),
		email: COMPANY.email,
		telephone: `+${COMPANY.waNumber}`,
		description: "Kontraktor elektrikal untuk rumah sakit, pabrik, dan gedung komersial. Instalasi listrik, panel distribusi, grounding, dan commissioning.",
		areaServed: [
			"Palembang",
			"Karawang",
			"Indonesia"
		],
		address: OFFICES.map((o) => ({
			"@type": "PostalAddress",
			addressLocality: o.city,
			streetAddress: o.line,
			addressCountry: "ID"
		})),
		knowsAbout: SERVICES.map((s) => s.title),
		sameAs: [`https://wa.me/${COMPANY.waNumber}`]
	};
}
function faqJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: FAQ.map((item) => ({
			"@type": "Question",
			name: item.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.a
			}
		}))
	};
}
function serviceJsonLd(title, description, slug) {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name: title,
		description,
		url: `${ORIGIN}/layanan/${slug}`,
		provider: {
			"@type": "GeneralContractor",
			name: COMPANY.name
		},
		areaServed: "ID",
		serviceType: "Electrical installation"
	};
}
function breadcrumbJsonLd(items) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: `${ORIGIN}${item.path}`
		}))
	};
}
function profileJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "DigitalDocument",
		name: "Company Profile PT Berjaya Sukses Makmur 2026",
		encodingFormat: "application/pdf",
		url: `${ORIGIN}/company-profile.pdf`,
		inLanguage: "id",
		about: "Electrical engineering and installation contractor",
		author: {
			"@type": "GeneralContractor",
			name: COMPANY.name,
			url: ORIGIN
		}
	};
}
function projectJsonLd(p) {
	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: `${p.title} — ${p.subtitle}`,
		description: p.result,
		dateCreated: String(p.year),
		locationCreated: {
			"@type": "Place",
			name: p.location
		},
		url: `${ORIGIN}/proyek/${p.id}`,
		creator: {
			"@type": "GeneralContractor",
			name: COMPANY.name,
			url: ORIGIN
		}
	};
}
function JsonLd({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(data) }
	});
}
//#endregion
export { faqJsonLd as a, projectJsonLd as c, breadcrumbJsonLd as i, serviceJsonLd as l, JsonLd as n, orgJsonLd as o, StickyCta as r, profileJsonLd as s, CtaBand as t };
