import React, { createContext } from 'react'
import Table from './Table'
import { IGroupData } from './Table/types'

export const TableDataContext = createContext<any | null>(null)

type ICheckScopeITableProps = {
  groupKey: string
  groupIndex: number
  groupData: IGroupData
  postId: number
  onDelete?: (id: string) => void
  editable?: boolean
}

const CheckScopeITable: React.FC<ICheckScopeITableProps> = (props) => {
  return (
    <TableDataContext.Provider value={{ ...props }}>
      <Table />
    </TableDataContext.Provider>
  )
}

export default CheckScopeITable
