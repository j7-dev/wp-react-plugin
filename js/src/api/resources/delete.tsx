import { axios } from '@/api'

export const deleteResource = async ({
  resource,
  id,
}: {
  resource: string
  id: number
}) => {
  const deleteResult = await axios.delete(`/wp/v2/${resource}/${id}`)

  return deleteResult
}
