/**
 * GuestFooter — footer merek + hak cipta untuk Guest_View Landing_Page Exporia.
 *
 * Komponen presentational murni (tanpa props, tanpa akses DOM saat render),
 * sehingga SSR-safe. Tahun hak cipta dihitung dinamis via
 * `new Date().getFullYear()` yang aman dijalankan di server maupun klien.
 *
 * Hanya menggunakan token Palet_Warna (primary/secondary/accent/surface/ink)
 * dan font utama "Sora" (default `font-sans`). Seluruh teks Bahasa Indonesia.
 * Req 3.4, 5.4.
 */
export default function GuestFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative z-10 border-t border-secondary/10 bg-surface text-ink">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="flex items-center gap-2">
                    <span
                        aria-hidden="true"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-surface"
                    >
                        {/* Ikon jangkar — penanda tema maritim ekspor-impor */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <circle cx="12" cy="5" r="3" />
                            <line x1="12" y1="22" x2="12" y2="8" />
                            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                        </svg>
                    </span>
                    <span className="text-lg font-bold tracking-tight text-secondary">
                        Exporia
                    </span>
                </div>

                <p className="text-sm text-ink/70">
                    &copy; {year} Exporia. Platform B2B ekspor-impor Indonesia.
                    Seluruh hak cipta dilindungi.
                </p>
            </div>
        </footer>
    );
}
