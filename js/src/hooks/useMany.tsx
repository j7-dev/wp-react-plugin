import { getResources } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { TPostsArgs, TDataProvider } from '@/types'
import { AxiosRequestConfig } from 'axios'

export const useMany = (options: {
  resource: string
  dataProvider?: TDataProvider
  pathParams?: string[]
  args?: TPostsArgs & {
    [key: string]: any
  }
  config?: AxiosRequestConfig<{ [key: string]: any }> | undefined
  queryOptions?: {
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
}) => {
  const resource = options?.resource || 'post'
  const dataProvider = options?.dataProvider || 'wp-rest'
  const pathParams = options?.pathParams || []
  const args = options?.args || undefined
  const config = options?.config || undefined

  const queryKey = args
    ? [
        `get_${resource}s`,
        dataProvider,
        pathParams,
        args,
      ]
    : [
        `get_${resource}s`,
        dataProvider,
        pathParams,
      ]

  const getResult = useQuery(
    queryKey,
    async () =>
      getResources({
        resource,
        dataProvider,
        pathParams,
        args,
        config,
      }),
    options.queryOptions || {},
  )

  return getResult
}
