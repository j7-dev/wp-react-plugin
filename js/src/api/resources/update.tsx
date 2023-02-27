import { axios } from '@/api'

export const updateResource = async ({
  resource,
  id,
  args = {},
}: {
  resource: string
  id: number
  args: {
    [key: string]: any
  }
}) => {
  const updateResult = await axios.post(`/wp/v2/${resource}/${id}`, args)

  return updateResult
}
