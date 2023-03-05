import { useContext } from 'react'
import { Row, Col, Alert, Empty } from 'antd'
import CheckChartColumn from '@/components/CheckChartColumn'
import CheckChartPie from '@/components/CheckChartPie'
import { ProjectContext } from '@/pages/Check'
import { flatten } from 'lodash-es'
import { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import { TGroupData } from '@/types'
import { nanoid } from 'nanoid'

const Chart = () => {
  const { projectData, scopes } = useContext(ProjectContext)
  const scopeIGroups: TGroupData[] = scopes?.scopeI || []
  const scopeIIGroups: TGroupData[] = scopes?.scopeII || []
  const mergedDataSource: TYearlyDataType[] = flatten([
    ...(scopeIGroups.map((group) => group?.dataSource) || []),
    ...(scopeIIGroups.map((group) => group?.dataSource) || []),
  ])

  const analytics = projectData?.meta_box?.analytics || ''
  const analyticsLines = () =>
    analytics.split(/\r\n/g).map((line: string) => (
      <p className="my-0" key={nanoid()}>
        {line}
      </p>
    ))

  const suggestion = projectData?.meta_box?.suggestion || ''
  const suggestionLines = () =>
    suggestion.split(/\r\n/g).map((line: string) => (
      <p className="my-0" key={nanoid()}>
        {line}
      </p>
    ))

  return (
    <>
      <Row gutter={24}>
        {mergedDataSource.length > 0 ? (
          <>
            <Col span={24} lg={{ span: 16 }} className="mb-12">
              <CheckChartColumn mergedDataSource={mergedDataSource} />
            </Col>
            <Col span={24} lg={{ span: 8 }} className="mb-12">
              <CheckChartPie mergedDataSource={mergedDataSource} />
            </Col>
          </>
        ) : (
          <div className="w-full px-2">
            <div className="flex justify-center items-center w-full aspect-video bg-slate-100 rounded-xl">
              <Empty description="沒有資料" />
            </div>
          </div>
        )}
      </Row>
      <Row className="mt-8" gutter={24}>
        {!!analytics && (
          <Col span={24} lg={{ span: 12 }} className="mb-8">
            <Alert
              className="h-full"
              message="分析事項"
              description={<>{analyticsLines()}</>}
              type="info"
              showIcon
            />
          </Col>
        )}
        {!!suggestion && (
          <Col span={24} lg={{ span: 12 }} className="mb-8">
            <Alert
              className="h-full"
              message="建議事項"
              description={<>{suggestionLines()}</>}
              type="warning"
              showIcon
            />
          </Col>
        )}
      </Row>
    </>
  )
}

export default Chart
