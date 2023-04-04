/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      "xs":	"599px",
      "sm":"959px",
      "md":"1400px",
      "lg":"1919px",
    }
  },
  plugins: [require('prettier-plugin-tailwindcss'), require('@tailwindcss/line-clamp'),],
  corePlugins:{
    preflight: false
  }
}
