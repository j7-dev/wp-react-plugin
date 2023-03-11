import { axios } from '@/api'
import { apiUrl } from '@/utils'

export const getResource = async ({
  resource,
  id,
  args = {},
}: {
  resource: string
  id: number
  args?: Record<string, any>
}) => {
  const getResult = await axios.get(
    `${apiUrl}/wp/v2/${resource}/${id}/?${new URLSearchParams(
      args,
    ).toString()}`,
  )

  return getResult
}

export const getResources = async ({
  resource,
  args = {},
}: {
  resource: string
  args?: Record<string, any>
}) => {
  const getResult = await axios.get(
    `${apiUrl}/wp/v2/${resource}/?${new URLSearchParams(args).toString()}`,
  )

  return getResult
}
