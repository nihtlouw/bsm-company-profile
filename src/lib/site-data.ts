export const COMPANY = {
  name: "PT. Berjaya Sukses Makmur",
  short: "Berjaya Sukses Makmur",
  tagline: "General Contractor & Supplier",
  focus: "Electrical, Mechanical, Civil, Trading & EO",
  founded: 2014,
  email: "pt.berjayasuksesmakmur@gmail.com",
  phoneDisplay: "0856-972-95500",
  waNumber: "6285697295500",
} as const;

export const NAV = [
  { id: "home", label: "Beranda" },
  { id: "services", label: "Layanan" },
  { id: "projects", label: "Proyek" },
  { id: "legalitas", label: "Legalitas" },
  { id: "contact", label: "Kontak" },
] as const;

export const STATS = [
  { value: "2014", label: "Tahun berdiri tercantum pada dokumen perusahaan" },
  { value: "NIB", label: "0220104260475 · dicetak 25 Maret 2025" },
  { value: "KBLI 43211", label: "Instalasi Listrik · Izin Terbit pada alamat Palembang yang tercantum" },
  { value: "2027", label: "Sertifikat e-CHSEMS berlaku sampai 22 Desember 2027" },
] as const;

export const SERVICES = [
  {
    id: "instalasi",
    title: "Instalasi & Jaringan Elektrikal",
    subtitle: "Instalasi fasilitas kesehatan, perumahan, serta jaringan 20 kV SKTM/SUTM.",
    detail: "Company Profile BSM Karawang 2025 memuat dokumentasi instalasi electrical rumah sakit (hlm. 29), jaringan electrical perumahan (hlm. 30), dan jaringan electrical 20 kV SKTM/SUTM (hlm. 31–32).",
  },
  {
    id: "panel",
    title: "Panel, Cubicle & Transformator",
    subtitle: "Dokumentasi panel listrik, cubicle tegangan menengah, kabel, dan transformator.",
    detail: "Dokumentasi pekerjaan pada Company Profile 2025 halaman 31–32 menampilkan panel/cubicle dan pekerjaan jaringan tegangan menengah. Rincian kapasitas dan spesifikasi harus mengacu pada dokumen proyek masing-masing.",
  },
  {
    id: "grounding",
    title: "Grounding & Perbaikan Elektrikal",
    subtitle: "Grounding dan analisis gangguan elektrikal yang tercantum dalam daftar pengalaman.",
    detail: "Daftar pengalaman pada Company Profile 2025 memuat perbaikan dan analisis jaringan electrical over-voltage serta grounding system. Detail lokasi dan lingkup kontrak dapat disampaikan berdasarkan dokumen proyek yang disetujui.",
  },
  {
    id: "commissioning",
    title: "Pengujian, Energize & Maintenance",
    subtitle: "Dokumentasi pengalaman pengoperasian/energize dan maintenance peralatan.",
    detail: "Daftar pengalaman perusahaan memuat pekerjaan pengoperasian/energize, pengujian instalasi, serta maintenance diesel pump dan panel hydrant. Lingkup tiap pekerjaan mengikuti kontrak dan berita acara terkait.",
  },
] as const;

export type ProjectCategory = "rumah-sakit" | "pabrik" | "gedung";

export const CATEGORIES: { id: "semua" | ProjectCategory; label: string }[] = [
  { id: "semua", label: "Semua dokumentasi" },
  { id: "rumah-sakit", label: "Fasilitas kesehatan" },
  { id: "pabrik", label: "Jaringan & panel" },
  { id: "gedung", label: "Perumahan & gedung" },
] as const;

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  "rumah-sakit": "Fasilitas kesehatan",
  pabrik: "Jaringan & panel",
  gedung: "Perumahan & gedung",
};

