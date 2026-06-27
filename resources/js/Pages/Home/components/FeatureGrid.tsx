import { FEATURES } from './content';

/**
 * FeatureGrid — bagian "Fitur dan Manfaat" untuk Guest_View Landing_Page.
 *
 * Merender daftar butir fitur dari konstanta in-file `FEATURES` (lihat content.ts).
 * Keseluruhan butir mencakup tiga tema wajib: koneksi langsung antarpelaku usaha,
 * keamanan transaksi, dan jangkauan pasar global (Req 6.2).
 *
 * Tata letak grid responsif tanpa scroll horizontal (Req 6.9):
 * - 1 kolom pada viewport sempit (360px) — `grid-cols-1` default
 * - 2 kolom pada 768px — `md:grid-cols-2`
 * - 3 kolom pada 1280px — `xl:grid-cols-3`
 *
 * Komponen presentational murni (tanpa props, tanpa akses DOM saat render)
 * sehingga aman untuk SSR. Hanya menggunakan token Palet_Warna
 * (primary/secondary/accent/surface/ink) dan font Sora (font-sans default).
 *
 * Req 6.2, 6.7, 6.9
 */
export default function FeatureGrid() {
    return (
        <section
            id="fitur"
            className="relative z-10 w-full scroll-mt-28 font-sans"
            aria-labelledby="feature-grid-heading"
        >
            <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
                {/* Judul bagian */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                        Fitur dan Manfaat
                    </span>
                    <h2
                        id="feature-grid-heading"
                        className="mt-4 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl"
                    >
                        Semua yang Anda butuhkan untuk berdagang lintas negara
                    </h2>
                    <p className="mt-4 text-base text-ink/70">
                        Exporia menyatukan koneksi, keamanan, dan jangkauan pasar global dalam satu platform terpadu.
                    </p>
                </div>

                {/* Grid fitur: 1 / 2 / 3 kolom */}
                <ul
                    role="list"
                    className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                    {FEATURES.map((feature, index) => (
                        <li
                            key={index}
                            className="group flex h-full flex-col rounded-2xl border border-primary/10 bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                        >
                            {/* Ikon dekoratif */}
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-surface shadow-sm transition-colors duration-200 group-hover:bg-secondary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </span>

                            <h3 className="mt-5 text-lg font-bold text-secondary">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-ink/70">
                                {feature.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
