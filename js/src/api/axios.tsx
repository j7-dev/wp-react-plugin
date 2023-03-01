import axios, { AxiosInstance } from 'axios'
import { notification } from 'antd'
import { getTypeText } from '@/utils'

const baseURL = process.env.API_URL || wpApiSettings.root || ''
const timeout = process.env.API_TIMEOUT || '30000'

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: parseInt(timeout, 10),
  headers: { 'X-WP-Nonce': wpApiSettings.nonce },
})

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // console.log('response', response)
    const type = response?.data?.type
    const method = response?.config?.method || ''
    const statusText = response?.statusText
    const typeText = getTypeText(type, method, statusText)
    if (method !== 'get') {
      notification.success({
        message: `${typeText}成功`,
        onClick: () => {
          console.log('response', response)
        },
      })
    }
    return response
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    notification.error({
      message: `錯誤 ${error?.response?.data?.data?.status}`,
      description: error?.response?.data?.message || error?.message,
      onClick: () => {
        console.log('API error', error)
      },
    })

    return Promise.reject(error)
  },
)

export default instance
