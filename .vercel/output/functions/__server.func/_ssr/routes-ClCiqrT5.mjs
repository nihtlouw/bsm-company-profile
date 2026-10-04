import { o as __toESM } from "../_runtime.mjs";
import { C as TESTIMONIALS, S as STATS, _ as PROJECTS, a as CERTIFICATIONS, b as SERVICES, c as CONTACT_INTENTS, d as HOW_IT_WORKS, g as PROFILE_PDF, i as CATEGORY_LABEL, l as FAQ, m as PROFILE_FILENAME, o as CLIENTS, p as OFFICES, r as CATEGORIES, s as COMPANY, t as ABOUT_FACTS, u as GALLERY } from "./site-data-CiDbZPVB.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Building2, g as Factory, h as FileCheck, p as Landmark, r as Wrench, s as Shield, t as Zap, v as ClipboardList, w as BadgeCheck, x as Cable, y as ChevronDown } from "../_libs/lucide-react.mjs";
import { a as MAIN_WA, c as WhatsAppFloat, i as FeedbackLayer, l as cn, m as useFeedback, o as SiteFooter, s as SiteHeader, t as Button } from "./chrome-BxWKOGK8.mjs";
import { n as saveWebInquiry } from "./web-leads-DIWlxCqh.mjs";
import { a as faqJsonLd, n as JsonLd, o as orgJsonLd, r as StickyCta, t as CtaBand } from "./json-ld-BiX-uFvw.mjs";
import { t as Reveal } from "./reveal-DunBP5Q1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ClCiqrT5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INITIAL = [
	true,
	false,
	true,
	true,
	false,
	false,
	true,
	false,
	true,
	true
];
function ElectricalPanel() {
	const [switches, setSwitches] = (0, import_react.useState)(INITIAL);
	const cardRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const id = window.setInterval(() => {
			setSwitches((prev) => {
				const next = [...prev];
				const i = Math.floor(Math.random() * next.length);
				next[i] = !next[i];
				return next;
			});
		}, 1100);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		const el = cardRef.current;
		if (!el) return;
		const touch = "ontouchstart" in window;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (touch || reduce) return;
		const onMove = (e) => {
			const rect = el.getBoundingClientRect();
			const px = (e.clientX - rect.left) / rect.width - .5;
			const py = (e.clientY - rect.top) / rect.height - .5;
			el.style.transform = `perspective(800px) rotateX(${-py * 20}deg) rotateY(${px * 20}deg) scale(1.01)`;
		};
		const onLeave = () => {
			el.style.transform = "";
		};
		el.addEventListener("mousemove", onMove);
		el.addEventListener("mouseleave", onLeave);
		return () => {
			el.removeEventListener("mousemove", onMove);
			el.removeEventListener("mouseleave", onLeave);
		};
	}, []);
	const live = switches.filter(Boolean).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel-float",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: cardRef,
			className: cn("relative rounded-lg bg-linear-to-br from-navy-bright to-navy-mid p-6", "ring-1 ring-paper/15 shadow-panel will-change-transform"),
			style: { transformStyle: "preserve-3d" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-2.5 -right-3.5 -bottom-4 -z-10 rounded-lg bg-linear-to-br from-navy-mid to-navy opacity-65",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-wide text-on-navy-muted",
					children: "PANEL UTAMA · 3 FASA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 font-sans text-2xl font-extrabold tabular-nums text-brand-mist",
					children: "380.2 V"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid grid-cols-5 gap-2.5",
					children: switches.map((on, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-on": on ? "true" : "false",
						className: "aspect-square rounded-lg bg-navy-soft ring-1 ring-paper/10 transition-colors duration-500 data-[on=true]:bg-brand"
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center justify-between text-xs font-semibold text-on-navy-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PLN · GENSET · UPS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-brand-mist",
						children: [live, "/10 ON"]
					})]
				})
			]
		})
	});
}
function FaqSection() {
	const [open, setOpen] = (0, import_react.useState)(FAQ[0]?.id ?? null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl md:text-[1.9rem]",
					children: "Pertanyaan umum"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm text-muted",
					children: "Jawaban singkat sebelum tender, onboarding vendor, atau survey lapangan."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mt-7 divide-y divide-line rounded-lg border border-line bg-card",
					children: FAQ.map((item) => {
						const expanded = open === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-expanded": expanded,
							className: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold",
							onClick: () => setOpen(expanded ? null : item.id),
							children: [item.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-lg font-medium text-muted", expanded && "text-brand"),
								children: expanded ? "−" : "+"
							})]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("overflow-hidden px-5 text-sm leading-relaxed text-muted transition-[max-height] duration-200", expanded ? "max-h-40 pb-4" : "max-h-0"),
							children: item.a
						})] }, item.id);
					})
				})
			]
		})
	});
}
var SERVICE_ICONS = [
	Zap,
	Cable,
	Shield,
	Wrench
];
var DOC_ICONS = [
	Landmark,
	BadgeCheck,
	FileCheck,
	ClipboardList
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "pb-20 md:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: orgJsonLd() }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: faqJsonLd() }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsStrip, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorTrust, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CtaBand, {
				title: "Siap tender atau survey lokasi?",
				note: "Unduh company profile untuk kelengkapan vendor, atau minta survey gratis untuk proyek instalasi baru.",
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
						children: "Unduh company profile"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portfolio, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legalitas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clients, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
		]
	});
}
function SectionHead({ id, title, note, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-baseline justify-between gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id,
				className: "text-2xl md:text-[1.9rem]",
				children: title
			}), action]
		}), note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-sm text-muted",
			children: note
		}) : null]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "home",
		className: "relative overflow-hidden bg-navy py-12 text-on-navy md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mb-5 inline-flex items-center rounded-full border border-brand/40 bg-brand/15 px-3.5 py-1.5 text-xs font-bold tracking-wide text-brand-mist",
					children: [
						"SEJAK ",
						COMPANY.founded,
						" · PALEMBANG & KARAWANG"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-[16ch] text-4xl leading-tight text-paper md:text-5xl",
					children: "Kontraktor listrik rumah sakit, pabrik, dan gedung"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lead mt-4 max-w-[46ch] text-lg text-on-navy-muted",
					children: "Instalasi elektrikal sesuai PUIL/SNI — panel, tray, grounding, hingga commissioning. Survey lokasi gratis untuk proyek baru."
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-on-navy-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#projects",
							className: "font-semibold text-paper underline-offset-4 hover:underline",
							children: "Lihat portofolio"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "font-semibold text-paper underline-offset-4 hover:underline",
							children: "Kirim brief proyek"
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ElectricalPanel, {}) })]
		})
	});
}
function StatsStrip() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-line bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-6xl grid-cols-2 px-5 py-8 text-center md:grid-cols-4 md:px-8",
			children: STATS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-3xl font-extrabold text-navy-mid",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatNum, {
						target: s.value,
						suffix: s.suffix
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: s.label
				})]
			}, s.label))
		})
	});
}
function StatNum({ target, suffix }) {
	const ref = (0, import_react.useRef)(null);
	const [val, setVal] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		let raf = 0;
		const io = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			io.disconnect();
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				setVal(target);
				return;
			}
			const t0 = performance.now();
			const dur = 1200;
			const step = (ts) => {
				const p = Math.min((ts - t0) / dur, 1);
				setVal(Math.floor(p * target));
				if (p < 1) raf = requestAnimationFrame(step);
				else setVal(target);
			};
			raf = requestAnimationFrame(step);
		}, { threshold: .4 });
		io.observe(el);
		return () => {
			io.disconnect();
			cancelAnimationFrame(raf);
		};
	}, [target]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		className: "tabular-nums",
		children: [val, suffix]
	});
}
function VendorTrust() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-line bg-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-wide text-muted",
					children: "Kelengkapan vendor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: CERTIFICATIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#legalitas",
						className: "rounded-full border border-line bg-card px-3 py-1.5 text-xs font-bold text-ink",
						children: c.name
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/profil-perusahaan",
					className: "text-xs font-bold text-navy-bright",
					children: "Company profile PDF →"
				})
			]
		})
	});
}
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "alur",
		className: "py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Dari brief sampai serah terima",
				note: "Empat langkah yang sama untuk rumah sakit, pabrik, dan gedung komersial."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				stagger: true,
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: HOW_IT_WORKS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-md border border-line bg-card p-5 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold tracking-wide text-brand",
							children: s.step
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-[1.02rem]",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted",
							children: s.body
						})
					]
				}, s.step))
			})]
		})
	});
}
function Services() {
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Layanan instalasi elektrikal",
				note: "Pekerjaan elektrikal dari desain hingga serah terima — satu tim, satu tanggung jawab."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				stagger: true,
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: SERVICES.map((svc, i) => {
					const Icon = SERVICE_ICONS[i] ?? Zap;
					const expanded = open === svc.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-md border border-line bg-card p-5 text-left shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-card-hover",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-expanded": expanded,
							onClick: () => setOpen(expanded ? null : svc.id),
							className: "w-full text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-3.5 flex size-11 items-center justify-center rounded-[11px] bg-brand-soft text-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_3px_6px_-2px_rgba(237,29,35,0.28)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[1.02rem]",
									children: svc.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-sm text-muted",
									children: svc.subtitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("overflow-hidden transition-[max-height] duration-300", expanded ? "max-h-40" : "max-h-0"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 border-t border-line pt-3 text-sm text-muted",
										children: svc.detail
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-3 inline-flex items-center gap-1 text-xs font-bold text-navy-bright",
									children: [expanded ? "Tutup" : "Ringkasan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3.5 transition-transform", expanded && "rotate-180") })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/layanan/$slug",
							params: { slug: svc.id },
							className: "mt-3 inline-block text-xs font-bold text-brand",
							children: "Halaman layanan →"
						})]
					}, svc.id);
				})
			})]
		})
	});
}
function Portfolio() {
	const [filter, setFilter] = (0, import_react.useState)("semua");
	const openModal = useFeedback((s) => s.openModal);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "projects",
		className: "py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "Portofolio proyek elektrikal",
					note: "Studi kasus dari fasilitas kesehatan, pabrik, dan gedung komersial."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex flex-wrap gap-2.5",
					children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-filter": c.id,
						onClick: () => setFilter(c.id),
						className: cn("h-11 rounded-full border border-line bg-card px-4 text-sm font-semibold text-muted", filter === c.id && "border-navy-mid bg-navy-mid text-paper"),
						children: c.label
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: PROJECTS.filter((p) => filter === "semua" || p.category === filter).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "overflow-hidden rounded-md border border-line bg-card shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-card-hover",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/proyek/$id",
							params: { id: p.id },
							className: "block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative h-40 overflow-hidden bg-navy",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.image,
									alt: `${p.title} — ${p.subtitle}`,
									className: "size-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-navy-bright",
									children: CATEGORY_LABEL[p.category]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 text-base",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: p.subtitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/proyek/$id",
										params: { id: p.id },
										className: "text-sm font-bold text-navy-bright",
										children: "Halaman proyek →"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-sm font-bold text-muted",
										onClick: () => openModal({
											kind: "case",
											title: `${p.title} — ${p.subtitle}`,
											category: CATEGORY_LABEL[p.category],
											background: p.background,
											solution: p.solution,
											result: p.result
										}),
										children: "Ringkas"
									})]
								})
							]
						})]
					}, p.id))
				})
			]
		})
	});
}
function Legalitas() {
	const openModal = useFeedback((s) => s.openModal);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "legalitas",
		className: "py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "Legalitas",
					note: "Dokumen perusahaan siap diverifikasi untuk tender dan onboarding vendor."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					stagger: true,
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: CERTIFICATIONS.map((doc, i) => {
						const Icon = DOC_ICONS[i] ?? FileCheck;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-md border border-line bg-card p-5 shadow-card transition-transform duration-200 hover:-translate-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-3 flex size-10 items-center justify-center rounded-[10px] bg-brand-soft text-brand",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm",
									children: doc.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: doc.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "mt-3 text-xs font-bold text-navy-bright",
									onClick: () => openModal({
										kind: "doc",
										title: doc.name,
										description: `${doc.description} Salinan resmi dikirim atas permintaan lewat formulir kontak atau email.`
									}),
									children: "Lihat keterangan →"
								})
							]
						}, doc.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: PROFILE_PDF,
							download: PROFILE_FILENAME,
							children: "Unduh company profile"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							children: "Minta salinan legalitas"
						})
					})]
				})
			]
		})
	});
}
function Gallery() {
	const openModal = useFeedback((s) => s.openModal);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "galeri",
		className: "py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Galeri",
				note: "Cuplikan pekerjaan di ruang panel, tray, dan gedung."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				stagger: true,
				className: "grid grid-cols-2 gap-3.5 md:grid-cols-3",
				children: GALLERY.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => openModal({
						kind: "gallery",
						title: g.title,
						image: g.image,
						caption: g.caption
					}),
					className: "relative aspect-square overflow-hidden rounded-[14px] bg-navy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: g.image,
						alt: g.title,
						className: "size-full object-cover outline outline-1 -outline-offset-1 outline-ink/10 transition-transform duration-200 hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-navy/85 to-transparent px-2.5 pt-8 pb-2.5 text-left text-xs font-semibold text-paper",
						children: g.title
					})]
				}, g.id))
			})]
		})
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-start gap-12 px-5 md:grid-cols-2 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Tentang Kami" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[0.95rem] leading-relaxed text-ink",
					children: [
						COMPANY.name,
						" adalah general contractor & supplier yang berfokus pada electrical engineering dan installation. Sejak ",
						COMPANY.founded,
						" kami menangani instalasi kelistrikan untuk fasilitas kesehatan, pabrik, dan gedung komersial dari dua cabang: Palembang dan Karawang."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[0.95rem] leading-relaxed text-muted",
					children: "Lingkup kerja mencakup panel distribusi, MCC, grounding, penerangan, hingga commissioning — dikoordinasikan dengan tim MEP lain agar serah terima berjalan rapi."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/profil-perusahaan",
						children: "Lihat company profile"
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [ABOUT_FACTS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-line py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs font-bold text-muted",
					children: f.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[0.95rem]",
					children: f.value
				})]
			}, f.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-line py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs font-bold text-muted",
					children: "Ikon segmen"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex flex-wrap gap-3 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 text-brand" }), " Gedung"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Factory, { className: "size-4 text-brand" }), " Pabrik"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 text-brand" }), " Fasilitas kritis"]
						})
					]
				})]
			})] }) })]
		})
	});
}
function Clients() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "clients",
		className: "py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Klien & Mitra",
				note: "Fasilitas yang mempercayakan pekerjaan elektrikal kepada kami."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				stagger: true,
				className: "grid grid-cols-2 gap-4 md:grid-cols-5",
				children: CLIENTS.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-[72px] items-center justify-center rounded-xl border border-line bg-card px-3 text-center text-xs font-semibold text-ink shadow-card",
					children: name
				}, name))
			})]
		})
	});
}
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "testimoni",
		className: "py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Yang dikatakan klien",
				note: "Cuplikan dari facility manager dan plant engineer setelah serah terima."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				stagger: true,
				className: "grid grid-cols-1 gap-5 md:grid-cols-2",
				children: TESTIMONIALS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "rounded-md border border-line bg-card p-6 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[0.95rem] leading-relaxed text-ink",
						children: [
							"“",
							t.quote,
							"”"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "mt-4 text-sm font-bold",
						children: [t.author, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-xs font-medium text-muted",
							children: t.role
						})]
					})]
				}, t.author))
			})]
		})
	});
}
function Contact() {
	const showToast = useFeedback((s) => s.showToast);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	function onSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const fd = new FormData(form);
		const intent = String(fd.get("intent") ?? "").trim();
		const data = {
			name: String(fd.get("name") ?? "").trim(),
			email: String(fd.get("email") ?? "").trim(),
			company: String(fd.get("company") ?? "").trim(),
			message: String(fd.get("message") ?? "").trim(),
			type: intent
		};
		const next = {};
		if (!data.name) next.name = "Nama wajib diisi.";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "Email tidak valid.";
		if (!data.company) next.company = "Perusahaan wajib diisi.";
		if (!intent) next.intent = "Pilih keperluan.";
		if (!data.message) next.message = "Pesan wajib diisi.";
		setErrors(next);
		if (Object.keys(next).length) return;
		saveWebInquiry({
			...data,
			source: "contact_form"
		});
		form.reset();
		setSuccess(true);
		showToast("Pesan terkirim. Tim kami akan menghubungi Anda dalam 1×24 jam.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-11 px-5 md:grid-cols-[1fr_1.1fr] md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-navy p-7 text-on-navy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg text-paper",
						children: "Kirim brief proyek"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-on-navy-muted",
						children: "Kami merespons dalam 1×24 jam pada hari kerja. Untuk tender, lampirkan unduhan company profile di paket vendor Anda."
					}),
					OFFICES.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "mt-0.5 size-4 shrink-0 text-brand-mist" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-on-navy-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "mb-0.5 block text-sm text-paper",
								children: o.city
							}), o.line]
						})]
					}, o.city)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "mt-0.5 size-4 shrink-0 text-brand-mist" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-on-navy-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "mb-0.5 block text-sm text-paper",
									children: "Email & telepon"
								}),
								COMPANY.email,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								COMPANY.phoneDisplay
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: PROFILE_PDF,
						download: PROFILE_FILENAME,
						className: "mt-6 inline-flex text-sm font-bold text-paper underline-offset-4 hover:underline",
						children: "Unduh company profile PDF →"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "rounded-lg border border-line bg-card p-7 shadow-card",
				noValidate: true,
				children: [
					success ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 rounded-xl border border-success-line bg-success-bg p-4 text-sm text-success",
						children: "Pesan terkirim. Tim kami akan menghubungi Anda dalam 1×24 jam."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "cName",
						name: "name",
						label: "Nama Lengkap",
						error: errors.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "cEmail",
						name: "email",
						label: "Email",
						type: "email",
						error: errors.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "cCompany",
						name: "company",
						label: "Perusahaan",
						error: errors.company
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "cIntent",
								className: "mb-1.5 block text-xs font-bold",
								children: "Keperluan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "cIntent",
								name: "intent",
								defaultValue: "",
								className: cn("w-full rounded-[10px] border-[1.5px] border-line bg-page px-3.5 py-3 text-sm", errors.intent && "border-brand"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									disabled: true,
									children: "Pilih keperluan"
								}), CONTACT_INTENTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item.label,
									children: item.label
								}, item.id))]
							}),
							errors.intent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-brand",
								children: errors.intent
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "cMessage",
						name: "message",
						label: "Pesan",
						textarea: true,
						error: errors.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "block",
						children: "Kirim brief"
					})
				]
			}) })]
		})
	});
}
function Field({ id, name, label, type = "text", textarea, error }) {
	const cls = cn("w-full rounded-[10px] border-[1.5px] border-line bg-page px-3.5 py-3 text-sm text-ink transition-colors focus:border-brand", error && "border-brand");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "mb-1.5 block text-xs font-bold",
				children: label
			}),
			textarea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id,
				name,
				rows: 4,
				className: cn(cls, "min-h-[90px] resize-y")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				name,
				type,
				className: cls
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-brand",
				children: error
			}) : null
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#main",
			className: "sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-modal focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-paper",
			children: "Lewati ke konten"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomePage, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyCta, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFloat, { href: MAIN_WA }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackLayer, {})
	] });
}
//#endregion
export { Home as component };
