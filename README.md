# WP React Plugin



[live demo](https://demo.yc-tech.co/)

## ⚡Features⚡

1. Easy to Use<br>
   Git clone this repository in `wp-content/plugins/`
   and `npm run bootstrap`, `npm run dev`, that's all the steps

2. Integrate with WordPress RestFul API<br>
   By default, the `API_URL` would be `{site_url}/wp-json}` which is set in `inc/admin.php`

3. CRUD utility function<br>
   Default with `getPost` Example, check [more utilities](#functions-simple-crud-for-wordpress-restful-api)

4. Integrate with JWT<br>
   We use `usefulteam/jwt-auth` in composer, every time a WordPress user logged in, he will get JWT (for call API, if the user has enough capability) automatically.

5. HMR (Hot Module Reload) for PHP<br>
	By using `vite-plugin-live-reload`,  the page will auto reload while PHP files changed

6. Multi-React-App in one plugin<br>
	By default, we render 2 React App, 1 is for front-end page, and 1 is for admin page. You can add more React App in `js/src/main.tsx`

## Before getting start

Tech stacks (knowledge you need to have)

#### Front-end

1. [Vite](https://vitejs.dev/) - build tool
2. [React v18](https://beta.reactjs.org/)
3. [TypeScript](https://www.typescriptlang.org/docs/) - compile project with type safe
4. [Tailwind v3](https://tailwindcss.com/) - you can install any UI library, like Ant Design, MUI, Chakra...etc
5. [SCSS](https://sass-lang.com/documentation/syntax)
6. [React Query v4](https://tanstack.com/query/v4) - managing API status

#### Front-end (Optional)
1. [React Router v6](https://reactrouter.com/en/main) - front-end router

#### Back-end

1. [usefulteam/jwt-auth](https://github.com/usefulteam/jwt-auth) - get JWT if a wordpress user is logged in

## Install

1. Clone this repository into `/wp-content/plugins`.
   ```sh
   cd  {your-project}/wp-content/plugins
   git clone https://github.com/j7-dev/wp-react-plugin.git
   cd wp-react-plugin
   ```
2. Install dependencies:

   ⭐ You must have [Composer](https://getcomposer.org/) installed

   ```sh
   npm run bootstrap # This will run `npm install` & `composer install`
   npm run dev
   ```




3. Change the API url to your project in `.env.development`

   ```sh
   APP_NAME='My App'
   # ↑ Your App's Name

   VITE_RENDER_ID_1='my-app'
   # by default, the footer will render a <div id="my-app"></div> container at front-end page footer
   # You can custom the render id

	 VITE_RENDER_ID_2='my-app-metabox'
   # by default, in admin page, when you want to add/edit a new post with post_type=my-app, another React App will render in metabox
	 # Remove it if you don't need a metabox React App

   VITE_API_TIMEOUT='30000'
   ```

4. Activate the plugin from WordPress admin `/wp-admin`.

   <img src="https://user-images.githubusercontent.com/9213776/226081766-6d3ce292-1be6-4a34-8a6b-6055670f0a74.png">

5. Visit your site's homepage and see the rendered application on the footer 🚀🚀🚀

   <img src="https://user-images.githubusercontent.com/9213776/226081865-8e23a778-8321-44d3-82f0-9f361530ad13.png">

6. Click `Count`, `Get Post Example` button to ensure the State and the WordPress API works

   <img src="https://user-images.githubusercontent.com/9213776/226081923-c16cf62f-cd6e-4457-9150-8973b817a6e3.png">


7. Check the admin page, you will see a new post type `My App` and a new menu `My App`

   <img src="https://github.com/j7-dev/wp-react-plugin/assets/9213776/b2588014-271a-4620-ab94-d65b2d7a211b">

8. Click Add New, you will see a React App in the metabox

   <img src="https://github.com/j7-dev/wp-react-plugin/assets/9213776/62c1efab-cb0e-4bcb-8879-4f4b9b6a4915">

8. 🎉🎉🎉 Enjoy the dev 🎉🎉🎉

## Build

```shell
npm run build
```

After you build the project will apply `.env.production` and enqueue the hashed assets in `js/dist` folder.

the files in `js/dist` is EXACT the files of your plugin, you can only upload the `js/dist` if you don't want to share the `src` source code

## Functions: Simple CRUD for WordPress Restful API

path: `js\src\api\resources`

### `createResource`

#### - Properties:

```typescript
{
  resource: string,
  // ↑ WordPress RESTFUL API Endpoint like: posts, users, products
  args?: {
    [key: string]: any
  },
  // ↑ Check the WordPress RESTFUL API Endpoint args
  config?: any
  // ↑ This is Axios Config, see more info in https://axios-http.com/
  // ex: change headers config for special use
}
```

#### - Return:

The created Resource id

#### - Example:

```javascript
const createPost = await createResource({
  resource: 'posts',
  args: {
    title: 'Post Created by API',
    status: 'publish',
  },
})
```

### `getResource`

#### - Properties:

```typescript
{
  resource: string,
  // ↑ WordPress RESTFUL API Endpoint like: posts, users, products
  id: number,
  args?: {
    [key: string]: any
  },
  // ↑ Check the WordPress RESTFUL API Endpoint args (url params)
}
```

#### - Return:

WordPress Object

#### - Example:

```javascript
// get the post with id = 200
const getPost = await getResource({
  resource: 'posts',
  id: 200,
})
```

### `getResources`

#### - Properties:

```typescript
{
  resource: string,
  // ↑ WordPress RESTFUL API Endpoint like: posts, users, products
  args?: {
    [key: string]: any
  },
  // ↑ Check the WordPress RESTFUL API Endpoint args (url params)
}
```

#### - Return:

WordPress Object Array

#### - Example:

```javascript
// get the all posts that author_id = 1
const getPosts = await getResources({
  resource: 'posts',
  args: {
    author: 1,
  },
})
```

### `updateResource`

#### - Properties:

```typescript
{
  resource: string,
  // ↑ WordPress RESTFUL API Endpoint like: posts, users, products
  id: number,
  args?: {
    [key: string]: any
  },
  // ↑ Check the WordPress RESTFUL API Endpoint args (url params)
}
```

#### - Return:

Update Status

#### - Example:

```javascript
// update the title with post_id = 200
const updatePost = await updateResource({
  resource: 'posts',
  id: 200,
  args: {
    title: 'Update Title by API',
  },
})
```

### `deleteResource`

#### - Properties:

```typescript
{
  resource: string,
  // ↑ WordPress RESTFUL API Endpoint like: posts, users, products
  id: number,
}
```

#### - Return:

Delete Status

#### - Example:

```javascript
// delete the post with id = 200
const deletePost = await deleteResource({
  resource: 'posts',
  id: 200,
})
```

## Custom Hooks

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
