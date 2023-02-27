import React, { useContext } from 'react'
import { Table, Row, Button, Typography } from 'antd'
import AddRowButton from './components/AddRowButton'
import type { ColumnTypes } from './interfaces'
import useComponents from './hooks/useComponents'
import useColumns from './hooks/useColumns'
import { TableDataContext } from '@/components/CheckScopeIITable'
import { DeleteFilled } from '@ant-design/icons'

const App: React.FC = () => {
  const columns = useColumns()
  const {
    dataSource,
    onDelete: handleDeleteGroup,
    id,
    editable = false,
  } = useContext(TableDataContext)
  const components = useComponents()

  const handleDelete = (theId: string) => () => {
    console.log('handleDeleteGroup', theId)
    handleDeleteGroup(theId)
  }

  return (
    <div>
      <Typography.Title editable level={4}>
        電力
      </Typography.Title>
      <Table
        className="mt-4"
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
      />
      {!!editable && (
        <Row justify="space-between">
          <Button
            className="mt-4"
            type="primary"
            danger
            onClick={handleDelete(id)}
          >
            <DeleteFilled className="mr-2" />
            刪除群組
          </Button>
          <AddRowButton />
        </Row>
      )}

      <div className="my-8 bg-gray-300 h-[3px]"></div>
    </div>
  )
}

export default App
