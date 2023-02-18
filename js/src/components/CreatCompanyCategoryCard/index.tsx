import React from 'react'
import { Card } from 'antd'
import { Link } from '@tanstack/react-location'

const { Meta } = Card

const CreatCompanyCategoryCard: React.FC = () => (
	<Link to='/check'>
		<Card
			style={{ width: '100%' }}
			cover={
				<img
					className='aspect-[16/9]'
					alt="example"
					src="https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2129&q=80"
				/>
			}
		>
			<Meta
				title={<p className='text-center my-0'>化學工業</p>}
			/>
		</Card>
	</Link>
)

export default CreatCompanyCategoryCard