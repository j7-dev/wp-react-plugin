import React, { useContext, useState, useEffect } from 'react'
import { Table, Row, Button, Typography, Form } from 'antd'
import AddRowButton from './components/AddRowButton'
import type { TYearlyDataType } from './types'
import useColumns from './hooks/useColumns'
import { TableDataContext } from '@/components/CheckScopeITable'
import { DeleteFilled } from '@ant-design/icons'
import useMonthlyTable from './hooks/useMonthlyTable'
import type { ColumnType } from 'antd/lib/table'
import { useColor } from '@/hooks'
import { updateProject } from '@/api'
import { ProjectContext } from '@/pages/Check'
import HiddenInput from '@/components/HiddenInput'

const App: React.FC = () => {
	const { colorPrimary } = useColor()
	const columns = useColumns()
	const { renderTable } = useMonthlyTable()
	const {
		dataSource,
		onDelete: handleDeleteGroup,
		groupRowIndex,
		editable = false,
	} = useContext(TableDataContext)
	const groupRowIndexNumber = parseInt(
		groupRowIndex.replace('groupRowIndex-', ''),
		10,
	)
	const { projectData: projectContextData } = useContext(ProjectContext)
	const id = projectContextData?.id || 0
	const form = Form.useFormInstance()
	const [projectData, setProjectData] = useState<any>(null)

	const handleDelete = (theGroupRowIndex: string) => () => {
		handleDeleteGroup(theGroupRowIndex)
	}

	const [editableStr, setEditableStr] = useState(
		`工廠 #${groupRowIndexNumber + 1}`,
	)

	const handelChange = (str: string) => {
		setEditableStr(str)
		form.setFieldValue(['groups', groupRowIndexNumber, 'groupName'], str)
	}
	console.log('projectData', projectData)
	console.log('projectContextData', projectContextData)

	useEffect(() => {
		const data = JSON.parse(projectContextData?.meta?.project_data || '{}')
		setProjectData(data)
		setEditableStr(
			data?.groups?.[groupRowIndexNumber]?.groupName ||
				`工廠 #${groupRowIndexNumber + 1}`,
		)
	}, [projectContextData])

	return (
		<div>
			<Typography.Title editable={{ onChange: handelChange }} level={4}>
				{editableStr}
			</Typography.Title>
			<HiddenInput
				name={['groups', groupRowIndexNumber, 'groupName']}
				initialValue={`工廠 #${groupRowIndexNumber + 1}`}
				required
			/>
			<Table
				className="mt-4"
				expandable={{
					expandedRowRender: (record: TYearlyDataType) => renderTable(record),
					rowExpandable: (record) => record.period === 'monthly',
				}}
				bordered
				dataSource={dataSource}
				columns={columns as ColumnType<TYearlyDataType>[]}
				pagination={false}
				scroll={{ x: 1150 }}
			/>
			{!!editable && (
				<Row justify="space-between">
					<Button
						className="mt-4"
						type="primary"
						danger
						onClick={handleDelete(groupRowIndex)}
					>
						<DeleteFilled className="mr-2" />
						刪除群組
					</Button>
					<AddRowButton />
				</Row>
			)}

			<div style={{ backgroundColor: colorPrimary }} className="my-8 h-[3px]" />
		</div>
	)
}

export default App
