const { exec } = require('child_process')

async function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Run command: ${command}`)
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        console.log(`❌ ${command} failed`)
        console.log(error)
      } else {
        resolve({ stdout, stderr })
        console.log(`✅ ${command} successfully`)
      }
    })
  })
}

async function runCommands(...commands) {
  const results = []
  for (const command of commands) {
    try {
      if ('string' === typeof command) {
        if (command?.startsWith('cd ')) {
          // 如果命令是 `cd`，則使用 `process.chdir()` 更改當前工作目錄
          const newDir = command.slice(3) // 去掉前綴 'cd '
          process.chdir(newDir)
          console.log(`✅ cd to ${process.cwd()}`)
        } else {
          const { stdout, stderr } = await runCommand(command)
        }
      } else if ('function' === typeof command) {
        await command()
      } else {
        throw new Error('Invalid command, must be string or function')
      }
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }
  return results
}

module.exports = {
  runCommands,
  runCommand,
}
