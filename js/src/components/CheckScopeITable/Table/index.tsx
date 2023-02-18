import React, { useContext,useState } from 'react'
import { Table, Row, Button, Typography, theme } from 'antd'
import AddRowButton from './components/AddRowButton'
import { TYearlyDataType } from './types'
import useColumns from './hooks/useColumns'
import { TableDataContext } from '@/components/CheckScopeITable'
import { DeleteFilled } from '@ant-design/icons'
import useMonthlyTable from './hooks/useMonthlyTable'
import {ColumnType} from 'antd/lib/table'

const {useToken} = theme

const App: React.FC = () => {
  const {token} = useToken()
  const columns = useColumns()
  const {renderTable} = useMonthlyTable()
  const { dataSource, onDelete: handleDeleteGroup, groupRowIndex, editable = false } = useContext(TableDataContext)
  const groupRowIndexNumber = parseInt(groupRowIndex.replace('groupRowIndex-', ''), 10)

  const handleDelete = (groupRowIndex: string) => () => {
    handleDeleteGroup(groupRowIndex)
  }



  const [editableStr, setEditableStr] = useState(`工廠 #${groupRowIndexNumber + 1}`)

  return (
    <div>
      <Typography.Title editable={{onChange: setEditableStr}} level={4}>
        {editableStr}
      </Typography.Title>
      <Table
        className='mt-4'
        expandable={{
          expandedRowRender: (record:TYearlyDataType) => renderTable(record),
          rowExpandable: (record) => record.period === 'monthly',
        }}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnType<TYearlyDataType>[]}
        pagination={false}
        scroll={{ x: 1150 }}
      />
      {!!editable && (
        <Row justify='space-between'>
          <Button className='mt-4' type="primary" danger onClick={handleDelete(groupRowIndex)}><DeleteFilled className='mr-2' />刪除群組</Button>
          <AddRowButton />
        </Row>
      )}

      <div style={{backgroundColor:token.colorPrimary}} className='my-8 h-[3px]' />
    </div>
  )
}

export default App