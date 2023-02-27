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
  const [
    fetchedData,
    setFetchedData,
  ] = useState<any>(null)
  const getResult = useQuery(
    [`get_${options.resource}s`],
    async () =>
      getResources({
        resource: options.resource,
        args: options.args,
      }),
    options.queryOptions || {},
  )
  const { isSuccess, data } = getResult

  useEffect(() => {
    if (data) {
      setFetchedData(data.data || null)
    }
  }, [isSuccess])

  return fetchedData
}

export default useMany
