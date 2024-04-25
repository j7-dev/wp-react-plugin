# WP React Plugin

## 💻 `npx create-wp-react-plugin`

> The easiest way to develop a React base WordPress Plugin

<br><br>

🚧live demo


## 📹 demo video
https://github.com/j7-dev/wp-react-plugin/assets/9213776/efb5b3ae-b8d0-408c-8e66-7e6f9e933877



## ⚡Features⚡

1. Easy to Use<br>

    ```bash
    cd <your-WordPress-project>/wp-content/plugins
    npx create-wp-react-plugin <your-plugin-name>
    ```

   cd to `wp-content/plugins/` in your WordPress project
   and `npx create-wp-react-plugin <your-plugin-name>`, that's all the steps

	 🚩 we use yarn by default for now

2. CRUD utility function<br>
   Default with `getPost` Example, check [functions](https://github.com/j7-dev/wp-react-plugin/tree/master/js/src/api/resources) and [custom hooks](https://github.com/j7-dev/wp-react-plugin/tree/master/js/src/hooks)

3. HMR (Hot Module Reload) for PHP<br>
	By using `vite-plugin-live-reload`,  the page will auto reload while PHP files changed

4. Multi-React-App in one plugin<br>
	By default, we render 2 React App, 1 is for front-end page, and 1 is for admin page. You can add more React App in `js/src/main.tsx`

5. Plugin Update Checker
	Once you publish a release on Github, the user installed your plugin will receive a notification in `wp-admin/plugins.php`

6. Plugin Dependencies Checker
	Does your plugin rely on another plugin like WooCommerce, Learndash etc...?
	By defining the `$required_plugins`, we can easily manage plugin dependencies.

7. 1-click release
	Simply type `yarn release` and the command will execute a series of command in `release/.release-it.cjs`, like `yarn build`, `composer install` etc..., and finally publish a release on github
	see more configuration in [release-it](https://www.npmjs.com/package/release-it)

---

## Before getting start

You MUST have `nodejs v18+` and `composer` installed

Here are tech stacks (knowledge you need to have) we used

#### Front-end

1. [Vite v5](https://vitejs.dev/) - build tool
2. [React v18](https://beta.reactjs.org/)
3. [TypeScript v5](https://www.typescriptlang.org/docs/) - compile project with type safe
4. [Tailwind v3](https://tailwindcss.com/) - you can install any UI library, like Ant Design, MUI, Chakra...etc
5. [SCSS](https://sass-lang.com/documentation/syntax)
6. [React Query v5]([https://tanstack.com/query/v4](https://tanstack.com/query/latest/docs/framework/react/overview)) - managing API status

#### Front-end (Optional)

1. [React Router v6](https://reactrouter.com/en/main) - front-end router

We highly recommend you to use Hash router in WordPress, so you won't get conflict with WordPress Permalink


#### Back-end

Libraries we used

```js
"kucrut/vite-for-wp": "^0.8.0", // the core of vite integrated with wp
"yahnis-elsts/plugin-update-checker": "^5.3", // update checker
"j7-dev/tgm-plugin-activation-forked": "^1.0", // check plugin dependency, forked from TGMPA
"micropackage/singleton": "^1.1", // singleton pattern

// php code standard
"squizlabs/php_codesniffer": "@stable",
"wp-coding-standards/wpcs": "@stable",
"dealerdirect/phpcodesniffer-composer-installer": "@stable"
```

---

## Dev

```bash
cd wp-content/plugins/<your-plugin-name>
yarn dev
```

Sure we have HMR when you change the front-end content

---

## Build Before you release

```bash
cd wp-content/plugins/<your-plugin-name>
yarn release:build-only
```

This command will build the release version of your plugin without publish to Github in `release` directory, you can see a `zip` file and a directory with `<your-plugin-name>`

I often use this command to test my release version plugin on my test site.
We can move to next step after checking everything works well.

---

## Release

```bash
cd wp-content/plugins/<your-plugin-name>
yarn release # this will git tag a patch version, you can choose `yarn release:minor` or `yarn release:major`
```

This command will build the release version and publish the plugin `zip` file to Github.
The user installed your plugin will receive a notification.

---

## Any Suggestion ?

Welcome to open issue and start a discussion 🎉🎉🎉

If this project is useful for you, please give me a github star ⭐

---

## Buy Me a Coffee ☕

[Help Me to Build More Stunning Project 🤟](https://api.payuni.com.tw/api/period/U00521125/DxZBpmEGzO)


---

## Reference

1. Inspired by [Vite for WP](https://github.com/kucrut/vite-for-wp)
2. API design Inspired by [Refine](https://refine.dev/)
3. [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/reference/)
