import React from 'react';

interface Props {
    amount: number;
    currency?: string;
    locale?: string;
}

export default function CurrencyFormatter({ amount, currency = 'IDR', locale = 'id-ID' }: Props) {
    return (
        <>
            {new Intl.NumberFormat(locale, {
                style: 'currency',
                currency
            }).format(amount)}
        </>
    );
}
