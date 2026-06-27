import { HOW_IT_WORKS_STEPS } from "./content";

/**
 * Bagian "Cara Kerja" pada Guest_View Landing_Page (Req 6.1).
 *
 * Komponen presentational murni: membaca konstanta in-file `HOW_IT_WORKS_STEPS`
 * dan merender nomor urut (sesuai urutan array), judul, dan deskripsi tiap langkah.
 * Tidak mengakses `window`/`document` saat render sehingga SSR-safe.
 *
 * Menggunakan token Palet_Warna (primary/secondary/accent/surface/ink) dan font
 * utama "Sora" (font sans default). Animasi kemunculan `rise` hanya aktif saat
 * gerak diizinkan (`motion-safe`) sehingga otomatis nonaktif bagi
 * Pengguna_Reduced_Motion (Req 6.10).
 */
export default function HowItWorks() {
    return (
        <section
            id="cara-kerja"
            aria-labelledby="cara-kerja-heading"
            className="font-sans w-full scroll-mt-28 bg-surface py-16 sm:py-20"
        >
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        Cara Kerja
                    </span>
                    <h2
                        id="cara-kerja-heading"
                        className="mt-4 text-2xl font-extrabold tracking-tight text-secondary sm:text-3xl"
                    >
                        Mulai Ekspor-Impor dalam Beberapa Langkah
                    </h2>
                    <p className="mt-3 text-base text-ink/80">
                        Ikuti alur sederhana berikut untuk memulai aktivitas
                        perdagangan lintas negara bersama Exporia.
                    </p>
                </div>

                <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {HOW_IT_WORKS_STEPS.map((step, index) => (
                        <li
                            key={step.number}
                            className="motion-safe:animate-rise flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            style={{ animationDelay: `${index * 120}ms` }}
                        >
                            <span
                                aria-hidden="true"
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-extrabold text-secondary"
                            >
                                {step.number}
                            </span>
                            <h3 className="mt-5 text-lg font-bold text-secondary">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-ink/80">
                                {step.description}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
