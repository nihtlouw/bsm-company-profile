export const COMPANY = {
  name: "PT. Berjaya Sukses Makmur",
  short: "Berjaya Sukses Makmur",
  tagline: "General Contractor & Supplier",
  focus: "Electrical Engineering & Installation",
  founded: 2010,
  email: "info@berjayasuksesmakmur.co.id",
  phoneDisplay: "+62 812-3456-7890",
  waNumber: "6281234567890",
} as const;

export const NAV = [
  { id: "home", label: "Beranda" },
  { id: "services", label: "Layanan" },
  { id: "projects", label: "Proyek" },
  { id: "legalitas", label: "Legalitas" },
  { id: "contact", label: "Kontak" },
] as const;

export const STATS = [
  { value: 15, suffix: "+", label: "Tahun beroperasi" },
  { value: 120, suffix: "+", label: "Proyek selesai" },
  { value: 2, suffix: "", label: "Cabang operasional" },
  { value: 98, suffix: "%", label: "Serah terima tepat waktu" },
] as const;

export const SERVICES = [
  {
    id: "instalasi",
    title: "Instalasi Listrik Gedung",
    subtitle: "Jaringan daya, penerangan, dan tray kabel sesuai SNI.",
    detail:
      "Perancangan dan pemasangan instalasi listrik untuk rumah sakit, pabrik, dan gedung komersial — dari tray kabel hingga titik beban, lengkap dengan dokumentasi as-built.",
  },
  {
    id: "panel",
    title: "Panel Distribusi & MCC",
    subtitle: "Panel utama, sub-distribusi, dan motor control center.",
    detail:
      "Fabrikasi dan instalasi MDP, SDP, dan MCC termasuk busbar, proteksi, dan uji FAT sebelum commissioning di lapangan.",
  },
  {
    id: "grounding",
    title: "Grounding & Proteksi Petir",
    subtitle: "Sistem pentanahan dan proteksi untuk fasilitas kritis.",
    detail:
      "Pemasangan grounding, ikatan ekipotensial, dan proteksi petir agar peralatan medis dan produksi terlindungi dari surja dan gangguan.",
  },
  {
    id: "commissioning",
    title: "Commissioning & Maintenance",
    subtitle: "FAT, uji beban, dan perawatan berkala.",
    detail:
      "Pengujian, serah terima, dan program maintenance agar sistem kelistrikan tetap andal setelah operasional.",
  },
] as const;

export type ProjectCategory = "rumah-sakit" | "pabrik" | "gedung";

export const CATEGORIES: { id: "semua" | ProjectCategory; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "rumah-sakit", label: "Rumah Sakit" },
  { id: "pabrik", label: "Pabrik" },
  { id: "gedung", label: "Gedung Komersial" },
];

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  "rumah-sakit": "Rumah Sakit",
  pabrik: "Pabrik",
  gedung: "Gedung Komersial",
};

export const PROJECTS = [
  {
    id: "rspad",
    title: "RSPAD Gatot Soebroto",
    category: "rumah-sakit" as const,
    subtitle: "Panel distribusi & daya darurat",
    year: 2023,
    location: "Jakarta",
    scope: ["MDP/SDP ruang rawat", "Daya darurat ICU", "Uji beban & commissioning"],
    background:
      "Unit rawat inap baru membutuhkan panel distribusi andal dengan cadangan daya untuk ruang kritis.",
    solution:
      "Pemasangan panel distribusi utama beserta sistem daya darurat untuk area perawatan intensif, termasuk koordinasi shutdown malam dengan tim MEP.",
    result:
      "Commissioning selesai sesuai jadwal; sistem lolos uji beban penuh sebelum serah terima.",
    image: "/images/project-rspad.jpg",
  },
  {
    id: "factory",
    title: "Pabrik KIIC",
    category: "pabrik" as const,
    subtitle: "MCC, tray, dan grounding produksi",
    year: 2024,
    location: "Karawang",
    scope: ["Motor Control Center", "Tray kabel lini produksi", "FAT sebelum commissioning"],
    background:
      "Lini produksi baru membutuhkan jaringan listrik dan grounding sesuai standar sebelum beroperasi.",
    solution:
      "Instalasi kabel, pemasangan MCC, dan pengujian FAT sebelum commissioning lapangan.",
    result: "Produksi mulai sesuai jadwal tanpa insiden kelistrikan pada masa uji.",
    image: "/images/project-factory.jpg",
  },
  {
    id: "commercial",
    title: "Gedung perkantoran 12 lantai",
    category: "gedung" as const,
    subtitle: "Distribusi per lantai & penerangan",
    year: 2022,
    location: "Karawang",
    scope: ["SDP tiap lantai", "Penerangan terintegrasi", "Koordinasi MEP"],
    background:
      "Gedung 12 lantai membutuhkan distribusi listrik per lantai yang terkoordinasi dengan tim MEP lain.",
    solution:
      "Pemasangan panel distribusi tiap lantai beserta sistem penerangan yang terintegrasi.",
    result: "Serah terima tepat waktu dan terintegrasi dengan sistem gedung.",
    image: "/images/project-commercial.jpg",
  },
  {
    id: "puskesmas",
    title: "Puskesmas Kecamatan",
    category: "rumah-sakit" as const,
    subtitle: "Kelistrikan fasilitas kesehatan primer",
    year: 2023,
    location: "Palembang",
    scope: ["Instalasi daya", "Pencahayaan darurat", "Grounding peralatan medis"],
    background:
      "Fasilitas kesehatan tingkat kecamatan membutuhkan kelistrikan andal untuk peralatan medis dasar.",
    solution:
      "Instalasi kelistrikan, pencahayaan darurat, dan sistem grounding sesuai standar fasilitas kesehatan.",
    result: "Operasional berjalan tanpa gangguan berarti sejak commissioning.",
    image: "/images/project-puskesmas.jpg",
  },
  {
    id: "elektronik",
    title: "Pabrik elektronik Cikarang",
    category: "pabrik" as const,
    subtitle: "Panel kontrol & grounding anti-noise",
    year: 2025,
    location: "Cikarang",
    scope: ["Panel kontrol PLC", "Grounding anti-noise", "Commissioning area produksi"],
    background:
      "Area produksi sensitif terhadap gangguan listrik membutuhkan panel kontrol presisi.",
    solution:
      "Pemasangan panel kontrol otomatis berbasis PLC dengan sistem grounding khusus anti-noise.",
    result: "Gangguan produksi akibat noise listrik menurun setelah commissioning.",
    image: "/images/project-elektronik.jpg",
  },
];

