import { o as __toESM } from "../_runtime.mjs";
import { g as PROFILE_PDF, h as PROFILE_PAGES, m as PROFILE_FILENAME, s as COMPANY } from "./site-data-CiDbZPVB.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Download, m as FileText, n as X } from "../_libs/lucide-react.mjs";
import { t as Button } from "./chrome-BxWKOGK8.mjs";
import { i as breadcrumbJsonLd, n as JsonLd, s as profileJsonLd, t as CtaBand } from "./json-ld-BiX-uFvw.mjs";
import { t as MarketingShell } from "./inner-page-BVgNEYgJ.mjs";
import { t as Reveal } from "./reveal-DunBP5Q1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-perusahaan-CkgfyKtw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const [open, setOpen] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (open == null) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(null);
			if (e.key === "ArrowRight") setOpen((i) => i == null ? i : Math.min(PROFILE_PAGES.length - 1, i + 1));
			if (e.key === "ArrowLeft") setOpen((i) => i == null ? i : Math.max(0, i - 1));
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: profileJsonLd() }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: breadcrumbJsonLd([{
			name: "Beranda",
			path: "/"
		}, {
			name: "Company Profile",
			path: "/profil-perusahaan"
		}]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-navy py-14 text-on-navy md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.15fr_0.85fr] md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-wide text-brand-mist",
						children: "Dokumen resmi 2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 max-w-[16ch] text-4xl leading-tight text-paper md:text-5xl",
						children: "Company profile siap unduh"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lead mt-4 max-w-[48ch] text-lg text-on-navy-muted",
						children: "Delapan halaman A4: legalitas, layanan elektrikal, portofolio rumah sakit & pabrik, plus kendali proyek kurva S. Lampiran untuk tender dan vendor registration."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: PROFILE_PDF,
								download: PROFILE_FILENAME,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Unduh PDF"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline-light",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/#contact",
								children: "Minta salinan legalitas"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-on-navy-muted",
						children: [
							COMPANY.name,
							" · Palembang & Karawang · ",
							PROFILE_PAGES.length,
							" halaman"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(0),
					className: "overflow-hidden rounded-lg border border-paper/15 bg-navy-mid text-left shadow-panel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: PROFILE_PAGES[0].src,
						alt: "Sampul company profile PT Berjaya Sukses Makmur",
						className: "aspect-sheet w-full object-cover object-top"
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-14 md:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-5 md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl",
						children: "Isi dokumen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm text-muted",
						children: "Klik halaman untuk memperbesar. Unduh untuk salinan penuh."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						stagger: true,
						className: "mt-8 grid grid-cols-2 gap-4 md:grid-cols-4",
						children: PROFILE_PAGES.map((page, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOpen(i),
							className: "group overflow-hidden rounded-md border border-line bg-card text-left shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: page.src,
								alt: `${page.title} — halaman ${i + 1}`,
								className: "aspect-sheet w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block px-3 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs font-bold tracking-wide text-brand",
										children: String(i + 1).padStart(2, "0")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block text-sm font-bold",
										children: page.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block text-xs text-muted",
										children: page.note
									})
								]
							})]
						}, page.src))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-4 px-5 sm:grid-cols-3 md:px-8",
				children: [
					{
						title: "Untuk tender",
						body: "Legalitas NIB, SBU, SIUJK, SMK3 dirangkum siap dilampirkan."
					},
					{
						title: "Untuk owner",
						body: "Portofolio fasilitas kritis plus cara kerja dan kurva S."
					},
					{
						title: "Untuk vendor reg",
						body: "Kontak dua cabang, email, dan ajakan kerja sama di halaman terakhir."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-md border border-line bg-card p-5 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-brand" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-base",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: item.body
						})
					]
				}, item.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CtaBand, {
			title: "Butuh survey sebelum mengirim brief?",
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
					href: PROFILE_PDF,
					download: PROFILE_FILENAME,
					children: "Unduh PDF"
				})
			})]
		}),
		open != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-modal flex items-center justify-center bg-navy/80 p-4",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": PROFILE_PAGES[open].title,
			onClick: () => setOpen(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-h-[90dvh] w-full max-w-3xl overflow-auto rounded-lg bg-card p-3 shadow-panel",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between gap-3 px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-bold",
							children: [PROFILE_PAGES[open].title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 text-xs font-medium text-muted",
								children: [
									open + 1,
									" / ",
									PROFILE_PAGES.length
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center rounded-[10px] border border-line",
							onClick: () => setOpen(null),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Tutup"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: PROFILE_PAGES[open].src,
						alt: PROFILE_PAGES[open].title,
						className: "w-full rounded-md"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							disabled: open === 0,
							onClick: () => setOpen(open - 1),
							children: "Sebelumnya"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							disabled: open === PROFILE_PAGES.length - 1,
							onClick: () => setOpen(open + 1),
							children: "Berikutnya"
						})]
					})
				]
			})
		}) : null
	] });
}
function ProfileRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePage, {}) });
}
//#endregion
export { ProfileRoute as component };
