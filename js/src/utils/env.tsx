/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

const APP_DOMAIN = 'wp_react_plugin_data' as string

const env = window?.[APP_DOMAIN]?.env

export const SITE_URL = env?.SITE_URL
export const API_URL = env?.API_URL || '/wp-json'
export const CURRENT_USER_ID = env?.CURRENT_USER_ID || 0
export const POST_ID = env?.POST_ID || 0
export const PERMALINK = env?.PERMALINK || ''
export const AJAX_URL = env?.AJAX_URL || '/wp-admin/admin-ajax.php'
export const APP_NAME = env?.APP_NAME || 'Wp React Plugin'
export const KEBAB = env?.KEBAB || 'wp-react-plugin'
export const SNAKE = env?.SNAKE || 'wp_react_plugin'
export const NONCE = env?.NONCE || ''
export const APP1_SELECTOR = env?.APP1_SELECTOR || 'wp_react_plugin'
export const APP2_SELECTOR = env?.APP2_SELECTOR || 'wp_react_plugin_metabox'
export const ELEMENTOR_ENABLED = env?.ELEMENTOR_ENABLED || false

