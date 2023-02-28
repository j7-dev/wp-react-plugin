/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from 'react'
import Table from './Table'
import { TGroupData } from '@/types'

export const TableDataContext = createContext<any | null>(null)

type ICheckScopeITableProps = {
  groupKey: string
  groupIndex: number
  groupData: TGroupData
  postId: number
  onDelete?: (_id: string) => void
}

const defaultProps = {
  groupKey: '',
  groupIndex: 0,
  groupData: {
    groupKey: '',
    groupName: '',
    dataSource: [],
  },
  postId: 0,
  onDelete: () => {},
}

const CheckScopeITable: React.FC<ICheckScopeITableProps> = (
  props = defaultProps,
) => {
  return (
    <TableDataContext.Provider value={{ ...props }}>
      <Table />
    </TableDataContext.Provider>
  )
}

export default CheckScopeITable
