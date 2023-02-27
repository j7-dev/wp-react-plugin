import React, { createContext, useState, useEffect } from 'react'
import Table from './Table'
import { IGroupData, TYearlyDataType } from './Table/types'

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
  const [
    dataSource,
    setDataSource,
  ] = useState<TYearlyDataType[]>([])

  useEffect(() => {
    setDataSource(props?.groupData?.dataSource || [])
  }, [])

  return (
    <TableDataContext.Provider value={{ dataSource, setDataSource, ...props }}>
      <Table />
    </TableDataContext.Provider>
  )
}

export default CheckScopeITable