export const PROJECTS = [
  {
    id: "hospital-electrical",
    title: "Instalasi Electrical Rumah Sakit",
    category: "rumah-sakit" as const,
    subtitle: "Dokumentasi pekerjaan elektrikal fasilitas kesehatan",
    sourcePage: "Company Profile BSM Karawang 2025 · halaman 29",
    scope: ["Instalasi electrical", "Ruang dan area fasilitas kesehatan", "Dokumentasi foto pekerjaan"],
    background: "Company Profile BSM Karawang 2025 memiliki bagian berjudul “Instalasi Electrical Rumah Sakit” pada halaman 29.",
    solution: "Halaman sumber menampilkan foto instalasi/area rumah sakit. Nama fasilitas, tanggal, nilai kontrak, kapasitas, dan uraian teknis rinci tidak dicantumkan pada halaman tersebut.",
    result: "Ditampilkan sebagai dokumentasi jenis pekerjaan, bukan klaim hasil terukur atau studi kasus klien tertentu.",
    image: "/images/documented-work/hospital-patient-room.webp",
    fallbackImage: "/images/documented-work/hospital.svg",
  },
  {
    id: "residential-electrical",
    title: "Instalasi Jaringan Electrical Perumahan",
    category: "gedung" as const,
    subtitle: "Dokumentasi pekerjaan jaringan listrik perumahan",
    sourcePage: "Company Profile BSM Karawang 2025 · halaman 30",
    scope: ["Instalasi jaringan electrical", "Perumahan", "Dokumentasi fasilitas dan panel distribusi"],
    background: "Company Profile BSM Karawang 2025 memiliki bagian berjudul “Instalasi Jaringan Electrical Perumahan” pada halaman 30.",
    solution: "Halaman sumber menampilkan beberapa foto perumahan dan perlengkapan kelistrikan. Tanggal dan lingkup kontrak tidak dicantumkan pada halaman tersebut.",
    result: "Ditampilkan sebagai dokumentasi jenis pekerjaan; detail proyek hanya akan ditambahkan jika tersedia dan disetujui untuk publikasi.",
    image: "/images/documented-work/residential-network-street.webp",
    fallbackImage: "/images/documented-work/residential.svg",
  },
  {
    id: "mv-network",
    title: "Jaringan Electrical 20 kV SKTM–SUTM",
    category: "pabrik" as const,
    subtitle: "Dokumentasi jaringan dan pekerjaan tegangan menengah",
    sourcePage: "Company Profile BSM Karawang 2025 · halaman 31–32",
    scope: ["Jaringan 20 kV", "SKTM/SUTM", "Panel/cubicle dan perlengkapan terkait"],
    background: "Company Profile BSM Karawang 2025 memuat bagian “Instalasi Jaringan Electrical 20 KV SKTM-SUTM” pada halaman 31–32.",
    solution: "Foto dokumentasi memperlihatkan panel/cubicle, kabel, pekerjaan jaringan, dan perlengkapan listrik. Detail lokasi atau pemilik aset tidak disimpulkan dari foto.",
    result: "Ditampilkan sebagai dokumentasi kategori pekerjaan, tanpa klaim tahun proyek, nama klien, atau hasil commissioning yang tidak tertera pada sumber.",
    image: "/images/documented-work/medium-voltage-switchgear.webp",
    fallbackImage: "/images/documented-work/mv-switchgear.svg",
  },
  {
    id: "transformer-panels",
    title: "Panel & Transformator",
    category: "pabrik" as const,
    subtitle: "Dokumentasi peralatan dan instalasi listrik",
    sourcePage: "Company Profile BSM Karawang 2025 · halaman 31–32",
    scope: ["Panel listrik", "Cubicle tegangan menengah", "Transformator dan perlengkapan"],
    background: "Foto panel, cubicle, kabel, dan transformator terlihat pada dokumentasi pekerjaan elektrikal di Company Profile BSM Karawang 2025 halaman 31–32.",
    solution: "Keterangan di halaman sumber bersifat visual dan tidak menjelaskan merek, kapasitas, tanggal pelaksanaan, maupun lingkup kontrak secara lengkap.",
    result: "Informasi rinci akan ditambahkan hanya dari dokumen proyek yang dapat diverifikasi dan disetujui untuk publikasi.",
    image: "/images/documented-work/transformer-installation.webp",
    fallbackImage: "/images/documented-work/transformer.svg",
  },
];

export const CERTIFICATIONS = [
  { id: "nib", name: "NIB", description: "Nomor Induk Berusaha 0220104260475. Dokumen OSS diterbitkan 7 Februari 2020 dan dicetak kembali 25 Maret 2025." },
  { id: "echsems", name: "e-CHSEMS · PT Pertamina EP", description: "Nomor Su9179/PEP/2026. Hasil: lulus kategori risiko sedang dan tinggi. Berlaku sampai 22 Desember 2027." },
  { id: "pkp", name: "Pengukuhan PKP", description: "Surat Pengukuhan Pengusaha Kena Pajak pada berkas yang disediakan mencantumkan tanggal 25 Agustus 2015." },
  { id: "kbli", name: "KBLI 43211 · Instalasi Listrik", description: "Pada lampiran NIB, kegiatan Instalasi Listrik (KBLI 43211) tercantum dengan status Izin Terbit untuk alamat usaha Palembang yang dituliskan." },
] as const;

