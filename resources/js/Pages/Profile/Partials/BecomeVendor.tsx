import { Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import InputError from '@/Components/Core/InputError';
import InputLabel from '@/Components/Core/InputLabel';
import TextInput from '@/Components/Core/TextInput';
import PrimaryButton from '@/Components/Core/PrimaryButton';

interface BecomeVendorProps {
    className?: string;
}

export default function BecomeVendor({ className = '' }: BecomeVendorProps) {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        shop_name: user?.shop_name || '',
        company_number: user?.company_number || '',
        factory_location: user?.factory_location || '',
        production_capacity: user?.production_capacity || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('vendor.become'), {
            onSuccess: () => {
                // Success is redirected to dashboard
            }
        });
    };

    // If the user has already registered a shop, show their active vendor status
    if (user?.shop_name && user?.company_number) {
        return (
            <section className={className}>
                <header className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Informasi Vendor & Perusahaan
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Akun Anda terdaftar sebagai Vendor resmi di Exporia.
                    </p>
                </header>

                <div className="bg-gradient-to-br from-green-50 to-green-50/30 dark:from-green-950/20 dark:to-green-950/5 p-6 rounded-2xl border border-green-100 dark:border-green-900/40 space-y-4">
                    <div className="flex items-center gap-3 text-green-700 dark:text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 className="font-bold text-base text-green-800 dark:text-green-300">Akun Vendor Aktif</h3>
                            <p className="text-xs mt-0.5 opacity-90">Selamat! Perusahaan Anda telah terverifikasi untuk melakukan perdagangan global.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-green-100/50 dark:border-green-900/20 text-sm text-gray-700 dark:text-gray-300">
                        <div>
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block">Nama Toko / Perusahaan</span>
                            <span className="font-bold text-gray-950 dark:text-white mt-0.5 block">{user.shop_name}</span>
                        </div>
                        <div>
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block">Nomor Registrasi Perusahaan</span>
                            <span className="font-bold text-gray-950 dark:text-white mt-0.5 block">{user.company_number}</span>
                        </div>
                        <div className="sm:col-span-2">
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block">Lokasi Pabrik</span>
                            <span className="font-bold text-gray-950 dark:text-white mt-0.5 block">{user.factory_location}</span>
                        </div>
                        <div>
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block">Kapasitas Produksi Tahunan</span>
                            <span className="font-bold text-gray-950 dark:text-white mt-0.5 block">{user.production_capacity}</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Link
                            href={route('vendor.dashboard')}
                            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 shadow-md shadow-blue-500/10 transition-all"
                        >
                            Masuk ke Dashboard Vendor
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Menjadi Vendor Resmi (Mulai Berjualan)
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Daftarkan toko dan perusahaan B2B Anda untuk memulai ekspor global produk pilihan di Exporia.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-5">
                {/* Shop Name */}
                <div>
                    <InputLabel htmlFor="shop_name" value="Nama Toko / Perusahaan B2B" />
                    <TextInput
                        id="shop_name"
                        name="shop_name"
                        value={data.shop_name}
                        className="mt-1 block w-full rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-500"
                        onChange={(e) => setData('shop_name', e.target.value)}
                        placeholder="Contoh: PT. Sumber Agung Nusantara"
                        required
                    />
                    <InputError message={errors.shop_name} className="mt-2" />
                </div>

                {/* Company Number */}
                <div>
                    <InputLabel htmlFor="company_number" value="Nomor Registrasi Perusahaan (NIB/SIUP)" />
                    <TextInput
                        id="company_number"
                        name="company_number"
                        value={data.company_number}
                        className="mt-1 block w-full rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-500"
                        onChange={(e) => setData('company_number', e.target.value)}
                        placeholder="Contoh: 9120001234567"
                        required
                    />
                    <InputError message={errors.company_number} className="mt-2" />
                </div>

                {/* Factory Location */}
                <div>
                    <InputLabel htmlFor="factory_location" value="Lokasi Pabrik / Operasional Utama" />
                    <TextInput
                        id="factory_location"
                        name="factory_location"
                        value={data.factory_location}
                        className="mt-1 block w-full rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-500"
                        onChange={(e) => setData('factory_location', e.target.value)}
                        placeholder="Contoh: Jl. Industri Raya No. 45, Sidoarjo, Jawa Timur"
                        required
                    />
                    <InputError message={errors.factory_location} className="mt-2" />
                </div>

                {/* Production Capacity */}
                <div>
                    <InputLabel htmlFor="production_capacity" value="Kapasitas Produksi per Tahun" />
                    <TextInput
                        id="production_capacity"
                        name="production_capacity"
                        value={data.production_capacity}
                        className="mt-1 block w-full rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-500"
                        onChange={(e) => setData('production_capacity', e.target.value)}
                        placeholder="Contoh: 50.000 Ton per Tahun / 100.000 Unit per Tahun"
                        required
                    />
                    <InputError message={errors.production_capacity} className="mt-2" />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton className="rounded-xl px-5 py-2.5 font-bold shadow-md shadow-blue-500/10 hover:shadow-lg" disabled={processing}>
                        Daftarkan Akun Vendor
                    </PrimaryButton>
                    {processing && <span className="text-sm text-gray-500 animate-pulse">Menyimpan data...</span>}
                </div>
            </form>
        </section>
    );
}
