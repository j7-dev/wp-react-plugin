/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  important: true,
  corePlugins: {
    preflight: false,
  },
  content: ['./js/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'relative',
    'z-50',
    'absolute',
    'bg-white',
    'rounded-xl',
    'p-4',
    'shadow-lg',
    'w-40',
    'right-0',
    'lg:right-8',
    'list-none',
    'text-black',
  ],
}
