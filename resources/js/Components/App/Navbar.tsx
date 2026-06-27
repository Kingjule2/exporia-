import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import CurrencyFormatter from '@/Components/Core/CurrencyFormatter';

/**
 * Navigation items — each rendered as a "container box" on the ship deck.
 * Icons match the reference design: Home, Service, Track, Map, Info, Phone.
 */
const NAV_ITEMS = [
    {
        label: 'Halaman Utama',
        href: '/',
        active: false,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        label: 'Layanan Utama',
        href: '#layanan',
        active: false,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
    },
    {
        label: 'Lacak Kiriman',
        href: '#lacak',
        active: true,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
    {
        label: 'Tarif & Rute',
        href: '#tarif',
        active: false,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
        ),
    },
    {
        label: 'Tentang Kami',
        href: '#tentang',
        active: false,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        label: 'Kontak',
        href: '#kontak',
        active: false,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
    },
];

function Navbar() {
    const { auth, totalPrice = 0, totalQuantity = 0, miniCartitems = {} } = usePage().props as any;
    const user = auth?.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const cartItems = Object.values(miniCartitems || {}) as any[];

    return (
        <>
            {/* =============================================== */}
            {/* Ship Navbar — full-width banner with bgnav.png  */}
            {/* =============================================== */}
            <div className="relative w-full overflow-hidden bg-secondary" style={{ height: '360px' }}>
                {/* Background: cargo ship at sea */}
                <img
                    src="/images/bgnav.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover object-center select-none pointer-events-none"
                    draggable={false}
                />

                {/* Gradient overlays for readability & depth */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-b from-[#0A3D62]/50 via-transparent to-[#0A3D62]/60"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-[#0A3D62]/25 via-transparent to-[#0A3D62]/20"
                />

                {/* ——— Top Bar: Logo + Cart + User ——— */}
                <div className="absolute top-0 left-0 right-0 z-30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                        {/* Logo / Wordmark */}
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 group transition-opacity duration-200 hover:opacity-90"
                            aria-label="Exporia — beranda"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white shadow-lg group-hover:bg-white/25 transition-all duration-300">
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
                            <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">
                                Exporia
                            </span>
                        </Link>

                        {/* Right side: Cart + User + Mobile hamburger */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Cart Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle text-white hover:bg-white/15 backdrop-blur-sm relative transition-all border border-transparent hover:border-white/20"
                                >
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        {totalQuantity > 0 && (
                                            <span className="badge badge-sm badge-warning indicator-item scale-95 font-bold animate-pulse text-secondary">
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
                                    className="hidden lg:inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/15 backdrop-blur-sm transition-all border border-white/15 hover:border-white/30"
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
                                        className="btn btn-ghost btn-circle avatar border-2 border-white/30 hover:border-accent transition-all"
                                    >
                                        <div className="w-9 rounded-full ring-2 ring-white/20">
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
                                <div className="hidden sm:flex items-center gap-2">
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-semibold text-white/80 hover:text-white px-3 py-2 transition-colors"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="text-sm font-bold px-4 py-2 rounded-xl bg-accent text-secondary hover:bg-accent/90 shadow-md transition-all"
                                    >
                                        Daftar
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Hamburger Button */}
                            <button
                                className="md:hidden btn btn-ghost btn-circle text-white hover:bg-white/15 transition-all"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Menu navigasi"
                            >
                                {mobileMenuOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ——— Desktop: Container-box Nav Buttons on Ship Deck ——— */}
                <nav
                    className="hidden md:flex absolute z-20 items-end gap-2 lg:gap-3 xl:gap-4"
                    aria-label="Navigasi utama"
                    style={{
                        bottom: '14%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`
                                container-box container-panel relative
                                flex flex-col items-center justify-center gap-1
                                rounded-lg
                                px-3 py-2.5
                                lg:px-4 lg:py-3
                                xl:px-5 xl:py-3.5
                                text-white
                                transition-all duration-300 ease-out
                                hover:scale-110 hover:-translate-y-1.5
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                                cursor-pointer
                                group
                                ${item.active ? 'nav-plate--active' : 'nav-plate'}
                            `}
                            style={{ minWidth: '80px' }}
                        >
                            <span className="drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                                {item.icon}
                            </span>
                            <span className="text-[9px] lg:text-[10px] xl:text-xs font-bold text-center leading-tight whitespace-nowrap drop-shadow-md">
                                {item.label}
                            </span>
                        </a>
                    ))}

                    {/* Login/Daftar or user-contextual button */}
                    {user ? (
                        <Link
                            href={user.shop_name ? route('vendor.dashboard') : route('profile.edit')}
                            className={`
                                container-box container-panel relative
                                flex flex-col items-center justify-center gap-1
                                rounded-lg
                                px-3 py-2.5
                                lg:px-4 lg:py-3
                                xl:px-5 xl:py-3.5
                                text-white
                                transition-all duration-300 ease-out
                                hover:scale-110 hover:-translate-y-1.5
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                                cursor-pointer
                                group
                                nav-plate
                            `}
                            style={{ minWidth: '80px' }}
                        >
                            <span className="drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span className="text-[9px] lg:text-[10px] xl:text-xs font-bold text-center leading-tight whitespace-nowrap drop-shadow-md">
                                {user.shop_name ? 'Dashboard' : 'Profil'}
                            </span>
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className={`
                                container-box container-panel relative
                                flex flex-col items-center justify-center gap-1
                                rounded-lg
                                px-3 py-2.5
                                lg:px-4 lg:py-3
                                xl:px-5 xl:py-3.5
                                text-white
                                transition-all duration-300 ease-out
                                hover:scale-110 hover:-translate-y-1.5
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                                cursor-pointer
                                group
                                nav-plate
                            `}
                            style={{ minWidth: '80px' }}
                        >
                            <span className="drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </span>
                            <span className="text-[9px] lg:text-[10px] xl:text-xs font-bold text-center leading-tight whitespace-nowrap drop-shadow-md">
                                Login/Daftar
                            </span>
                        </Link>
                    )}
                </nav>

                {/* Brand mark on the ship hull (left bow area) */}
                <div className="hidden lg:flex absolute z-20 items-center gap-2" style={{ bottom: '38%', left: '6%' }}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/15 px-4 py-2.5 shadow-lg">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="5" r="3" />
                                <line x1="12" y1="22" x2="12" y2="8" />
                                <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                            </svg>
                            <div>
                                <p className="text-sm font-extrabold text-white tracking-wide leading-none">EXPORIA</p>
                                <p className="text-[8px] font-semibold text-white/60 tracking-[0.15em] uppercase">Cargo Solutions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =============================================== */}
            {/* Mobile Slide-out Navigation Menu                */}
            {/* =============================================== */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-secondary/60 backdrop-blur-sm ship-mobile-backdrop"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl ship-mobile-drawer overflow-y-auto">
                        {/* Drawer header */}
                        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <span className="text-lg font-extrabold text-secondary dark:text-white tracking-tight">
                                Menu
                            </span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="btn btn-ghost btn-sm btn-circle text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                aria-label="Tutup menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* User info (if logged in) */}
                        {user && (
                            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30">
                                        <img
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation links */}
                        <nav className="p-3 space-y-1" aria-label="Navigasi mobile">
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                                        item.active
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <span className={item.active ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {/* Divider + Action links */}
                        <div className="p-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
                            {user ? (
                                <>
                                    <Link
                                        href={route('profile.edit')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Pengaturan Profil
                                    </Link>
                                    {user.shop_name && (
                                        <Link
                                            href={route('vendor.dashboard')}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                            </svg>
                                            Dashboard Vendor
                                        </Link>
                                    )}
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Keluar
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-bold text-primary border border-primary/30 hover:bg-primary/5 transition-all"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 shadow-md transition-all"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;