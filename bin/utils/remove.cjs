const fs = require('fs')
const path = require('path')

// define .git directory path and remove it recursively

function remove(dir) {
  const gitDirPath = path.join(process.cwd(), dir)

  // check if .git directory exists

  fs.access(gitDirPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log('.git directory does not exist.')
      return
    }

    console.log('.git directory exists. removing...')

    //  remove .git directory recursively

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
    console.log('.git directory has been removed.')
  })
}

function removeFile(fileName) {
  const filePath = path.join(process.cwd(), fileName)

  try {
    // check if file exists

    const fileExists = fs.existsSync(filePath)

    if (fileExists) {
      // if file exists, remove it

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