export const CERTIFICATIONS = [
  {
    id: "nib",
    name: "NIB",
    description: "Nomor Induk Berusaha — legalitas operasional perusahaan.",
  },
  {
    id: "sbu",
    name: "SBU Konstruksi",
    description: "Sertifikat Badan Usaha untuk pekerjaan jasa konstruksi elektrikal.",
  },
  {
    id: "siujk",
    name: "SIUJK",
    description: "Izin Usaha Jasa Konstruksi sesuai kualifikasi bidang elektrikal.",
  },
  {
    id: "smk3",
    name: "SMK3",
    description: "Sistem Manajemen Keselamatan dan Kesehatan Kerja di lapangan.",
  },
];

export const GALLERY = [
  {
    id: "busbar",
    title: "Busbar panel utama",
    caption: "Sambungan busbar tembaga pada switchgear utama.",
    image: "/images/gallery-busbar.jpg",
  },
  {
    id: "tray",
    title: "Tray kabel produksi",
    caption: "Jalur tray kabel di area pabrik, ditata per sirkuit.",
    image: "/images/gallery-tray.jpg",
  },
  {
    id: "panel",
    title: "Wiring panel distribusi",
    caption: "Pekerjaan dalam panel: breaker, DIN rail, dan kabel teridentifikasi.",
    image: "/images/gallery-panel.jpg",
  },
  {
    id: "switchgear",
    title: "Switchgear medium voltage",
    caption: "Deretan cubicle MV di ruang listrik yang bersih dan terkendali.",
    image: "/images/gallery-switchgear.jpg",
  },
  {
    id: "lighting",
    title: "Penerangan gedung",
    caption: "Instalasi pencahayaan LED koridor gedung komersial.",
    image: "/images/gallery-lighting.jpg",
  },
];

export const CLIENTS = [
  "RSPAD Gatot Soebroto",
  "RSUD Palembang",
  "KIIC Karawang",
  "Pabrik Elektronik Cikarang",
  "Developer Perkantoran",
];

export const ABOUT_FACTS = [
  { label: "Berdiri", value: "2010" },
  { label: "Cabang", value: "Palembang & Karawang" },
  { label: "Fokus", value: "Electrical engineering & installation" },
  { label: "Segmen", value: "Rumah sakit, pabrik, gedung komersial" },
];

export const OFFICES = [
  {
    city: "Palembang",
    line: "Jl. Jenderal Sudirman, Palembang, Sumatera Selatan",
  },
  {
    city: "Karawang",
    line: "Kawasan Industri Karawang, Jawa Barat",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Panel distribusi ruang rawat selesai tepat jadwal dan lolos uji beban. Koordinasi dengan tim MEP kami lancar.",
    author: "Andi Wijaya",
    role: "Facility Manager, Rumah Sakit",
  },
  {
    quote: "MCC dan grounding area produksi dipasang rapi. FAT berjalan tanpa temuan mayor.",
    author: "Sari Lestari",
    role: "Plant Engineer, Manufaktur",
  },
];

