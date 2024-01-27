import { axios } from '@/api'
import { apiUrl, getDataProviderUrlParams } from '@/utils'
import { TDataProvider } from '@/types'
import { AxiosRequestConfig } from 'axios'

export const createResource = async ({
  resource,
  dataProvider = 'wp-rest',
  args,
  config,
}: {
  resource: string
  dataProvider?: TDataProvider
  args?: {
    [key: string]: any
  }
  config?: AxiosRequestConfig<{ [key: string]: any }> | undefined
}) => {
  const dataProviderUrlParams = getDataProviderUrlParams(dataProvider)
  const createResult = await axios.post(
    `${apiUrl}/${dataProviderUrlParams}/${resource}`,
    args,
    config,
  )

  return createResult
}
