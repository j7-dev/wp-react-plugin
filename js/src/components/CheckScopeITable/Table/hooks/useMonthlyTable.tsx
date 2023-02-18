import React from 'react'
import { Table } from 'antd'
import { ColumnTypes } from '../types'
import { TYearlyDataType } from '../types'
import { months, gwpMapping } from '@/utils'


const useMonthlyTable = () => {


  const columns: (ColumnTypes[number] & { dataIndex: string; })[] =
  [
    {
      title: '月份',
      align: 'center',
      dataIndex: 'month',
      width: 200,
      fixed: 'left',
    },
    {
      title: '溫室氣體',
      width: 160,
      align: 'center',
      dataIndex: 'gwp',
      render: (gwp) => gwpMapping.find((item) => item.value === gwp)?.label,
    },
    {
      title: '溫室氣體排放量 (噸/月)',
      align: 'center',
      dataIndex: 'monthlyAmount',
      width: 200,
      render: (monthlyAmount: number) => Math.round(monthlyAmount * 1000) / 1000,
    },
    {
      title: 'GPT係數',
      align: 'center',
      dataIndex: 'ar5',
      width: 120,
    },
    {
      title: 'CO2e',
      align: 'center',
      dataIndex: 'co2e',
      width: 120,
      render: (co2e: number) => Math.round(co2e * 1000) / 1000,
    },
    {
      title: '碳排(噸/月)',
      align: 'center',
      dataIndex: 'carbonTonsPerMonth',
      width: 200,
      render: (carbonTonsPerMonth: number) => Math.round(carbonTonsPerMonth * 1000) / 1000,
    },
    {
      title: '',
      align: 'center',
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
    },
  ]


  const renderTable = (record: TYearlyDataType) => {
    const dataSource = (record?.monthlyAmount ?? []).map((value, index) => {

      const ar5 = record.ar5 || 0

      return {
        key: `monthTableRow-${index}`,
        month: months.find((month) => month.value === index)?.label,
        gwp: record.gwp,
        monthlyAmount: value,
        ar5,
        co2e: ar5 * value,
        carbonTonsPerMonth: ar5 * value
      }
    })
    return (

      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 1100 }}
        size='middle'
      />
    )
  }

  return { renderTable }
}

export default useMonthlyTable