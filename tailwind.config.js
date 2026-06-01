import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require('daisyui')],

    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/theme/object")["light"],
                    primary: "#2563EB",
                    "primary-content": "#ffffff",
                },
                dark: {
                    ...require("daisyui/theme/object")["dark"],
                    primary: "#2563EB",
                    "primary-content": "#ffffff",
                },
            },
        ],
    },
};
