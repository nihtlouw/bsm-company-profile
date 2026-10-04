import { p as uid } from "./chrome-BxWKOGK8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/web-leads-DIWlxCqh.js
var WEB_LEADS_KEY = "bsm-inquiries";
function saveWebInquiry(data) {
	const item = {
		id: data.id ?? uid("lead"),
		at: data.at ?? Date.now(),
		name: data.name,
		email: data.email,
		phone: data.phone,
		company: data.company,
		message: data.message,
		type: data.type,
		loc: data.loc,
		source: data.source
	};
	try {
		const prev = readWebInquiries();
		localStorage.setItem(WEB_LEADS_KEY, JSON.stringify([...prev, item]));
	} catch {}
	return item;
}
function readWebInquiries() {
	try {
		const raw = localStorage.getItem(WEB_LEADS_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.map((row, i) => {
			const r = row;
			return {
				id: r.id ?? `legacy-${r.at ?? i}`,
				name: String(r.name ?? "Tanpa nama"),
				email: r.email,
				phone: r.phone,
				company: r.company,
				message: r.message,
				type: r.type,
				loc: r.loc,
				source: r.source === "campaign_lead" ? "campaign_lead" : "contact_form",
				at: Number(r.at ?? Date.now())
			};
		});
	} catch {
		return [];
	}
}
//#endregion
export { saveWebInquiry as n, readWebInquiries as t };
