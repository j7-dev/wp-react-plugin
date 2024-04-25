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
