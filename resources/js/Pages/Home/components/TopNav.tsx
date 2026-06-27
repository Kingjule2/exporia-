import { Link } from '@inertiajs/react';

/**
 * TopNav — navbar atas Guest_View: simpel, modern, sticky.
 *
 * Bar transparan-blur yang menempel di atas (sticky) berisi wordmark "Exporia"
 * dengan ikon jangkar, tautan anchor ke bagian halaman (Cara Kerja, Fitur,
 * Sorotan Komoditas), serta aksi Masuk/Daftar di kanan.
 *
 * Komponen presentational murni (tanpa state, tanpa akses `window`/`document`
 * saat render) sehingga aman untuk SSR. Hanya memakai token Palet_Warna dan
 * font Sora.
 *
 * Req 3.4, 6.7
 */

const NAV_LINKS = [
    { label: 'Cara Kerja', href: '#cara-kerja' },
    { label: 'Fitur', href: '#fitur' },
    { label: 'Sorotan Komoditas', href: '#sorotan-komoditas' },
];

export default function TopNav() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-secondary/10 bg-surface/80 backdrop-blur-md font-sans">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                {/* Wordmark */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80"
                    aria-label="Exporia — beranda"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-surface shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="5" r="3" />
                            <line x1="12" y1="22" x2="12" y2="8" />
                            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                        </svg>
                    </span>
                    <span className="text-xl font-extrabold tracking-tight text-secondary">
                        Exporia
                    </span>
                </Link>

                {/* Tautan tengah (anchor section) */}
                <nav
                    aria-label="Navigasi bagian halaman"
                    className="hidden items-center gap-1 md:flex"
                >
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-ink/70 transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Aksi autentikasi */}
                <nav className="flex items-center gap-2 sm:gap-3" aria-label="Akun">
                    <Link
                        href={route('login')}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-secondary transition-colors duration-200 hover:text-primary sm:px-4"
                    >
                        Masuk
                    </Link>
                    <Link
                        href={route('register')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-surface shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md sm:px-5"
                    >
                        Daftar
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
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
                    </Link>
                </nav>
            </div>
        </header>
    );
}
