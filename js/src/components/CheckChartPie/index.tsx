import { useContext } from 'react'
import { Pie, measureTextWidth } from '@ant-design/plots'
import type { IData } from '@/pages/Check/Chart/interface'
import { ProjectContext } from '@/pages/Check'
import { flatten } from 'lodash-es'

type IStyle = Record<string, number | string>

const CheckChartPie = () => {
  const { scopes } = useContext(ProjectContext)
  const scopeIGroups = scopes?.scopeI || []
  const scopeIMergedDataSource = flatten(
    scopeIGroups.map((group) => group?.dataSource) || [],
  )

  const formatData = scopeIMergedDataSource.map((record) => {
    const yearlyAmount = record?.yearlyAmount || 0

    return {
      value: Math.round(yearlyAmount * 1000) / 1000,
      type: record.equipment,
    }
  })

  // sum the value if the type is 工廠1
  const data = formatData

  // console.log('CheckChartPie', data)

  function renderStatistic(
    containerWidth: number,
    text: string,
    style: IStyle,
  ) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style,
    )
    const R = containerWidth / 2 // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)),
          ),
        ),
        1,
      )
    }

    const textStyleStr = `width:${containerWidth}px;`
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`
  }

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v: number) => `${v} ¥`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container: HTMLElement, _view: unknown, datum: any) => {
          const { width, height } = container.getBoundingClientRect()
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
          const text = datum ? datum.type : 'CO2排放量'
          return renderStatistic(d, text, {
            fontSize: 28,
          })
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '24px',
        },
        customHtml: (
          container: HTMLElement,
          _view: unknown,
          datum: any,
          theData: any,
        ) => {
          const { width } = container.getBoundingClientRect()
          const text = datum
            ? `${datum.value}噸/年`
            : `${theData.reduce((r: number, d: IData) => r + d.value, 0)}噸/年`
          return renderStatistic(width, text, {
            fontSize: 16,
          })
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  }
  return <Pie {...config} />
}

export default CheckChartPie
