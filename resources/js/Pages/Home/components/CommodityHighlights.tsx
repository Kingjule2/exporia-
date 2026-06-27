import { COMMODITIES } from './content';

/**
 * CommodityHighlights — bagian "Sorotan Komoditas" untuk Guest_View Landing_Page.
 *
 * Menonjolkan 3–8 kategori/komoditas unggulan (dibaca dari konstanta in-file
 * `COMMODITIES`) sebagai rangkaian chip yang membungkus (wrap) secara responsif
 * tanpa scroll horizontal pada lebar 360px, 768px, dan 1280px.
 *
 * Komponen presentational murni (tanpa props, tanpa akses DOM saat render)
 * sehingga aman untuk SSR. Hanya menggunakan token Palet_Warna
 * (primary/secondary/accent/surface/ink) dan font Sora (font-sans default).
 *
 * Req 6.5, 6.7, 6.9
 */
export default function CommodityHighlights() {
    return (
        <section
            id="sorotan-komoditas"
            aria-labelledby="commodity-highlights-heading"
            className="relative z-10 w-full scroll-mt-28 font-sans"
        >
            <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-secondary">
                        Sorotan Komoditas
                    </span>
                    <h2
                        id="commodity-highlights-heading"
                        className="mt-4 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl"
                    >
                        Komoditas Unggulan Lintas Negara
                    </h2>
                    <p className="mt-3 text-base text-ink/70">
                        Beragam kategori komoditas ekspor-impor siap Anda jelajahi dan
                        perdagangkan di platform Exporia.
                    </p>
                </div>

                {/* Rangkaian chip yang membungkus responsif tanpa scroll horizontal */}
                <ul className="mt-10 flex flex-wrap justify-center gap-3">
                    {COMMODITIES.map((commodity) => (
                        <li key={commodity.name}>
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface px-4 py-2 text-sm font-semibold text-secondary shadow-sm transition-all duration-200 hover:border-primary hover:bg-primary hover:text-surface hover:shadow-md">
                                <span
                                    className="h-2 w-2 rounded-full bg-accent"
                                    aria-hidden="true"
                                />
                                {commodity.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
