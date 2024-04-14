/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./js/src/**/*.{js,ts,jsx,tsx}', './inc/**/*.php'],
  theme: {
    extend: {
      colors: {
        primary: '#1677ff',
      },
      screens: {
        sm: '576px', // iphone SE
        md: '810px', // ipad Portrait
        lg: '1080px', // ipad Landscape
        xl: '1280px', // mac air
        xxl: '1440px',
      },
    },
  },
  plugins: [],
  safelist: [],
}
