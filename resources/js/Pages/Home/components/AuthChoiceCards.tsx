import { Link } from '@inertiajs/react';

/**
 * AuthChoiceCards — dua kartu pilihan autentikasi pada Guest_View.
 *
 * Menampilkan kartu "Masuk Akun" → route('login') dan kartu
 * "Buat Akun Baru" → route('register') (Req 3.2, 3.3).
 *
 * Komponen presentational murni (tanpa props, tanpa akses `window`/`document`
 * saat render) sehingga aman untuk SSR. Hanya menggunakan token Palet_Warna
 * (primary/secondary/accent/surface/ink) dan font "Sora" (default `font-sans`)
 * (Req 6.7).
 *
 * Animasi hover: setiap kartu mengangkat (lift) via `hover:-translate-y-1` dan
 * `hover:shadow-xl` dengan `transition-all duration-300` (300ms, masuk rentang
 * 100–400ms, Req 4.2). Saat kursor meninggalkan kartu, transisi yang sama
 * mengembalikan kartu ke keadaan awal dengan durasi yang sama (Req 4.3).
 * Animasi hanya memengaruhi `transform`/`box-shadow` (composited) sehingga
 * tidak menimbulkan layout shift (Req 4.6).
 */
export default function AuthChoiceCards() {
    return (
        <section
            aria-label="Pilihan masuk atau daftar"
            className="grid w-full grid-cols-1 gap-5 font-sans sm:grid-cols-2"
        >
            {/* Kartu: Masuk Akun → route('login') */}
            <Link
                href={route('login')}
                className="group flex flex-col justify-between rounded-3xl border border-primary/15 bg-white p-6 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 dark:bg-secondary/40"
            >
                <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-secondary dark:text-surface">
                        Masuk Akun
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-ink/70 dark:text-surface/70">
                        Sudah memiliki akun terdaftar? Masuk untuk mengelola transaksi
                        ekspor-impor Anda.
                    </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                    Masuk Akun
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </span>
            </Link>

            {/* Kartu: Buat Akun Baru → route('register') */}
            <Link
                href={route('register')}
                className="group flex flex-col justify-between rounded-3xl border border-accent/30 bg-secondary p-6 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
            >
                <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <line x1="19" y1="8" x2="19" y2="14" />
                            <line x1="22" y1="11" x2="16" y2="11" />
                        </svg>
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-surface">
                        Buat Akun Baru
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-surface/70">
                        Baru di Exporia? Daftarkan profil perusahaan atau diri Anda
                        secara gratis dalam hitungan menit.
                    </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                    Buat Akun Baru
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </span>
            </Link>
        </section>
    );
}
