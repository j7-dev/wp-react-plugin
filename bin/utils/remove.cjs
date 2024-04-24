const fs = require('fs')
const path = require('path')

// 定義 .git 目錄路徑

function remove(dir) {
  const gitDirPath = path.join(process.cwd(), dir)

  // 檢查 .git 目錄是否存在

  fs.access(gitDirPath, fs.constants.F_OK, (err) => {
    if (err) {
      // .git 目錄不存在

      console.log('.git 目錄不存在')
      return
    }

    // .git 目錄存在

    console.log('.git 目錄存在,正在移除...')

    // 使用遞迴方式移除目錄

    const removeDirRecursive = (dirPath) => {
      if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
          const filePath = path.join(dirPath, file)
          if (fs.lstatSync(filePath).isDirectory()) {
            removeDirRecursive(filePath)
          } else {
            fs.unlinkSync(filePath)
          }
        })
        fs.rmdirSync(dirPath)
      }
    }

    removeDirRecursive(gitDirPath)
    console.log('.git 目錄已移除')
  })
}

function removeFile(fileName) {
  const filePath = path.join(process.cwd(), fileName)

  try {
    // 檢查檔案是否存在

    const fileExists = fs.existsSync(filePath)

    if (fileExists) {
      // 如果檔案存在,則刪除

      fs.unlinkSync(filePath)
      console.log(`File "${fileName}" has been deleted.`)
    } else {
      console.log(`File "${fileName}" does not exist.`)
    }
  } catch (err) {
    console.error(`Error deleting file "${fileName}": ${err.message}`)
  }
}

const execRemove = (dir) => () => {
  return remove(dir)
}

const execRemoveFile = (fileName) => () => {
  return removeFile(fileName)
}

module.exports = {
  execRemove,
  remove,
  execRemoveFile,
  removeFile,
}
