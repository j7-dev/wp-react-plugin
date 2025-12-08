import axios, { AxiosInstance } from 'axios'
import { API_URL, NONCE } from '@/utils'

const instance: AxiosInstance = axios.create({
	baseURL: API_URL,
	timeout: 30000,
	headers: {
		'X-WP-Nonce': NONCE,
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
