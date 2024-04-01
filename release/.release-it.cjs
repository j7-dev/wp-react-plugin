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
const pluginName = process?.env?.PLUGIN_NAME || 'wp-react-plugin'

module.exports = {
  git: {
    commit: true,
    commitMessage: 'chore: release v${version}',
    tag: true,
    tagName: 'v${version}',
    commitArgs: ['-n'],
    push: true,
  },
  hooks: {
    'before:init': [
      'yarn build',
      'yarn create:release',
      `cd release/${pluginName} && composer install --no-dev && cd ../..`,
      'yarn zip',
    ], // run before initialization
    // 'after:[my-plugin]:bump': './bin/my-script.sh', // run after bumping version of my-plugin
    // 'after:bump': ['echo finish'], // run after bumping version
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
    assets: ['./release/wp-react-plugin.zip'], // relative path
    web: false,
  },
}
