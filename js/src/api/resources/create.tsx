import { axios } from '@/api'
import { apiUrl } from '@/utils'

export const createResource = async ({
  resource,
  args,
  config,
}: {
  resource: string
  args?: {
    [key: string]: any
  }
  config?: any
}) => {
  const createResult = await axios.post(
    `${apiUrl}/wp/v2/${resource}`,
    args,
    config,
  )

  return createResult
}
