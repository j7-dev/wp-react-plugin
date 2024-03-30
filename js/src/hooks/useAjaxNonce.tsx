import { atom, useAtom } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import { axios } from '@/api'
import { useEffect } from 'react'
import { apiUrl, kebab } from '@/utils'

export const ajaxNonceAtom = atom('')

/**
 * @description
 * About useAjaxNonce
 * Because some cache plugin will cache the nonce in static page
 * but the nonce will be expired after a 24 hours
 * so we need to get the nonce from the server
 * and fetch the nonce every 18 hours
 */

export const useAjaxNonce = () => {
  const [
    ajaxNonce,
    setAjaxNonce,
  ] = useAtom(ajaxNonceAtom)

  const { data, isLoading } = useQuery({
    queryKey: [
      'get_ajax_nonce',
    ],
    queryFn: () => axios.get(`${apiUrl}/${kebab}/ajaxnonce`),
    staleTime: 1000 * 60 * 60 * 18,
    cacheTime: 1000 * 60 * 60 * 18,
    refetchInterval: 1000 * 60 * 60 * 18,
  })

  useEffect(() => {
    if (!isLoading) {
      const nonce = data?.data || ''

      setAjaxNonce(nonce)
    }
  }, [isLoading])

  return ajaxNonce
}
