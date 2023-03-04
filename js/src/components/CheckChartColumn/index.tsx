import { Column } from '@ant-design/plots'
import { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import { flatten } from 'lodash-es'
import { IStyle } from './interfaces'
import { convertUnitToTons } from '@/utils'

// TODO: Math to Floor

const CheckChartColumn: React.FC<{
  mergedDataSource: TYearlyDataType[]
}> = ({ mergedDataSource }) => {
  const formatData = !!mergedDataSource
    ? mergedDataSource.map((record) => {
        if (record?.period === 'monthly') {
          const monthlyAmount = record?.monthlyAmount || []

          const dataArr = monthlyAmount.map((amount, index) => {
            const amountTon = convertUnitToTons({
              value: amount,
              unit: record?.unit,
            })
            return {
              month: `${index + 1}月`,
              value: Math.round(amountTon * 1000) / 1000,
              type: record?.equipment,
            }
          })
          return dataArr
        }
        const yearlyAmount = record?.yearlyAmount || 0
        const dataArr = new Array(12)
          .fill(yearlyAmount / 12)
          .map((amount, index) => ({
            month: `${index + 1}月`,
            value: Math.round(amount * 1000) / 1000,
            type: record?.equipment,
          }))
        return dataArr
      })
    : []

  const data = flatten(formatData)

  const config = {
    data,
    isStack: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    label: {
      // 可手动配置 label 数据标签位置
      // position: 'middle', // 'top', 'bottom', 'middle'
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    connectedArea: {
      style: (oldStyle: IStyle) => {
        return {
          fill: 'rgba(0,0,0,0.25)',
          stroke: oldStyle.fill,
          lineWidth: 0.5,
        }
      },
    },
  }

  return <Column {...config} />
}

export default CheckChartColumn
