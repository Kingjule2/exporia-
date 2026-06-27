import { Link } from '@inertiajs/react';
import React from 'react';

interface HeroSectionProps {
    /** Deskripsi singkat platform (1–300 karakter). Dijaga konstan di kode. */
    description: string;
}

/**
 * HeroSection — kolom editorial kiri pada Guest_View "Horizon Dagang".
 *
 * Komponen presentational murni (SSR-safe, tanpa akses `window`/`document`).
 * Animasi kemunculan memakai kelas `animate-rise` (rise 600ms ease-out both)
 * dengan `animationDelay` bertingkat (stagger). Delay terbesar 200ms sehingga
 * elemen terakhir selesai pada 200ms + 600ms = 800ms, masih dalam rentang
 * 200–800ms (Req 4.1). `fill-mode: both` dari utilitas `animate-rise` menjamin
 * elemen tetap di keadaan akhir bila animasi gagal dimulai (Req 4.7), dan
 * animasi hanya memakai `transform`/`opacity` sehingga tanpa layout shift
 * (Req 4.6). Seluruh teks Bahasa Indonesia dan hanya memakai token Palet_Warna
 * dengan font Sora (Req 6.7).
 */
export default function HeroSection({ description }: HeroSectionProps) {
    return (
        <section className="relative isolate overflow-hidden">
            {/* Foto laut sebagai latar hero (Aron Yigin / Unsplash) */}
            <img
                src="/images/hero-ocean.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            {/* Scrim agar teks terbaca (kontras WCAG AA) */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/30"
            />

            <div className="mx-auto flex max-w-7xl flex-col items-start px-6 py-24 text-left lg:py-32">
                {/* Eyebrow chip */}
                <span
                    className="animate-rise inline-flex items-center gap-2 rounded-full border border-surface/25 bg-surface/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-surface backdrop-blur-sm"
                    style={{ animationDelay: '0ms' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v6m0 0a4 4 0 100 8 4 4 0 000-8zm0 8v12M4 22h16" />
                    </svg>
                    Gerbang Dagang Ekspor-Impor
                </span>

                {/* Judul utama (Sora 800) */}
                <h1
                    className="animate-rise mt-6 max-w-2xl font-sans text-4xl font-extrabold leading-tight tracking-tight text-surface sm:text-5xl lg:text-6xl"
                    style={{ animationDelay: '80ms' }}
                >
                    Hubungkan Bisnis Anda ke{' '}
                    <span className="text-accent">Pasar Global</span>
                </h1>

                {/* Paragraf deskripsi */}
                <p
                    className="animate-rise mt-6 max-w-xl text-base font-medium leading-relaxed text-surface/85 sm:text-lg"
                    style={{ animationDelay: '160ms' }}
                >
                    {description}
                </p>

                {/* CTA utama */}
                <Link
                    href={route('register')}
                    className="animate-rise group mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-7 py-3.5 text-sm font-bold text-secondary shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
                    style={{ animationDelay: '200ms' }}
                >
                    Mulai Sekarang
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
