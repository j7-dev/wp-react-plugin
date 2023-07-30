import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import App2 from './App2'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { renderId1, renderId2 } from '@/utils'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const id1 = document.getElementById(renderId1)

if (!!id1) {
  ReactDOM.createRoot(id1).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
  )
}

const id2 = document.getElementById(renderId2)

if (!!id2) {
  ReactDOM.createRoot(id2).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App2 />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
  )
}
