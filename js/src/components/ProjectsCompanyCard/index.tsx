import React from 'react'
import { Card } from 'antd'
import { Link } from '@tanstack/react-location'

const { Meta } = Card
const baseUrl = process.env.BASE_URL || ''

const ProjectsCompanyCard: React.FC = () => (
	<Link to='create'>
		<Card
			style={{ width: '100%' }}
			cover={
				<img
					className='aspect-[16/9]'
					alt="example"
					src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
				/>
			}

		>
			<Meta
				title="○○科技有限公司"
				description="○○秉承「環境是人類最寶貴資產，環境保護是我們應負責任」，引進世界最先進的技術及設備，提昇各廠廢水處理效能，成為業界的典範之一。 除了廢水處理外，○○各工廠..."
			/>
		</Card>
	</Link>
)

export default ProjectsCompanyCard