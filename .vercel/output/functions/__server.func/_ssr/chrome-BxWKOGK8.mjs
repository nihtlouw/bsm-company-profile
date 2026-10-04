import { o as __toESM } from "../_runtime.mjs";
import { b as SERVICES, f as NAV, g as PROFILE_PDF, m as PROFILE_FILENAME, s as COMPANY } from "./site-data-CiDbZPVB.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as ArrowLeft, d as Menu, l as Phone, n as X } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chrome-BxWKOGK8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function waLink(text, number = "6281234567890") {
	return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
function formatIdr(value) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0
	}).format(value);
}
function formatIdrShort(value) {
	if (value >= 1e9) return `Rp ${(value / 1e9).toLocaleString("id-ID", { maximumFractionDigits: 1 })} M`;
	if (value >= 1e6) return `Rp ${(value / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 0 })} jt`;
	return formatIdr(value);
}
function formatDate(ts) {
	return new Intl.DateTimeFormat("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric"
	}).format(ts);
}
function uid(prefix = "id") {
	return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-bold transition-[transform,box-shadow,background-color,border-color] duration-150 ease-out focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-hot disabled:pointer-events-none disabled:opacity-50", {
	variants: {
		variant: {
			primary: "bg-brand text-paper shadow-brand hover:bg-brand-hot hover:shadow-brand-lift hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-brand-press",
			outline: "border-2 border-navy-bright bg-transparent text-navy-mid hover:bg-navy/5",
			"outline-light": "border-2 border-paper/55 bg-transparent text-paper hover:bg-paper/10",
			wa: "border-2 border-wa bg-paper text-wa-ink hover:bg-success-bg",
			ghost: "bg-transparent font-bold text-navy-bright hover:text-navy"
		},
		size: {
			default: "h-12 rounded-full px-6 text-sm",
			sm: "h-10 rounded-full px-4 text-sm",
			block: "h-12 w-full rounded-full px-6 text-sm",
			icon: "size-11 rounded-full"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var toastTimer;
var useFeedback = create((set) => ({
	toast: null,
	modal: null,
	showToast: (msg) => {
		if (toastTimer) clearTimeout(toastTimer);
		set({ toast: msg });
		toastTimer = setTimeout(() => set({ toast: null }), 3200);
	},
	openModal: (modal) => set({ modal }),
	closeModal: () => set({ modal: null })
}));
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)("home");
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		const nodes = [
			"home",
			"services",
			"projects",
			"legalitas",
			"about",
			"clients",
			"contact"
		].map((id) => document.getElementById(id)).filter((el) => Boolean(el));
		if (!nodes.length) return;
		const io = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
		}, { rootMargin: "-45% 0px -45% 0px" });
		nodes.forEach((n) => io.observe(n));
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		id: "siteHeader",
		className: cn("sticky top-0 z-header border-b border-line bg-page/88 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md", scrolled && "shadow-[0_10px_28px_-18px_rgba(10,20,40,0.28)]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-[76px] max-w-6xl items-center justify-between px-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-7 lg:flex",
					"aria-label": "Utama",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `/#${item.id}`,
						"data-nav": true,
						className: cn("relative px-0.5 py-1.5 text-sm font-semibold text-muted after:absolute after:right-full after:bottom-0 after:left-0 after:h-0.5 after:bg-brand after:transition-[right] after:duration-200 hover:text-ink hover:after:right-0", active === item.id && "text-ink after:right-0"),
						children: item.label
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							className: "hidden lg:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profil-perusahaan",
								children: "Company profile"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "hidden lg:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/#contact",
								children: "Hubungi Kami"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center rounded-[10px] border border-line bg-card lg:hidden",
							"aria-expanded": open,
							"aria-controls": "mobilePanel",
							onClick: () => setOpen((v) => !v),
							children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Menu"
							})]
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			id: "mobilePanel",
			className: "mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-4 lg:hidden",
			"aria-label": "Mobile",
			children: [
				NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `/#${item.id}`,
					className: "border-b border-line py-3 font-semibold",
					onClick: () => setOpen(false),
					children: item.label
				}, item.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/#faq",
					className: "border-b border-line py-3 font-semibold",
					onClick: () => setOpen(false),
					children: "FAQ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/erp",
					className: "border-b border-line py-3 font-semibold",
					onClick: () => setOpen(false),
					children: "Portal proyek"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/profil-perusahaan",
					className: "border-b border-line py-3 font-semibold",
					onClick: () => setOpen(false),
					children: "Company profile"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: PROFILE_PDF,
						download: PROFILE_FILENAME,
						onClick: () => setOpen(false),
						children: "Unduh PDF"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/#contact",
						onClick: () => setOpen(false),
						children: "Hubungi Kami"
					})
				})
			]
		}) : null]
	});
}
function CampaignHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-paper/10 bg-navy pt-[calc(18px+env(safe-area-inset-top,0px))] pb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { light: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "tel:+6281234567890",
					className: "hidden items-center gap-1.5 text-sm font-semibold text-paper sm:inline-flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), COMPANY.phoneDisplay]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-1.5 text-sm font-semibold text-on-navy-muted hover:text-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Kembali ke situs"]
				})]
			})]
		})
	});
}
function Brand({ light = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/logo-bsm.png",
			alt: "",
			className: "h-10 w-auto outline outline-1 -outline-offset-1 outline-ink/10"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: cn("block text-[0.98rem] font-extrabold", light ? "text-paper" : "text-ink"),
				children: COMPANY.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("block text-xs font-medium", light ? "text-on-navy-muted" : "text-muted"),
				children: COMPANY.tagline
			})]
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-5 bg-navy pt-12 pb-8 text-on-navy-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo-bsm.png",
						alt: "",
						className: "h-11 w-auto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-paper",
						children: COMPANY.name
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-sm leading-relaxed",
					children: "General contractor & supplier — fokus electrical engineering & installation untuk rumah sakit, pabrik, dan gedung komersial."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-3.5 text-sm font-extrabold text-paper",
					children: "Navigasi"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-1 text-sm leading-8",
					children: [
						NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `/#${item.id}`,
							className: "hover:text-paper",
							children: item.label
						}) }, item.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#faq",
							className: "hover:text-paper",
							children: "FAQ"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/kampanye-instalasi-listrik",
							className: "hover:text-paper",
							children: "Survey instalasi gratis"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/profil-perusahaan",
							className: "hover:text-paper",
							children: "Company profile"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/erp",
							className: "hover:text-paper",
							children: "Portal proyek (ERP)"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-3.5 text-sm font-extrabold text-paper",
					children: "Layanan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1 text-sm leading-8",
					children: SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/layanan/$slug",
						params: { slug: s.id },
						className: "hover:text-paper",
						children: s.title
					}) }, s.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-3.5 text-sm font-extrabold text-paper",
					children: "Kontak"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-8",
					children: [
						"Palembang & Karawang",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${COMPANY.email}`,
							className: "hover:text-paper",
							children: COMPANY.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:+${COMPANY.waNumber}`,
							className: "hover:text-paper",
							children: COMPANY.phoneDisplay
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-9 flex max-w-6xl flex-wrap justify-between gap-2.5 border-t border-paper/10 px-5 pt-5 text-xs md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" ",
				COMPANY.short,
				"."
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Electrical engineering & installation" })]
		})]
	});
}
function WhatsAppFloat({ href }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		className: "fixed right-5 bottom-[calc(88px+env(safe-area-inset-bottom,0px))] z-float flex size-14 items-center justify-center rounded-full bg-wa text-paper shadow-wa transition-transform duration-150 hover:scale-105 md:bottom-[calc(20px+env(safe-area-inset-bottom,0px))]",
		"aria-label": "Chat WhatsApp",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			className: "size-6 fill-current",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.5 2 2.02 6.48 2.02 12c0 1.76.46 3.48 1.34 5L2 22l5.15-1.35A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.99-7.09zM12.04 20.15c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.06.8.82-2.98-.2-.31A8.13 8.13 0 0 1 3.9 12c0-4.48 3.65-8.12 8.14-8.12 2.17 0 4.21.85 5.75 2.38a8.08 8.08 0 0 1 2.38 5.75c0 4.48-3.65 8.14-8.13 8.14zm4.46-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.37-.43.12-.14.16-.24.24-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.2 3.7.59.25 1.04.41 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" })
		})
	});
}
function FeedbackLayer() {
	const modal = useFeedback((s) => s.modal);
	const toast = useFeedback((s) => s.toast);
	const closeModal = useFeedback((s) => s.closeModal);
	(0, import_react.useEffect)(() => {
		if (!modal) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [modal, closeModal]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("fixed inset-0 z-modal flex items-center justify-center bg-navy/60 p-5 backdrop-blur-sm transition-opacity duration-200", modal ? "opacity-100" : "pointer-events-none opacity-0"),
		onClick: (e) => {
			if (e.target === e.currentTarget) closeModal();
		},
		children: modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalBox, {
			modal,
			onClose: closeModal
		}) : null
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "status",
		"aria-live": "polite",
		className: cn("pointer-events-none fixed bottom-7 left-1/2 z-toast -translate-x-1/2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-paper shadow-toast transition-[opacity,transform] duration-200", toast ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"),
		children: toast
	})] });
}
function ModalBox({ modal, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		className: "max-h-[85vh] w-full max-w-lg overflow-auto rounded-lg bg-card p-7 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				className: "float-right p-1 text-2xl leading-none text-muted",
				"aria-label": "Tutup",
				children: "×"
			}),
			modal.kind === "case" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold text-navy-bright",
					children: modal.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1.5 clear-both text-xl",
					children: modal.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSection, {
					title: "Latar Belakang",
					body: modal.background
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSection, {
					title: "Solusi",
					body: modal.solution
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSection, {
					title: "Hasil",
					body: modal.result
				})
			] }) : null,
			modal.kind === "gallery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold text-navy-bright",
					children: "Galeri Foto PT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1.5 clear-both text-xl",
					children: modal.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: modal.image,
					alt: modal.title,
					className: "mt-4 aspect-square w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-ink/10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: modal.caption
				})
			] }) : null,
			modal.kind === "doc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold text-navy-bright",
					children: "Legalitas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1.5 clear-both text-xl",
					children: modal.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted",
					children: modal.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-ink",
					children: "Salinan dokumen tersedia atas permintaan resmi melalui formulir kontak."
				})
			] }) : null
		]
	});
}
function ModalSection({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
			className: "text-xs font-bold text-muted",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm",
			children: body
		})]
	});
}
var MAIN_WA = waLink("Halo, saya ingin bertanya tentang layanan Berjaya Sukses Makmur.");
var CAMPAIGN_WA = waLink("Halo, saya tertarik dengan promo survey gratis instalasi listrik.");
//#endregion
export { MAIN_WA as a, WhatsAppFloat as c, formatIdr as d, formatIdrShort as f, waLink as h, FeedbackLayer as i, cn as l, useFeedback as m, CAMPAIGN_WA as n, SiteFooter as o, uid as p, CampaignHeader as r, SiteHeader as s, Button as t, formatDate as u };
