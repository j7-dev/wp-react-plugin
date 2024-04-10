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

module.exports = {
  releasedPluginName,
  git: {
    commit: true,
    commitMessage: 'chore: release v${version}',
    tag: true,
    tagName: 'v${version}',
    commitArgs: ['-n'],
    push: true,
  },
  hooks: {
    // 'before:init': [], // run before initialization
    // 'after:[my-plugin]:bump': './bin/my-script.sh', // run after bumping version of my-plugin
    'after:bump': [
      'yarn build && echo ✅ build success && yarn sync:version && echo ✅ sync version success',
      'yarn create:release && echo ✅ create release files success',
      `cd release/${releasedPluginName}/${releasedPluginName} && composer install --no-dev && cd ../.. && echo ✅ composer install success`,
      'yarn zip && echo ✅ create zip success',
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
    release: true,
    releaseName: 'v${version}',
    assets: [`./release/${releasedPluginName}.zip`], // relative path
    web: false,
  },
  allowedItems: [
    'inc',
    'js/dist',
    'required_plugins',
    'composer.json',
    'composer.lock',
    'index.php',
    'plugin.php',
    'README.md',
  ],
}
