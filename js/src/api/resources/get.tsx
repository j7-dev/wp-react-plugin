import { axios } from '@/api'
import { apiUrl, getDataProviderUrlParams } from '@/utils'
import { TDataProvider } from '@/types'
import { AxiosRequestConfig } from 'axios'

export const getResource = async ({
  resource,
  dataProvider = 'wp-rest',
  pathParams = [],
  args = {},
  config = undefined,
}: {
  resource: string
  dataProvider?: TDataProvider
  pathParams?: string[]
  args?: Record<string, string>
  config?: AxiosRequestConfig<{ [key: string]: any }> | undefined
}) => {
  const dataProviderUrlParams = getDataProviderUrlParams(dataProvider)
  const getResult = await axios.get(
    `${apiUrl}/${dataProviderUrlParams}/${resource}/${pathParams.join(
      '/',
    )}?${new URLSearchParams(args).toString()}`,
    config,
  )

  return getResult
}

export const getResources = async ({
  resource,
  dataProvider = 'wp-rest',
  pathParams = [],
  args = {},
  config = undefined,
}: {
  resource: string
  dataProvider?: TDataProvider
  pathParams?: string[]
  args?: Record<string, string>
  config?: AxiosRequestConfig<{ [key: string]: any }> | undefined
}) => {
  const dataProviderUrlParams = getDataProviderUrlParams(dataProvider)
  const getResult = await axios.get(
    `${apiUrl}/${dataProviderUrlParams}/${resource}/${pathParams.join(
      '/',
    )}?${new URLSearchParams(args).toString()}`,
    config,
  )

  return getResult
}
