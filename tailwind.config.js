/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainColor: '#7B86AA',
      },
    },
    screens: {
      xs: '592px',
      sm: '878px',
      md: '1150px',
      lg: '1919px',
    },
  },
  plugins: [require('prettier-plugin-tailwindcss'), require('@tailwindcss/line-clamp')],
  corePlugins: {
    preflight: false,
  },
}
