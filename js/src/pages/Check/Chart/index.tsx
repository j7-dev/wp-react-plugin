import { useContext } from 'react'
import { Row, Col, Alert, Empty } from 'antd'
import CheckChartColumn from '@/components/CheckChartColumn'
import CheckChartPie from '@/components/CheckChartPie'
import { ProjectContext } from '@/pages/Check'
import { flatten } from 'lodash-es'
import { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import { TGroupData } from '@/types'

const Chart = () => {
  const { scopes } = useContext(ProjectContext)
  const scopeIGroups: TGroupData[] = scopes?.scopeI || []
  const scopeIIGroups: TGroupData[] = scopes?.scopeII || []
  const mergedDataSource: TYearlyDataType[] = flatten([
    ...(scopeIGroups.map((group) => group?.dataSource) || []),
    ...(scopeIIGroups.map((group) => group?.dataSource) || []),
  ])
  console.log(
    '🚀 ~ file: index.tsx:18 ~ Chart ~ mergedDataSource:',
    mergedDataSource,
  )

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
        <Col span={24} lg={{ span: 12 }} className="mb-8">
          <Alert
            className="h-full"
            message="分析事項"
            description="希望未來在相關商品上，企業可藉此分析產品碳足. 跡在原料、製造、運輸、使用到廢棄等生命週期各階段所製造的碳排放量和比例，. 進而從中找出二氧化碳減量的對策，並且也能 ..."
            type="info"
            showIcon
          />
        </Col>
        <Col span={24} lg={{ span: 12 }} className="mb-8">
          <Alert
            className="h-full"
            message="建議事項"
            description="ESG 永續經營及淨零碳排方面，我們更具體的推. 動，除善化廠之外，高雄廠、柳科廠的溫室氣體，. 直接與間接排放量、用水量或廢棄物總重量統計."
            type="warning"
            showIcon
          />
        </Col>
      </Row>
    </>
  )
}

export default Chart
