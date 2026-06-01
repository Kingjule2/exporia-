import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function VerifyNotice() {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Vendor Verification</h2>}
        >
            <Head title="Vendor Verification" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 text-center">
                        <div className="mb-4 text-blue-500">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Check Your Email</h3>
                        <p className="text-gray-500 mb-6">We have sent a verification link to your email. Please click the link to activate your vendor account.</p>
                        <Link href="/" className="btn btn-primary">Return Home</Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
