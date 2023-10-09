/* eslint-disable @typescript-eslint/no-empty-function */
import { updateResource } from '@/api'
import { TDataProvider } from '@/types'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export const useUpdate = (options: {
  resource: string
  dataProvider?: TDataProvider
  pathParams?: string[]
  args?: {
    [key: string]: any
  }
  config?: AxiosRequestConfig<{ [key: string]: any }> | undefined
  mutationOptions?: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    { [key: string]: any }
  >
}) => {
  const resource = options?.resource || 'post'
  const dataProvider = options?.dataProvider || 'wp-rest'
  const pathParams = options?.pathParams || []
  const args = options?.args || undefined
  const config = options?.config || undefined
  const mutationOptions = options.mutationOptions ?? {}
  const mutationFn = (fnProps?: { [key: string]: any }) =>
    updateResource({
      resource,
      dataProvider,
      pathParams,
      args: fnProps ? fnProps : args,
      config,
    })
  const update = useMutation({
    mutationFn,
    ...mutationOptions,
  })

  return update
}
