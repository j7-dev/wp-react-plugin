import { getResource } from '@/api'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { TDataProvider } from '@/types'
import { TPostArgs } from '@/types/wpRestApi'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export function useOne<Response = unknown, Config = unknown>(options: {
	resource: string
	dataProvider?: TDataProvider
	pathParams?: string[]
	args?: TPostArgs & {
		[key: string]: any
	}
	config?: AxiosRequestConfig<{ [key: string]: any }> | undefined
	queryOptions: Omit<
		UseQueryOptions<AxiosResponse<Response, Config>>,
		'queryKey'
	>
}) {
	const resource = options?.resource || 'post'
	const dataProvider = options?.dataProvider || 'wp-rest'
	const pathParams = options?.pathParams || []
	const args = options?.args || undefined
	const config = options?.config || undefined

	const queryKey = args
		? [
				`get_${resource}`,
				dataProvider,
				pathParams,
				args,
			]
		: [
				`get_${resource}`,
				dataProvider,
				pathParams,
			]

	const getResult = useQuery<AxiosResponse<Response, Config>>({
		queryKey,
		queryFn: () =>
			getResource({
				resource,
				dataProvider,
				pathParams,
				args,
				config,
			}),
		...options.queryOptions,
	})

	return getResult
}
