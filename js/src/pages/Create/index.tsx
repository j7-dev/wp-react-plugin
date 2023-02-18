import React from 'react'
import { Row, Col } from 'antd'
import CreatCompanyCategoryCard from '@/components/CreatCompanyCategoryCard'
import CreatCompanyCategoryInput from '@/components/CreatCompanyCategoryInput'
import { nanoid } from 'nanoid'

console.log('Hello from Create!!');

const Create = () => {
	return (
		<Row gutter={[24, 24]}>
			{new Array(10).fill(0).map((_, i) => (
				<Col key={nanoid()} xl={{ span: 6 }} lg={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
					<CreatCompanyCategoryCard />
				</Col>
			))
			}
			<Col xl={{ span: 6 }} lg={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
				<CreatCompanyCategoryInput />
			</Col>
		</Row>
	)
}

export default Create