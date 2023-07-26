/* eslint-disable quote-props */
import { axios } from '@/api'
import { ajaxUrl } from '@/utils'
import { AxiosRequestConfig } from 'axios'

export type TAdminAjaxArgs = {
  action: string
  nonce: string
  [key: string]: string | number | undefined
}

export const adminAjax = async ({
  args,
  config = undefined,
}: {
  args?: TAdminAjaxArgs
  config?: AxiosRequestConfig<{ [key: string]: any }> | undefined
}) => {
  const formData = new FormData()

  if (!!args) {
    Object.keys(args).forEach((key) => {
      formData.append(key, args[key] as string)
    })
  }

  const result = await axios.post(ajaxUrl, formData, {
    ...config,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Accept: 'application/json',
    },
  })

  return result
}
