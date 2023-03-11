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
    title: '首頁',
  },
  {
    path: `${baseUrl}get-posts`,
    title: '所有文章',
  },
  {
    path: `${baseUrl}get-users`,
    title: '所有用戶',
  },
]
