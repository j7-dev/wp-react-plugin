import React from 'react'
import { Row, Col, Button } from 'antd'
import CheckChartColumn from '@/components/CheckChartColumn'
import CheckChartPie from '@/components/CheckChartPie'
import CheckScopeITable from '@/components/CheckScopeITable'

const Export = () => {
	return (
		<>
			<Row gutter={24}>
				<Col span={24} lg={{ span: 16 }}>
					<CheckChartColumn />
				</Col>
				<Col span={24} lg={{ span: 8 }}>
					<CheckChartPie />
				</Col>
			</Row>
			<CheckScopeITable groupRowIndex="test" />
			<Row className="my-8" gutter={24}>
				<Col span={24} lg={{ span: 12 }}>
					<Button type="primary" size="large" className="w-full">
						匯出為 PDF
					</Button>
				</Col>
				<Col span={24} lg={{ span: 12 }}>
					<Button type="default" size="large" className="w-full">
						匯出為 JSON 數據
					</Button>
				</Col>
			</Row>
		</>
	)
}

export default Export
