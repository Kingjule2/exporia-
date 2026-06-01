import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Failure() {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Payment Cancelled</h2>}
        >
            <Head title="Payment Cancelled" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 text-center">
                        <div className="mb-4 text-red-500">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Payment was cancelled</h3>
                        <p className="text-gray-500 mb-6">Your payment process was cancelled or failed. No charges were made.</p>
                        <div className="flex justify-center gap-4">
                            <Link href="/cart" className="btn btn-primary">Go Back to Cart</Link>
                            <Link href="/" className="btn btn-secondary">Return to Shop</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
