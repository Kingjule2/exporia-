import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import CurrencyFormatter from '@/Components/Core/CurrencyFormatter';

function Navbar() {
    const { auth, totalPrice = 0, totalQuantity = 0, miniCartitems = {} } = usePage().props as any;
    const user = auth?.user;
    
    // Convert cart items object/dictionary to array
    const cartItems = Object.values(miniCartitems || {}) as any[];

    return (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="navbar p-0 min-h-[64px] flex items-center justify-between">
                    {/* Brand/Logo */}
                    <div className="flex-1">
                        <Link 
                            href="/" 
                            className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
                        >
                            Exporia
                        </Link>
                    </div>

                    {/* Desktop/Right Navigation */}
                    <div className="flex items-center gap-4">
                        {/* Cart Dropdown */}
                        <div className="dropdown dropdown-end">
                            <div 
                                tabIndex={0} 
                                role="button" 
                                className="btn btn-ghost btn-circle text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-all"
                            >
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    {totalQuantity > 0 && (
                                        <span className="badge badge-sm badge-primary indicator-item scale-95 font-bold animate-pulse">
                                            {totalQuantity}
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div
                                tabIndex={0}
                                className="dropdown-content mt-3 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 transition-all duration-200"
                            >
                                <div className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex justify-between items-center">
                                    <span>Keranjang Belanja</span>
                                    <span className="text-sm font-normal text-gray-500">{totalQuantity} Barang</span>
                                </div>

                                {cartItems.length === 0 ? (
                                    <div className="py-8 text-center text-gray-400 dark:text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        <p className="text-sm">Keranjang belanja Anda kosong</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {/* Cart Items List Preview */}
                                        <div className="max-h-60 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                                            {cartItems.slice(0, 3).map((item, index) => (
                                                <div key={index} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                                    <img 
                                                        src={item.product?.image || '/storage/default.png'} 
                                                        alt={item.product?.title}
                                                        className="w-12 h-12 object-cover rounded-lg bg-gray-100 dark:bg-gray-700" 
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.product?.title}</h4>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                            {item.quantity} x <CurrencyFormatter amount={item.price} />
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            {cartItems.length > 3 && (
                                                <div className="text-center text-xs text-blue-600 dark:text-blue-400 font-medium py-1">
                                                    + {cartItems.length - 3} produk lainnya
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                                            <div className="flex justify-between items-center text-sm font-medium mb-3">
                                                <span className="text-gray-500 dark:text-gray-400">Total Sementara:</span>
                                                <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                                                    <CurrencyFormatter amount={totalPrice} />
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link 
                                                    href={route('cart.index')} 
                                                    className="btn btn-primary btn-block rounded-xl font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 text-white"
                                                >
                                                    Lihat Keranjang
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Vendor Quick Access */}
                        {user && (
                            <Link
                                href={user.shop_name ? route('vendor.dashboard') : route('vendor.register')}
                                className="hidden md:inline-flex items-center text-sm font-semibold px-4 py-2 rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all border border-blue-100 dark:border-blue-900/50"
                            >
                                {user.shop_name ? 'Dashboard Vendor' : 'Mulai Berjualan'}
                            </Link>
                        )}

                        {/* Account Menu / Authentication */}
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div 
                                    tabIndex={0} 
                                    role="button" 
                                    className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-blue-500 transition-all"
                                >
                                    <div className="w-9 rounded-full ring-2 ring-gray-100 dark:ring-gray-800">
                                        <img
                                            alt={user.name}
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu menu-sm mt-3 w-56 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
                                >
                                    <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-750 mb-1">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{user.email}</p>
                                    </div>
                                    <li>
                                        <Link href={route('profile.edit')} className="rounded-xl py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-750 flex items-center justify-between">
                                            <span>Pengaturan Profil</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </Link>
                                    </li>
                                    {user.shop_name && (
                                        <li>
                                            <Link href={route('vendor.dashboard')} className="rounded-xl py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-750 text-blue-600 dark:text-blue-400">
                                                Dashboard Vendor
                                            </Link>
                                        </li>
                                    )}
                                    <li className="mt-1 pt-1 border-t border-gray-100 dark:border-gray-750">
                                        <Link 
                                            href={route('logout')} 
                                            method="post" 
                                            as="button" 
                                            className="w-full text-start rounded-xl py-2 px-3 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 font-medium"
                                        >
                                            Keluar
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link 
                                    href={route('login')} 
                                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link 
                                    href={route('register')} 
                                    className="text-sm font-semibold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;