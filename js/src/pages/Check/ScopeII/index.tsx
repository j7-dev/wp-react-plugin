import React, { useState } from 'react'
import CheckScopeIITable from '@/components/CheckScopeIITable'
import { Button } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

const ScopeII = () => {
	const [groups, setGroups] = useState<string[]>(['TAB-1'])
	const [count, setCount] = useState(1)

	const handleAdd = () => {
		setCount(count + 1)
		setGroups([...groups, `TAB-${count + 1}`])
	}

	const handleDeleteGroup = (id: string) => {
		setGroups(groups.filter((item) => item !== id))
	}

	console.log(groups.filter((item) => item !== 'TAB-1'))

	return (
		<>
			{groups.map((id) => (
				<CheckScopeIITable
					key={nanoid()}
					id={id}
					onDelete={handleDeleteGroup}
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

export default ScopeII
