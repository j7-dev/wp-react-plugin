import { axios } from '@/api'

export const createResource = async ({
  resource,
  args,
  config,
}: {
  resource: string
  args: {
    [key: string]: any
  }
  config?: any
}) => {
  const createResult = await axios.post(`/wp/v2/${resource}`, args, config)

  return createResult
}
