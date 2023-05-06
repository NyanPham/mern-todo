/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                loaderIcon1: {
                    '0%': { transform: 'scale(0)' },
                    '100%': { transform: 'scale(1)' },
                },
                loaderIcon2: {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(24px, 0)' },
                },
                loaderIcon3: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(0)' },
                },
            },
            animation: {
                loaderIconFirst: 'loaderIcon1 0.6s infinite',
                loaderIconSecond: 'loaderIcon2 0.6s infinite',
                loaderIconThird: 'loaderIcon2 0.6s infinite',
                loaderIconFourth: 'loaderIcon3 0.6s infinite',
            },
        },
    },
    plugins: [],
}
