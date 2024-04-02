/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Clear files in the release directory
 */

const { releasedPluginName } = require('./.release-it.cjs')
const fs = require('fs')
const path = require('path')
const entryDir = path.resolve(__dirname, `./${releasedPluginName}`)
const outputZip = path.resolve(__dirname, `./${releasedPluginName}.zip`)

/**
 *  Delete directory recursively
 * @param {string} dir - Directory path
 */

function deleteDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      deleteDirectory(filePath)
    } else {
      fs.unlinkSync(filePath)
    }
  })
  fs.rmdirSync(dir)
}

/**
 * Clear release plugin directory & zip file
 */

function deleteRelease() {
  // 刪除 entryDir 目錄

  if (fs.existsSync(entryDir)) {
    deleteDirectory(entryDir)
  }

  // 刪除 outputZip ZIP 檔

  if (fs.existsSync(outputZip)) {
    fs.unlinkSync(outputZip)
  }
}

module.exports = {
  deleteDirectory,
  deleteRelease,
}
