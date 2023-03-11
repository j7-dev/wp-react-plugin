# Boilerplate-React-WP-Plugin (BRWP)

⚠️⚠️⚠️ This is a beta version plugin,

⚠️⚠️⚠️ Don't use it in production mode

demo link (coming soon)

## Before getting start

Tech stacks (knowledge you need to have)

##### Front-end

1. [Vite](https://vitejs.dev/) - build tool
2. [React v18](https://beta.reactjs.org/)
3. [TypeScript](https://www.typescriptlang.org/docs/) - compile project with type safe
4. [Ant Design v5](https://ant.design/) - default UI library, you can change to any UI library
5. [Tailwind v3](https://tailwindcss.com/)
6. [SCSS](https://sass-lang.com/documentation/syntax)
7. [Zod](https://zod.dev/) - ⚡runtime⚡ type safe🔰
8. [MSW](https://mswjs.io/) - mock API data
9. [React Router v6](https://reactrouter.com/en/main) - front-end router
10. [React Query v4](https://tanstack.com/query/v4) - managing API status

##### Back-end

1. [usefulteam/jwt-auth](https://github.com/usefulteam/jwt-auth) - get JWT if a wordpress user is logged in

## Install

1. Clone this repository into `/wp-content/plugins`.
   ```sh
   cd  {your-project}/wp-content/plugins
   ```
2. Install dependencies:

   ```sh
   npm run init
   npm run dev
   ```

3. Activate the plugin from WordPress admin `/wp-admin`.
   <img src="https://user-images.githubusercontent.com/9213776/224491978-0b2dac0e-103a-48e2-b8e7-9529dae18f2b.png">

4. Visit your site's homepage and see the rendered application on the footer 🚀
   <img src="https://user-images.githubusercontent.com/9213776/224490277-b97b0fec-8086-43d9-8426-9ecf41b67da0.png">

5. Click `Count`, `Get Post Example`, `Get Users Example` button to ensure the State and the WordPress API works
   <img src="https://user-images.githubusercontent.com/9213776/224490729-ba1496c7-8da5-46d8-b5fe-a764aa333215.png">
6. 🎉🎉🎉 Enjoy the dev 🎉🎉🎉

## Configuration

`.env.development`

```shell
VITE_BASE_URL='/'
# the path this plugin be used at

VITE_RENDER_ID='my-app'
# by default, the footer will render a <div id="my-app"></div> container at footer
# You can custom the render id

VITE_API_URL='http://plugindev.local/wp-json'
# ⭐ set your WordPress RESTFUL API url here
# ⭐ {site_url}/wp-json

VITE_API_TIMEOUT='30000'
```

## Build

```shell
npm run build
```

After you build the project will apply `.env.production` and enqueue the hashed assets in `js/dist` folder.

the files in `js/dist` is EXACT the files of your plugin, you can only upload the `js/dist` if you don't want to share the `src` source code

## Custom Hooks

---

## Reference

1. Inspired by [Vite for WP](https://github.com/kucrut/vite-for-wp)
2. [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/reference/)
