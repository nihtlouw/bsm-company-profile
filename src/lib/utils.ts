import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function waLink(text: string, number = "6285697295500") {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function formatIdr(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatIdrShort(value: number) {
  if (value >= 1_000_000_000) {
    const n = value / 1_000_000_000;
    return `Rp ${n.toLocaleString("id-ID", { maximumFractionDigits: 1 })} M`;
  }
  if (value >= 1_000_000) {
    const n = value / 1_000_000;
    return `Rp ${n.toLocaleString("id-ID", { maximumFractionDigits: 0 })} jt`;
  }
  return formatIdr(value);
}

export function formatDate(ts: number) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(ts);
}

export function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
