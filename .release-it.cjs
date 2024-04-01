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
    'before:init': ['yarn build'],
    'after:bump': ['echo ✅ finish'],
  },
  npm: {
    publish: false,
  },
  github: {
    release: true,
    releaseName: 'v${version}',
    assets: ['./release/wp-react-plugin.zip'],
    web: false,
  },
}
