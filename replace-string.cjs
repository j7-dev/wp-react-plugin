const { Case } = require('change-case-all')
const replace = require('replace')

const projectName = process?.argv?.[2] || ''
console.log('⭐ ~ projectName:', projectName)

function replaceString(str) {
  // regex example   /^(AAA|BBB|CCC)$/

  const capital = Case.capital(str)
  const pascalName = Case.pascal(str)
  const camelName = Case.camel(str)
  const snakeName = Case.snake(str)
  const kebabName = Case.kebab(str)

  replace({
    regex: /^(My App|WP React Plugin (DEV))$/,
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
    regex: "'https://github.com/j7-dev/wp-react-plugin';",
    replacement: "''; // change to your github repo",
    paths: ['.'],
    recursive: true,
    silent: false,
    include: 'plugin.php',
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

  replace({
    regex:
      /^(WP React Plugin is a boilerplate for creating a WordPress plugin with React, Tailwind, TypeScript, React Query v4, SCSS and Vite.|vite, react, tailwind, typescript, react-query, scss, WordPress, WordPress plugin)$/,
    replacement: '',
    paths: ['.'],
    recursive: true,
    silent: false,
    include: 'plugin.php',
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
