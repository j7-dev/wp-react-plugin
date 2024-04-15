/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Move manifest.json after build
 *
 * Why need this?
 *
 * @see https://github.com/kucrut/vite-for-wp/issues/80
 * manifest.json will be created in js/dist/.vite directory which is WRONG
 * but vite-for-wp can only work when manifest.json in js/dist directory
 */

const fs = require('fs')
const path = require('path')

// resolve path

const originPath = path.resolve(__dirname, '../js/dist/.vite/manifest.json')
const targetPath = path.resolve(__dirname, '../js/dist/manifest.json')

// move manifest.json

if (!fs.existsSync(originPath)) {
  //if originPath exists

  console.log('❌ manifest.json not found!')
} else {
  fs.rename(originPath, targetPath, (err) => {
    if (err) {
      throw err
    }
    console.log('✅ move manifest.json to js/dist/manifest.json success!')
  })
}
