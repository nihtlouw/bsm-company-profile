import { uid } from "@/lib/utils";

export const WEB_LEADS_KEY = "bsm-inquiries";

export type WebInquiry = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  type?: string;
  loc?: string;
  source: "contact_form" | "campaign_lead";
  at: number;
};

export function saveWebInquiry(
  data: Omit<WebInquiry, "id" | "at"> & { id?: string; at?: number },
) {
  const item: WebInquiry = {
    id: data.id ?? uid("lead"),
    at: data.at ?? Date.now(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    message: data.message,
    type: data.type,
    loc: data.loc,
    source: data.source,
  };
  try {
    const prev = readWebInquiries();
    localStorage.setItem(WEB_LEADS_KEY, JSON.stringify([...prev, item]));
  } catch {
    /* quota */
  }
  return item;
}

export function readWebInquiries(): WebInquiry[] {
  try {
    const raw = localStorage.getItem(WEB_LEADS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((row, i) => {
      const r = row as Partial<WebInquiry>;
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
        at: Number(r.at ?? Date.now()),
      };
    });
  } catch {
    return [];
  }
}
