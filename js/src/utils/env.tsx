export const appName = import.meta.env.APP_NAME || 'Power Shop'
export const kebab = appName.toLowerCase().replace(/\s+/g, '-')
export const snake = appName.toLowerCase().replace(/\s+/g, '_')
export const renderId1 = window?.appData?.env?.RENDER_ID_1 || 'my_app'
export const renderId2 = window?.appData?.env?.RENDER_ID_2 || 'my_app_metabox'

export const apiUrl = window?.wpApiSettings?.root || '/wp-json'
export const ajaxUrl =
  window?.appData?.env?.ajaxUrl || '/wp-admin/admin-ajax.php'
export const siteUrl = window?.appData?.env?.siteUrl || '/'
export const currentUserId = window?.appData?.env?.userId || '0'
export const postId = window?.appData?.env?.postId || '0'
export const permalink = window?.appData?.env?.permalink || '/'

export const apiTimeout = import.meta.env.API_TIMEOUT || '30000'
