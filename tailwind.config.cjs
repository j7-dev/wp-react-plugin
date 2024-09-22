/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	// important: '.tailwind', // you need to use tailwindcss in a .tailwind class
	corePlugins: {
		preflight: false,
		container: false, // conflicted with WordPress
	},
	content: ['./js/src/**/*.{js,ts,jsx,tsx}', './inc/**/*.php'],
	theme: {
		animation: {
			// why need this? because elementor plugin might conflict with same animate keyframe name
			// we override the animation name with this
			pulse: 'tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		},
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
			keyframes: {
				'tw-pulse': {
					'50%': { opacity: '0.5' },
				},
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			const newUtilities = {
				'.rtl': {
					direction: 'rtl',
				},

				// classes conflicted with WordPress
				'.tw-hidden': {
					display: 'none',
				},
				'.tw-columns-1': {
					columnCount: 1,
				},
				'.tw-columns-2': {
					columnCount: 2,
				},
				'.tw-fixed': {
					position: 'fixed',
				},
				'.tw-inline': {
					display: 'inline'
				}
			}
			addUtilities(newUtilities, ['responsive', 'hover'])
		},
	],
	safelist: [],
	blocklist: ['fixed', 'columns-1', 'columns-2', 'hidden', 'inline'],
}
