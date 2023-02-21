import React, { useState, createContext, useEffect } from 'react'
import { Tabs, Typography, Form, Button, TabsProps } from 'antd'
import ScopeI from './ScopeI'
import ScopeII from './ScopeII'
import Chart from './Chart'
import Export from './Export'
import { useColor, useOne } from '@/hooks'
import { useLocation } from 'react-router-dom'
import HiddenInput from '@/components/HiddenInput'
import { updateProject } from '@/api'
import { useQueryClient } from '@tanstack/react-query'

export const ProjectContext = createContext<any>({ projectData: null })

const items: TabsProps['items'] = [
	{
		key: '1',
		label: 'SCOPE I',
		children: <ScopeI />,
	},
	{
		key: '2',
		label: 'SCOPE II',
		children: <ScopeII />,
	},
	{
		key: '3',
		label: '報表',
		children: <Chart />,
	},
	{
		key: '4',
		label: '匯出',
		children: <Export />,
	},
]

const App: React.FC = () => {
	const { state } = useLocation()
	const id = state?.id
	const { colorPrimary } = useColor()
	const [editableStr, setEditableStr] = useState('○○○○股份有限公司')
	const projectData = useOne({
		resource: 'carbon-project',
		id,
	})
	const [form] = Form.useForm()
	const queryClient = useQueryClient()

	useEffect(() => {
		console.log('projectData', projectData)
		setEditableStr(projectData?.title?.rendered ?? '○○○○股份有限公司')
	}, [projectData])

	const handleChange = (str: string) => {
		setEditableStr(str)
		form.setFieldValue(['title'], str)
	}

	const handleUpdate = async () => {
		const values = form.getFieldsValue()
		console.log('all value', values)
		try {
			await updateProject(id, {
				title: values.title,
				meta: {
					project_data: JSON.stringify(values),
				},
			})
			queryClient.invalidateQueries(['getProject', id])
		} catch (error) {}
	}

	return (
		<>
			<Form form={form}>
				<hr style={{ borderColor: colorPrimary }} />
				<div className="flex justify-between align-middle mt-8">
					<Typography.Title editable={{ onChange: handleChange }} level={3}>
						{editableStr}
					</Typography.Title>

					<Button type="primary" size="large" onClick={handleUpdate}>
						更新專案資料
					</Button>
				</div>
				<HiddenInput
					name={['title']}
					required
					initialValue="○○○○股份有限公司"
				/>
				<div className="w-full border-2 border-gray-500 mt-8">
					<ProjectContext.Provider value={{ projectData }}>
						<Tabs tabPosition="left" items={items} />
					</ProjectContext.Provider>
				</div>
			</Form>
		</>
	)
}

export default App
