const { Case } = require('change-case-all')
const replace = require('replace-in-file')
const fs = require('fs')
const path = require('path')

function getVersionFromPluginPhp() {
	const pluginPhpPath = path.join(__dirname, 'plugin.php')

	try {
		const pluginPhpContent = fs.readFileSync(pluginPhpPath, 'utf-8')
		const versionLine = pluginPhpContent
			.split('\n')
			.find((line) => line.includes('* Version:'))

		if (versionLine) {
			const version = versionLine.split(':')[1].trim()
			return version
		}
		throw new Error('Version line not found in plugin.php')
	} catch (err) {
		console.error(`Error reading plugin.php: ${err.message}`)
		return null
	}
}

const projectName = process?.argv?.[2] || ''

function replaceString(str) {
	// regex example   /^(AAA|BBB|CCC)$/

	const capital = Case.capital(str)
	const pascalName = Case.pascal(str)
	const camelName = Case.camel(str)
	const snakeName = Case.snake(str)
	const kebabName = Case.kebab(str)

	replace.sync({
		files: [
			'./plugin.php',
			'./inc/classes/Admin/CPT.php',
			'./js/src/utils/env.tsx',
		],
		from: /My App/g,
		to: capital,
	})

	replace.sync({
		files: [
			'./plugin.php',
			'./inc/classes/Admin/CPT.php',
			'./js/src/utils/env.tsx',
		],
		from: /my-app/g,
		to: kebabName,
	})

	replace.sync({
		files: [
			'./plugin.php',
			'./inc/classes/Utils/Base.php',
			'./inc/classes/Admin/CPT.php',
			'./inc/classes/FrontEnd/Entry.php',
			'./inc/templates/test.php',
			'./js/src/utils/env.tsx',
		],
		from: /my_app/g,
		to: snakeName,
	})

	replace.sync({
		files: [
			'./composer.json',
			'./plugin.php',
			'./inc/classes/Bootstrap.php',
			'./inc/classes/Admin/CPT.php',
			'./inc/classes/FrontEnd/Entry.php',
			'./inc/classes/Utils/Base.php',
		],
		from: /WpReactPlugin/g,
		to: pascalName,
	})

	replace.sync({
		files: [
			'./composer.json',
			'./package.json',
			'./plugin.php',
		],
		from: /wp-react-plugin/g,
		to: kebabName,
	})

	replace.sync({
		files: [
			'./package.json',
		],
		from: /create-wp-react-plugin/g,
		to: kebabName,
	})

	replace.sync({
		files: [
			'./package.json',
		],
		from: "wp i18n make-pot . languages/wp_react_plugin.pot",
		to: `wp i18n make-pot . languages/${snakeName}.pot`,
	})

	replace.sync({
		files: [
			'./package.json',
		],
		from: /"version": "[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}"/,
		to: '"version": "0.0.1"',
	})

	replace.sync({
		files: [
			'./plugin.php',
			'./inc/classes/Admin/CPT.php',
		],
		from: /wp_react_plugin/g,
		to: snakeName,
	})

	const version = getVersionFromPluginPhp()

	const textMap = [
		{
			from: version,
			to: '0.0.1',
		},
		{
			from: "'https://github.com/j7-dev/wp-react-plugin',",
			to: "'', // change to your github repo url",
		},
		{
			from: 'WP React Plugin (DEV)',
			to: capital,
		},
		{
			from: 'WP React Plugin is a boilerplate for creating a WordPress plugin with React, Tailwind, TypeScript, React Query v4, SCSS and Vite.',
			to: 'your description',
		},
		{
			from: 'vite, react, tailwind, typescript, react-query, scss, WordPress, WordPress plugin',
			to: 'your tags',
		},
		{
			from: '* Author:            J7',
			to: '* Author:            Your Name',
		},
		{
			from: "'app_name'    => 'Wp React Plugin'",
			to: `'app_name'    => '${str}'`,
		},
		{
			from: 'https://github.com/j7-dev',
			to: '[YOUR GITHUB URL]',
		},
	]

	textMap.forEach(({ from, to }) => {
		const regex = new RegExp(
			from.replace(/([(){}[\]\\|?*+.,^$])/g, '\\$1'),
			'g',
		)
		replace.sync({
			files: [
				'./plugin.php',
			],
			from: regex,
			to,
		})
	})


}

replaceString(projectName)
