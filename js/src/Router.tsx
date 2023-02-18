
import DefaultPage from '@/pages/'
import Create from '@/pages/Create'
import Check from '@/pages/Check'

const baseUrl = process.env.BASE_URL || ''




export const defaultRouters = [
	{
		path: baseUrl,
		element: <DefaultPage />
	},
	{
		path: `${baseUrl}/create`,
		element: <Create />,
	},
	{
		path: `${baseUrl}/check`,
		element: <Check />,
	},
]

export const defaultRouterMetas = [
	{
		path: baseUrl,
		title: '所有專案',
	},
	{
		path: `${baseUrl}/create`,
		title: '選擇你的公司分類',
	},
	{
		path: `${baseUrl}/check`,
		title: '碳盤查',
	},
]