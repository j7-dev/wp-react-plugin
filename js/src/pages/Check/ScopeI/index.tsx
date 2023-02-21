import { useState, useContext } from 'react'
import CheckScopeITable from '@/components/CheckScopeITable'
import { Button } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
const ScopeI = () => {
	const [count, setCount] = useState([0])

	const handleAdd = () => {
		setCount([...count, count[count.length - 1] + 1])
	}

	const handleDeleteGroup = (groupRowIndex: string) => {
		const newCount = count.filter(
			(rowIndex) => `groupRowIndex-${rowIndex}` !== groupRowIndex,
		)
		setCount(newCount)
	}

	return (
		<>
			{count.map((rowIndex) => (
				<CheckScopeITable
					key={`groupRowIndex-${rowIndex}`}
					groupRowIndex={`groupRowIndex-${rowIndex}`}
					onDelete={handleDeleteGroup}
					editable
				/>
			))}
			<Button
				className="w-full mt-8"
				type="primary"
				size="large"
				onClick={handleAdd}
			>
				<AppstoreAddOutlined className="mr-2" />
				新增群組
			</Button>
		</>
	)
}

export default ScopeI
