const path = require('path')

const asset = path.resolve(__dirname, './release/wp-react-plugin.zip')
console.log('⭐  asset:', asset)

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
    releaseName: 'test v${version}',
    assets: [asset],
    web: false,
    tokenRef: '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',
  },
}
