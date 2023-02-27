import React, { useContext } from 'react'
import { Button } from 'antd'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'

const DeleteRowButton = () => {
  const { handleDelete } = useContext(TableDataContext)

  return (
    <Button onClick={handleDelete} type="primary" style={{ marginTop: 16 }}>
      刪除
    </Button>
  )
}

export default DeleteRowButton
