import React from 'react'
import { QuestionOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd'


const CreatCompanyCategoryInput: React.FC = () => (
	<div className='border-2 border-gray-300 h-full rounded-lg border-dashed flex flex-col justify-center items-center'>

		<QuestionOutlined className='text-gray-300' style={{ fontSize: 48 }} />
		<div className='text-gray-300' style={{ marginTop: 24 }}>找不到所屬的產業</div>
		<div className='absolute bottom-4 w-full'>
			<Input.Group compact className='text-center'>
				<Input style={{ width: 'calc(100% - 200px)'}} placeholder='自行輸入' />
				<Button type="primary">送出</Button>
			</Input.Group>
		</div>
	</div>
)

export default CreatCompanyCategoryInput