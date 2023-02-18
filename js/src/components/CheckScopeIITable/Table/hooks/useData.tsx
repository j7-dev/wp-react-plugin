import { useState } from 'react'
import { DataType } from '../interfaces'

const useData = () => {
	const [dataSource, setDataSource] = useState<DataType[]>([
		{
			key: 0,
			source: '市電',
			usagePerYear: 5000,
			percentage: 0.8,
			CarbonTonsPerYear: 1.55,
		},
		{
			key: 1,
			source: '市電',
			usagePerYear: 5000,
			percentage: 0.8,
			CarbonTonsPerYear: 1.55,
		},
	])

	const [count, setCount] = useState(2)

	const handleAdd = () => {
		const newData: DataType = {
			key: count,
			source: '市電',
			usagePerYear: 5000,
			percentage: 0.8,
			CarbonTonsPerYear: 1.55,
		}
		setDataSource([...dataSource, newData])
		setCount(count + 1)
	}

	const handleSave = (row: DataType) => {
		const newData = [...dataSource]
		const index = newData.findIndex((item) => row.key === item.key)
		const item = newData[index]
		newData.splice(index, 1, {
			...item,
			...row,
		})
		setDataSource(newData)
	}

	const handleDelete = (key: React.Key) => {
		const newData = dataSource.filter((item: DataType) => item.key !== key)
		setDataSource(newData)
	}


	return { dataSource, setDataSource, count, setCount, handleAdd, handleSave, handleDelete }
}

export default useData