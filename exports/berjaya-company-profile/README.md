# Company Profile — PT Berjaya Sukses Makmur

Situs company profile elektrikal (tanpa portal ERP). Siap di-deploy ke **Vercel**.

## Yang termasuk

- Beranda: layanan, proyek, legalitas, klien, FAQ, formulir kontak
- Halaman company profile + **PDF 8 halaman** siap unduh
- Halaman layanan & studi kasus proyek
- Kampanye CTA “survey instalasi gratis”
- SEO: meta, sitemap, robots, JSON-LD

Konten utama ada di `src/lib/site-data.ts` (nanti bisa dihubungkan ke CMS).

## Deploy ke Vercel

1. Unzip folder ini.
2. Buat repo GitHub, unggah isinya (bukan folder zip-nya).
3. Di [vercel.com](https://vercel.com) → **Add New Project** → pilih repo.
4. Framework Preset: **Vite**. Build Command: `npm run build`. Output: `dist`.
5. Deploy.

Lewat CLI (opsional):

```bash
npm install
npx vercel
```

## Jalankan di komputer

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite (biasanya `http://localhost:5173`).

## Ganti domain & kontak

| File | Yang diubah |
|---|---|
| `index.html` | judul, deskripsi, canonical |
| `src/lib/seo.ts` | URL JSON-LD |
| `src/lib/site-data.ts` | nama, WA, email, alamat, proyek, layanan |
| `public/sitemap.xml` | URL publik |
| `public/robots.txt` | sitemap |
| `public/company-profile.pdf` | file PDF company profile |
| `public/logo-bsm.png` / `og.jpg` | logo & gambar share |

Nomor WhatsApp ada di `COMPANY.waNumber` pada `src/lib/site-data.ts`.

## Catatan

- Ini **situs publik saja**. Mini ERP / Kurva S tidak ikut.
- Formulir kontak menyimpan ke browser pengunjung (demo). Untuk produksi, sambungkan ke email/CRM.
- Tahap berikutnya: CMS untuk mengedit konten website ini.
