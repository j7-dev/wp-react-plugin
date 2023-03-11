# Boilerplate-React-WP-Plugin (BRWP)

⚠️⚠️⚠️ This is a beta version plugin

⚠️⚠️⚠️ Don't use it in production mode

demo link ( coming soon )

- [Before getting start](#before-getting-start) - [Front-end](#front-end) - [Back-end](#back-end)
- [Install](#install)
- [Configuration](#configuration)
- [Build](#build)
- [Custom Hooks ⛏️⛏️⛏️](#custom-hooks-️️️)
  - [`useOne`](#useone)
    - [- Properties:](#--properties)
    - [- Return:](#--return)
    - [- Example:](#--example)
  - [`useMany`](#usemany)
    - [- Properties:](#--properties-1)
    - [- Return:](#--return-1)
    - [- Example:](#--example-1)
- [How to use Front-End Router with WordPress](#how-to-use-front-end-router-with-wordpress)
  - [Problems](#problems)
  - [Reason](#reason)
  - [Solution](#solution)
- [Reference](#reference)

<!-- /code_chunk_output -->

## Before getting start

Tech stacks (knowledge you need to have)

##### Front-end

1. [Vite](https://vitejs.dev/) - build tool
2. [React v18](https://beta.reactjs.org/)
3. [TypeScript](https://www.typescriptlang.org/docs/) - compile project with type safe
4. [Tailwind v3](https://tailwindcss.com/) - you can install any UI library, like Ant Design, MUI, Chakra...etc
5. [SCSS](https://sass-lang.com/documentation/syntax)
6. [Zod](https://zod.dev/) - ⚡runtime⚡ type safe🔰
7. [MSW](https://mswjs.io/) - mock API data
8. [React Query v4](https://tanstack.com/query/v4) - managing API status
9. [React Router v6](https://reactrouter.com/en/main) - front-end router

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

## Custom Hooks ⛏️⛏️⛏️

### `useOne`

#### - Properties:

```typescript
{
  resource: string
  // WordPress RESTFUL API Endpoint like: posts, users, products
  id: number
  queryOptions?: {
    // please visit React Query for more detail
    staleTime?: number
    cacheTime?: number
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    refetchInterval?: number
    retry?: boolean | number
    retryDelay?: number
    enabled?: boolean
  }
}
```

#### - Return:

WordPress Object

#### - Example:

```javascript
// get the post with id = 200
const post = useOne({
  resource: 'posts',
  id: 200,
})

// get the user with id = 1
const user = useOne({
  resource: 'users',
  id: 1,
})
```

### `useMany`

#### - Properties:

```typescript
{
  resource: string
  // WordPress RESTFUL API Endpoint like: posts, users, products
  args?: Record<string, any>
  // please visit WordPress RESTFUL API Handbook for more detail
  queryOptions?: {
    // please visit React Query for more detail
    staleTime?: number
    cacheTime?: number
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    refetchInterval?: number
    retry?: boolean | number
    retryDelay?: number
    enabled?: boolean
  }
}
```

#### - Return:

WordPress Object Array

#### - Example:

```javascript
// get all posts that author_id = 1
const posts = useMany({
  resource: 'posts',
  args: {
    author: 1,
  },
})
```

## How to use Front-End Router with WordPress

Sometimes we need a MPA ( Multi Page Application ), not just SPA ( Single Page Application ).

### Problems

1. WordPress use `backend router`
2. Our React plugin using `frontend router`

there would be a conflict.

You will get a `❌404` page if you press `F5` to refresh to page at `/get-posts`

### Reason

Because every time you press `F5` to refresh the page, you will send a request to the server and the server will handle the request in WordPress's route, then it will found nothing.

That's why we got `404`

But why don't we get `404` if we click the button from base url?

That's because frontend router uses window history API, it won't send request to server

### Solution

All we need to do is

1. (BE) redirect any URL with `{baseUrl}/any-path` to `{baseUrl}` ( APP's root url )
2. (FE) save the `url state` in sessionStorage when user link to a page of your plugin
3. (FE) set the condition to restore the `url state`, so the we can navigate to the right page by front end router

   _\* BE means Back End_
   _\* FE means Front End_

### Example

We use [React Router v6](https://reactrouter.com/en/main) for example

coming soon ⛏️⛏️⛏️

---

## Reference

1. Inspired by [Vite for WP](https://github.com/kucrut/vite-for-wp)
2. [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/reference/)
