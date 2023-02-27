import React, { createContext } from 'react'
import Table from './Table'
import useData from './Table/hooks/useData'

export const TableDataContext = createContext<any | null>(null)

interface ICheckScopeIITableProps {
  id: string
  onDelete?: (id: string) => void
  editable?: boolean
}

const CheckScopeIITable: React.FC<ICheckScopeIITableProps> = (props) => {
  const utils = useData()

  return (
    <TableDataContext.Provider value={{ ...utils, ...props }}>
      <Table />
    </TableDataContext.Provider>
  )
}

export default CheckScopeIITable
