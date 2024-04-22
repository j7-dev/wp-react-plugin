const { exec } = require('child_process')

async function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        console.log(`❌ ${command} `)
      } else {
        resolve({ stdout, stderr })
        console.log(`✅ ${command} `)
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
          results.push({ command, stdout: `✅ cd to ${process.cwd()}` })
        } else {
          const { stdout, stderr } = await runCommand(command)
          results.push({ command, stdout, stderr })
        }
      } else if ('function' === typeof command) {
        await command()
        results.push({
          command,
          stdout: `✅ exec ${command.name} successfully`,
          stderr: '',
        })
      } else {
        throw new Error('Invalid command, must be string or function')
      }
    } catch (error) {
      results.push({ command, error: error.toString() })
    }
  }
  return results
}

module.exports = {
  runCommands,
  runCommand,
}