export const CAMPAIGN_CHECKS = [
  "Survey lokasi tanpa biaya untuk proyek instalasi baru",
  "Desain dan pemasangan mengacu PUIL / SNI",
  "Tenaga kerja bersertifikat, K3 di lapangan",
  "Commissioning, uji beban, dan dokumen as-built",
];

export const PROJECT_TYPES = ["Rumah Sakit", "Pabrik", "Gedung Komersial", "Lainnya"] as const;

export const CONTACT_INTENTS = [
  { id: "tender", label: "Kelengkapan tender / vendor" },
  { id: "survey", label: "Survey lokasi / instalasi baru" },
  { id: "maintenance", label: "Maintenance / perbaikan" },
  { id: "lainnya", label: "Lainnya" },
] as const;

export const PROFILE_PDF = "/company-profile.pdf";
export const PROFILE_FILENAME = "Company-Profile-PT-Berjaya-Sukses-Makmur.pdf";
export const PROFILE_PAGES = [
  { src: "/images/profile/p1.jpg", title: "Sampul", note: "Identitas, cabang, dan angka kunci" },
  { src: "/images/profile/p2.jpg", title: "Tentang perusahaan", note: "Fakta, visi, dan misi" },
  { src: "/images/profile/p3.jpg", title: "Layanan", note: "Empat lingkup elektrikal + standar kerja" },
  { src: "/images/profile/p4.jpg", title: "Cara kerja & kurva S", note: "Alur 4 tahap dan kendali progres" },
  { src: "/images/profile/p5.jpg", title: "Portofolio", note: "RSPAD, pabrik, gedung komersial" },
  { src: "/images/profile/p6.jpg", title: "Portofolio & galeri", note: "Fasilitas kesehatan, panel, tray" },
  { src: "/images/profile/p7.jpg", title: "Legalitas & klien", note: "NIB, SBU, SIUJK, SMK3, testimoni" },
  { src: "/images/profile/p8.jpg", title: "Kontak", note: "Kantor Palembang & Karawang" },
] as const;

export const FAQ = [
  {
    id: "layanan",
    q: "Apa layanan utama PT Berjaya Sukses Makmur?",
    a: "Kami mengerjakan instalasi listrik gedung, panel distribusi dan MCC, grounding serta proteksi petir, plus commissioning dan maintenance. Lingkup dari desain hingga serah terima, termasuk dokumen as-built.",
  },
  {
    id: "wilayah",
    q: "Wilayah kerja di mana saja?",
    a: "Kantor operasional di Palembang dan Karawang. Kami menangani proyek rumah sakit, pabrik, dan gedung komersial di Sumatera Selatan, Jawa Barat, dan wilayah sekitarnya.",
  },
  {
    id: "standar",
    q: "Standar apa yang dipakai di lapangan?",
    a: "Pekerjaan mengacu PUIL dan SNI, dengan tenaga bersertifikat dan SMK3 di lapangan. Panel melalui FAT sebelum commissioning.",
  },
  {
    id: "survey",
    q: "Bagaimana cara minta survey lokasi?",
    a: "Isi formulir kampanye survey gratis, kirim brief lewat halaman kontak, atau chat WhatsApp. Tim merespons dalam 1×24 jam pada hari kerja.",
  },
  {
    id: "profil",
    q: "Apakah company profile bisa diunduh?",
    a: "Ya. Buka halaman Company Profile untuk melihat pratinjau 8 halaman, lalu unduh PDF-nya untuk tender atau onboarding vendor.",
  },
  {
    id: "legalitas",
    q: "Dokumen legalitas apa yang tersedia?",
    a: "NIB, SBU Konstruksi, SIUJK, dan SMK3. Salinan resmi dikirim atas permintaan melalui formulir kontak atau email.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Brief & survey",
    body: "Kirim lokasi dan jenis fasilitas. Survey lapangan tanpa biaya untuk proyek instalasi baru.",
  },
  {
    step: "02",
    title: "Desain & penawaran",
    body: "Skema distribusi, material, dan jadwal disusun sesuai PUIL/SNI lalu dikirim sebagai penawaran.",
  },
  {
    step: "03",
    title: "Instalasi",
    body: "Panel, tray, grounding, dan penerangan dikerjakan satu tim dengan K3 di lapangan.",
  },
  {
    step: "04",
    title: "Commissioning",
    body: "FAT, uji beban, dan dokumen as-built sebelum serah terima.",
  },
] as const;

export const SERVICE_PAGES: Record<
  string,
  {
    slug: string;
    title: string;
    eyebrow: string;
    lead: string;
    paragraphs: string[];
    steps: string[];
    description: string;
  }
