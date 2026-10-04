#!/usr/bin/env python3
"""Company Profile PDF — PT Berjaya Sukses Makmur (8 halaman A4)."""

from __future__ import annotations

import math
import os
from io import BytesIO

from PIL import Image
from reportlab.lib.colors import Color, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

PAGE_W, PAGE_H = A4
NAVY = Color(0x14 / 255, 0x17 / 255, 0x4F / 255)
NAVY_MID = Color(0x1D / 255, 0x21 / 255, 0x70 / 255)
NAVY_SOFT = Color(0x2E / 255, 0x31 / 255, 0x92 / 255)
BRAND = Color(0xED / 255, 0x1D / 255, 0x23 / 255)
BRAND_SOFT = Color(0xFD / 255, 0xEA / 255, 0xEA / 255)
INK = Color(0x16 / 255, 0x21 / 255, 0x3E / 255)
MUTED = Color(0x6B / 255, 0x72 / 255, 0x80 / 255)
LINE = Color(0xE6 / 255, 0xE8 / 255, 0xF0 / 255)
PAGE_BG = Color(0xF6 / 255, 0xF7 / 255, 0xFB / 255)
ON_NAVY = Color(0xEE / 255, 0xF1 / 255, 0xFA / 255)
ON_MUTED = Color(0xA9 / 255, 0xB4 / 255, 0xD0 / 255)

ROOT = "/workspace"
IMG = f"{ROOT}/public/images"
LOGO = f"{ROOT}/public/logo-bsm.png"
OUT_PDF = f"{ROOT}/public/company-profile.pdf"
OUT_ART = f"{ROOT}/artifacts/Company-Profile-PT-Berjaya-Sukses-Makmur.pdf"
PREV_DIR = f"{ROOT}/public/images/profile"
ART_PREV = f"{ROOT}/artifacts"

MARGIN = 16 * mm
GUTTER = 6 * mm
TOTAL = 8
FONT = "CP"
FONT_B = "CP-Bold"
FONT_I = "CP-Italic"

