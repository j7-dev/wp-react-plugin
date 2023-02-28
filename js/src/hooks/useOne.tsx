import { useState, useEffect } from 'react'
import { getResource } from '@/api'
import { useQuery } from '@tanstack/react-query'

const useOne = (options: {
  resource: string
  id: number
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
    [
      `get_${options.resource}`,
      options.id,
    ],
    async () =>
      getResource({
        resource: options.resource,
        id: options.id,
      }),
    options.queryOptions || {},
  )
  const { isSuccess, data, isFetching } = getResult

  useEffect(() => {
    if (data) {
      setFetchedData(data.data || null)
    }
  }, [
    isSuccess,
    isFetching,
  ])

  return fetchedData
}

export default useOne
