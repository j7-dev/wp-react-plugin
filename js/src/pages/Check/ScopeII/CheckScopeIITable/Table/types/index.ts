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

export type TYearlyDataType = {
  key: string
  sourceName: string
  yearlyAmount: number
  co2Kwh: number
  carbonTonsPerYear: number
}
