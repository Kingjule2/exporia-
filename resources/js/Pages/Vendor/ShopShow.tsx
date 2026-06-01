import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Product, PaginationProps, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import ProductItem from "@/Components/App/ProductItem";

interface Props extends PageProps {
    vendor: User & {
        shop_name: string;
        company_number: string;
        factory_location: string;
        production_capacity: string;
    };
    products: PaginationProps<Product>;
}

export default function ShopShow({ vendor, products }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title={`${vendor.shop_name} - Profil Perusahaan & Katalog B2B`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Modern Enterprise Banner (Alibaba Style) */}
                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl overflow-hidden shadow-xl p-8 md:p-12 mb-10 border border-slate-700/30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-650/10 rounded-full blur-3xl -ml-24 -mb-24"></div>

                    <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        {/* Company Branding & Summary */}
                        <div className="flex-1 space-y-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-blue-500/15 text-blue-400 border border-blue-500/25 uppercase tracking-widest">
                                Eksportir Terverifikasi B2B
                            </span>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                                {vendor.shop_name || "Nama Perusahaan"}
                            </h1>
                            <p className="text-sm text-gray-300 max-w-xl font-medium leading-relaxed">
                                Selamat datang di profil resmi B2B kami. Kami berkomitmen untuk menyajikan produk berkualitas tinggi dengan kapasitas produksi massal langsung dari pabrik kami di Indonesia.
                            </p>
                        </div>

                        {/* Quick Contact / Actions */}
                        <div className="flex shrink-0 gap-3">
                            <a 
                                href={`mailto:${vendor.email}`}
                                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg"
                            >
                                Hubungi Eksportir
                            </a>
                            <button
                                onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
                                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-250 text-sm font-bold transition-all"
                            >
                                Lihat Katalog
                            </button>
                        </div>
                    </div>

                    {/* Alibaba-style Factory Specifications Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10 relative">
                        {/* Company NIB */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-5 rounded-2xl flex items-start gap-4">
                            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">No. Registrasi Perusahaan</span>
                                <span className="font-extrabold text-sm text-white mt-1 block truncate max-w-[180px]" title={vendor.company_number}>
                                    {vendor.company_number || "Tidak Tersedia"}
                                </span>
                            </div>
                        </div>

                        {/* Factory Location */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-5 rounded-2xl flex items-start gap-4">
                            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Lokasi Pabrik Utama</span>
                                <span className="font-extrabold text-sm text-white mt-1 block truncate max-w-[180px]" title={vendor.factory_location}>
                                    {vendor.factory_location || "Tidak Tersedia"}
                                </span>
                            </div>
                        </div>

                        {/* Production Capacity */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-5 rounded-2xl flex items-start gap-4">
                            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Kapasitas Produksi</span>
                                <span className="font-extrabold text-sm text-white mt-1 block truncate max-w-[180px]" title={vendor.production_capacity}>
                                    {vendor.production_capacity || "Tidak Tersedia"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vendor's Products Section */}
                <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                            Katalog Produk Resmi
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Seluruh produk pilihan yang didistribusikan langsung oleh {vendor.shop_name}.
                        </p>
                    </div>
                </div>

                {/* Products Grid */}
                {products?.data && products.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {products.data.map((product) => (
                            <ProductItem product={product} key={product.id}></ProductItem>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700 rounded-2xl shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="text-lg font-bold text-gray-800 dark:text-white">Katalog Masih Kosong</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs mt-1">Vendor ini belum menerbitkan produk apapun ke dalam sistem.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
