export const appName = import.meta.env.APP_NAME || 'Power Shop'
export const kebab = appName.toLowerCase().replace(/\s+/g, '-')
export const snake = appName.toLowerCase().replace(/\s+/g, '_')
export const baseUrl = import.meta.env.VITE_BASE_URL || '/'
export const renderId = import.meta.env.VITE_RENDER_ID || 'my-app'

export const apiUrl = window?.wpApiSettings?.root || '/wp-json'
export const ajaxUrl = window?.appData?.ajaxUrl || '/wp-admin/admin-ajax.php'
export const siteUrl = window?.appData?.siteUrl || '/'
export const checkoutUrl = window?.appData?.checkoutUrl || '/checkout'
export const ajaxNonce = window?.appData?.ajaxNonce || ''
export const currentUserId = window?.appData?.userId || '0'
export const postId = window?.appData?.postId || '0'
export const permalink = window?.appData?.permalink || '/'

export const apiTimeout = import.meta.env.VITE_API_TIMEOUT || '30000'
