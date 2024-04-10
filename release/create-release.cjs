/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Create a release plugin directory
 *
 * Why need this?
 *
 * Sometimes we don't want to release plugin with devdependencies or source files, like typescript, node_modules etc...
 * So we need to create a release directory to store only necessary files.
 * And then we can zip this directory to release.
 */

const fs = require('fs')
const path = require('path')
const { deleteRelease } = require('./delete-release.cjs')
const { allowedItems, releasedPluginName } = require('./.release-it.cjs')
const sourceDir = path.resolve(__dirname, '../')
const destinationDir = path.resolve(__dirname, `./${releasedPluginName}/${releasedPluginName}`)

/**
 * Recursively copy directories and files
 *
 * @param {string}                    srcDir   Source directory
 * @param {string}                    destDir  Destination directory
 * @param {Array<string> | undefined} includes Files or directories to include, if not provided, all files will be included
 */

function recursiveCopy(srcDir, destDir, includes) {
  const normalIncludes = includes?.filter((include) => !include.includes('/'))
  const nestIncludes = includes?.filter((include) => include.includes('/'))

  // Ensure the destination directory exists

  fs.mkdirSync(destDir, { recursive: true })

  // Read all items in the source directory

  const items = fs.readdirSync(srcDir)

  items.forEach((item) => {
    // Construct the full source and destination paths

    const srcPath = path.join(srcDir, item)
    const destPath = path.join(destDir, item)

    // Check if the current item should be included

    // Handle normal includes

    const includePath = normalIncludes
      ? normalIncludes?.some((include) => srcPath.includes(include))
      : true

    if (includePath) {
      const stats = fs.statSync(srcPath)

      if (stats.isDirectory()) {
        // If it's a directory, copy it recursively

        recursiveCopy(srcPath, destPath, normalIncludes)
      } else {
        // If it's a file, copy it directly

        fs.copyFileSync(srcPath, destPath)
      }
    }
  })

  // Handle nested includes

  if (nestIncludes) {
    nestIncludes.forEach((nestInclude) => {
      const srcNestPath = path.join(srcDir, nestInclude)
      const destNestPath = path.join(destDir, nestInclude)

      if (!fs.existsSync(destNestPath)) {
        fs.mkdirSync(destNestPath, { recursive: true })
      }

      recursiveCopy(srcNestPath, destNestPath)
    })
  }
}

// delete release directory & zip first

deleteRelease()

// then create release directory

recursiveCopy(sourceDir, destinationDir, allowedItems)
