import type { TUnit } from '@/types'
import type { Table } from 'antd'
import { z } from 'zod'

type Item = {
  key: string
  name: string
  age: string
  address: string
}

export type EditableTableProps = Parameters<typeof Table>[0]

export type TEditableRowProps = {
  index: number
}

export type TEditableCellProps = {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
}

export type TMonthlyDataType = {
  key: React.Key
  month: number
  GreenhouseGasesTonsPerYear: number
  gpt: number
  co2e: number
  CarbonTonsPerYear: number
}

export type TYearlyDataType = {
  key: string
  equipment: string
  gwp: string
  yearlyAmount: number
  ar5: number
  co2e: number
  carbonTonsPerYear: number
  period: 'hourly' | 'monthly' | 'yearly'
  monthlyAmount?: number[]
  hourlyAmount?: number
  unit: TUnit
}

export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined> & {
  editable?: boolean
  dataIndex: string
  title: string
  render?: (
    text: string,
    record: TMonthlyDataType,
    index: number,
  ) => React.ReactNode
}
