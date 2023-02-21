import React from 'react'
import { Column } from '@ant-design/plots'
import fakeData from '@/pages/Check/Chart/fakeData'
import type { IStyle } from './interfaces'

const CheckChartColumn = () => {
	const copyFakeData = JSON.parse(JSON.stringify(fakeData))

	const data = copyFakeData
	console.log('CheckChartColumn', data)

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
