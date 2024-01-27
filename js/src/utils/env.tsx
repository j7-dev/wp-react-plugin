/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { atom } from 'jotai'

const APP_DOMAIN = 'my_app_data' as string
export const snake = window?.[APP_DOMAIN]?.env?.SNAKE || 'my_app'
export const appName = window?.[APP_DOMAIN]?.env?.APP_NAME || 'My App'
export const kebab = window?.[APP_DOMAIN]?.env?.KEBAB || 'my-app'
export const renderId1 = window?.[APP_DOMAIN]?.env?.RENDER_ID_1 || 'my_app'
export const renderId2 =
  window?.[APP_DOMAIN]?.env?.RENDER_ID_2 || 'my_app_metabox'
export const apiUrl = window?.wpApiSettings?.root || '/wp-json'
export const ajaxUrl =
  window?.[APP_DOMAIN]?.env?.ajaxUrl || '/wp-admin/admin-ajax.php'
export const siteUrl = window?.[APP_DOMAIN]?.env?.siteUrl || '/'
export const currentUserId = window?.[APP_DOMAIN]?.env?.userId || '0'
export const postId = window?.[APP_DOMAIN]?.env?.postId || '0'
export const permalink = window?.[APP_DOMAIN]?.env?.permalink || '/'
export const apiTimeout = import.meta.env.API_TIMEOUT || '30000'

export const envAtom = atom(async (get, { signal }) => {
  const response = await fetch(`${window.location.href}wp-json/${kebab}/env`, {
    signal,
  })
  return response.json()
})