export const GALLERY = [
  { id: "hospital", title: "Instalasi elektrikal fasilitas kesehatan", caption: "Foto dokumentasi: Company Profile BSM Karawang 2025, halaman 29. Citra dipotong dari foto sumber, diperbesar, dan ditajamkan ringan.", image: "/images/documented-work/hospital-patient-room.webp", fallbackImage: "/images/documented-work/hospital.svg" },
  { id: "residential", title: "Jaringan electrical perumahan", caption: "Foto dokumentasi: Company Profile BSM Karawang 2025, halaman 30. Citra dipotong dari foto sumber, diperbesar, dan ditajamkan ringan.", image: "/images/documented-work/residential-distribution-cabinet.webp", fallbackImage: "/images/documented-work/residential.svg" },
  { id: "switchgear", title: "Panel / cubicle tegangan menengah", caption: "Foto dokumentasi: Company Profile BSM Karawang 2025, halaman 31. Citra dipotong dari foto sumber, diperbesar, dan ditajamkan ringan.", image: "/images/documented-work/medium-voltage-switchgear.webp", fallbackImage: "/images/documented-work/mv-switchgear.svg" },
  { id: "cable-trays", title: "Tray kabel ruang elektrikal", caption: "Foto dokumentasi: Company Profile BSM Karawang 2025, halaman 32. Citra dipotong dari foto sumber, diperbesar, dan ditajamkan ringan.", image: "/images/documented-work/industrial-cable-trays.webp", fallbackImage: "/images/documented-work/mv-switchgear.svg" },
] as const;

export const CLIENTS = ["MEDCOENERGI", "Elnusa", "PUSRI", "Pertamina"] as const;

export const ABOUT_FACTS = [
  { label: "Tahun berdiri", value: "2014 (tercantum pada dokumen perusahaan dan e-CHSEMS)" },
  { label: "Alamat kantor", value: "Palembang dan Karawang" },
  { label: "Bidang usaha", value: "Mechanical, Electrical, General Supplier, Civil, Trading & EO" },
  { label: "Rujukan utama", value: "Company Profile BSM Karawang 2025, NIB 2025, PKP, dan sertifikat e-CHSEMS" },
] as const;

export const OFFICES = [
  { city: "Palembang", line: "Komp. Kedamaian Permai II-1 / Jl. Anggrek Blok II No. 1, RT 010 RW 002, Kel. Bukitsangkal, Kec. Kalidoni, Kota Palembang, Sumatera Selatan 30114", phone: "0711 812 429", email: "pt.berjayasuksesmakmur@gmail.com" },
  { city: "Karawang", line: "Sentraland Residence II No. 09, Perumnas Bumi Telukjambe, Telukjambe Timur, Karawang, Jawa Barat 41360", phone: "0856 972 95500", email: "bsmkrw.inc@gmail.com" },
] as const;

// Testimonials are omitted until approved, verifiable client quotes are supplied.
export const TESTIMONIALS = [] as const;

export const CAMPAIGN_CHECKS = [
  "Lingkup terdokumentasi: instalasi electrical, jaringan 20 kV SKTM/SUTM, panel dan transformator",
  "Dokumentasi pekerjaan electrical fasilitas kesehatan dan perumahan tercantum di company profile 2025",
  "NIB dan sertifikat e-CHSEMS tersedia sebagai dokumen pendukung",
  "Lingkup, jadwal, dan kebutuhan dokumen dikonfirmasi untuk setiap proyek",
] as const;

export const PROJECT_TYPES = ["Rumah Sakit", "Pabrik", "Gedung Komersial", "Lainnya"] as const;

export const CONTACT_INTENTS = [
  { id: "tender", label: "Kelengkapan tender / vendor" },
  { id: "survey", label: "Survey lokasi / instalasi baru" },
  { id: "maintenance", label: "Maintenance / perbaikan" },
  { id: "lainnya", label: "Lainnya" },
] as const;

