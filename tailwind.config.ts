import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {

            },
            fontFamily: {
                sans: ['var(--font-geist)'],
                mono: ['var(--font-geist-mono)'],
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100%',
                        code: {
                            color: 'var(--tw-prose-code)',
                            fontWeight: '400',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                    },
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

export default config; 