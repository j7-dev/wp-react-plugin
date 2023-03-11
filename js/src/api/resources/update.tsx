import { axios } from '@/api'
import { apiUrl } from '@/utils'

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
  const updateResult = await axios.post(
    `${apiUrl}/wp/v2/${resource}/${id}`,
    args,
  )

  return updateResult
}
