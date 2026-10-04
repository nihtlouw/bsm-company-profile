import { jsPDF } from "jspdf";
import type { ErpClient, ErpProject, ErpQuote } from "@/lib/erp-store";
import { quoteAmount } from "@/lib/erp-store";
import {
  delayWeeks,
  forecastFinishWeek,
  HEALTH_LABEL,
  healthOf,
  lastActual,
  remainingPct,
  spiOf,
  velocityOf,
} from "@/lib/scurve";
import { COMPANY } from "@/lib/site-data";
import { formatDate, formatIdr } from "@/lib/utils";

const NAVY: [number, number, number] = [20, 23, 79];
const BRAND: [number, number, number] = [237, 29, 35];
const INK: [number, number, number] = [22, 33, 62];
const MUTED: [number, number, number] = [107, 114, 128];
const LINE: [number, number, number] = [230, 232, 240];

async function logoData(): Promise<string | null> {
  try {
    const res = await fetch("/logo-bsm.png");
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function header(doc: jsPDF, kicker: string) {
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, 210, 22, "F");
  doc.setFillColor(...BRAND);
  doc.rect(0, 22, 210, 2.2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(COMPANY.name, 14, 10);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(169, 180, 208);
  doc.text(kicker, 14, 16);
  doc.text("Palembang · Karawang", 196, 16, { align: "right" });
}

function footer(doc: jsPDF, page = 1, total = 1) {
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.3);
  doc.line(14, 284, 196, 284);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text(`${COMPANY.short}  ·  ${COMPANY.email}`, 14, 289);
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.text(`${page} / ${total}`, 196, 289, { align: "right" });
}

function saveBlob(doc: jsPDF, filename: string) {
  doc.save(filename);
}

export async function downloadQuotePdf(quote: ErpQuote, client: ErpClient | undefined) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const logo = await logoData();
  header(doc, "Penawaran pekerjaan elektrikal");
  if (logo) {
    try {
      doc.addImage(logo, "PNG", 168, 4, 28, 14);
    } catch {
      /* skip */
    }
  }

  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("PENAWARAN", 14, 36);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(`No. ${quote.id.toUpperCase()}`, 14, 42);

  const metaY = 50;
  doc.setFillColor(246, 247, 251);
  doc.roundedRect(14, metaY, 182, 28, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("KEPADA", 18, metaY + 7);
  doc.text("TANGGAL", 110, metaY + 7);
  doc.text("BERLAKU S.D.", 154, metaY + 7);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...NAVY);
  doc.text(client?.name ?? "Klien", 18, metaY + 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...INK);
  doc.text(`${client?.city ?? ""} · ${client?.contact ?? ""}`.trim(), 18, metaY + 20);
  doc.text(formatDate(quote.createdAt), 110, metaY + 14);
  doc.text(formatDate(quote.validUntil), 154, metaY + 14);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  doc.text(quote.title, 14, 88);

  const tableTop = 94;
  doc.setFillColor(...NAVY);
  doc.rect(14, tableTop, 182, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("Uraian", 18, tableTop + 5.4);
  doc.text("Qty", 118, tableTop + 5.4);
  doc.text("Satuan", 132, tableTop + 5.4);
  doc.text("Harga", 154, tableTop + 5.4);
  doc.text("Jumlah", 178, tableTop + 5.4, { align: "right" });

  let y = tableTop + 8;
  quote.items.forEach((item, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(246, 247, 251);
      doc.rect(14, y, 182, 9, "F");
    }
    doc.setTextColor(...INK);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(item.name, 18, y + 6);
    doc.text(String(item.qty), 118, y + 6);
    doc.text(item.unit, 132, y + 6);
    doc.text(formatIdr(item.price), 154, y + 6);
    doc.text(formatIdr(item.qty * item.price), 192, y + 6, { align: "right" });
    y += 9;
  });

  const total = quoteAmount(quote);
  y += 4;
  doc.setFillColor(...BRAND);
  doc.rect(130, y, 66, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("TOTAL", 134, y + 7.5);
  doc.text(formatIdr(total), 192, y + 7.5, { align: "right" });

  y += 22;
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Catatan", 14, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...INK);
  const notes = [
    "Harga belum termasuk PPN kecuali disebutkan.",
    "Pekerjaan mengacu PUIL/SNI, termasuk FAT dan commissioning sesuai lingkup.",
    "Penawaran ini dapat berubah setelah survey lapangan.",
    `Konfirmasi ke ${COMPANY.email} atau ${COMPANY.phoneDisplay}.`,
  ];
  notes.forEach((line, i) => {
    doc.text(`- ${line}`, 14, y + 6 + i * 5);
  });

  footer(doc);
  saveBlob(doc, `Penawaran-${quote.id}.pdf`);
}

export async function downloadScurvePdf(project: ErpProject, client: ErpClient | undefined) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const logo = await logoData();
  header(doc, "Laporan kurva S");
  if (logo) {
    try {
      doc.addImage(logo, "PNG", 168, 4, 28, 14);
    } catch {
      /* skip */
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...NAVY);
  doc.text(project.name, 14, 36);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(
    `${client?.name ?? "Klien"} · ${project.location} · ${formatIdr(project.contractValue)}`,
    14,
    42,
  );

  const last = lastActual(project.weeks);
  const spi = spiOf(project.weeks);
  const finish = forecastFinishWeek(project.weeks);
  const delay = delayWeeks(project.weeks);
  const health = HEALTH_LABEL[healthOf(project.weeks)];
  const cards: [string, string][] = [
    ["Status kurva", health],
    ["SPI", spi != null ? String(spi) : "—"],
    ["Aktual / rencana", `${last?.actual ?? 0}% / ${last?.planned ?? 0}%`],
    ["Sisa", `${remainingPct(project.weeks)}%`],
    ["Kecepatan", velocityOf(project.weeks) != null ? `${velocityOf(project.weeks)} pt/minggu` : "—"],
    [
      "Ramalan selesai",
      finish == null
        ? "—"
        : `M${finish}${delay != null && delay > 0.2 ? ` · telat ${delay} mg` : delay != null && delay < -0.2 ? ` · maju ${Math.abs(delay)} mg` : ""}`,
    ],
  ];
  cards.forEach((card, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 14 + col * 62;
    const y = 48 + row * 22;
    doc.setFillColor(246, 247, 251);
    doc.roundedRect(x, y, 58, 19, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text(card[0].toUpperCase(), x + 4, y + 6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...NAVY);
    doc.text(card[1], x + 4, y + 13);
  });

  const plotX = 24;
  const plotY = 102;
  const plotW = 166;
  const plotH = 62;
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.3);
  for (let i = 0; i <= 4; i++) {
    const gy = plotY + plotH - (plotH * i) / 4;
    doc.line(plotX, gy, plotX + plotW, gy);
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text(`${i * 25}%`, plotX - 3, gy + 1, { align: "right" });
  }

  const pts = project.weeks;
  const n = Math.max(1, pts.length - 1);
  const xAt = (week: number) => plotX + ((week - 1) / n) * plotW;
  const yAt = (pct: number) => plotY + plotH - (pct / 100) * plotH;

  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.7);
  pts.forEach((p, i) => {
    if (i === 0) return;
    doc.line(xAt(pts[i - 1].week), yAt(pts[i - 1].planned), xAt(p.week), yAt(p.planned));
  });
  doc.setDrawColor(...BRAND);
  doc.setLineWidth(0.9);
  const logged = pts.filter((p) => p.actual != null);
  logged.forEach((p, i) => {
    if (i === 0) return;
    const prev = logged[i - 1];
    if (prev.actual == null || p.actual == null) return;
    doc.line(xAt(prev.week), yAt(prev.actual), xAt(p.week), yAt(p.actual));
  });
  logged.forEach((p) => {
    if (p.actual == null) return;
    doc.setFillColor(...BRAND);
    doc.circle(xAt(p.week), yAt(p.actual), 0.9, "F");
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text("M1", plotX, plotY + plotH + 5);
  doc.text(`M${pts.length}`, plotX + plotW, plotY + plotH + 5, { align: "right" });
  doc.setFillColor(...NAVY);
  doc.rect(14, plotY + plotH + 9, 4, 4, "F");
  doc.setTextColor(...INK);
  doc.text("Rencana", 20, plotY + plotH + 12);
  doc.setFillColor(...BRAND);
  doc.rect(42, plotY + plotH + 9, 4, 4, "F");
  doc.text("Aktual", 48, plotY + plotH + 12);

  const tableY = plotY + plotH + 20;
  doc.setFillColor(...NAVY);
  doc.rect(14, tableY, 182, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("Minggu", 18, tableY + 5.4);
  doc.text("Rencana", 50, tableY + 5.4);
  doc.text("Aktual", 90, tableY + 5.4);
  doc.text("Deviasi", 130, tableY + 5.4);

  let y = tableY + 8;
  const shown = pts.slice(0, 16);
  shown.forEach((p, i) => {
    if (y > 270) return;
    if (i % 2 === 0) {
      doc.setFillColor(246, 247, 251);
      doc.rect(14, y, 182, 7, "F");
    }
    doc.setTextColor(...INK);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(`M${p.week}`, 18, y + 5);
    doc.text(`${p.planned}%`, 50, y + 5);
    doc.text(p.actual == null ? "—" : `${p.actual}%`, 90, y + 5);
    doc.text(p.actual == null ? "—" : `${(p.actual - p.planned).toFixed(1)} pt`, 130, y + 5);
    y += 7;
  });

  if (project.notes) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    const lines = doc.splitTextToSize(project.notes, 182);
    doc.text(lines, 14, Math.min(y + 8, 278));
  }

  footer(doc);
  saveBlob(doc, `Kurva-S-${project.id}.pdf`);
}
