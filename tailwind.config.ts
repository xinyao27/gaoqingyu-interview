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
                // 自定义颜色可以在这里添加
            },
            fontFamily: {
                // 自定义字体可以在这里添加
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
    plugins: [require('@tailwindcss/typography')],
};

export default config; 