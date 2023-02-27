import React, { useContext } from 'react'
import { Button } from 'antd'
import { FolderAddOutlined } from '@ant-design/icons'
import { TableDataContext } from '@/components/CheckScopeIITable'

const AddRowButton = () => {
  const { handleAdd } = useContext(TableDataContext)

  return (
    <Button onClick={handleAdd} type="default" className="mt-4">
      <FolderAddOutlined className="mr-2" />
      新增設備
    </Button>
  )
}

export default AddRowButton
