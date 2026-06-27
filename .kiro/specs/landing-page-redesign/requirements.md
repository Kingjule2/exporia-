# Requirements Document

## Introduction

Dokumen ini mendefinisikan kebutuhan untuk merombak total desain landing page aplikasi Exporia, sebuah platform B2B marketplace untuk aktivitas ekspor-impor di Indonesia. Tujuan redesign adalah menghadirkan tampilan yang lebih profesional namun tetap modern, dengan identitas visual yang relevan terhadap dunia perdagangan ekspor-impor.

Redesign berfokus pada halaman landing page (`resources/js/Pages/Home.tsx`), khususnya tampilan untuk pengunjung yang belum login (Guest View), serta penyesuaian konfigurasi gaya visual global di `tailwind.config.js` dan pemuatan font di `resources/views/app.blade.php`.

Arahan utama dari pemilik produk:
1. Mengganti tipografi ke font modern selain "Inter".
2. Menerapkan palet warna yang merepresentasikan aktivitas bisnis ekspor-impor.
3. Menambahkan animasi agar halaman terasa lebih hidup dan dinamis.
4. Menjadikan tampilan Landing_Page lebih informatif dengan menambahkan bagian-bagian konten yang menjelaskan cara kerja platform, fitur dan manfaat utama, indikator kepercayaan, serta sorotan komoditas.

Catatan penting untuk arahan keempat: seluruh konten informatif yang ditambahkan bersifat statis (di-hardcode pada komponen presentasi) dan tidak boleh mengubah kontrak props `Home.tsx`. Tidak ada data baru dari backend yang ditambahkan; angka statistik yang ditampilkan bersifat ilustratif, bukan data langsung (live).

Catatan kondisi saat ini: font yang dipakai sebenarnya "Plus Jakarta Sans" (bukan "Inter"), dimuat melalui Bunny Fonts. Belum ada library animasi yang terpasang di proyek. Hal ini menjadi pertimbangan dalam penyusunan kebutuhan.

## Glossary

- **Landing_Page**: Halaman publik aplikasi Exporia pada rute root yang dirender oleh komponen `Home.tsx`, mencakup tampilan untuk pengunjung yang belum terautentikasi.
- **Guest_View**: Bagian dari Landing_Page yang ditampilkan ketika tidak ada pengguna terautentikasi (`auth.user` bernilai null), berisi hero, deskripsi, dan kartu pilihan Masuk/Daftar.
- **Tipografi_Sistem**: Konfigurasi font global aplikasi yang didefinisikan pada `tailwind.config.js` (`fontFamily.sans`) dan dimuat pada `resources/views/app.blade.php`.
- **Palet_Warna**: Kumpulan warna yang digunakan pada Landing_Page, didefinisikan melalui kelas utilitas TailwindCSS dan/atau token tema.
- **Sistem_Animasi**: Mekanisme yang menghasilkan efek gerak pada elemen Landing_Page, baik melalui utilitas/keyframes TailwindCSS maupun library animasi yang ditambahkan.
- **Pengguna_Reduced_Motion**: Pengunjung yang mengaktifkan preferensi sistem `prefers-reduced-motion: reduce`.
- **Komponen_Interaktif**: Elemen Landing_Page yang dapat menerima fokus atau interaksi, seperti tombol "Masuk Akun" dan "Buat Akun Baru".
- **Konten_Informatif**: Kumpulan bagian (section) presentasi statis pada Guest_View yang menjelaskan platform Exporia kepada pengunjung, mencakup bagian cara kerja, fitur/manfaat utama, indikator kepercayaan (statistik ilustratif), dan sorotan komoditas. Seluruh teks dan angka pada Konten_Informatif di-hardcode di komponen `Home.tsx` tanpa data tambahan dari backend.

## Requirements

### Requirement 1: Pembaruan Tipografi

**User Story:** Sebagai pemilik produk, saya ingin Landing_Page menggunakan font modern selain "Inter", sehingga tampilan terasa segar dan tidak monoton.

