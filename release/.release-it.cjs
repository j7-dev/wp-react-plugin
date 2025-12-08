/**
 * This is a configuration file for release-it.
 * to automate the release process.
 *
 * @repo https://github.com/release-it/release-it
 *
 * default config
 * @see https://github.com/release-it/release-it/blob/main/config/release-it.json
 *
 * documentation
 * @see https://github.com/release-it/release-it/blob/main/docs/configuration.md
 */

const releasedPluginName = 'wp-react-plugin'

const args = process.argv.slice(2) // remove 2 default args

const release = !args.includes('--build-only') // Build release only or build release and push to github

module.exports = {
	releasedPluginName,
	"plugins": {
		"release-it-pnpm": {
			"disableRelease": !release,
			publishCommand: 'exit 0', // 發佈到 npm 上的命令
		},
		"@release-it/bumper": {
			"in": "package.json",
			"out": "package.json",
		},
	},
	git: {
		commit: release,
		commitMessage: 'chore: release v${version}',
		tag: release,
		tagName: 'v${version}',
		commitArgs: ['-n'],
		push: release,
		requireCleanWorkingDir: release,
	},
	hooks: {
	'before:init': [
			'pnpm build && echo ✅ build success',
		], // run before initialization
		// 'after:[my-plugin]:bump': './bin/my-script.sh', // run after bumping version of my-plugin
		'after:bump': [
			release
				? 'pnpm sync:version && echo ✅ sync version success'
				: 'echo 🚫 skip sync version',
			'pnpm create:release && echo ✅ create release files success',
			`cd release/${releasedPluginName}/${releasedPluginName} && composer install --no-dev && cd ../.. && echo ✅ composer install success`,
			'pnpm zip && echo ✅ create zip success',
		], // run after bumping version
		// 'after:git:release': 'echo After git push, before github release', // run after git push, before github release
		'after:release': [
			'git pull',
		], // run after release
	},
	npm: {
		publish: false,
	},
	github: {
		release,
		releaseName: 'v${version}',
		assets: [`./release/${releasedPluginName}.zip`], // relative path
		web: false,
	},
	allowedItems: [
		'inc',
		'js/dist',
		'composer.json',
		'composer.lock',
		'index.php',
		'plugin.php',
		'README.md',
	],
}
