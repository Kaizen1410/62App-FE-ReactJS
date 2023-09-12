/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/*.html",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      spacing: {
        'open': 'calc(100vw - 16rem)',
        'close': 'calc(100vw)',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}

