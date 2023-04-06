import colors from 'tailwindcss/colors'
import formsPlugin from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: colors.emerald,
            },
        },
    },
    plugins: [formsPlugin],
}
