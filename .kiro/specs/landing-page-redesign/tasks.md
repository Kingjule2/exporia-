# Implementation Plan: Landing Page Redesign — "Horizon Dagang"

## Overview

Rencana ini merombak total cabang **Guest_View** pada `resources/js/Pages/Home.tsx` menjadi konsep maritim "Horizon Dagang", sekaligus memperbarui Tipografi_Sistem (Sora), Palet_Warna maritim, dan Sistem_Animasi berbasis CSS keyframes. Pendekatan bersifat inkremental: konfigurasi global lebih dulu (font + warna + keyframes + reduced-motion), kemudian konstanta konten statis, lalu komponen presentational satu per satu, dan terakhir merangkainya ke dalam `Home.tsx` agar perubahan langsung terlihat pada Guest_View.

Prinsip yang dijaga sepanjang implementasi:
- Tidak mengubah kontrak props `Home.tsx` (`products`, `departemens`, `filters`, `auth`); hanya cabang `!user` yang dirombak, cabang `AuthenticatedLayout` dibiarkan utuh.
- Semua animasi SSR-safe (CSS keyframes murni, tanpa akses `window`/`document` saat render), `transform`/`opacity` saja (tanpa layout shift), dan menghormati `prefers-reduced-motion`.
- Tanpa dependensi animasi tambahan — `package.json` tidak menambah library.
- Seluruh teks Guest_View dalam Bahasa Indonesia.

Catatan PBT: sesuai design (`## Testing Strategy`), fitur ini didominasi UI/konfigurasi/konten statis sehingga **Property-Based Testing TIDAK diterapkan**. Verifikasi memakai example/config test, smoke test build, dan pemeriksaan kontras/hue deterministik. Sub-tugas pengujian ditandai opsional dengan `*`.

## Tasks

- [x] 1. Konfigurasi global: Tipografi, Palet Warna, dan Sistem Animasi
  - [x] 1.1 Ganti pemuatan font ke Sora di `resources/views/app.blade.php`
    - Ubah URL Bunny Fonts dari `plus-jakarta-sans:...` menjadi `sora:400,500,600,700,800` dengan `display=swap`
    - Pertahankan `<link rel="preconnect" href="https://fonts.bunny.net">`
    - Hapus seluruh referensi "plus-jakarta-sans" / "Inter" pada berkas ini
    - _Requirements: 1.2, 1.4, 1.5_

  - [x] 1.2 Perbarui `tailwind.config.js`: font, palet, keyframes/animation, dan tema daisyUI
    - Set `theme.extend.fontFamily.sans = ['Sora', ...defaultTheme.fontFamily.sans]`
    - Definisikan token warna eksplisit: `primary #0B6E99`, `secondary #0A3D62`, `accent #F4A91F`, `surface #F2FAFD`, `ink #0B1F2A`
    - Tambah `keyframes` dan `animation` untuk `rise` (600ms ease-out both), `wave` (linear infinite), `drift` (ease-in-out infinite)
    - Override tema daisyUI `light` dan `dark`; pada `dark` gunakan varian primer/aksen yang dicerahkan (mis. primer `#3BA7CE`, aksen `#F6B73C`) agar tetap memenuhi kontras AA di atas latar navi
    - Pastikan tidak ada sisa referensi "Plus Jakarta Sans" / "Inter" dan tidak ada warna brand lama (`#2563EB`)
    - _Requirements: 1.1, 1.3, 1.5, 2.1, 2.2, 2.3, 2.4, 2.6, 4.1, 4.4, 4.7_

  - [x] 1.3 Tambahkan aturan reduced-motion global di `resources/css/app.css`
    - Tambah blok `@media (prefers-reduced-motion: reduce)` yang menonaktifkan animasi `rise`, `wave`, `drift` (`animation: none`) dan transisi non-esensial, sehingga elemen tampil langsung di keadaan akhir
    - Pastikan keadaan akhir animasi `rise` identik dengan posisi natural (opacity 1, translateY 0) agar tanpa layout shift
    - _Requirements: 4.5, 4.6, 6.10_

  - [ ]* 1.4 Tulis pemeriksaan konfigurasi font & palet (skrip Node sekali jalan atau test)
    - Verifikasi `fontFamily.sans[0] === 'Sora'`; tepat satu `primary`/`secondary`/`accent` dengan hex eksplisit; tanpa referensi "Inter"/"Plus Jakarta Sans" di `tailwind.config.js`
    - Verifikasi `app.blade.php` memuat `sora:400,500,600,700,800` + `display=swap` dan tanpa "plus-jakarta-sans"/"Inter"
    - Verifikasi hue primer ∈ [180°,260°] dan hue aksen ∈ [20°,60°] dihitung dari hex
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3_

  - [ ]* 1.5 Tulis pemeriksaan kontras WCAG AA atas pasangan warna tetap
    - Implementasikan fungsi deterministik hex→luminance→rasio kontras (WCAG 2.1)
    - Verifikasi ≥ 4.5:1 (teks normal) dan ≥ 3:1 (teks besar) untuk: putih atas `primary`, teks gelap (`ink`/`secondary`) atas `accent`, `ink` atas `surface`, serta padanan mode gelap
    - _Requirements: 2.5, 2.6, 6.8_