#### Acceptance Criteria

1. THE Tipografi_Sistem SHALL menetapkan tepat satu font keluarga utama bernama "Sora" sebagai font sans default, yang berbeda dari "Inter" maupun "Plus Jakarta Sans".
2. THE Tipografi_Sistem SHALL memuat font utama "Sora" dari Bunny Fonts pada `resources/views/app.blade.php` dengan bobot 400, 500, 600, 700, dan 800.
3. THE Tipografi_Sistem SHALL mendefinisikan font utama "Sora" sebagai elemen pertama pada properti `fontFamily.sans` di `tailwind.config.js`, diikuti oleh stack fallback sans-serif sistem.
4. IF font utama "Sora" gagal dimuat dalam waktu 3 detik, THEN THE Tipografi_Sistem SHALL menampilkan seluruh teks menggunakan font fallback sans-serif sistem tanpa menyebabkan teks tidak terlihat (tanpa flash of invisible text).
5. THE Landing_Page SHALL menerapkan font utama "Sora" pada seluruh elemen teks judul dan isi, dan SHALL tidak menyisakan referensi ke font "Inter" maupun "Plus Jakarta Sans" pada `resources/views/app.blade.php` dan `tailwind.config.js`.

### Requirement 2: Palet Warna Bertema Ekspor-Impor

**User Story:** Sebagai pemilik produk, saya ingin Landing_Page menggunakan palet warna yang merepresentasikan aktivitas ekspor-impor, sehingga identitas visual sesuai dengan bidang bisnis platform.

#### Acceptance Criteria

1. THE Palet_Warna SHALL mendefinisikan tepat satu warna primer, satu warna sekunder, dan satu warna aksen pada konfigurasi tema di `tailwind.config.js`, masing-masing dengan nilai heksadesimal yang eksplisit.
2. THE Palet_Warna SHALL menetapkan warna primer pada rentang rona (hue) 180° hingga 260° (nuansa biru laut) untuk merepresentasikan tema perdagangan maritim ekspor-impor.
3. THE Palet_Warna SHALL menetapkan warna aksen pada rentang rona (hue) 20° hingga 60° (nuansa hangat keemasan atau jingga).
4. THE Landing_Page SHALL menerapkan seluruh warna latar belakang, teks, tombol, dan kartu hanya dari warna yang didefinisikan dalam Palet_Warna.
5. THE Landing_Page SHALL mempertahankan rasio kontras minimal 4.5:1 untuk teks normal dan minimal 3:1 untuk teks besar (>=18.66px tebal atau >=24px) terhadap latar belakangnya, sesuai standar WCAG 2.1 tingkat AA.
6. WHILE aplikasi menampilkan mode gelap, THE Palet_Warna SHALL menyediakan nilai warna yang tetap memenuhi rasio kontras minimal 4.5:1 untuk teks normal dan 3:1 untuk teks besar.

### Requirement 3: Tata Letak Profesional dan Modern

**User Story:** Sebagai pengunjung, saya ingin melihat Landing_Page yang profesional dan modern, sehingga saya percaya pada kredibilitas platform B2B Exporia.

#### Acceptance Criteria

1. THE Guest_View SHALL menampilkan bagian hero yang berisi judul utama, deskripsi singkat platform (1 sampai 300 karakter), dan tombol ajakan bertindak yang menautkan ke rute register.
2. THE Guest_View SHALL menampilkan kartu pilihan "Masuk Akun" yang menautkan ke rute login dan kartu pilihan "Buat Akun Baru" yang menautkan ke rute register.
3. WHEN pengguna mengaktifkan kartu "Masuk Akun", THE Guest_View SHALL mengarahkan pengguna ke rute login; dan WHEN pengguna mengaktifkan kartu "Buat Akun Baru", THE Guest_View SHALL mengarahkan pengguna ke rute register.
4. THE Guest_View SHALL menampilkan header dengan nama merek "Exporia" dan footer yang memuat nama merek "Exporia" beserta tahun pada informasi hak cipta.
5. THE Landing_Page SHALL menampilkan tata letak yang responsif pada lebar viewport 360px, 768px, dan 1280px tanpa terjadi tumpang tindih elemen atau scroll horizontal.
6. THE Landing_Page SHALL mempertahankan struktur konten dan rute tujuan tautan yang ada saat ini (login dan register).

