
import { Row, Col } from 'antd'
import ProjectsCompanyCard from '@/components/ProjectsCompanyCard'
import ProjectsCompanyCreateButton from '@/components/ProjectsCompanyCreateButton'
import { nanoid } from 'nanoid'


function DefaultPage() {


	return (
		<Row gutter={[24, 24]}>
			{new Array(0).fill(0).map(() => (
				<Col key={nanoid()} xl={{ span: 6 }} lg={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
					<ProjectsCompanyCard />
				</Col>
			))
			}
			<Col xl={{ span: 6 }} lg={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
				<ProjectsCompanyCreateButton />
			</Col>
		</Row>
	)
}

export default DefaultPage