- [x] 2. Konstanta konten informatif statis (Bahasa Indonesia)
  - [x] 2.1 Buat berkas konstanta & tipe konten Guest_View
    - Buat `resources/js/Pages/Home/components/content.ts` berisi tipe `HowItWorksStep`, `Feature`, `TrustMetric`, `Commodity`
    - Isi `HOW_IT_WORKS_STEPS` (3–5 langkah, `number` menaik mulai 1 tanpa lompatan), `FEATURES` (3–6 butir, wajib mencakup koneksi langsung antarpelaku usaha, keamanan transaksi, jangkauan pasar global), `TRUST_METRICS` (3–4 metrik ilustratif, `value` string), `COMMODITIES` (3–8 entri)
    - Patuhi batas panjang: judul langkah/fitur 1–100, deskripsi 1–200, label metrik 1–60, nama komoditas 1–60; semua teks Bahasa Indonesia
    - _Requirements: 6.1, 6.2, 6.3, 6.5, 6.6_

  - [ ]* 2.2 Tulis example/config test atas konstanta konten
    - `HOW_IT_WORKS_STEPS`: jumlah ∈ [3,5]; `title` 1–100; `description` 1–200; `steps[i].number === i + 1`
    - `FEATURES`: jumlah ∈ [3,6]; batas panjang; gabungan teks mencakup tiga tema wajib (verifikasi via kata kunci representatif)
    - `TRUST_METRICS`: jumlah ∈ [3,4]; `value` non-kosong; `label` 1–60
    - `COMMODITIES`: jumlah ∈ [3,8]; `name` 1–60; pastikan tidak ada teks bahasa lain pada elemen terlihat
    - _Requirements: 6.1, 6.2, 6.3, 6.5, 6.6_

- [x] 3. Komponen latar & kerangka Guest_View
  - [x] 3.1 Implementasikan `MaritimeBackground`
    - Buat `resources/js/Pages/Home/components/MaritimeBackground.tsx`: SVG gelombang berlapis dengan `animate-wave` (loop mulus) + lapisan `animate-drift`
    - Tandai `aria-hidden="true"` dan `pointer-events-none`; presentational murni tanpa akses DOM saat render (SSR-safe)
    - _Requirements: 4.4, 4.5, 4.6_

  - [x] 3.2 Implementasikan `GuestHeader`
    - Buat `resources/js/Pages/Home/components/GuestHeader.tsx`: wordmark "Exporia" (ikon jangkar/kontainer), tautan "Masuk" → `route('login')`, tombol "Daftar" → `route('register')`
    - Gunakan hanya token Palet_Warna dan font Sora; teks Bahasa Indonesia
    - _Requirements: 3.4, 6.7_

  - [x] 3.3 Implementasikan `GuestFooter`
    - Buat `resources/js/Pages/Home/components/GuestFooter.tsx`: nama merek "Exporia" + `© {new Date().getFullYear()} Exporia ...` (tahun dinamis, aman di SSR), teks Bahasa Indonesia
    - _Requirements: 3.4_

