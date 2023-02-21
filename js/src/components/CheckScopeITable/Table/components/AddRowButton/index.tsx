import { createContext, useContext, useState, useEffect } from 'react'
import { Button, Modal, Input, Radio, Form } from 'antd'
import { FolderAddOutlined } from '@ant-design/icons'
import { TableDataContext } from '@/components/CheckScopeITable'
import AddGWPYearlyFormItem from '@/components/CheckScopeITable/Table/components/AddGWPYearlyFormItem'
import AddGWPMonthlyFormItem from '@/components/CheckScopeITable/Table/components/AddGWPMonthlyFormItem'
import AddGWPHourlyFormItem from '@/components/CheckScopeITable/Table/components/AddGWPHourlyFormItem'
import type { TYearlyDataType } from '@/components/CheckScopeITable/Table/types'
import { nanoid } from 'nanoid'
import { gwpMapping, convertUnitToTons } from '@/utils'
import type { TUnit } from '@/types'

export const FormContext = createContext<any | null>(null)
const AddRowButton = () => {
	const [form] = Form.useForm()

	const { handleAdd } = useContext(TableDataContext)

	const [isModalOpen, setIsModalOpen] = useState(false)

	const [validating, setValidating] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
		form.resetFields()
	}

	const handleData = () => {
		const values = form.getFieldsValue()
		const nano = { id: nanoid() }

		const period = values.period
		const dataSources: TYearlyDataType[] = values.dataSource.map(
			(
				item: {
					gwp: string
					unit: TUnit
					yearlyAmount?: number
					hourlyAmount?: number
					hours?: number
					monthlyAmount: number[]
				},
				index: number,
			) => {
				const getYearlyAmount = () => {
					switch (period) {
						case 'yearly':
							return convertUnitToTons({
								value: item.yearlyAmount ?? 0,
								unit: item.unit,
							})
						case 'monthly':
							return convertUnitToTons({
								value: (item.monthlyAmount ?? []).reduce(
									(acc: number, cur: number) => acc + cur,
									0,
								),
								unit: item.unit,
							})
						case 'hourly':
							return convertUnitToTons({
								value: (item.hourlyAmount ?? 0) * (item.hours ?? 0),
								unit: item.unit,
							})
						default:
							return 0
					}
				}
				const yearlyAmount = getYearlyAmount()

				const ar5 = gwpMapping.find((gwp) => gwp.value === item.gwp)?.ar5 || 0
				const carbonTonsPerYear = yearlyAmount * ar5
				return {
					...item,
					key: `${nano.id}-${index.toString().padStart(2, '0')}`,
					equipment: values.equipment,
					gwp: item.gwp,
					yearlyAmount,
					ar5,
					co2e: carbonTonsPerYear,
					carbonTonsPerYear,
					period,
					monthlyAmount: period === 'monthly' ? item.monthlyAmount : [],
					hourlyAmount: period === 'hourly' ? item.hourlyAmount : [],
					unit: item.unit,
				}
			},
		)

		return dataSources
	}

	const handleOk = () => {
		setValidating(true)
		form
			.validateFields()
			.then((_values) => {
				setValidating(false)
				setIsModalOpen(false)
				const dataSources = handleData()
				handleAdd(dataSources)
			})
			.catch((err) => {
				console.log('Validate Failed:', err)
			})
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const period = Form.useWatch(['period'], form)

	useEffect(() => {
		form.resetFields([['dataSource']])
	}, [period])

	return (
		<>
			<Button onClick={showModal} type="default" className="mt-4">
				<FolderAddOutlined className="mr-2" />
				新增設備
			</Button>
			<Modal
				title="新增設備"
				open={isModalOpen}
				onOk={handleOk}
				centered
				width={600}
				className="cc-modal"
				onCancel={handleCancel}
				okText="新增設備"
				cancelText="取消"
			>
				<Form
					form={form}
					onFieldsChange={() => {
						setValidating(false)
					}}
				>
					<Form.Item
						hasFeedback={true}
						name={['equipment']}
						rules={[{ required: validating, message: '請輸入設備名稱' }]}
					>
						<Input className="mt-8" addonBefore="設備名稱" />
					</Form.Item>
					<Form.Item name={['period']} initialValue="yearly">
						<Radio.Group className="w-full mt-8" buttonStyle="solid">
							<Radio.Button className="w-1/3 text-center" value="yearly">
								年碳排放
							</Radio.Button>
							<Radio.Button className="w-1/3 text-center" value="monthly">
								月碳排放
							</Radio.Button>
							<Radio.Button className="w-1/3 text-center" value="hourly">
								每小時碳排放
							</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<FormContext.Provider value={{ validating }}>
						{period === 'yearly' && <AddGWPYearlyFormItem />}
						{period === 'monthly' && <AddGWPMonthlyFormItem />}
						{period === 'hourly' && <AddGWPHourlyFormItem />}
					</FormContext.Provider>
				</Form>
			</Modal>
		</>
	)
}

export default AddRowButton
