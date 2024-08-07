import { axios } from '@/api'
import { apiUrl, getDataProviderUrlParams } from '@/utils'
import { TDataProvider } from '@/types'
import { AxiosRequestConfig } from 'axios'

export const updateResource = async ({
	resource,
	dataProvider = 'wp-rest',
	pathParams = [],
	args = {},
	config = undefined,
}: {
	resource: string
	dataProvider?: TDataProvider
	pathParams?: string[]
	args?: {
		[key: string]: any
	}
	config?: AxiosRequestConfig<{ [key: string]: any }> | undefined
}) => {
	const dataProviderUrlParams = getDataProviderUrlParams(dataProvider)
	const updateResult = await axios.post(
		`${apiUrl}/${dataProviderUrlParams}/${resource}/${pathParams.join('/')}`,
		args,
		config,
	)

	return updateResult
}
