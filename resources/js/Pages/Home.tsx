import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Product, PaginationProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import ProductItem from "@/Components/App/ProductItem";

interface Props extends PageProps {
    products: PaginationProps<Product>;
    departemens: Array<{ id: number; name: string }>;
    filters: { search?: string; departemen_id?: string };
}

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
            <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between font-sans relative overflow-hidden">
                {/* Visual Glow Orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                <Head title="Welcome to Exporia - Indonesia B2B Gateway" />

                {/* Top Simple Header */}
                <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-white/5 relative z-10">
                    <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">
                        Exporia
                    </span>
                    <span className="text-xs text-gray-500 font-bold tracking-widest uppercase hidden sm:inline-block">
                        INDONESIAN B2B EXPORT GATEWAY
                    </span>
                </header>

                {/* Welcome Selection Body */}
                <main className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col items-center justify-center flex-1 relative z-10 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-8 uppercase tracking-widest animate-pulse">
                        Eksportir & Importir Terkoneksi
                    </span>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight max-w-4xl">
                        Gerbang Utama Ekspor <br/>
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">
                            B2B Terbaik di Indonesia
                        </span>
                    </h1>

                    <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-14 max-w-2xl font-medium leading-relaxed">
                        Exporia mempertemukan produsen lokal pilihan dengan importir internasional secara langsung, aman, dan efisien. Hubungkan bisnis Anda dengan ekosistem pasar global sekarang.
                    </p>

                    {/* Login vs SignUp Choice Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                        {/* Option 1: Login */}
                        <div className="group bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-blue-500/30 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 text-left flex flex-col justify-between h-[260px] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-all"></div>
                            <div>
                                <div className="p-3.5 bg-blue-500/10 text-blue-400 rounded-2xl w-fit mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Masuk ke Akun</h3>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                    Sudah memiliki akun terdaftar? Masuk untuk mengelola transaksi B2B Anda sekarang.
                                </p>
                            </div>
                            <Link
                                href={route('login')}
                                className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25"
                            >
                                Masuk Akun
                            </Link>
                        </div>

                        {/* Option 2: Register */}
                        <div className="group bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-indigo-500/30 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 text-left flex flex-col justify-between h-[260px] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/15 transition-all"></div>
                            <div>
                                <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl w-fit mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Daftar Akun Baru</h3>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                    Baru di Exporia? Daftarkan profil perusahaan atau diri Anda secara gratis dalam 2 menit.
                                </p>
                            </div>
                            <Link
                                href={route('register')}
                                className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold text-sm transition-all"
                            >
                                Buat Akun Baru
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer simple */}
                <footer className="max-w-7xl mx-auto w-full px-6 py-6 text-center text-xs text-gray-600 relative z-10 border-t border-white/5">
                    &copy; {new Date().getFullYear()} Exporia B2B Portal. All rights reserved.
                </footer>
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
