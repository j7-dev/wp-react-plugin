import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { renderId1, renderId2 } from '@/utils'

const App1 = React.lazy(() => import('./App1'))
const App2 = React.lazy(() => import('./App2'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})
const id1 = document.getElementById(renderId1)
const id2 = document.getElementById(renderId2)

const mapping = [
  {
    el: id1,
    App: App1,
  },
  {
    el: id2,
    App: App2,
  },
]

mapping.forEach(({ el, App }) => {
  if (!!el) {
    ReactDOM.createRoot(el).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </React.StrictMode>,
    )
  }
})