- [x] 4. Komponen hero & pilihan autentikasi
  - [x] 4.1 Implementasikan `HeroSection`
    - Buat `resources/js/Pages/Home/components/HeroSection.tsx` dengan prop `{ description: string }` (1–300 karakter)
    - Isi: eyebrow chip, `<h1>` Sora 800, paragraf deskripsi, CTA "Mulai Sekarang" → `route('register')`
    - Terapkan `animate-rise` dengan `animation-delay` bertingkat (stagger) untuk kemunculan hero (selesai 200–800ms, `fill-mode: both`)
    - _Requirements: 3.1, 4.1, 4.6, 4.7, 6.7_

  - [x] 4.2 Implementasikan `AuthChoiceCards`
    - Buat `resources/js/Pages/Home/components/AuthChoiceCards.tsx`: kartu "Masuk Akun" → `route('login')` dan kartu "Buat Akun Baru" → `route('register')`
    - Hover → transisi transform/shadow (lift) 100–400ms; leave → kembali ke keadaan awal dengan durasi sama; hanya `transform`/`opacity`
    - _Requirements: 3.2, 3.3, 4.2, 4.3, 6.7_

- [x] 5. Komponen konten informatif
  - [x] 5.1 Implementasikan `TrustStrip` (Indikator Kepercayaan)
    - Buat `resources/js/Pages/Home/components/TrustStrip.tsx` yang membaca `TRUST_METRICS` dari `content.ts` (bukan props, bukan backend)
    - Render 3–4 metrik (`value` + `label`) dan sertakan penanda terlihat "Data ilustratif"; komponen tidak menerima props data
    - _Requirements: 6.3, 6.4, 6.7_

  - [x] 5.2 Implementasikan `HowItWorks` (Cara Kerja)
    - Buat `resources/js/Pages/Home/components/HowItWorks.tsx` yang membaca `HOW_IT_WORKS_STEPS`
    - Render nomor urut sesuai urutan array, judul, dan deskripsi tiap langkah
    - _Requirements: 6.1, 6.7_

  - [x] 5.3 Implementasikan `FeatureGrid` (Fitur dan Manfaat)
    - Buat `resources/js/Pages/Home/components/FeatureGrid.tsx` yang membaca `FEATURES`
    - Grid responsif: 1 kolom (360px), 2 kolom (768px), 3 kolom (1280px), tanpa scroll horizontal
    - _Requirements: 6.2, 6.7, 6.9_

  - [x] 5.4 Implementasikan `CommodityHighlights` (Sorotan Komoditas)
    - Buat `resources/js/Pages/Home/components/CommodityHighlights.tsx` yang membaca `COMMODITIES`
    - Render chip yang membungkus (wrap) responsif tanpa scroll horizontal
    - _Requirements: 6.5, 6.7, 6.9_