export const PROFILE_PDF = "/company-profile-public-safe-2025.pdf";
export const PROFILE_FILENAME = "BSM_Company_Profile_Public_Safe_2025.pdf";
export const PROFILE_PAGES = [
  { src: "/images/profile/p1.jpg", title: "Sampul", note: "Identitas, cabang, dan angka kunci" },
  { src: "/images/profile/p2.jpg", title: "Tentang perusahaan", note: "Fakta, visi, dan misi" },
  { src: "/images/profile/p3.jpg", title: "Layanan", note: "Empat lingkup elektrikal + standar kerja" },
  { src: "/images/profile/p4.jpg", title: "Cara kerja & kurva S", note: "Alur 4 tahap dan kendali progres" },
  { src: "/images/profile/p5.jpg", title: "Portofolio", note: "Dokumentasi pekerjaan dari company profile" },
  { src: "/images/profile/p6.jpg", title: "Portofolio & galeri", note: "Fasilitas kesehatan, panel, tray" },
  { src: "/images/profile/p7.jpg", title: "Legalitas & klien", note: "NIB, PKP, e-CHSEMS dan dokumen pendukung" },
  { src: "/images/profile/p8.jpg", title: "Kontak", note: "Kantor Palembang & Karawang" },
] as const;

export const FAQ = [
  { id: "layanan", q: "Apa bidang usaha PT Berjaya Sukses Makmur?", a: "Company Profile BSM Karawang 2025 mencantumkan Mechanical, Electrical, Kontraktor, General Supplier, Civil, Trading & EO. Dokumentasi electrical meliputi instalasi fasilitas kesehatan, jaringan perumahan, dan jaringan 20 kV SKTM/SUTM." },
  { id: "wilayah", q: "Di mana alamat kantor yang tercantum pada dokumen perusahaan?", a: "Dokumen yang disediakan mencantumkan alamat di Palembang, Sumatera Selatan, serta alamat cabang Karawang, Jawa Barat. Detail kontak ada pada bagian Kontak." },
  { id: "standar", q: "Dokumen apa yang tersedia untuk proses vendor?", a: "Berkas yang disediakan mencakup NIB, surat pengukuhan PKP, dan sertifikat e-CHSEMS PT Pertamina EP. Status serta masa berlaku tiap dokumen mengikuti keterangan pada dokumen aslinya." },
  { id: "survey", q: "Bagaimana cara mengajukan survey atau meminta penawaran?", a: "Isi formulir dengan jenis kebutuhan dan lokasi, lalu klik tautan WhatsApp untuk mengirim pesan kepada tim. Formulir situs ini tidak mengirim email otomatis." },
  { id: "profil", q: "Apakah company profile bisa diminta?", a: "Hubungi tim melalui email kantor atau WhatsApp untuk meminta company profile dan dokumen pendukung versi terbaru untuk kebutuhan tender/vendor." },
  { id: "legalitas", q: "Apakah semua sertifikat pada company profile masih berlaku?", a: "Status harus mengacu pada tanggal validitas yang tertera di setiap sertifikat asli. Sertifikat e-CHSEMS PT Pertamina EP pada berkas yang disediakan berlaku sampai 22 Desember 2027." },
] as const;

export const HOW_IT_WORKS = [
  { step: "01", title: "Brief kebutuhan", body: "Jelaskan jenis pekerjaan, lokasi fasilitas, jadwal, dan dokumen yang diperlukan untuk tender/vendor." },
  { step: "02", title: "Konfirmasi lingkup", body: "Tim mengonfirmasi lingkup teknis, kebutuhan dokumen, lokasi, dan persyaratan proyek sebelum penawaran." },
  { step: "03", title: "Pelaksanaan pekerjaan", body: "Lingkup pekerjaan mengikuti penawaran dan kontrak yang disepakati, dengan dokumentasi kerja yang relevan." },
  { step: "04", title: "Pengujian & dokumentasi", body: "Metode pengujian, energize, maintenance, serta dokumen serah terima mengikuti ketentuan dan lingkup masing-masing proyek." },
] as const;

