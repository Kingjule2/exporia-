import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

export default function Dashboard({ stripe_account_id }: { stripe_account_id: string | null }) {
    const { post, processing } = useForm({});

    const connectStripe = () => {
        post((window as any).route('vendor.connect-stripe'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Vendor Dashboard
                </h2>
            }
        >
            <Head title="Vendor Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-bold mb-4">Welcome to your Vendor Dashboard!</h3>

                            {stripe_account_id ? (
                                <div className="p-4 bg-green-100 text-green-700 rounded-md">
                                    ✓ Your Stripe account is connected. (ID: {stripe_account_id})
                                </div>
                            ) : (
                                <div className="p-4 bg-yellow-100 text-yellow-700 rounded-md flex justify-between items-center">
                                    <span>You need to connect your Stripe account to receive payments.</span>
                                    <button
                                        onClick={connectStripe}
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Connecting...' : 'Connect Stripe'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
