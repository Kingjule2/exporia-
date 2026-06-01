import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import CurrencyFormatter from '@/Components/Core/CurrencyFormatter';
import { Product } from '@/types';

interface CartItem {
    product_id: number;
    quantity: number;
    option_ids: Record<string, number> | null;
    product: Product;
    price: number;
}

interface Props {
    items: Record<string, CartItem>;
    total: number;
}

export default function Index({ items, total }: Props) {
    const cartItems = Object.values(items);

    const updateQuantity = (item: CartItem, newQty: number) => {
        if (newQty < 1) return;
        router.put(route('cart.update', item.product_id), {
            quantity: newQty,
            option_ids: item.option_ids
        }, {
            preserveScroll: true
        });
    };

    const checkout = () => {
        router.post(route('cart.checkout'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Keranjang Belanja - Exporia" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Header Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Keranjang Belanja</h1>
                    <p className="text-sm text-gray-500 mt-1">Kelola barang belanjaan B2B Anda sebelum melanjutkan ke pembayaran aman.</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-3xl p-16 text-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">Keranjang Anda Kosong</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto">Anda belum memasukkan produk ekspor pilihan ke dalam keranjang belanja.</p>
                        <Link 
                            href="/" 
                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 shadow-md shadow-blue-500/10 hover:shadow-lg transition-all"
                        >
                            Mulai Belanja
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 space-y-4">
                            {cartItems.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center gap-5 hover:shadow-md transition-shadow duration-350"
                                >
                                    {/* Thumbnail Image */}
                                    <img
                                        src={item.product.image || '/storage/default.png'}
                                        alt={item.product.title}
                                        className="w-24 h-24 object-cover rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shrink-0"
                                    />
                                    
                                    {/* Item details */}
                                    <div className="flex-1 text-center sm:text-left space-y-1 min-w-0 w-full">
                                        <Link 
                                            href={route('products.show', item.product.slug)} 
                                            className="text-base font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors line-clamp-1"
                                        >
                                            {item.product.title}
                                        </Link>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">
                                            {item.product.departemen?.name || "Kategori"}
                                        </p>
                                        <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-2">
                                            <CurrencyFormatter amount={item.price} />
                                        </div>
                                    </div>

                                    {/* Quantity Adjuster */}
                                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900/60 p-1.5 rounded-xl border border-gray-100 dark:border-gray-800 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(item, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-gray-850 hover:bg-gray-100 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 font-black text-sm disabled:opacity-30 border border-gray-100 dark:border-gray-700"
                                        >
                                            &minus;
                                        </button>
                                        <span className="w-8 text-center text-sm font-extrabold text-gray-900 dark:text-white">
                                            {item.quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(item, item.quantity + 1)}
                                            disabled={item.quantity >= (item.product.quantity || 10)}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-gray-850 hover:bg-gray-100 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 font-black text-sm disabled:opacity-30 border border-gray-100 dark:border-gray-700"
                                        >
                                            &#43;
                                        </button>
                                    </div>

                                    {/* Action Column */}
                                    <div className="shrink-0">
                                        <Link
                                            href={route('cart.destroy', item.product_id)}
                                            method="delete"
                                            as="button"
                                            data={{ option_ids: item.option_ids }}
                                            className="p-3 text-red-500 hover:text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                                            title="Hapus Produk"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Column */}
                        <div className="lg:col-span-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 p-6 rounded-3xl shadow-sm space-y-6">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight pb-3 border-b border-gray-50 dark:border-gray-700/40">
                                Ringkasan Belanja
                            </h3>
                            
                            <div className="space-y-3 text-sm font-medium">
                                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                    <span>Total Barang</span>
                                    <span className="font-bold text-gray-800 dark:text-gray-200">
                                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Pcs
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                    <span>Pengiriman B2B</span>
                                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                                        Kalkulasi Di Pelabuhan
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 dark:border-gray-700/40 flex justify-between items-end">
                                <span className="text-sm font-bold text-gray-900 dark:text-white">Subtotal</span>
                                <span className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                                    <CurrencyFormatter amount={total} />
                                </span>
                            </div>

                            <button
                                onClick={checkout}
                                className="btn btn-primary btn-block rounded-2xl py-4 font-bold text-white shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/25 border-none bg-blue-600 hover:bg-blue-500"
                            >
                                Lanjutkan ke Checkout
                            </button>

                            <div className="text-center">
                                <Link 
                                    href="/" 
                                    className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-blue-600 transition-colors"
                                >
                                    &larr; Kembali Belanja
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
