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

  const textMap1 = [
    {
      paths: ['.'],
      include: 'plugin.php',
    },
    {
      paths: ['./inc/class/admin'],
      include: 'class-cpt.php',
    },
    {
      paths: ['./js/src/utils'],
      include: 'env.tsx',
    },
  ]

  textMap1.forEach(({ paths, include }) => {
    replace({
      regex: 'My App',
      replacement: capital,
      paths,
      recursive: false,
      silent: false,
      include, // 可以用逗號隔開
    })
  })

  textMap1.forEach(({ paths, include }) => {
    replace({
      regex: 'my-app',
      replacement: kebabName,
      paths,
      recursive: false,
      silent: false,
      include, // 可以用逗號隔開
    })
  })

  const textMap2 = [
    {
      paths: ['.'],
      include: 'plugin.php',
    },
    {
      paths: ['./inc/class/utils'],
      include: 'class-base.php',
    },
    {
      paths: ['./inc/templates'],
      include: 'test.php',
    },
    {
      paths: ['./js/src/utils'],
      include: 'env.tsx',
    },
  ]

  textMap2.forEach(({ paths, include }) => {
    replace({
      regex: 'my_app',
      replacement: snakeName,
      paths,
      recursive: false,
      silent: false,
      include, // 可以用逗號隔開
    })
  })

  const textMap3 = [
    {
      paths: ['.'],
      include: 'plugin.php',
    },
    {
      paths: ['./inc/class'],
      include: 'class-bootstrap.php',
    },
    {
      paths: ['./inc/class/admin'],
      include: 'class-cpt.php',
    },
    {
      paths: ['./inc/class/front-end'],
      include: 'class-entry.php',
    },
    {
      paths: ['./inc/class/utils'],
      include: 'class-base.php',
    },
  ]

  textMap3.forEach(({ paths, include }) => {
    replace({
      regex: 'WpReactPlugin',
      replacement: pascalName,
      paths,
      recursive: false,
      silent: false,
      include, // 可以用逗號隔開
    })
  })

  replace({
    regex: 'wp-react-plugin',
    replacement: kebabName,
    paths: ['.'],
    recursive: false,
    silent: false,
    include: 'composer.json, package.json, plugin.php',
  })

  const textMap4 = [
    {
      paths: ['.'],
      include: 'plugin.php',
    },
    {
      paths: ['./inc/class/admin'],
      include: 'class-cpt.php',
    },
  ]

  textMap4.forEach(({ paths, include }) => {
    replace({
      regex: 'wp_react_plugin',
      replacement: snakeName,
      paths,
      recursive: false,
      silent: false,
      include, // 可以用逗號隔開
    })
  })

  const version = getVersionFromPluginPhp()

  const textMap = [
    {
      regex: version,
      replacement: '0.0.1',
    },
    {
      regex: "'https://github.com/j7-dev/wp-react-plugin';",
      replacement: "''; // change to your github repo",
    },
    {
      regex: 'WP React Plugin (DEV)',
      replacement: capital,
    },
    {
      regex:
        'WP React Plugin is a boilerplate for creating a WordPress plugin with React, Tailwind, TypeScript, React Query v4, SCSS and Vite.',
      replacement: 'your description',
    },
    {
      regex:
        'vite, react, tailwind, typescript, react-query, scss, WordPress, WordPress plugin',
      replacement: 'your tags',
    },
    {
      regex: 'https://github.com/j7-dev/wp-react-plugin',
      replacement: '',
    },
    {
      regex: 'J7',
      replacement: '',
    },
    {
      regex: 'https://github.com/j7-dev',
      replacement: '',
    },
  ]

  textMap.forEach(({ regex, replacement }) => {
    replace({
      regex,
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
