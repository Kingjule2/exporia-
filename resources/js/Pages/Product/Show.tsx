import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Product, VariationTypeOption, Image } from "@/types";
import { Head, Link, useForm, router, usePage } from "@inertiajs/react";
import React, { useEffect, useMemo, useState } from "react";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import Carousel from "@/Components/Core/Carousel";

interface Props extends PageProps {
    product: Product;
    variationOptions: Record<string, number>;
}

export default function Show({ product, variationOptions }: Props) {
    const { url } = usePage();

    // Initialize selected options from props or default to first option
    const [selectedOptions, setSelectedOptions] = useState<Record<number, VariationTypeOption>>(() => {
        const initial: Record<number, VariationTypeOption> = {};
        product.variationTypes.forEach(type => {
            const selectedId = variationOptions[type.id];
            const option = type.options.find(op => op.id === selectedId) || type.options[0];
            if (option) initial[type.id] = option;
        });
        return initial;
    });

    const form = useForm({
        option_ids: {} as Record<number, number>,
        quantity: 1,
    });

    // Update form data whenever selectedOptions change
    useEffect(() => {
        const idsMap: Record<number, number> = {};
        Object.entries(selectedOptions).forEach(([typeId, option]) => {
            idsMap[parseInt(typeId)] = option.id;
        });
        form.setData('option_ids', idsMap);
    }, [selectedOptions]);

    // Compute images based on selected options (if an option has images, show the first one found)
    const images = useMemo(() => {
        for (const typeId in selectedOptions) {
            const option = selectedOptions[typeId];
            if (option.images && option.images.length > 0) return option.images;
        }
        return product.images;
    }, [product.images, selectedOptions]);

    // Helper to check array equality
    const arraysAreEqual = (a1: number[], a2: number[]) => {
        if (a1.length !== a2.length) return false;
        const s1 = [...a1].sort();
        const s2 = [...a2].sort();
        return s1.every((val, index) => val === s2[index]);
    };

    // Compute current price and quantity based on variations
    const computedProduct = useMemo(() => {
        const selectedOptionIds = Object.values(selectedOptions).map(op => op.id);

        for (const variation of product.variations) {
            if (arraysAreEqual(selectedOptionIds, variation.variation_type_option_ids)) {
                return {
                    price: variation.price,
                    quantity: variation.quantity === null ? Number.MAX_VALUE : variation.quantity,
                };
            }
        }

        return {
            price: product.price,
            quantity: product.quantity === null ? Number.MAX_VALUE : product.quantity
        };
    }, [product, selectedOptions]);

    const chooseOption = (typeId: number, option: VariationTypeOption) => {
        setSelectedOptions(prev => {
            const newOptions = { ...prev, [typeId]: option };

            // Update URL for shareability
            const optionIdsMap = Object.fromEntries(
                Object.entries(newOptions).map(([tid, opt]) => [tid, opt.id])
            );

            router.get(url, { options: optionIdsMap }, {
                preserveScroll: true,
                preserveState: true
            });

            return newOptions;
        });
    };

    const addToCart = () => {
        form.post(route('cart.store', product.id), {
            preserveScroll: true,
            onSuccess: () => {
                // Success handled globally/via session message
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={product.title} />

            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 py-8 md:py-12">
                {/* Breadcrumbs Navigation */}
                <nav className="text-sm breadcrumbs mb-6 text-gray-500 dark:text-gray-400">
                    <ul className="flex items-center gap-2">
                        <li>
                            <Link href="/" className="hover:text-blue-600 transition-colors font-medium">Home</Link>
                        </li>
                        <span className="opacity-40">/</span>
                        <li className="font-semibold text-gray-800 dark:text-gray-200">
                            {product.departemen.name}
                        </li>
                    </ul>
                </nav>

                {/* Grid Layout */}
                <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-12 bg-white dark:bg-gray-850 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700/50">
                    {/* Left Column: Carousel & Images */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24 rounded-2xl overflow-hidden shadow-md bg-gray-50 dark:bg-gray-900/40 p-2 border border-gray-100 dark:border-gray-850">
                            <Carousel images={images} />
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div>
                            {/* Vendor Tag */}
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 mb-3 uppercase tracking-wider">
                                Vendor Terverifikasi
                            </span>
                            
                            {/* Product Title */}
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
                                {product.title}
                            </h1>
                            
                            {/* Vendor Info */}
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                                oleh <Link href={route('vendor.shop.show', product.user.id)} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">{product.user.name}</Link>
                            </p>
                        </div>

                        {/* Price & Stock Status Panel */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-50/30 dark:from-gray-800/40 dark:to-gray-800/10 p-6 rounded-2xl border border-gray-100/80 dark:border-gray-700/50">
                            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Harga Terbaik</div>
                            <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
                                <CurrencyFormatter amount={computedProduct.price} />
                            </div>

                            {/* Stock Information */}
                            <div className="mt-3 flex items-center gap-2">
                                {computedProduct.quantity > 10 && (
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        Stok Tersedia
                                    </span>
                                )}
                                {computedProduct.quantity <= 10 && computedProduct.quantity > 0 && (
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                                        Sisa {computedProduct.quantity} unit lagi!
                                    </span>
                                )}
                                {computedProduct.quantity === 0 && (
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-650 dark:text-red-400">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        Stok Habis
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Variation Selectors */}
                        {product.variationTypes.length > 0 && (
                            <div className="space-y-6 pt-2 border-t border-gray-50 dark:border-gray-700/30">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Pilihan Spesifikasi</h3>
                                
                                <div className="space-y-5">
                                    {product.variationTypes.map(type => (
                                        <div key={type.id} className="space-y-2.5">
                                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{type.name}</span>

                                            {type.type === 'image' ? (
                                                <div className="flex flex-wrap gap-3">
                                                    {type.options.map(option => (
                                                        <button
                                                            key={option.id}
                                                            onClick={() => chooseOption(type.id, option)}
                                                            className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedOptions[type.id]?.id === option.id
                                                                    ? 'border-blue-600 ring-4 ring-blue-500/10 scale-95 shadow-sm'
                                                                    : 'border-gray-100 hover:border-gray-300 hover:scale-102'
                                                                }`}
                                                        >
                                                            {option.images && option.images[0] && (
                                                                <img
                                                                    src={option.images[0].thumb}
                                                                    alt={option.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            )}
                                                            <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors"></div>
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex flex-wrap gap-2.5">
                                                    {type.options.map(option => (
                                                        <button
                                                            key={option.id}
                                                            onClick={() => chooseOption(type.id, option)}
                                                            className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 ${selectedOptions[type.id]?.id === option.id
                                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
                                                                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                                                                }`}
                                                        >
                                                            {option.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Product Description */}
                        <div className="pt-6 border-t border-gray-50 dark:border-gray-700/30">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Deskripsi Produk</h3>
                            <div
                                className="prose dark:prose-invert prose-sm max-w-none text-gray-600 dark:text-gray-300 leading-relaxed font-medium"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>

                        {/* Cart CTA Action Panel */}
                        <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-700/30 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Jumlah Pembelian:</span>
                                <div className="relative">
                                    <select
                                        className="select select-bordered select-md w-28 rounded-xl font-bold bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-600"
                                        value={form.data.quantity}
                                        onChange={(e) => form.setData('quantity', parseInt(e.target.value))}
                                        disabled={computedProduct.quantity === 0}
                                    >
                                        {[...Array(Math.min(10, computedProduct.quantity))].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={addToCart}
                                disabled={form.processing || computedProduct.quantity === 0}
                                className="btn btn-primary btn-lg w-full rounded-2xl font-bold text-white shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 gap-2 transition-all flex items-center justify-center py-4 bg-blue-600 hover:bg-blue-500 border-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Masukkan ke Keranjang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}