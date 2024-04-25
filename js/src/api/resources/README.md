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