> = {
  instalasi: {
    slug: "instalasi",
    title: "Instalasi Listrik Gedung",
    eyebrow: "Layanan elektrikal",
    lead: "Jaringan daya, penerangan, dan tray kabel untuk rumah sakit, pabrik, dan gedung komersial.",
    paragraphs: [
      "Instalasi listrik gedung menuntut koordinasi tray, titik beban, dan proteksi agar aman dipakai harian. Kami merancang jalur dari sumber daya hingga beban, termasuk cadangan untuk ruang kritis.",
      "Lingkup mencakup penarikan kabel, tray, penerangan, dan dokumentasi as-built. Pekerjaan diselaraskan dengan tim MEP lain supaya serah terima tidak tertahan di akhir proyek.",
    ],
    steps: [
      "Survey dan pemetaan beban",
      "Shop drawing tray dan sirkuit",
      "Instalasi dan identifikasi kabel",
      "Uji fungsi dan as-built",
    ],
    description:
      "Jasa instalasi listrik gedung sesuai SNI/PUIL untuk rumah sakit, pabrik, dan gedung komersial. Palembang dan Karawang.",
  },
  panel: {
    slug: "panel",
    title: "Panel Distribusi & MCC",
    eyebrow: "Layanan elektrikal",
    lead: "MDP, SDP, dan motor control center — fabrikasi, instalasi, dan FAT.",
    paragraphs: [
      "Panel distribusi adalah jantung daya fasilitas. Kami fabrikasi dan memasang MDP, SDP, serta MCC lengkap dengan busbar, proteksi, dan labeling yang rapi untuk operasi harian.",
      "Setiap panel melalui FAT sebelum dikirim ke lapangan, lalu diuji lagi saat commissioning agar trip curve dan interlock sesuai desain.",
    ],
    steps: [
      "Single line dan spesifikasi breaker",
      "Fabrikasi dan wiring",
      "FAT di workshop",
      "Instalasi dan commissioning lapangan",
    ],
    description:
      "Panel distribusi, sub-distribusi, dan MCC untuk fasilitas kesehatan dan industri. FAT sebelum commissioning.",
  },
  grounding: {
    slug: "grounding",
    title: "Grounding & Proteksi Petir",
    eyebrow: "Layanan elektrikal",
    lead: "Pentanahan dan proteksi surja untuk fasilitas medis dan produksi.",
    paragraphs: [
      "Fasilitas kritis membutuhkan ikatan ekipotensial yang benar. Kami mengukur tahanan tanah, memasang elektroda, dan mengikat peralatan agar gangguan dan surja tidak merusak perangkat.",
      "Proteksi petir dirancang sesuai klasifikasi bangunan — dari gedung komersial hingga pabrik dengan peralatan sensitif.",
    ],
    steps: [
      "Pengukuran tahanan tanah",
      "Desain grid dan down conductor",
      "Pemasangan elektroda dan ikatan",
      "Pengujian dan berita acara",
    ],
    description:
      "Sistem grounding dan proteksi petir untuk rumah sakit dan pabrik. Pengukuran, pemasangan, dan pengujian.",
  },
  commissioning: {
    slug: "commissioning",
    title: "Commissioning & Maintenance",
    eyebrow: "Layanan elektrikal",
    lead: "FAT, uji beban, serah terima, dan perawatan berkala setelah operasional.",
    paragraphs: [
      "Commissioning memastikan sistem aman dipakai, bukan hanya terpasang. Kami menguji proteksi, beban, dan cadangan daya, lalu menyerahkan dokumen yang dibutuhkan facility team.",
      "Program maintenance berkala menjaga panel dan grounding tetap andal — termasuk termografi dan pengencangan busbar sesuai jadwal.",
    ],
    steps: [
      "Checklist FAT dan SAT",
      "Uji beban dan simulasi trip",
      "Serah terima dokumen",
      "Jadwal maintenance",
    ],
    description:
      "Commissioning instalasi listrik, uji beban, dan maintenance panel untuk fasilitas kesehatan dan industri.",
  },
};

export const SEO = {
  homeTitle: "Kontraktor Listrik Rumah Sakit & Pabrik | PT Berjaya Sukses Makmur",
  homeDescription:
    "Kontraktor elektrikal Palembang & Karawang sejak 2010. Instalasi listrik, panel distribusi, grounding, dan commissioning untuk rumah sakit, pabrik, dan gedung komersial. Survey lokasi gratis. Company profile PDF siap unduh.",
  profileTitle: "Company Profile PDF — Kontraktor Listrik | PT Berjaya Sukses Makmur",
  profileDescription:
    "Unduh company profile 8 halaman PT Berjaya Sukses Makmur: legalitas, layanan elektrikal, portofolio rumah sakit & pabrik, serta kendali proyek kurva S. Palembang dan Karawang.",
};
