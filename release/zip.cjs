/* eslint-disable @typescript-eslint/no-var-requires */
/**
 *
 * bundle assigned directory to a zip file
 * @see https://www.npmjs.com/package/archiver
 */

const { releasedPluginName } = require('./.release-it.cjs')
const fs = require('fs')
const path = require('path')
const entryDir = path.resolve(__dirname, `./${releasedPluginName}`)
const outputZip = path.resolve(__dirname, `./${releasedPluginName}.zip`)
const archiver = require('archiver')

// 創建一個檔案來存儲zip檔案

const output = fs.createWriteStream(outputZip)
const archive = archiver('zip', {
  zlib: { level: 9 }, // 設置壓縮等級
})

output.on('close', function () {
  console.log(
    `📦 Total Size: ${Math.round((archive.pointer() * 100) / 1024 / 1024) / 100} MB`,
  )
})

// 監聽錯誤事件

archive.on('error', function (err) {
  throw err
})

// 將輸出流與archive物件關聯

archive.pipe(output)

// 將整個目錄添加到zip檔案中

archive.directory(entryDir, false)

// 完成檔案的追加

archive.finalize()
