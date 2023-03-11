import { ConfigProvider } from 'antd'
import '@/assets/scss/index.scss'
import { RouterProvider } from 'react-router-dom'
import { defaultRouters } from '@/Router'
import { antdTheme } from './utils'

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <RouterProvider router={defaultRouters} />
    </ConfigProvider>
  )
}

export default App
