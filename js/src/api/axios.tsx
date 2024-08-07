import axios, { AxiosInstance } from 'axios'
import { apiUrl, apiTimeout } from '@/utils'

const wpApiSettings = window?.wpApiSettings || {}

const instance: AxiosInstance = axios.create({
	baseURL: apiUrl,
	timeout: parseInt(apiTimeout, 10),
	headers: {
		'X-WP-Nonce': wpApiSettings?.nonce || '',
		'Content-Type': 'application/json',
	},
})

instance.interceptors.response.use(
	function (response) {
		return response
	},
	async function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger

		console.log('error', error)

		return Promise.reject(error)
	},
)

export default instance
