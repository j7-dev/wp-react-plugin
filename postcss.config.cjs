// eslint-disable-next-line no-undef
// @ts-nocheck

module.exports = {
  plugins: {
    'postcss-import': require('postcss-import'),
    'tailwindcss/nesting': require('tailwindcss/nesting')(
      require('postcss-nesting'),
    ),
    tailwindcss: require('tailwindcss'),
    autoprefixer: require('autoprefixer'),
  },
}