### Requirement 4: Animasi yang Menghidupkan Halaman

**User Story:** Sebagai pengunjung, saya ingin Landing_Page menampilkan animasi yang halus, sehingga halaman terasa lebih hidup dan dinamis.

#### Acceptance Criteria

1. WHEN Landing_Page selesai dimuat (seluruh elemen hero telah ter-render), THE Sistem_Animasi SHALL memulai animasi kemunculan (fade atau slide) pada elemen hero dalam waktu maksimal 100ms setelah pemuatan selesai dan menyelesaikan animasi tersebut dalam durasi antara 200ms dan 800ms.
2. WHEN kursor pengguna mengarah (hover) ke Komponen_Interaktif, THE Sistem_Animasi SHALL menampilkan animasi transisi visual pada komponen tersebut dalam durasi antara 100ms dan 400ms.
3. WHEN kursor pengguna meninggalkan Komponen_Interaktif, THE Sistem_Animasi SHALL mengembalikan komponen ke keadaan visual awal dalam durasi antara 100ms dan 400ms.
4. WHILE Guest_View ditampilkan, THE Sistem_Animasi SHALL menjalankan minimal satu animasi latar belakang yang berulang secara terus-menerus tanpa jeda yang terlihat di antara pengulangan.
5. IF Pengguna_Reduced_Motion mengakses Landing_Page, THEN THE Sistem_Animasi SHALL menonaktifkan seluruh animasi non-esensial (mencakup animasi kemunculan hero dan animasi latar belakang berulang) dan menampilkan setiap elemen konten langsung dalam keadaan akhir tanpa gerak.
6. THE Sistem_Animasi SHALL menerapkan seluruh animasi tanpa menyebabkan perubahan posisi elemen konten (layout shift) setelah animasi selesai, sehingga posisi akhir setiap elemen identik dengan posisinya sebelum animasi dimulai.
7. IF animasi kemunculan hero gagal dimulai dalam waktu 100ms setelah Landing_Page selesai dimuat, THEN THE Sistem_Animasi SHALL menampilkan elemen hero langsung dalam keadaan akhir tanpa gerak.

### Requirement 5: Performa dan Kompatibilitas

**User Story:** Sebagai pengunjung, saya ingin Landing_Page yang sudah diredesain tetap memuat dengan cepat dan berfungsi di berbagai perangkat, sehingga pengalaman saya tetap nyaman.

#### Acceptance Criteria

1. THE Landing_Page SHALL dirender melalui mekanisme Inertia dan React yang sudah digunakan proyek tanpa mengubah nama, jumlah, maupun tipe data props yang diterima `Home.tsx`.
2. WHERE library tambahan diperlukan untuk animasi, THE Sistem_Animasi SHALL menggunakan dependensi yang ditambahkan secara eksplisit ke `package.json` dengan versi yang dipasang secara tetap (pinned, tanpa rentang versi seperti `^` atau `~`).
3. THE Landing_Page SHALL berhasil dikompilasi melalui proses build proyek (`npm run build`) dengan kode keluar (exit code) 0 dan tanpa galat TypeScript.
4. THE Landing_Page SHALL menampilkan seluruh teks antarmuka untuk Guest_View dalam Bahasa Indonesia tanpa menyisakan teks berbahasa lain pada elemen yang terlihat.
5. WHEN Landing_Page dimuat pertama kali pada koneksi jaringan setara 4G (throughput unduh sekitar 4 Mbps), THE Landing_Page SHALL menyelesaikan Largest Contentful Paint dalam waktu kurang dari atau sama dengan 2,5 detik.
6. WHERE Landing_Page diakses melalui versi terbaru peramban Chrome, Firefox, Safari, dan Edge, THE Landing_Page SHALL menampilkan seluruh elemen Guest_View (hero, kartu "Masuk Akun", kartu "Buat Akun Baru", header, dan footer) tanpa galat rendering, elemen yang hilang, atau tumpang tindih.
7. IF proses build proyek (`npm run build`) gagal akibat galat TypeScript, THEN THE Landing_Page SHALL tidak menghasilkan artefak build dan proses SHALL mengembalikan kode keluar bukan 0 disertai keluaran galat yang menunjukkan berkas dan baris penyebab kegagalan.

