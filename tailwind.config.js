/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      "xs":	"576",
      "sm"	:"768",
      "md"	:"992",
      "lg"	:"1200",
      "xl"	:"1400"
    }
  },
  plugins: [require('prettier-plugin-tailwindcss'), require('@tailwindcss/line-clamp'),],
  corePlugins:{
    preflight: false
  }
}
