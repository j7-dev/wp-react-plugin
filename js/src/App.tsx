import '@/assets/scss/index.scss'
import { RouterProvider } from 'react-router-dom'
import { defaultRouters } from '@/Router'

function App() {
  return <RouterProvider router={defaultRouters} />
}

export default App
