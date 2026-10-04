import { o as __toESM } from "../_runtime.mjs";
import { C as TESTIMONIALS, n as CAMPAIGN_CHECKS, s as COMPANY, v as PROJECT_TYPES } from "./site-data-CiDbZPVB.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as Check } from "../_libs/lucide-react.mjs";
import { c as WhatsAppFloat, h as waLink, i as FeedbackLayer, l as cn, m as useFeedback, n as CAMPAIGN_WA, o as SiteFooter, r as CampaignHeader, t as Button } from "./chrome-BxWKOGK8.mjs";
import { n as saveWebInquiry } from "./web-leads-DIWlxCqh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kampanye-instalasi-listrik-40rM3y8T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CampaignPage({ waHref, setWaHref }) {
	const showToast = useFeedback((s) => s.showToast);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const data = {
			name: String(fd.get("name") ?? "").trim(),
			phone: String(fd.get("phone") ?? "").trim(),
			type: String(fd.get("type") ?? "").trim(),
			loc: String(fd.get("loc") ?? "").trim()
		};
		const next = {};
		if (!data.name) next.name = "Nama wajib diisi.";
		if (data.phone.replace(/\D/g, "").length < 8) next.phone = "Nomor WhatsApp tidak valid.";
		if (!data.type) next.type = "Pilih jenis proyek.";
		if (!data.loc) next.loc = "Lokasi wajib diisi.";
		setErrors(next);
		if (Object.keys(next).length) return;
		const msg = `Halo, saya ${data.name} (${data.phone}) ingin minta penawaran untuk ${data.type} di ${data.loc}.`;
		saveWebInquiry({
			name: data.name,
			phone: data.phone,
			type: data.type,
			loc: data.loc,
			source: "campaign_lead"
		});
		setWaHref(waLink(msg));
		e.currentTarget.reset();
		setSuccess(true);
		showToast("Permintaan tersimpan. Klik WhatsApp untuk menindaklanjuti.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden bg-linear-to-br from-navy-mid to-navy py-14 text-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-6xl items-start gap-11 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-4 inline-block rounded-md bg-brand px-3 py-1.5 text-xs font-bold text-paper",
						children: "Promo survey lokasi"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-4xl leading-tight md:text-5xl",
						children: [
							"Survey instalasi listrik",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand-mist",
								children: "Palembang & Karawang"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 flex flex-col gap-2.5",
						children: CAMPAIGN_CHECKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2.5 text-sm text-on-navy-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-brand-mist" }), item]
						}, item))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap gap-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#lead",
									children: "Minta penawaran"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "wa",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: waHref,
									target: "_blank",
									rel: "noreferrer",
									children: "Chat WhatsApp"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline-light",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/profil-perusahaan",
									children: "Company profile"
								})
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					id: "lead",
					onSubmit,
					noValidate: true,
					className: "rounded-lg bg-card p-6 text-ink shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[1.05rem]",
							children: "Minta survey & penawaran"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 mb-4 text-sm text-muted",
							children: [
								"Isi singkat — tim ",
								COMPANY.short,
								" menghubungi Anda di hari kerja berikutnya."
							]
						}),
						success ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 rounded-xl border border-success-line bg-success-bg p-4 text-sm text-success",
							children: "Permintaan terkirim. Tim kami akan segera menghubungi Anda."
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadField, {
							id: "lName",
							name: "name",
							label: "Nama",
							error: errors.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadField, {
							id: "lPhone",
							name: "phone",
							label: "Nomor WhatsApp",
							error: errors.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "lType",
									className: "mb-1.5 block text-xs font-bold",
									children: "Jenis proyek"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "lType",
									name: "type",
									className: cn("w-full rounded-[10px] border-[1.5px] border-line bg-page px-3.5 py-3 text-sm", errors.type && "border-brand"),
									defaultValue: "",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										disabled: true,
										children: "Pilih…"
									}), PROJECT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: t
									}, t))]
								}),
								errors.type ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-brand",
									children: errors.type
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadField, {
							id: "lLoc",
							name: "loc",
							label: "Lokasi proyek",
							error: errors.loc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "block",
							children: "Kirim permintaan"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl grid-cols-2 px-5 py-8 text-center md:grid-cols-4 md:px-8",
				children: [
					["15+", "Tahun pengalaman"],
					["120+", "Proyek elektrikal"],
					["2", "Cabang"],
					["1×24 jam", "Respon hari kerja"]
				].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-extrabold tabular-nums text-navy-mid",
						children: n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: l
					})]
				}, l))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-6xl gap-5 px-5 py-14 md:grid-cols-2 md:px-8",
			children: TESTIMONIALS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
				className: "rounded-md border border-line bg-card p-5 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2.5 text-[0.95rem] italic",
					children: t.quote
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm font-bold",
					children: [t.author, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-xs font-medium text-muted",
						children: t.role
					})]
				})]
			}, t.author))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-5 pb-14 md:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Butuh dokumen tender?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/profil-perusahaan",
						className: "font-bold text-navy-bright",
						children: "Lihat & unduh company profile"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-bold text-navy-bright",
						children: "Lihat layanan & portofolio"
					})
				]
			})
		})
	] });
}
function LeadField({ id, name, label, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "mb-1.5 block text-xs font-bold",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				name,
				className: cn("w-full rounded-[10px] border-[1.5px] border-line bg-page px-3.5 py-3 text-sm", error && "border-brand")
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-brand",
				children: error
			}) : null
		]
	});
}
function CampaignRoute() {
	const [waHref, setWaHref] = (0, import_react.useState)(CAMPAIGN_WA);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignHeader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignPage, {
			waHref,
			setWaHref
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFloat, { href: waHref }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackLayer, {})
	] });
}
//#endregion
export { CampaignRoute as component };
