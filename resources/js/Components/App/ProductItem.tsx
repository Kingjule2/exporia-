import { Product } from "@/types";
import { Link } from "@inertiajs/react";
import React from "react";
import CurrencyFormatter from "../Core/CurrencyFormatter";

function ProductItem({ product }: { product: Product }): JSX.Element {
    return (
        <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Link href={route("products.show", product.slug)}>
                    <img 
                        src={product.image || "/storage/default.png"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                    />
                </Link>
                {/* Floating Category Badge */}
                {product.departemen?.name && (
                    <span className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-800 dark:text-gray-250 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        {product.departemen.name}
                    </span>
                )}
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-1">
                {/* Vendor / Brand */}
                {product.user?.name && (
                    <Link href={route('vendor.shop.show', product.user.id)} className="text-[11px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1.5 block hover:underline">
                        {product.user.name}
                    </Link>
                )}

                {/* Title */}
                <Link href={route("products.show", product.slug)} className="block mb-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1 transition-colors duration-200">
                        {product.title}
                    </h3>
                </Link>

                {/* Short desc fallback or spacer */}
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
                    {product.short_description || "Jelajahi detail produk dan variasi yang tersedia untuk spesifikasi selengkapnya."}
                </p>

                {/* Footer Action and Pricing */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 dark:border-gray-700/50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Harga</span>
                        <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                            <CurrencyFormatter amount={product.price} />
                        </span>
                    </div>

                    <Link 
                        href={route("products.show", product.slug)}
                        className="inline-flex items-center justify-center text-xs font-bold px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-250 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:shadow-blue-500/10"
                    >
                        Beli Sekarang
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;