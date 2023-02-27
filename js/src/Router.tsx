import CustomLayouts from '@/components/CustomLayouts'
import DefaultPage from '@/pages/'
import Create from '@/pages/Create'
import Check from '@/pages/Check'
import { createBrowserRouter } from 'react-router-dom'

const baseUrl = process.env.BASE_URL || ''

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
        path: 'create',
        element: <Create />,
      },
      {
        path: 'check',
        element: <Check />,
      },
    ],
  },
])
