import CustomLayouts from '@/components/CustomLayouts'
import DefaultPage from '@/pages/'
import { createBrowserRouter } from 'react-router-dom'
import GetPostsPage from '@/pages/getPosts'
import GetUsersPage from '@/pages/getUsers'
import { baseUrl } from '@/utils'

export const defaultRouters = createBrowserRouter([
  {
    path: baseUrl,
    element: <CustomLayouts />,
    children: [
      {
        path: '',
        element: <DefaultPage />,
      },
      {
        path: 'get-posts',
        element: <GetPostsPage />,
      },
      {
        path: 'get-users',
        element: <GetUsersPage />,
      },
    ],
  },
])

export const defaultRouterMetas = [
  {
    path: baseUrl,
    title: 'Home',
  },
  {
    path: `${baseUrl}get-posts`,
    title: 'All Posts',
  },
  {
    path: `${baseUrl}get-users`,
    title: 'All Users',
  },
]
