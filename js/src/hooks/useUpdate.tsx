import { useState, useEffect } from 'react'
import { updateResource } from '@/api'
import { useMutation } from '@tanstack/react-query'

const useUpdate = (options: {
  resource: string
  id: number
  args: {
    [key: string]: any
  }
}) => {
  const [
    fetchedData,
    setFetchedData,
  ] = useState<any>(null)

  const mutation = useMutation({
    mutationFn: () =>
      updateResource({
        resource: options.resource,
        id: options.id,
        args: options.args,
      }),
  })

  // const getResult = useQuery(
  //   [
  //     `get_${options.resource}`,
  //     options.id,
  //   ],
  //   async () =>
  //     updateResource({
  //       resource: options.resource,
  //       id: options.id,
  //       args: options.args,
  //     }),
  //   options.queryOptions || {},
  // )
  const { isSuccess, data } = mutation

  useEffect(() => {
    if (data) {
      // setFetchedData(data.data || null)
    }
  }, [isSuccess])

  return fetchedData
}

export default useUpdate