### Requirement 6: Konten Informatif pada Guest View

**User Story:** Sebagai pengunjung yang belum login, saya ingin Landing_Page menampilkan informasi yang menjelaskan cara kerja, manfaat, dan kredibilitas platform Exporia, sehingga saya memahami nilai platform sebelum memutuskan mendaftar.

#### Acceptance Criteria

1. THE Guest_View SHALL menampilkan bagian "Cara Kerja" yang memuat tepat 3 sampai 5 langkah untuk memulai aktivitas ekspor-impor melalui platform, dengan setiap langkah memuat nomor urut, judul langkah (1 sampai 100 karakter), dan deskripsi langkah (1 sampai 200 karakter), dan nomor urut langkah SHALL menaik secara berurutan tanpa lompatan dimulai dari 1 (1, 2, 3, ...).
2. THE Guest_View SHALL menampilkan bagian "Fitur dan Manfaat" yang memuat tepat 3 sampai 6 butir, dengan setiap butir memuat judul fitur (1 sampai 100 karakter) dan deskripsi manfaat (1 sampai 200 karakter), dan keseluruhan butir SHALL mencakup koneksi langsung antarpelaku usaha, keamanan transaksi, serta jangkauan pasar global.
3. THE Guest_View SHALL menampilkan bagian indikator kepercayaan (trust strip) yang memuat tepat 3 sampai 4 metrik ilustratif, dengan setiap metrik memuat nilai angka (boleh disertai pemisah ribuan atau imbuhan satuan) dan label deskriptif (1 sampai 60 karakter; contoh: jumlah produk, jumlah vendor, jumlah negara tujuan).
4. THE Guest_View SHALL menandai bagian indikator kepercayaan sebagai konten ilustratif statis dan SHALL tidak menarik nilai metrik tersebut dari data backend.
5. THE Guest_View SHALL menampilkan bagian "Sorotan Komoditas" yang memuat tepat 3 sampai 8 kategori atau komoditas unggulan, dengan setiap entri memuat nama kategori atau komoditas (1 sampai 60 karakter).
6. THE Guest_View SHALL menampilkan seluruh teks Konten_Informatif dalam Bahasa Indonesia tanpa menyisakan teks berbahasa lain pada elemen yang terlihat.
7. THE Guest_View SHALL merender seluruh bagian Konten_Informatif menggunakan font utama "Sora" dan hanya menggunakan warna yang didefinisikan dalam Palet_Warna.
8. THE Konten_Informatif SHALL mempertahankan rasio kontras minimal 4.5:1 untuk teks normal dan minimal 3:1 untuk teks besar (>=18.66px tebal atau >=24px) terhadap latar belakangnya, sesuai standar WCAG 2.1 tingkat AA.
9. THE Konten_Informatif SHALL menampilkan tata letak yang responsif pada lebar viewport 360px, 768px, dan 1280px tanpa terjadi tumpang tindih elemen atau scroll horizontal.
10. IF Pengguna_Reduced_Motion mengakses Landing_Page, THEN THE Sistem_Animasi SHALL menampilkan seluruh bagian Konten_Informatif langsung dalam keadaan akhir tanpa gerak.
11. THE Guest_View SHALL menampilkan seluruh bagian Konten_Informatif tanpa mengubah nama, jumlah, maupun tipe data props yang diterima `Home.tsx`.
