#!/usr/bin/env node
const { runCommands } = require('./utils/command.cjs')
const { execRemove, execRemoveFile } = require('./utils/remove.cjs')

const projectName = process?.argv?.[2] || ''

async function main() {
  // can be shell command or callback function

  const commands = [
    `git clone https://github.com/j7-dev/wp-react-plugin.git ${projectName}`,
    `cd ${projectName}`,
    'yarn',
    `node ./replace-string.cjs ${projectName}`,
    'composer install --no-interaction',
    execRemove('.git'),
    execRemove('bin'),
    execRemoveFile('replace-string.cjs'),
    execRemoveFile('README.md'),
  ]
  const results = await runCommands(...commands)
}

main()
