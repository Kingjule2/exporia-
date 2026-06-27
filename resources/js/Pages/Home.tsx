import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Product, PaginationProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import ProductItem from "@/Components/App/ProductItem";
import TopNav from '@/Pages/Home/components/TopNav';
import HeroSection from '@/Pages/Home/components/HeroSection';
import AuthChoiceCards from '@/Pages/Home/components/AuthChoiceCards';
import TrustStrip from '@/Pages/Home/components/TrustStrip';
import HowItWorks from '@/Pages/Home/components/HowItWorks';
import FeatureGrid from '@/Pages/Home/components/FeatureGrid';
import CommodityHighlights from '@/Pages/Home/components/CommodityHighlights';
import GuestFooter from '@/Pages/Home/components/GuestFooter';

interface Props extends PageProps {
    products: PaginationProps<Product>;
    departemens: Array<{ id: number; name: string }>;
    filters: { search?: string; departemen_id?: string };
}

/**
 * Deskripsi singkat platform untuk bagian hero Guest_View (1–300 karakter).
 * Di-hardcode sebagai konstanta in-file (Bahasa Indonesia); bukan props dan
 * bukan data backend, sehingga kontrak props `Home.tsx` tetap utuh (Req 5.1, 6.11).
 */
const HERO_DESCRIPTION =
    'Exporia mempertemukan produsen lokal pilihan dengan importir internasional secara langsung, aman, dan efisien. Hubungkan bisnis Anda ke ekosistem pasar global ekspor-impor sekarang.';

export default function Home({ products, departemens = [], filters = {}, auth }: Props) {
    const user = auth?.user;

    // Search and Filter local state
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedDepartemen, setSelectedDepartemen] = useState(filters.departemen_id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('dashboard'), {
            search: searchTerm,
            departemen_id: selectedDepartemen
        }, {
            preserveScroll: true,
            preserveState: true
        });
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedDepartemen('');
        router.get(route('dashboard'), {}, {
            preserveScroll: true,
            preserveState: true
        });
    };

    // ==========================================
    // 1. GUEST VIEW: WELCOME PORTAL SELECTION
    // ==========================================
    if (!user) {
        return (
            <div className="relative min-h-screen overflow-hidden bg-surface font-sans text-ink">
                <Head title="Exporia — Gerbang Dagang Ekspor-Impor Indonesia" />

                <div className="relative z-10 flex min-h-screen flex-col">
                    {/* Navbar atas: simpel & modern */}
                    <TopNav />

                    <main className="flex-1">
                        {/* Hero full-width dengan latar foto laut */}
                        <HeroSection description={HERO_DESCRIPTION} />

                        {/* Kartu pilihan autentikasi */}
                        <section className="mx-auto w-full max-w-5xl px-6 py-16">
                            <AuthChoiceCards />
                        </section>

                        {/* Konten Informatif */}
                        <TrustStrip />
                        <HowItWorks />
                        <FeatureGrid />
                        <CommodityHighlights />
                    </main>

                    <GuestFooter />
                </div>
            </div>
        );
    }

    // ==========================================
    // 2. USER VIEW: BERANDA WITH ADVANCED FILTERS
    // ==========================================
    return (
        <AuthenticatedLayout>
            <Head title="Beranda Eksportir B2B Indonesia" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Floating Rounded Hero Block */}
                <div className="relative rounded-3xl overflow-hidden shadow-xl mb-10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-14 px-6 md:px-12 border border-slate-900/50">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

                    <div className="relative max-w-2xl mx-auto text-center space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/25 uppercase tracking-widest">
                            Selamat Datang Kembali
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                            Portal Global B2B Exporia
                        </h1>
                        <p className="text-xs md:text-sm text-gray-300 max-w-lg mx-auto font-medium leading-relaxed">
                            Hubungkan pasokan komoditas Indonesia Anda ke pasar internasional, kelola inventori, dan tingkatkan pendapatan ekspor.
                        </p>
                    </div>
                </div>

                {/* Advanced Search & Department Filtering Panel */}
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 p-5 rounded-2xl shadow-sm mb-10">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        {/* Keyword Search Input */}
                        <div className="flex-1 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari nama produk B2B pilihan..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900/55 rounded-xl border border-gray-100 dark:border-gray-800 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Department Selector */}
                        <div className="w-full md:w-64">
                            <select
                                value={selectedDepartemen}
                                onChange={(e) => setSelectedDepartemen(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/55 rounded-xl border border-gray-100 dark:border-gray-800 text-sm font-semibold focus:outline-none focus:border-blue-600 text-gray-700 dark:text-gray-300"
                            >
                                <option value="">Semua Departemen</option>
                                {departemens.map((dept) => (
                                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Search and Reset CTAs */}
                        <div className="flex gap-2 shrink-0">
                            <button
                                type="submit"
                                className="flex-1 md:flex-none inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 active:bg-blue-700 shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-200"
                            >
                                Cari Produk
                            </button>
                            {(filters.search || filters.departemen_id) && (
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-bold transition-all duration-200"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Grid Header Label */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            {(filters.search || filters.departemen_id) ? "Hasil Pencarian" : "Katalog Produk Pilihan"}
                        </h2>
                    </div>
                </div>

                {/* Grid Showcase */}
                {products?.data && products.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {products.data.map((product) => (
                            <ProductItem product={product} key={product.id}></ProductItem>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-16 text-gray-500 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="text-lg font-bold text-gray-800 dark:text-white mb-1">Produk Tidak Ditemukan</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">Silakan coba sesuaikan kata kunci pencarian atau ganti pilihan filter departemen Anda.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
