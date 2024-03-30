/* eslint-disable @typescript-eslint/no-empty-function */
import { adminAjax, TAdminAjaxArgs } from '@/api'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ajaxNonce } from '@/utils'

export const useAjax = (options?: {
  args?: Omit<TAdminAjaxArgs, 'nonce'>
  config?: AxiosRequestConfig<{ [key: string]: any }> | undefined
  mutationOptions?: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    Omit<TAdminAjaxArgs, 'nonce'>
  >
}) => {
  const args = options?.args || undefined
  const config = options?.config || undefined
  const mutationOptions = options?.mutationOptions ?? {}
  const mutationFn = (fnProps?: Omit<TAdminAjaxArgs, 'nonce'>) =>
    adminAjax({
      args: {
        ...(fnProps || args || {}),
        nonce: ajaxNonce,
      } as TAdminAjaxArgs,
      config,
    })
  const result = useMutation({
    mutationFn,
    ...mutationOptions,
  })

  return result
}
