/**
 * Konten Informatif statis untuk Guest_View Landing_Page Exporia.
 *
 * Seluruh data di berkas ini bersifat ILUSTRATIF dan di-hardcode (Bahasa Indonesia).
 * Tidak ada nilai yang ditarik dari backend dan tidak menambah/mengubah kontrak
 * props `Home.tsx` (Req 6.4, 6.11).
 *
 * Batas yang dijaga (Req 6.1–6.6):
 * - HowItWorksStep: title 1–100, description 1–200, number menaik mulai 1 tanpa lompatan
 * - Feature: title 1–100, description 1–200; gabungan butir wajib mencakup koneksi
 *   langsung antarpelaku usaha, keamanan transaksi, dan jangkauan pasar global
 * - TrustMetric: value string non-kosong (boleh ada pemisah ribuan/imbuhan satuan),
 *   label 1–60
 * - Commodity: name 1–60
 */

// Langkah pada bagian "Cara Kerja" (Req 6.1): 3–5 entri,
// `number` menaik mulai dari 1 tanpa lompatan.
export interface HowItWorksStep {
    number: number; // 1, 2, 3, ... berurutan
    title: string; // 1–100 karakter
    description: string; // 1–200 karakter
}

// Butir pada bagian "Fitur dan Manfaat" (Req 6.2): 3–6 entri,
// wajib mencakup koneksi langsung, keamanan transaksi, jangkauan global.
export interface Feature {
    title: string; // 1–100 karakter
    description: string; // 1–200 karakter
}

// Metrik ilustratif pada trust strip (Req 6.3, 6.4): 3–4 entri.
// `value` adalah string (boleh memuat pemisah ribuan/imbuhan satuan).
export interface TrustMetric {
    value: string; // mis. "10.000+", "45", "1.200+"
    label: string; // 1–60 karakter
}

// Sorotan komoditas/kategori (Req 6.5): 3–8 entri.
export interface Commodity {
    name: string; // 1–60 karakter
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
    {
        number: 1,
        title: "Daftar dan Verifikasi Usaha",
        description:
            "Buat akun Exporia, lengkapi profil bisnis Anda, lalu verifikasi legalitas usaha agar siap bertransaksi lintas negara.",
    },
    {
        number: 2,
        title: "Jelajahi Produk dan Mitra",
        description:
            "Telusuri katalog komoditas dan temukan pemasok maupun pembeli tepercaya sesuai kebutuhan ekspor-impor Anda.",
    },
    {
        number: 3,
        title: "Negosiasi dan Sepakati Transaksi",
        description:
            "Hubungi mitra secara langsung, sepakati harga serta syarat pengiriman, dan amankan pembayaran melalui sistem yang terlindungi.",
    },
    {
        number: 4,
        title: "Kirim dan Lacak Pengiriman",
        description:
            "Atur logistik, pantau status pengiriman, dan selesaikan transaksi dengan dokumentasi yang rapi hingga barang tiba di tujuan.",
    },
];

export const FEATURES: Feature[] = [
    {
        title: "Koneksi Langsung Antarpelaku Usaha",
        description:
            "Hubungkan eksportir, importir, dan pemasok tanpa perantara berlebih sehingga komunikasi bisnis menjadi lebih cepat dan efisien.",
    },
    {
        title: "Keamanan Transaksi Terjamin",
        description:
            "Setiap pembayaran dan kesepakatan dilindungi sistem keamanan transaksi yang andal untuk meminimalkan risiko penipuan.",
    },
    {
        title: "Jangkauan Pasar Global",
        description:
            "Perluas peluang dagang Anda ke berbagai negara tujuan dan jangkau pasar global langsung dari satu platform terpadu.",
    },
    {
        title: "Manajemen Komoditas Terpusat",
        description:
            "Kelola katalog produk, stok, dan dokumen perdagangan dalam satu tempat agar operasional ekspor-impor lebih tertata.",
    },
];

export const TRUST_METRICS: TrustMetric[] = [
    { value: "10.000+", label: "Produk terdaftar" },
    { value: "1.200+", label: "Vendor aktif" },
    { value: "45+", label: "Negara tujuan" },
    { value: "99%", label: "Transaksi aman" },
];

export const COMMODITIES: Commodity[] = [
    { name: "Kopi" },
    { name: "Rempah-rempah" },
    { name: "Hasil Laut" },
    { name: "Tekstil" },
    { name: "Kelapa Sawit" },
    { name: "Kerajinan Tangan" },
    { name: "Karet Alam" },
    { name: "Kakao" },
];
