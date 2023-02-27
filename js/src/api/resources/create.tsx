import { axios } from '@/api'

export const createResource = async ({
  resource,
  options,
}: {
  resource: string
  options: {
    [key: string]: any
  }
}) => {
  const createResult = await axios.post(`/wp/v2/${resource}`, options)

  return createResult
}
