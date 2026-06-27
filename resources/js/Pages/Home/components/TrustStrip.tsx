import { TRUST_METRICS } from "./content";

/**
 * TrustStrip — Indikator Kepercayaan (Req 6.3, 6.4)
 *
 * Menampilkan 3–4 metrik ILUSTRATIF statis untuk membangun kredibilitas
 * Guest_View. Data berasal dari konstanta in-file `TRUST_METRICS` pada
 * `content.ts` — BUKAN props dan BUKAN data backend. Komponen ini sengaja
 * tidak menerima props data agar kontrak props `Home.tsx` tetap utuh (Req 6.11)
 * dan agar penegasan "bukan data live" terjaga (Req 6.4).
 *
 * Presentational murni & SSR-safe: tidak mengakses `window`/`document` saat
 * render. Menggunakan font "Sora" (default `font-sans`) dan hanya token
 * Palet_Warna (primary/secondary/accent/surface/ink) (Req 6.7).
 */
export default function TrustStrip() {
    return (
        <section
            aria-label="Indikator kepercayaan"
            className="font-sans w-full bg-surface py-12 sm:py-16"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
                    <h2 className="text-lg font-semibold text-secondary sm:text-xl">
                        Dipercaya pelaku ekspor-impor
                    </h2>
                    {/* Penanda terlihat bahwa angka bersifat ilustratif, bukan live (Req 6.4) */}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-ink">
                        <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-accent"
                        />
                        Data ilustratif
                    </span>
                </div>

                <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                    {TRUST_METRICS.map((metric) => (
                        <div
                            key={metric.label}
                            className="rounded-2xl border border-primary/10 bg-white p-5 text-center shadow-sm sm:p-6"
                        >
                            <dd className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                                {metric.value}
                            </dd>
                            <dt className="mt-1 text-sm font-medium text-secondary sm:text-base">
                                {metric.label}
                            </dt>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
