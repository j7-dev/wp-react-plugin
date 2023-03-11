import { axios } from '@/api'
import { apiUrl } from '@/utils'

export const deleteResource = async ({
  resource,
  id,
}: {
  resource: string
  id: number
}) => {
  const deleteResult = await axios.delete(`${apiUrl}/wp/v2/${resource}/${id}`)

  return deleteResult
}
