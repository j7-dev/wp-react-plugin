import type { TUnit } from '@/types'
import type { Table } from 'antd'

interface Item {
  key: string
  name: string
  age: string
  address: string
}

export type EditableTableProps = Parameters<typeof Table>[0]

export interface TEditableRowProps {
  index: number
}

export interface TEditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
}

export interface TMonthlyDataType {
  key: React.Key
  month: number
  GreenhouseGasesTonsPerYear: number
  gpt: number
  co2e: number
  CarbonTonsPerYear: number
}

export interface TYearlyDataType {
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