export const SERVICE_PAGES: Record<string, { slug: string; title: string; eyebrow: string; lead: string; paragraphs: string[]; steps: string[]; description: string }> = {
  instalasi: {
    slug: "instalasi", title: "Instalasi & Jaringan Elektrikal", eyebrow: "Lingkup pekerjaan terdokumentasi",
    lead: "Dokumentasi perusahaan mencakup instalasi electrical fasilitas kesehatan, jaringan electrical perumahan, dan jaringan 20 kV SKTM/SUTM.",
    paragraphs: ["Company Profile BSM Karawang 2025 halaman 29–32 menampilkan dokumentasi pekerjaan instalasi electrical rumah sakit, jaringan electrical perumahan, serta jaringan electrical 20 kV SKTM-SUTM.", "Rincian nama pemilik fasilitas, tanggal, nilai kontrak, kapasitas, dan hasil pengujian tidak dicantumkan pada setiap halaman foto. Informasi spesifik hanya diterbitkan bila dokumen proyek tersedia dan disetujui."],
    steps: ["Konfirmasi jenis dan lokasi pekerjaan", "Periksa gambar, spesifikasi, dan kebutuhan fasilitas", "Sepakati lingkup, jadwal, dan material", "Dokumentasikan pekerjaan sesuai ketentuan proyek"],
    description: "Dokumentasi pekerjaan instalasi electrical rumah sakit, perumahan, serta jaringan 20 kV SKTM/SUTM pada Company Profile PT Berjaya Sukses Makmur 2025.",
  },
  panel: {
    slug: "panel", title: "Panel, Cubicle & Transformator", eyebrow: "Lingkup pekerjaan terdokumentasi",
    lead: "Dokumentasi pekerjaan elektrikal menampilkan panel listrik, cubicle, kabel, dan transformator.",
    paragraphs: ["Company Profile BSM Karawang 2025 halaman 31–32 menampilkan visual peralatan dan pekerjaan yang terkait dengan jaringan tegangan menengah.", "Merek, kapasitas, spesifikasi proteksi, hasil pengujian, dan tanggal pekerjaan tidak diasumsikan dari foto; detail tersebut harus mengacu pada spesifikasi dan berita acara proyek."],
    steps: ["Konfirmasi kebutuhan dan spesifikasi", "Pemeriksaan dokumen teknis dan peralatan", "Pekerjaan sesuai penawaran/kontrak", "Dokumentasi pengujian sesuai lingkup proyek"],
    description: "Dokumentasi panel, cubicle, kabel, dan transformator pada Company Profile PT Berjaya Sukses Makmur 2025.",
  },
  grounding: {
    slug: "grounding", title: "Grounding & Perbaikan Elektrikal", eyebrow: "Pengalaman yang tercantum",
    lead: "Daftar pengalaman pada company profile mencantumkan perbaikan dan analisis jaringan electrical over-voltage serta grounding system.",
    paragraphs: ["Informasi tersebut berasal dari daftar pengalaman kerja pada Company Profile BSM Karawang 2025. Data lengkap terkait pemilik proyek, tanggal, dan hasil pekerjaan perlu mengacu pada berkas proyek yang relevan.", "Setiap usulan pekerjaan baru harus diperiksa berdasarkan kondisi lokasi, gambar, dan ruang lingkup yang disetujui kedua pihak."],
    steps: ["Kumpulkan informasi gangguan dan lokasi", "Tinjau kebutuhan pemeriksaan teknis", "Konfirmasi rekomendasi dan lingkup kerja", "Catat hasil sesuai dokumen proyek"],
    description: "Lingkup grounding dan perbaikan elektrikal yang tercantum pada daftar pengalaman Company Profile PT Berjaya Sukses Makmur 2025.",
  },
  commissioning: {
    slug: "commissioning", title: "Pengujian, Energize & Maintenance", eyebrow: "Pengalaman yang tercantum",
    lead: "Daftar pengalaman perusahaan memuat pekerjaan pengoperasian/energize, pengujian instalasi, serta maintenance diesel pump dan panel hydrant.",
    paragraphs: ["Rincian pelaksanaan dan hasil pengujian mengikuti dokumen, berita acara, serta kontrak untuk masing-masing pekerjaan.", "Keterangan di halaman ini merangkum daftar pengalaman pada company profile, bukan jaminan hasil atau waktu penyelesaian untuk proyek mendatang."],
    steps: ["Tentukan kebutuhan pengujian/maintenance", "Konfirmasi prosedur dan jadwal", "Laksanakan pekerjaan sesuai kesepakatan", "Serahkan dokumentasi yang disepakati"],
    description: "Ringkasan pengalaman pengoperasian/energize, pengujian instalasi, dan maintenance sebagaimana tercantum pada Company Profile PT Berjaya Sukses Makmur 2025.",
  },
};

export const SEO = {
  homeTitle: "Kontraktor & Supplier Elektrikal | PT Berjaya Sukses Makmur",
  homeDescription: "PT Berjaya Sukses Makmur bergerak di bidang mechanical, electrical, kontraktor, general supplier, civil, trading & EO. Dokumen perusahaan mencantumkan tahun berdiri 2014 dan alamat di Palembang serta Karawang.",
  profileTitle: "Company Profile & Dokumen Perusahaan | PT Berjaya Sukses Makmur",
  profileDescription: "Rangkuman bidang usaha, dokumentasi pekerjaan electrical, NIB, PKP, serta sertifikat e-CHSEMS PT Berjaya Sukses Makmur. Verifikasi status dokumen pada sumber aslinya.",
} as const;