pdfmetrics.registerFont(TTFont(FONT, "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont(FONT_B, "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont(FONT_I, "/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf"))


def cover_crop(src: str, w_pt: float, h_pt: float, scale: int = 2) -> ImageReader:
    im = Image.open(src).convert("RGB")
    tw, th = max(8, int(w_pt * scale)), max(8, int(h_pt * scale))
    ratio = max(tw / im.width, th / im.height)
    nw, nh = max(tw, int(im.width * ratio)), max(th, int(im.height * ratio))
    im = im.resize((nw, nh), Image.LANCZOS)
    left, top = (nw - tw) // 2, (nh - th) // 2
    im = im.crop((left, top, left + tw, top + th))
    buf = BytesIO()
    im.save(buf, "JPEG", quality=88, optimize=True)
    buf.seek(0)
    return ImageReader(buf)


def wrap_text(c: canvas.Canvas, text: str, font: str, size: float, max_w: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for w in words:
        trial = (cur + " " + w).strip()
        if c.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines or [""]


def draw_para(c, text, x, y, max_w, font=FONT, size=9.5, leading=13, color=INK) -> float:
    c.setFillColor(color)
    for line in wrap_text(c, text, font, size, max_w):
        c.setFont(font, size)
        c.drawString(x, y, line)
        y -= leading
    return y


def round_rect(c, x, y, w, h, r, fill=None, stroke=None, sw=0.8):
    if fill is not None:
        c.setFillColor(fill)
    if stroke is not None:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.roundRect(x, y, w, h, r, fill=1 if fill is not None else 0, stroke=1 if stroke is not None else 0)


def clipped_image(c, reader, x, y, w, h, r=6):
    c.saveState()
    p = c.beginPath()
    p.roundRect(x, y, w, h, r)
    c.clipPath(p, stroke=0, fill=0)
    c.drawImage(reader, x, y, width=w, height=h, mask="auto")
    c.restoreState()


def footer(c, page_no: int):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(MARGIN, 13 * mm, PAGE_W - MARGIN, 13 * mm)
    c.setFillColor(MUTED)
    c.setFont(FONT, 7.5)
    c.drawString(MARGIN, 7.5 * mm, "PT Berjaya Sukses Makmur  ·  Company Profile 2026")
    c.setFillColor(NAVY)
    c.setFont(FONT_B, 8)
    c.drawRightString(PAGE_W - MARGIN, 7.5 * mm, f"{page_no} / {TOTAL}")


def chrome(c, kicker: str):
    c.setFillColor(PAGE_BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.rect(0, PAGE_H - 16 * mm, PAGE_W, 16 * mm, fill=1, stroke=0)
    c.setFillColor(BRAND)
    c.rect(0, PAGE_H - 16 * mm - 2.2 * mm, PAGE_W, 2.2 * mm, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont(FONT_B, 9)
    c.drawString(MARGIN, PAGE_H - 10.4 * mm, "PT BERJAYA SUKSES MAKMUR")
    c.setFont(FONT, 8)
    c.setFillColor(ON_MUTED)
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 10.4 * mm, kicker)


def section_title(c, y, title, subtitle=None) -> float:
    c.setFillColor(NAVY)
    c.setFont(FONT_B, 15)
    c.drawString(MARGIN, y, title)
    c.setStrokeColor(BRAND)
    c.setLineWidth(2.4)
    c.line(MARGIN, y - 4, MARGIN + 32, y - 4)
    if subtitle:
        c.setFillColor(MUTED)
        c.setFont(FONT, 8.5)
        c.drawString(MARGIN, y - 16, subtitle)
        return y - 28
    return y - 16


def bookmark(c, key: str, title: str):
    c.bookmarkPage(key)
    c.addOutlineEntry(title, key, 0, closed=0)


# ─── PAGE 1 COVER ────────────────────────────────────────────
def page_cover(c):
    c.setFillColor(NAVY)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(BRAND)
    c.rect(0, PAGE_H - 6 * mm, PAGE_W, 6 * mm, fill=1, stroke=0)

    photo_w = PAGE_W * 0.42
    photo_x = PAGE_W - photo_w
    reader = cover_crop(f"{IMG}/gallery-switchgear.jpg", photo_w, PAGE_H)
    c.drawImage(reader, photo_x, 0, width=photo_w, height=PAGE_H, mask="auto")
    # left fade so photo meets navy
    c.setFillColor(NAVY)
    c.rect(photo_x - 1, 0, 8, PAGE_H, fill=1, stroke=0)
    c.setFillColor(Color(0, 0, 0, alpha=0.28))
    c.rect(photo_x, 0, photo_w, 42 * mm, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont(FONT_B, 8)
    c.drawString(photo_x + 10 * mm, 18 * mm, "Switchgear · fasilitas industri")
    c.setFont(FONT, 8)
    c.setFillColor(ON_MUTED)
    c.drawString(photo_x + 10 * mm, 12 * mm, "Palembang  ·  Karawang")

    # logo plate
    plate_w, plate_h = 46 * mm, 24 * mm
    round_rect(c, MARGIN, PAGE_H - 38 * mm, plate_w, plate_h, 4, fill=white)
    try:
        c.drawImage(
            LOGO,
            MARGIN + 4,
            PAGE_H - 36 * mm,
            width=plate_w - 8,
            height=plate_h - 8,
            mask="auto",
            preserveAspectRatio=True,
            anchor="c",
        )
    except Exception:
        pass

    left_w = photo_x - MARGIN - 10 * mm
    c.setFillColor(white)
    c.setFont(FONT_B, 13)
    c.drawString(MARGIN, PAGE_H - 52 * mm, "PT BERJAYA SUKSES MAKMUR")
    c.setFont(FONT, 9.5)
    c.setFillColor(ON_MUTED)
    c.drawString(MARGIN, PAGE_H - 59 * mm, "General Contractor & Supplier")

    c.setStrokeColor(BRAND)
    c.setLineWidth(3)
    c.line(MARGIN, PAGE_H - 66 * mm, MARGIN + 48 * mm, PAGE_H - 66 * mm)

    c.setFillColor(white)
    c.setFont(FONT_B, 26)
    y = PAGE_H - 86 * mm
    c.drawString(MARGIN, y, "COMPANY")
    c.drawString(MARGIN, y - 30, "PROFILE")
    c.setFont(FONT, 11)
    c.setFillColor(ON_MUTED)
    c.drawString(MARGIN, y - 48, "Electrical Engineering & Installation")
    c.setFillColor(BRAND)
    c.setFont(FONT_B, 10)
    c.drawString(MARGIN, y - 62, "Edisi 2026")

    box_h = 36 * mm
    box_y = 58 * mm
    round_rect(c, MARGIN, box_y, left_w, box_h, 6, fill=NAVY_MID)
    c.setFillColor(white)
    c.setFont(FONT_B, 9)
    c.drawString(MARGIN + 8 * mm, box_y + box_h - 11 * mm, "Sejak 2010")
    blurb = (
        "Kontraktor elektrikal untuk rumah sakit, pabrik, dan gedung komersial. "
        "Panel, tray, grounding, hingga commissioning — satu tim, satu tanggung jawab."
    )
    draw_para(
        c, blurb, MARGIN + 8 * mm, box_y + box_h - 20 * mm, left_w - 16 * mm,
        font=FONT, size=8.2, leading=11.2, color=ON_NAVY,
    )

    stats = [("15+", "Tahun"), ("120+", "Proyek"), ("2", "Cabang"), ("98%", "Tepat waktu")]
    sw = (left_w - 18) / 4
    sy = 22 * mm
    for i, (num, lab) in enumerate(stats):
        x = MARGIN + i * (sw + 6)
        c.setFillColor(BRAND)
        c.setFont(FONT_B, 16)
        c.drawString(x, sy + 8, num)
        c.setFillColor(ON_MUTED)
        c.setFont(FONT, 7.5)
        c.drawString(x, sy, lab)

    bookmark(c, "cover", "Sampul")
    c.showPage()


# ─── PAGE 2 ABOUT ────────────────────────────────────────────
def page_about(c):
    chrome(c, "Tentang perusahaan")
    y = PAGE_H - 34 * mm
    y = section_title(c, y, "Tentang Perusahaan", "Profil singkat, visi, dan misi operasional")

    about = (
        "PT Berjaya Sukses Makmur adalah general contractor & supplier yang berfokus pada "
        "electrical engineering dan installation. Sejak 2010 perusahaan menangani instalasi "
        "kelistrikan untuk fasilitas kesehatan, pabrik, dan gedung komersial dari dua cabang: "
        "Palembang dan Karawang."
    )
    y = draw_para(c, about, MARGIN, y, PAGE_W - 2 * MARGIN, size=10, leading=14)
    y -= 6
    about2 = (
        "Lingkup kerja mencakup panel distribusi, Motor Control Center (MCC), grounding & "
        "proteksi petir, penerangan, hingga commissioning dan maintenance — dikoordinasikan "
        "dengan tim MEP agar serah terima rapi, terdokumentasi, dan sesuai PUIL/SNI."
    )
    y = draw_para(c, about2, MARGIN, y, PAGE_W - 2 * MARGIN, size=10, leading=14, color=MUTED)

    y -= 12
    facts = [
        ("Berdiri", "2010"),
        ("Cabang", "Palembang &\nKarawang"),
        ("Fokus", "Electrical\nengineering"),
        ("Segmen", "RS, pabrik,\ngedung"),
    ]
    card_w = (PAGE_W - 2 * MARGIN - 18) / 4
    card_h = 30 * mm
    for i, (lab, val) in enumerate(facts):
        x = MARGIN + i * (card_w + 6)
        round_rect(c, x, y - card_h, card_w, card_h, 5, fill=white, stroke=LINE)
        c.setFillColor(BRAND)
        c.rect(x, y - 3.2, card_w, 3.2, fill=1, stroke=0)
        c.setFillColor(MUTED)
        c.setFont(FONT, 7)
        c.drawString(x + 7, y - 11, lab.upper())
        c.setFillColor(NAVY)
        c.setFont(FONT_B, 9.5)
        for j, line in enumerate(val.split("\n")):
            c.drawString(x + 7, y - 23 - j * 11, line)

    y = y - card_h - 16
    y = section_title(c, y, "Visi")
    visi_h = 28 * mm
    round_rect(c, MARGIN, y - visi_h, PAGE_W - 2 * MARGIN, visi_h, 6, fill=NAVY)
    visi = (
        "Menjadi kontraktor elektrikal terpercaya di Sumatera dan Jawa Barat untuk fasilitas "
        "kritis — rumah sakit, industri, dan gedung komersial — dengan standar keselamatan "
        "dan ketepatan waktu yang konsisten."
    )
    draw_para(
        c, visi, MARGIN + 8 * mm, y - 10 * mm, PAGE_W - 2 * MARGIN - 16 * mm,
        size=9.5, leading=13, color=white,
    )

    y = y - visi_h - 16
    y = section_title(c, y, "Misi")
    misi = [
        ("01", "Instalasi sesuai PUIL/SNI dengan dokumentasi as-built lengkap."),
        ("02", "Mengutamakan K3 lapangan dan koordinasi multipihak (MEP, owner, konsultan)."),
        ("03", "Commissioning, uji beban, dan dukungan purna jual yang andal."),
        ("04", "Kemitraan jangka panjang dengan fasilitas kesehatan dan industri."),
    ]
    mw = (PAGE_W - 2 * MARGIN - GUTTER) / 2
    mh = 24 * mm
    for i, (num, text) in enumerate(misi):
        col, row = i % 2, i // 2
        x = MARGIN + col * (mw + GUTTER)
        cy = y - row * (mh + 5)
        round_rect(c, x, cy - mh, mw, mh, 5, fill=white, stroke=LINE)
        round_rect(c, x + 6, cy - mh + 7, 11 * mm, 11 * mm, 3, fill=BRAND_SOFT)
        c.setFillColor(BRAND)
        c.setFont(FONT_B, 9)
        c.drawCentredString(x + 6 + 5.5 * mm, cy - mh + 11, num)
        draw_para(c, text, x + 20 * mm, cy - 10, mw - 24 * mm, size=8.4, leading=11.2)

    footer(c, 2)
    bookmark(c, "about", "Tentang perusahaan")
    c.showPage()


# ─── PAGE 3 SERVICES ─────────────────────────────────────────
def page_services(c):
    chrome(c, "Layanan")
    y = PAGE_H - 34 * mm
    y = section_title(
        c, y, "Layanan Utama",
        "Pekerjaan elektrikal dari desain hingga serah terima — satu tim, satu tanggung jawab.",
    )

    services = [
        ("01", "Instalasi Listrik Gedung",
         "Jaringan daya, penerangan, dan tray kabel sesuai SNI.",
         "Perancangan dan pemasangan untuk rumah sakit, pabrik, dan gedung komersial — dari tray hingga titik beban, lengkap as-built."),
        ("02", "Panel Distribusi & MCC",
         "Panel utama, sub-distribusi, dan motor control center.",
         "Fabrikasi dan instalasi MDP, SDP, dan MCC termasuk busbar, proteksi, labeling, dan uji FAT sebelum commissioning."),
        ("03", "Grounding & Proteksi Petir",
         "Pentanahan dan proteksi untuk fasilitas kritis.",
         "Elektroda, ikatan ekipotensial, dan proteksi surja agar peralatan medis dan produksi terlindungi dari gangguan."),
        ("04", "Commissioning & Maintenance",
         "FAT, uji beban, serah terima, dan perawatan berkala.",
         "Pengujian proteksi dan cadangan daya, dokumen facility team, plus program maintenance termasuk termografi."),
    ]
    cw = (PAGE_W - 2 * MARGIN - GUTTER) / 2
    ch = 52 * mm
    for i, (num, title, sub, detail) in enumerate(services):
        col, row = i % 2, i // 2
        x = MARGIN + col * (cw + GUTTER)
        cy = y - row * (ch + 7)
        round_rect(c, x, cy - ch, cw, ch, 6, fill=white, stroke=LINE)
        round_rect(c, x + 8, cy - 18, 14 * mm, 12 * mm, 3, fill=BRAND_SOFT)
        c.setFillColor(BRAND)
        c.setFont(FONT_B, 10)
        c.drawCentredString(x + 8 + 7 * mm, cy - 14, num)
        c.setFillColor(NAVY)
        c.setFont(FONT_B, 11)
        c.drawString(x + 26 * mm, cy - 13, title)
        c.setFillColor(MUTED)
        c.setFont(FONT, 8)
        c.drawString(x + 26 * mm, cy - 24, sub)
        draw_para(c, detail, x + 8, cy - 38, cw - 16, size=8.4, leading=11.4)

    y = y - 2 * (ch + 7) - 12
    y = section_title(c, y, "Standar & pendekatan kerja")
    bullets = [
        "Acuan desain dan instalasi: PUIL / SNI terkait kelistrikan bangunan dan industri.",
        "FAT (Factory Acceptance Test) untuk panel sebelum pengiriman ke lokasi.",
        "Commissioning & uji beban sebelum serah terima formal kepada owner.",
        "Dokumentasi as-built dan koordinasi dengan disiplin MEP lain.",
        "Penerapan SMK3 di lapangan untuk pekerjaan berisiko listrik.",
    ]
    box_h = 52 * mm
    round_rect(c, MARGIN, y - box_h, PAGE_W - 2 * MARGIN, box_h, 6, fill=white, stroke=LINE)
    yy = y - 10
    for b in bullets:
        c.setFillColor(BRAND)
        c.circle(MARGIN + 10, yy + 2.4, 2.1, fill=1, stroke=0)
        yy = draw_para(c, b, MARGIN + 16, yy, PAGE_W - 2 * MARGIN - 22, size=8.6, leading=11)
        yy -= 3.5

    footer(c, 3)
    bookmark(c, "layanan", "Layanan")
    c.showPage()


# ─── PAGE 4 WORKFLOW + S-CURVE ────────────────────────────────
def logistic(t, mid=0.48, k=10):
    sig = lambda x: 1 / (1 + math.exp(-k * (x - mid)))
    a, b = sig(0.0), sig(1.0)
    t = min(1.0, max(0.0, t))
    return ((sig(t) - a) / (b - a)) * 100


def page_workflow(c):
    chrome(c, "Cara kerja")
    y = PAGE_H - 34 * mm
    y = section_title(
        c, y, "Alur kerja proyek",
        "Dari brief hingga serah terima — empat tahap yang bisa dilacak.",
    )

    steps = [
        ("01", "Brief & survey", "Kirim lokasi dan jenis fasilitas. Survey lapangan tanpa biaya untuk instalasi baru."),
        ("02", "Desain & penawaran", "Skema distribusi, material, dan jadwal disusun sesuai PUIL/SNI."),
        ("03", "Instalasi", "Panel, tray, grounding, dan penerangan dikerjakan satu tim dengan K3 lapangan."),
        ("04", "Commissioning", "FAT, uji beban, dan dokumen as-built sebelum serah terima."),
    ]
    sw = (PAGE_W - 2 * MARGIN - 18) / 4
    sh = 48 * mm
    for i, (num, title, body) in enumerate(steps):
        x = MARGIN + i * (sw + 6)
        round_rect(c, x, y - sh, sw, sh, 5, fill=white, stroke=LINE)
        c.setFillColor(BRAND)
        c.setFont(FONT_B, 12)
        c.drawString(x + 7, y - 12, num)
        c.setFillColor(NAVY)
        c.setFont(FONT_B, 8.5)
        c.drawString(x + 7, y - 24, title)
        draw_para(c, body, x + 7, y - 36, sw - 14, size=7.6, leading=10.2)
        if i < 3:
            c.setFillColor(BRAND)
            c.setFont(FONT_B, 12)
            c.drawCentredString(x + sw + 3, y - sh / 2, "›")

    y = y - sh - 16
    y = section_title(
        c, y, "Kendali progres — Kurva S",
        "Rencana vs aktual kumulatif per minggu. SPI < 0,95 = di belakang kurva.",
    )

    chart_h = 62 * mm
    chart_w = PAGE_W - 2 * MARGIN
    round_rect(c, MARGIN, y - chart_h, chart_w, chart_h, 6, fill=white, stroke=LINE)

    plot_x = MARGIN + 14 * mm
    plot_y = y - chart_h + 10 * mm
    plot_w = chart_w - 28 * mm
    plot_h = chart_h - 22 * mm
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    for i in range(5):
        gy = plot_y + plot_h * i / 4
        c.line(plot_x, gy, plot_x + plot_w, gy)
        c.setFillColor(MUTED)
        c.setFont(FONT, 6.5)
        c.drawRightString(plot_x - 3, gy - 2, f"{i * 25}%")

    n = 16
    planned = []
    actual = []
    for i in range(n):
        t = (i + 1) / n
        px = plot_x + plot_w * i / (n - 1)
        py = plot_y + plot_h * (logistic(t) / 100)
        planned.append((px, py))
        if i < 11:
            actual.append((px, plot_y + plot_h * (logistic((i + 1 - 1.2) / n) / 100)))

    c.setStrokeColor(NAVY_SOFT)
    c.setLineWidth(1.8)
    pth = c.beginPath()
    pth.moveTo(*planned[0])
    for pt in planned[1:]:
        pth.lineTo(*pt)
    c.drawPath(pth, stroke=1, fill=0)

    c.setStrokeColor(BRAND)
    c.setLineWidth(2.2)
    pth = c.beginPath()
    pth.moveTo(*actual[0])
    for pt in actual[1:]:
        pth.lineTo(*pt)
    c.drawPath(pth, stroke=1, fill=0)
    c.setFillColor(BRAND)
    c.circle(actual[-1][0], actual[-1][1], 2.4, fill=1, stroke=0)

    c.setFillColor(NAVY)
    c.setFont(FONT, 7)
    c.drawString(plot_x, y - chart_h + 4 * mm, "Minggu 1")
    c.drawRightString(plot_x + plot_w, y - chart_h + 4 * mm, "Minggu 16")
    lx = plot_x + 6
    ly = plot_y + plot_h - 11
    c.setFillColor(NAVY_SOFT)
    c.rect(lx, ly, 7, 7, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont(FONT, 7)
    c.drawString(lx + 10, ly + 1, "Rencana")
    c.setFillColor(BRAND)
    c.rect(lx + 38 * mm, ly, 7, 7, fill=1, stroke=0)
    c.setFillColor(INK)
    c.drawString(lx + 38 * mm + 10, ly + 1, "Aktual")

    y = y - chart_h - 14
    y = section_title(c, y, "Mengapa memilih kami")
    reasons = [
        ("Fasilitas kritis", "Fokus rumah sakit dan industri sejak 2010 — cadangan daya dan keandalan bukan afterthought."),
        ("Serah terima terukur", "FAT, uji beban, dan kurva S mingguan agar owner melihat progres, bukan janji."),
        ("Dua cabang", "Palembang dan Karawang menjangkau proyek Sumatera Selatan dan Jawa Barat."),
        ("Dokumen lengkap", "As-built, laporan uji, dan koordinasi MEP yang memudahkan audit facility team."),
    ]
    rw = (PAGE_W - 2 * MARGIN - GUTTER) / 2
    rh = 26 * mm
    for i, (title, body) in enumerate(reasons):
        col, row = i % 2, i // 2
        x = MARGIN + col * (rw + GUTTER)
        cy = y - row * (rh + 5)
        round_rect(c, x, cy - rh, rw, rh, 5, fill=white, stroke=LINE)
        c.setFillColor(BRAND)
        c.rect(x, cy - rh, 3, rh, fill=1, stroke=0)
        c.setFillColor(NAVY)
        c.setFont(FONT_B, 9)
        c.drawString(x + 10, cy - 10, title)
        draw_para(c, body, x + 10, cy - 20, rw - 16, size=7.8, leading=10.4, color=MUTED)

    footer(c, 4)
    bookmark(c, "cara-kerja", "Cara kerja & kurva S")
    c.showPage()


# ─── PAGE 5 PORTFOLIO A ──────────────────────────────────────
PROJECTS = [
    ("rspad", "RSPAD", "Rumah Sakit", "Panel distribusi rumah sakit",
     "Unit rawat inap baru membutuhkan panel distribusi andal dengan cadangan daya untuk ruang kritis.",
     "Panel distribusi utama + daya darurat area intensif. Commissioning tepat waktu, lolos uji beban penuh.",
     f"{IMG}/project-rspad.jpg"),
    ("factory", "Factory — Manufaktur", "Pabrik", "Instalasi pabrik manufaktur",
     "Lini produksi baru membutuhkan jaringan listrik dan grounding sesuai standar sebelum operasi.",
     "Instalasi kabel, MCC, dan FAT sebelum commissioning. Produksi berjalan sesuai jadwal tanpa insiden.",
     f"{IMG}/project-factory.jpg"),
    ("commercial", "Commercial Building", "Gedung", "Gedung perkantoran 12 lantai",
     "Distribusi listrik per lantai yang terkoordinasi dengan tim MEP lain.",
     "Panel distribusi tiap lantai + penerangan terintegrasi. Serah terima tepat waktu.",
     f"{IMG}/project-commercial.jpg"),
    ("puskesmas", "Puskesmas Kecamatan", "Rumah Sakit", "Instalasi fasilitas kesehatan",
     "Sistem kelistrikan andal untuk peralatan medis dasar di tingkat kecamatan.",
     "Instalasi, pencahayaan darurat, dan grounding. Operasional stabil sejak commissioning.",
     f"{IMG}/project-puskesmas.jpg"),
    ("elektronik", "Pabrik Elektronik", "Pabrik", "Panel & grounding area produksi",
     "Area produksi sensitif gangguan listrik membutuhkan panel kontrol presisi.",
     "Panel PLC + grounding anti-noise. Gangguan produksi akibat noise listrik menurun signifikan.",
     f"{IMG}/project-elektronik.jpg"),
]


def project_card(c, x, y, w, h, proj):
    _, title, cat, sub, latar, hasil, img = proj
    round_rect(c, x, y, w, h, 6, fill=white, stroke=LINE)
    img_w = 48 * mm
    img_h = h - 10
    reader = cover_crop(img, img_w, img_h)
    clipped_image(c, reader, x + 5, y + 5, img_w, img_h, 4)
    tx = x + img_w + 12
    tw = w - img_w - 18
    c.setFillColor(BRAND_SOFT)
    chip_w = c.stringWidth(cat, FONT_B, 7) + 10
    round_rect(c, tx, y + h - 16, chip_w, 9, 2, fill=BRAND_SOFT)
    c.setFillColor(BRAND)
    c.setFont(FONT_B, 7)
    c.drawString(tx + 5, y + h - 13.5, cat)
    c.setFillColor(NAVY)
    c.setFont(FONT_B, 11)
    c.drawString(tx, y + h - 28, title)
    c.setFillColor(MUTED)
    c.setFont(FONT, 8)
    c.drawString(tx, y + h - 38, sub)
    c.setFillColor(MUTED)
    c.setFont(FONT_B, 7)
    c.drawString(tx, y + h - 50, "LATAR")
    ny = draw_para(c, latar, tx, y + h - 60, tw, size=7.8, leading=10.2)
    c.setFillColor(MUTED)
    c.setFont(FONT_B, 7)
    c.drawString(tx, ny - 6, "HASIL")
    draw_para(c, hasil, tx, ny - 16, tw, size=7.8, leading=10.2)


def page_portfolio_a(c):
    chrome(c, "Portofolio")
    y = PAGE_H - 34 * mm
    y = section_title(
        c, y, "Portofolio proyek terpilih",
        "Studi kasus fasilitas kesehatan, pabrik, dan gedung komersial.",
    )
    ch = 58 * mm
    for proj in PROJECTS[:3]:
        project_card(c, MARGIN, y - ch, PAGE_W - 2 * MARGIN, ch, proj)
        y -= ch + 6
    footer(c, 5)
    bookmark(c, "portofolio", "Portofolio")
    c.showPage()


def page_portfolio_b(c):
    chrome(c, "Portofolio & galeri")
    y = PAGE_H - 34 * mm
    y = section_title(c, y, "Portofolio — lanjutan")
    ch = 58 * mm
    for proj in PROJECTS[3:]:
        project_card(c, MARGIN, y - ch, PAGE_W - 2 * MARGIN, ch, proj)
        y -= ch + 6

    y -= 6
    y = section_title(c, y, "Galeri lapangan", "Cuplikan pekerjaan panel, tray, dan switchgear.")
    gallery = [
        (f"{IMG}/gallery-busbar.jpg", "Busbar panel utama"),
        (f"{IMG}/gallery-tray.jpg", "Tray kabel produksi"),
        (f"{IMG}/gallery-panel.jpg", "Wiring panel distribusi"),
        (f"{IMG}/gallery-lighting.jpg", "Penerangan gedung"),
    ]
    gw = (PAGE_W - 2 * MARGIN - 18) / 4
    gh = 52 * mm
    for i, (path, cap) in enumerate(gallery):
        x = MARGIN + i * (gw + 6)
        reader = cover_crop(path, gw, gh)
        clipped_image(c, reader, x, y - gh, gw, gh, 4)
        c.setFillColor(NAVY)
        c.setFont(FONT, 7)
        c.drawString(x, y - gh - 10, cap)

    footer(c, 6)
    bookmark(c, "galeri", "Galeri")
    c.showPage()


# ─── PAGE 7 LEGAL + CLIENTS ──────────────────────────────────
def page_legal(c):
    chrome(c, "Legalitas & klien")
    y = PAGE_H - 34 * mm
    y = section_title(
        c, y, "Legalitas",
        "Dokumen perusahaan siap diverifikasi untuk tender dan onboarding vendor.",
    )
    certs = [
        ("NIB", "Nomor Induk Berusaha — legalitas operasional perusahaan."),
        ("SBU Konstruksi", "Sertifikat Badan Usaha untuk pekerjaan jasa konstruksi elektrikal."),
        ("SIUJK", "Izin Usaha Jasa Konstruksi sesuai kualifikasi bidang elektrikal."),
        ("SMK3", "Sistem Manajemen Keselamatan dan Kesehatan Kerja di lapangan."),
    ]
    cw = (PAGE_W - 2 * MARGIN - GUTTER) / 2
    ch = 24 * mm
    for i, (name, desc) in enumerate(certs):
        col, row = i % 2, i // 2
        x = MARGIN + col * (cw + GUTTER)
        cy = y - row * (ch + 6)
        round_rect(c, x, cy - ch, cw, ch, 5, fill=white, stroke=LINE)
        c.setFillColor(BRAND)
        c.rect(x, cy - ch, 3.2, ch, fill=1, stroke=0)
        c.setFillColor(NAVY)
        c.setFont(FONT_B, 10)
        c.drawString(x + 12, cy - 11, name)
        draw_para(c, desc, x + 12, cy - 22, cw - 20, size=8, leading=10.5, color=MUTED)

    y = y - 2 * (ch + 6) - 14
    y = section_title(c, y, "Klien & mitra")
    clients = [
        "RSPAD Gatot Soebroto",
        "RSUD Palembang",
        "KIIC Karawang",
        "Pabrik Elektronik Cikarang",
        "Developer Perkantoran",
    ]
    cx, cy = MARGIN, y
    for name in clients:
        tw = c.stringWidth(name, FONT_B, 8.5) + 16
        if cx + tw > PAGE_W - MARGIN:
            cx = MARGIN
            cy -= 13 * mm
        round_rect(c, cx, cy - 10 * mm, tw, 10 * mm, 3, fill=white, stroke=LINE)
        c.setFillColor(NAVY)
        c.setFont(FONT_B, 8.5)
        c.drawString(cx + 8, cy - 6.4 * mm, name)
        cx += tw + 6

    y = cy - 22 * mm
    y = section_title(c, y, "Yang dikatakan klien")
    quotes = [
        ("Andi Wijaya", "Facility Manager, Rumah Sakit",
         "Panel distribusi ruang rawat selesai tepat jadwal dan lolos uji beban. Koordinasi dengan tim MEP kami lancar."),
        ("Sari Lestari", "Plant Engineer, Manufaktur",
         "MCC dan grounding area produksi dipasang rapi. FAT berjalan tanpa temuan mayor."),
    ]
    qw = (PAGE_W - 2 * MARGIN - GUTTER) / 2
    qh = 42 * mm
    for i, (who, role, text) in enumerate(quotes):
        x = MARGIN + i * (qw + GUTTER)
        round_rect(c, x, y - qh, qw, qh, 5, fill=white, stroke=LINE)
        c.setFillColor(BRAND)
        c.setFont(FONT_B, 16)
        c.drawString(x + 10, y - 14, "“")
        draw_para(c, text, x + 10, y - 26, qw - 20, size=8.2, leading=11.2)
        c.setFillColor(NAVY)
        c.setFont(FONT_B, 8.5)
        c.drawString(x + 10, y - qh + 14, who)
        c.setFillColor(MUTED)
        c.setFont(FONT, 7.5)
        c.drawString(x + 10, y - qh + 6, role)

    y = y - qh - 14
    y = section_title(c, y, "Siap untuk tender")
    note = (
        "Salinan legalitas lengkap (NIB, SBU, SIUJK, SMK3) dikirim atas permintaan resmi "
        "melalui formulir kontak atau email perusahaan. Company profile ini boleh dilampirkan "
        "pada paket vendor registration."
    )
    draw_para(c, note, MARGIN, y, PAGE_W - 2 * MARGIN, size=9, leading=12.5, color=MUTED)

    footer(c, 7)
    bookmark(c, "legalitas", "Legalitas & klien")
    c.showPage()


# ─── PAGE 8 CONTACT ──────────────────────────────────────────
def page_contact(c):
    chrome(c, "Kontak")
    y = PAGE_H - 34 * mm
    y = section_title(c, y, "Hubungi kami", "Kantor, saluran komunikasi, dan undangan kerja sama")

    card_h = 78 * mm
    round_rect(c, MARGIN, y - card_h, PAGE_W - 2 * MARGIN, card_h, 7, fill=NAVY)
    c.setFillColor(white)
    c.setFont(FONT_B, 12)
    c.drawString(MARGIN + 10 * mm, y - 12 * mm, "Kantor operasional")

    offices = [
        ("Palembang", "Jl. Jenderal Sudirman, Palembang, Sumatera Selatan"),
        ("Karawang", "Kawasan Industri Karawang, Jawa Barat"),
    ]
    oy = y - 26 * mm
    for city, addr in offices:
        c.setFillColor(BRAND)
        c.setFont(FONT_B, 10)
        c.drawString(MARGIN + 10 * mm, oy, city)
        c.setFillColor(ON_MUTED)
        c.setFont(FONT, 9)
        c.drawString(MARGIN + 10 * mm, oy - 12, addr)
        oy -= 20 * mm

    c.setFillColor(white)
    c.setFont(FONT_B, 8.5)
    c.drawString(MARGIN + 10 * mm, y - card_h + 20 * mm, "Email")
    c.setFont(FONT, 9)
    c.setFillColor(ON_MUTED)
    c.drawString(MARGIN + 28 * mm, y - card_h + 20 * mm, "info@berjayasuksesmakmur.co.id")
    c.setFillColor(white)
    c.setFont(FONT_B, 8.5)
    c.drawString(MARGIN + 10 * mm, y - card_h + 10 * mm, "Telepon / WA")
    c.setFont(FONT, 9)
    c.setFillColor(ON_MUTED)
    c.drawString(MARGIN + 40 * mm, y - card_h + 10 * mm, "+62 812-3456-7890")

    y = y - card_h - 16
    y = section_title(c, y, "Ajakan kerja sama")
    cta = (
        "Kami terbuka untuk tender, vendor registration, dan diskusi teknis proyek instalasi "
        "listrik baru maupun retrofit. Kirim brief proyek melalui email atau WhatsApp — tim kami "
        "merespons dalam 1×24 jam pada hari kerja."
    )
    y = draw_para(c, cta, MARGIN, y, PAGE_W - 2 * MARGIN, size=10, leading=14)

    y -= 10
    promo_h = 28 * mm
    round_rect(c, MARGIN, y - promo_h, PAGE_W - 2 * MARGIN, promo_h, 6, fill=BRAND_SOFT)
    c.setFillColor(BRAND)
    c.setFont(FONT_B, 11)
    c.drawString(MARGIN + 8 * mm, y - 11 * mm, "Promo: survey lokasi gratis")
    c.setFillColor(INK)
    c.setFont(FONT, 8.5)
    c.drawString(
        MARGIN + 8 * mm, y - 21 * mm,
        "Untuk proyek instalasi baru — desain PUIL/SNI, tenaga bersertifikat, commissioning & as-built.",
    )

    y -= promo_h + 16
    c.setFillColor(NAVY)
    c.setFont(FONT_B, 10)
    c.drawString(MARGIN, y, "Terima kasih atas perhatian Anda.")
    y -= 14
    draw_para(
        c,
        "Dokumen ini disusun untuk perkenalan perusahaan. Isi portofolio adalah cuplikan proyek terpilih. "
        "Salinan legalitas lengkap tersedia atas permintaan resmi.",
        MARGIN, y, PAGE_W - 2 * MARGIN, size=8.4, leading=11.2, color=MUTED,
    )

    try:
        round_rect(c, MARGIN, 22 * mm, 36 * mm, 18 * mm, 3, fill=white, stroke=LINE)
        c.drawImage(
            LOGO, MARGIN + 3, 23.5 * mm, width=30 * mm, height=15 * mm,
            mask="auto", preserveAspectRatio=True, anchor="c",
        )
    except Exception:
        pass

    footer(c, 8)
    bookmark(c, "kontak", "Kontak")
    c.showPage()


def render_previews(pdf_path: str):
    import pypdfium2 as pdfium

    os.makedirs(PREV_DIR, exist_ok=True)
    pdf = pdfium.PdfDocument(pdf_path)
    assert len(pdf) == TOTAL, f"expected {TOTAL} pages, got {len(pdf)}"
    for i, page in enumerate(pdf):
        bitmap = page.render(scale=1.8)
        im = bitmap.to_pil().convert("RGB")
        im.save(f"{ART_PREV}/page-{i + 1}.png", "PNG")
        web = im.copy()
        web.thumbnail((900, 1280), Image.LANCZOS)
        web.save(f"{PREV_DIR}/p{i + 1}.jpg", "JPEG", quality=84, optimize=True)
        # also cp-N aliases
        im.save(f"{ART_PREV}/cp-{i + 1}.png", "PNG")
    pdf.close()


def main():
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=A4)
    c.setTitle("Company Profile — PT Berjaya Sukses Makmur")
    c.setAuthor("PT Berjaya Sukses Makmur")
    c.setSubject("Electrical Engineering & Installation — Company Profile 2026")
    c.setCreator("Berjaya Company Profile Generator")
    c.setKeywords("kontraktor listrik, panel distribusi, MCC, Palembang, Karawang")

    page_cover(c)
    page_about(c)
    page_services(c)
    page_workflow(c)
    page_portfolio_a(c)
    page_portfolio_b(c)
    page_legal(c)
    page_contact(c)
    c.save()

    data = buf.getvalue()
    for path in (OUT_PDF, OUT_ART):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "wb") as f:
            f.write(data)
        print("Wrote", path, len(data), "bytes")

    render_previews(OUT_PDF)
    print("Previews ready")


if __name__ == "__main__":
    main()
