import { useState, useEffect } from 'react'
import { getResources } from '@/api'
import { useQuery } from '@tanstack/react-query'

const useMany = (options: {
  resource: string
  args?: Record<string, any>
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
  const queryKey = !!options?.args
    ? [
        `get_${options.resource}s`,
        options?.args,
      ]
    : [
        `get_${options.resource}s`,
      ]

  const [
    fetchedData,
    setFetchedData,
  ] = useState<any>(null)
  const getResult = useQuery(
    queryKey,
    async () =>
      getResources({
        resource: options.resource,
        args: options.args,
      }),
    options.queryOptions || {},
  )
  const { isSuccess, data, isFetching } = getResult

  useEffect(() => {
    console.log('changeddddd')
    if (data) {
      console.log('set data')

      setFetchedData(data.data || null)
    }
  }, [
    isSuccess,
    isFetching,
  ])

  return fetchedData
}

export default useMany
