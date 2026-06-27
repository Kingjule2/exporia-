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
                // Req 1.1, 1.3: Sora sebagai font sans utama, diikuti fallback sistem
                sans: ['Sora', ...defaultTheme.fontFamily.sans],
            },

            // Req 2.1, 2.2, 2.3, 2.4: token Palet_Warna maritim eksplisit
            colors: {
                primary: '#0B6E99', // biru laut (hue ≈ 198°) — Req 2.2
                secondary: '#0A3D62', // navi
                accent: '#F4A91F', // emas hangat (hue ≈ 39°) — Req 2.3
                surface: '#F2FAFD', // latar terang
                ink: '#0B1F2A', // teks utama mode terang
            },

            // Req 4.1, 4.4, 4.7: keyframes untuk kemunculan & latar berulang
            keyframes: {
                rise: {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                wave: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                drift: {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
                    '50%': { transform: 'translate3d(0, -12px, 0)' },
                },
            },
            animation: {
                rise: 'rise 600ms ease-out both', // 200–800ms (Req 4.1), fill both (Req 4.7)
                wave: 'wave 18s linear infinite', // latar berulang (Req 4.4)
                drift: 'drift 12s ease-in-out infinite',
            },
        },
    },

    plugins: [require('daisyui')],

    daisyui: {
        themes: [
            {
                // Req 2.4: tema terang memetakan token Palet_Warna
                light: {
                    ...require('daisyui/theme/object')['light'],
                    primary: '#0B6E99',
                    'primary-content': '#ffffff',
                    secondary: '#0A3D62',
                    'secondary-content': '#ffffff',
                    accent: '#F4A91F',
                    'accent-content': '#0B1F2A',
                    'base-100': '#F2FAFD',
                    'base-content': '#0B1F2A',
                },
                // Req 2.6: mode gelap memakai primer/aksen yang dicerahkan agar
                // tetap memenuhi kontras AA di atas latar navi gelap
                dark: {
                    ...require('daisyui/theme/object')['dark'],
                    primary: '#3BA7CE',
                    'primary-content': '#0B1F2A',
                    secondary: '#7FB2CC',
                    'secondary-content': '#0B1F2A',
                    accent: '#F6B73C',
                    'accent-content': '#0B1F2A',
                    'base-100': '#0A3D62',
                    'base-content': '#F2FAFD',
                },
            },
        ],
    },
};
