import { Config, route as routeFn } from 'ziggy-js';

declare global {
    var route: typeof routeFn;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type Image = {
    id: number;
    url: string;
    thumb: string;
    small?: string;
    medium?: string;
    large?: string;
}

export type VariationTypeOption = {
    id: number;
    name: string;
    images: Image[];
}

export type VariationType = {
    id: number;
    name: string;
    type: 'select' | 'radio' | 'image';
    options: VariationTypeOption[];
}

export type Product = {
    id: number;
    title: string;
    slug: string;
    price: number;
    quantity: number | null;
    image: string;
    images: Image[];
    short_description: string;
    description: string;
    user: {
        id: number;
        name: string;
    };
    departemen: {
        id: number;
        name: string;
    };
    variationTypes: VariationType[];
    variations: Array<{
        id: number;
        variation_type_option_ids: number[];
        quantity: number | null;
        price: number;
    }>;
}

export type PaginationProps<T> = {
    data: Array<T>;
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    error: string;
    success: string;
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
