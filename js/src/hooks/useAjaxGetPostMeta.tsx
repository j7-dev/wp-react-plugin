import { useState, useEffect } from 'react'
import { useAjax } from '@/hooks'
import { ajaxNonce } from '@/utils'

type TProps = {
  post_id: string
  meta_key: string
  formatter?: (_meta: string) => string
}

export function useAjaxGetPostMeta<T>(props: TProps) {
  const [
    meta,
    setMeta,
  ] = useState<T | undefined>(undefined)
  const mutation = useAjax()
  const { mutate } = mutation

  useEffect(() => {
    mutate(
      {
        action: 'handle_get_post_meta',
        nonce: ajaxNonce,
        post_id: props.post_id,
        meta_key: props.meta_key,
      },
      {
        onSuccess: (data) => {
          const post_meta: string = data?.data?.data?.post_meta || ''
          if (props.formatter) {
            const formattedMeta = props.formatter(post_meta) as T
            setMeta(formattedMeta)
          } else {
            setMeta(post_meta as T)
          }
        },
        onError: (error) => {
          console.log(error)
        },
      },
    )
  }, [])

  return {
    ...mutation,
    meta,
  }
}
