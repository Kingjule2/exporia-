import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Success() {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Payment Successful</h2>}
        >
            <Head title="Success" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 text-center">
                        <div className="mb-4 text-green-500">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Thank you for your purchase!</h3>
                        <p className="text-gray-500 mb-6">Your payment has been processed successfully.</p>
                        <Link href="/" className="btn btn-primary">Return to Shop</Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}