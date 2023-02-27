import React, { createContext } from 'react'
import Table from './Table'
import useData from './Table/hooks/useData'

export const TableDataContext = createContext<any | null>(null)

interface TCheckScopeITableProps {
  groupKey: string
  onDelete?: (id: string) => void
  editable?: boolean
}

const CheckScopeITable: React.FC<TCheckScopeITableProps> = (props) => {
  const utils = useData()

  return (
    <TableDataContext.Provider value={{ ...utils, ...props }}>
      <Table />
    </TableDataContext.Provider>
  )
}

export default CheckScopeITable
