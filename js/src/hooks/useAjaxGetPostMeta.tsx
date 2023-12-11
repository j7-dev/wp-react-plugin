import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { adminAjax } from '@/api'
import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { useAjaxNonce } from '@/hooks'

type TProps = {
  post_id: string
  meta_key: string
  formatter?: (_meta: string) => string
  config?: AxiosRequestConfig<{ [key: string]: any }> | undefined
}

type TData = {
  data: {
    data: {
      post_meta: string
    }
  }
}

type TFnProps = {
  post_id: string
  meta_key: string
}

export function useAjaxGetPostMeta<T>(props: TProps) {
  const ajaxNonce = useAjaxNonce()
  const queryClient = useQueryClient()

  const [
    meta,
    setMeta,
  ] = useState<T | undefined>(undefined)

  const result = useQuery<
    AxiosResponse<any, any>,
    AxiosError<unknown, any>,
    TData,
    any
  >({
    queryKey: [
      'get_post_meta',
      props.post_id,
      props.meta_key,
    ],
    queryFn: (fnProps?: TFnProps) =>
      adminAjax({
        args: {
          action: 'handle_get_post_meta',
          nonce: ajaxNonce,
          post_id: fnProps?.post_id || props.post_id,
          meta_key: fnProps?.meta_key || props.meta_key,
        },
        config: props?.config,
      }),
    onSuccess: (data: TData) => {
      const post_meta: string = data?.data?.data?.post_meta || ''
      if (props.formatter) {
        const formattedMeta = props.formatter(post_meta) as T
        setMeta(formattedMeta)
      } else {
        setMeta(post_meta as T)
      }
    },
    onError: (error: AxiosError) => {
      const status: number = error?.response?.status ?? 500
      if (status === 403) {
        queryClient.invalidateQueries(['get_ajax_nonce'])
        queryClient.invalidateQueries(['get_post_meta'])
      }
      console.log(error)
    },
    enabled: !!ajaxNonce,
  })

  return {
    ...result,
    meta,
  }
}
