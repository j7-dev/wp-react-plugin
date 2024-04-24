const { Case } = require('change-case-all')
const replace = require('replace')
const fs = require('fs')
const path = require('path')

function getVersionFromPluginPhp() {
  const pluginPhpPath = path.join(__dirname, 'plugin.php')

  try {
    const pluginPhpContent = fs.readFileSync(pluginPhpPath, 'utf-8')
    const versionLine = pluginPhpContent
      .split('\n')
      .find((line) => line.includes('* Version:'))

    if (versionLine) {
      const version = versionLine.split(':')[1].trim()
      return version
    }
    throw new Error('Version line not found in plugin.php')
  } catch (err) {
    console.error(`Error reading plugin.php: ${err.message}`)
    return null
  }
}

const projectName = process?.argv?.[2] || ''

function replaceString(str) {
  // regex example   /^(AAA|BBB|CCC)$/

  const capital = Case.capital(str)
  const pascalName = Case.pascal(str)
  const camelName = Case.camel(str)
  const snakeName = Case.snake(str)
  const kebabName = Case.kebab(str)

  replace({
    regex: 'My App',
    replacement: capital,
    paths: ['.', './inc', './js/src'],
    recursive: true,
    silent: false,
    include: '*.php, *.ts, *.tsx', // 可以用逗號隔開
  })

  replace({
    regex: 'my-app',
    replacement: kebabName,
    paths: ['.', './inc', './js/src'],
    recursive: true,
    silent: false,
    include: '*.php, *.ts, *.tsx', // 可以用逗號隔開
  })

  replace({
    regex: 'my_app',
    replacement: snakeName,
    paths: ['.', './inc', './js/src'],
    recursive: true,
    silent: false,
    include: '*.php, *.ts, *.tsx', // 可以用逗號隔開
  })

  replace({
    regex: 'WpReactPlugin',
    replacement: pascalName,
    paths: ['.', './inc'],
    recursive: true,
    silent: false,
    include: '*.php',
  })

  replace({
    regex: 'wp-react-plugin',
    replacement: kebabName,
    paths: ['.', './inc'],
    recursive: true,
    silent: false,
  })

  replace({
    regex: 'wp_react_plugin',
    replacement: snakeName,
    paths: ['.', './inc'],
    recursive: true,
    silent: false,
    include: '*.php',
  })

  replace({
    regex: '3.0.0',
    replacement: '0.0.1',
    paths: ['.'],
    recursive: true,
    silent: false,
    include: '*.php, *.json',
  })

  const version = getVersionFromPluginPhp()

  const textMap = [
    {
      text: version,
      replacement: '0.0.1',
    },
    {
      text: "'https://github.com/j7-dev/wp-react-plugin';",
      replacement: "''; // change to your github repo",
    },
    {
      text: 'WP React Plugin (DEV)',
      replacement: capital,
    },
    {
      text: 'WP React Plugin is a boilerplate for creating a WordPress plugin with React, Tailwind, TypeScript, React Query v4, SCSS and Vite.',
      replacement: 'your description',
    },
    {
      text: 'vite, react, tailwind, typescript, react-query, scss, WordPress, WordPress plugin',
      replacement: 'your tags',
    },
    {
      text: 'https://github.com/j7-dev/wp-react-plugin',
      replacement: '',
    },
    {
      text: 'J7',
      replacement: '',
    },
    {
      text: 'https://github.com/j7-dev',
      replacement: '',
    },
  ]

  textMap.forEach(({ text, replacement }) => {
    replace({
      regex: text,
      replacement,
      paths: ['.'],
      recursive: false,
      silent: false,
      include: 'plugin.php',
    })
  })
}

replaceString(projectName)

// const execReplace = (str) => () => {
//   return replaceString(str)
// }

// module.exports = {
//   replaceString,
//   execReplace,
// }
