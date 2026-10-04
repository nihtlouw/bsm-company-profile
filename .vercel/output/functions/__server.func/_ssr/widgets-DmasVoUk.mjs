import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./chrome-BxWKOGK8.mjs";
import { m as healthOf, n as HEALTH_LABEL } from "./shell-D-hx-lq9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/widgets-DmasVoUk.js
var import_jsx_runtime = require_jsx_runtime();
function HealthBadge({ points, health }) {
	const h = health ?? (points ? healthOf(points) : "belum");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold", {
			maju: "bg-success-bg text-success",
			"on-track": "bg-navy/10 text-navy-mid",
			terlambat: "bg-brand-soft text-brand-deep",
			selesai: "bg-line text-muted",
			belum: "bg-warn-bg text-warn"
		}[h]),
		children: HEALTH_LABEL[h]
	});
}
function SparkCurve({ points, className }) {
	const w = 168;
	const h = 52;
	const pad = 3;
	const x = (i) => pad + i / Math.max(1, points.length - 1) * 162;
	const y = (v) => 49 - v / 100 * 46;
	const planned = points.map((p, i) => `${x(i)},${y(p.planned)}`).join(" ");
	const actual = points.filter((p) => p.actual != null).map((p) => `${x(p.week - 1)},${y(p.actual ?? 0)}`).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: cn("w-full", className),
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			fill: "none",
			stroke: "var(--color-navy-soft)",
			strokeWidth: "1.6",
			points: planned
		}), actual ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			fill: "none",
			stroke: "var(--color-brand)",
			strokeWidth: "2.2",
			points: actual
		}) : null]
	});
}
function KpiCard({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-md border border-line bg-card p-5 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-2xl font-extrabold tabular-nums text-navy-mid",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
function StatusPill({ tone, children }) {
	const cls = {
		navy: "bg-navy/10 text-navy-mid",
		brand: "bg-brand-soft text-brand-deep",
		success: "bg-success-bg text-success",
		warn: "bg-warn-bg text-warn",
		mute: "bg-line text-muted"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold", cls),
		children
	});
}
//#endregion
export { StatusPill as i, KpiCard as n, SparkCurve as r, HealthBadge as t };