- [x] 6. Rangkai ulang cabang Guest_View pada `Home.tsx`
  - [x] 6.1 Ganti total cabang `!user` dengan layout "Horizon Dagang"
    - Hapus markup lama (slate-950, glow orbs) pada cabang guest; rangkai: `MaritimeBackground` (lapisan latar) → `GuestHeader` → `HeroSection` → `AuthChoiceCards` → `TrustStrip` → `HowItWorks` → `FeatureGrid` → `CommodityHighlights` → `GuestFooter`
    - Definisikan deskripsi hero (1–300 karakter) sebagai konstanta in-file dan teruskan ke `HeroSection`
    - JANGAN mengubah interface `Props` maupun cabang `AuthenticatedLayout`; pertahankan rute `login`/`register`; seluruh teks Bahasa Indonesia
    - _Requirements: 3.5, 3.6, 5.1, 5.4, 6.7, 6.9, 6.11_

  - [ ]* 6.2 Tulis component test render Guest_View
    - Verifikasi header memuat "Exporia"; hero punya CTA `href` ke `route('register')`; kartu "Masuk Akun" → `route('login')`, "Buat Akun Baru" → `route('register')`; footer memuat "Exporia" + tahun berjalan
    - Verifikasi keempat bagian Konten Informatif (trust strip, Cara Kerja, Fitur dan Manfaat, Sorotan Komoditas) ter-render
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.4, 6.1, 6.2, 6.3, 6.5_

  - [ ]* 6.3 Tulis regression test cabang terautentikasi & kontrak props
    - Saat `auth.user` ada, `AuthenticatedLayout` tetap dirender; konfirmasi tidak ada props baru pada `Home.tsx` (`Props` tetap `products`/`departemens`/`filters` + `auth`)
    - _Requirements: 5.1, 6.11_

- [x] 7. Checkpoint — pastikan konfigurasi, konten, dan komponen konsisten
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Verifikasi build & responsivitas (berbasis kode)
  - [x] 8.1 Jalankan smoke test build proyek
    - Jalankan `npm run build` (`tsc && vite build && vite build --ssr`); pastikan exit code 0, tanpa galat TypeScript, dan build SSR berhasil; perbaiki galat tipe bila muncul
    - _Requirements: 5.2, 5.3, 5.7_

  - [ ]* 8.2 Tulis pemeriksaan responsivitas kelas tata letak
    - Verifikasi grid kartu auth, langkah Cara Kerja, kartu Fitur, dan chip Komoditas menyusut menjadi satu kolom / membungkus rapi pada 360px dan menskala di 768px/1280px tanpa kelas yang memicu scroll horizontal
    - _Requirements: 3.5, 6.9_

  - [ ]* 8.3 Tulis pemeriksaan animasi & reduced-motion
    - Verifikasi `rise` berdurasi 200–800ms + `fill-mode: both`; transisi hover 100–400ms; `wave`/`drift` `infinite`; dengan `prefers-reduced-motion: reduce` seluruh animasi non-esensial nonaktif dan semua bagian (termasuk Konten Informatif) tampil di keadaan akhir; animasi hanya `transform`/`opacity` (tanpa layout shift)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 6.10_

- [x] 9. Checkpoint akhir — pastikan semua tes lulus dan build hijau
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tugas bertanda `*` bersifat opsional (pengujian/verifikasi) dan dapat dilewati untuk MVP yang lebih cepat; tugas inti tanpa `*` wajib diimplementasikan.
- Setiap tugas merujuk klausa requirement spesifik untuk keterlacakan.
- PBT tidak diterapkan (UI/konfigurasi/konten statis); pengujian memakai example/config test, pemeriksaan kontras & hue deterministik, dan smoke test build.
- Komponen baru ditempatkan di `resources/js/Pages/Home/components/` sebagai komponen presentational SSR-safe; `Home.tsx` hanya disentuh pada tugas 6.1 untuk merangkai cabang guest.
- Tugas verifikasi sengaja berbasis kode (analisis kelas/konfigurasi, build); pengukuran LCP, uji lintas-peramban manual, dan deployment tidak termasuk lingkup tugas coding.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "2.1"] },
    { "id": 1, "tasks": ["1.4", "1.5", "2.2", "3.1", "3.2", "3.3", "4.1", "4.2", "5.1", "5.2", "5.3", "5.4"] },
    { "id": 2, "tasks": ["6.1"] },
    { "id": 3, "tasks": ["6.2", "6.3", "8.2", "8.3"] },
    { "id": 4, "tasks": ["8.1"] }
  ]
}
```
