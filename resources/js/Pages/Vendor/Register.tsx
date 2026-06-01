import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Core/InputError';
import InputLabel from '@/Components/Core/InputLabel';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import TextInput from '@/Components/Core/TextInput';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        shop_name: '',
        company_number: '',
        factory_location: '',
        production_capacity: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('vendor.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Vendor Registration" />

            <div className="text-center mb-6">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Daftar Akun Vendor</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Mulai pasarkan produk B2B Anda ke kancah internasional.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Shop Name */}
                <div>
                    <InputLabel htmlFor="shop_name" value="Nama Toko / Perusahaan B2B" />
                    <TextInput
                        id="shop_name"
                        name="shop_name"
                        value={data.shop_name}
                        className="mt-1 block w-full rounded-xl"
                        autoComplete="shop_name"
                        isFocused={true}
                        onChange={(e) => setData('shop_name', e.target.value)}
                        placeholder="Contoh: PT. Maju Bersama Jaya"
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
                        className="mt-1 block w-full rounded-xl"
                        onChange={(e) => setData('company_number', e.target.value)}
                        placeholder="Contoh: 912000678910"
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
                        className="mt-1 block w-full rounded-xl"
                        onChange={(e) => setData('factory_location', e.target.value)}
                        placeholder="Contoh: Kawasan Industri Gresik, Jawa Timur"
                        required
                    />
                    <InputError message={errors.factory_location} className="mt-2" />
                </div>

                {/* Production Capacity */}
                <div>
                    <InputLabel htmlFor="production_capacity" value="Kapasitas Produksi Tahunan" />
                    <TextInput
                        id="production_capacity"
                        name="production_capacity"
                        value={data.production_capacity}
                        className="mt-1 block w-full rounded-xl"
                        onChange={(e) => setData('production_capacity', e.target.value)}
                        placeholder="Contoh: 10.000 Unit per Tahun"
                        required
                    />
                    <InputError message={errors.production_capacity} className="mt-2" />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email Perusahaan" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="email@perusahaan.com"
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Minimal 8 karakter"
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full rounded-xl"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        placeholder="Ketik ulang password"
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <PrimaryButton className="w-full justify-center rounded-xl py-2.5 font-bold shadow-md shadow-blue-500/10 hover:shadow-lg" disabled={processing}>
                        Daftar Akun Vendor
                    </PrimaryButton>
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                            Masuk disini
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
