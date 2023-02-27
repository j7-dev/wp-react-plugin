import React, { useContext } from 'react'
import { Table, Row, Button, Form } from 'antd'
import AddRowButton from './components/AddRowButton'
import type { TYearlyDataType } from './types'
import useColumns from './hooks/useColumns'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'
import { DeleteFilled } from '@ant-design/icons'
import useMonthlyTable from './hooks/useMonthlyTable'
import type { ColumnType } from 'antd/lib/table'
import { useColor, useEditableTitle } from '@/hooks'
import { updateResource } from '@/api'
import { ProjectContext } from '@/pages/Check'

const App: React.FC = () => {
  const { colorPrimary } = useColor()
  const columns = useColumns()
  const { renderTable } = useMonthlyTable()
  const {
    dataSource,
    onDelete: handleDeleteGroup,
    groupKey,
    editable = false,
  } = useContext(TableDataContext)
  const groupRowIndexNumber = parseInt(
    groupKey.replace('groupRowIndex-', ''),
    10,
  )
  const { projectData: projectContextData } = useContext(ProjectContext)
  const id = projectContextData?.id || 0
  const form = Form.useFormInstance()
  const data = JSON.parse(projectContextData?.meta?.project_data || '{}')
  const { element } = useEditableTitle({
    form,
    name: [
      'groups',
      groupRowIndexNumber,
      'groupName',
    ],
    required: true,
    initialValue: `工廠 #${groupRowIndexNumber + 1}`,
    fetchData: projectContextData,
    title: {
      theTitle:
        data?.groups?.[groupRowIndexNumber]?.groupName ||
        `工廠 #${groupRowIndexNumber + 1}`,
      level: 4,
    },
  })

  const handleDelete = (theRowIndex: string) => () => {
    handleDeleteGroup(theRowIndex)
  }

  // console.log('projectData', projectData)
  // console.log('projectContextData', projectContextData)

  return (
    <div>
      {element}
      <Table
        className="mt-4"
        expandable={{
          expandedRowRender: (record: TYearlyDataType) => renderTable(record),
          rowExpandable: (record) => record.period === 'monthly',
        }}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnType<TYearlyDataType>[]}
        pagination={false}
        scroll={{ x: 1150 }}
      />
      {!!editable && (
        <Row justify="space-between">
          <Button
            className="mt-4"
            type="primary"
            danger
            onClick={handleDelete(groupKey)}
          >
            <DeleteFilled className="mr-2" />
            刪除群組
          </Button>
          <AddRowButton />
        </Row>
      )}

      <div style={{ backgroundColor: colorPrimary }} className="my-8 h-[3px]" />
    </div>
  )
}

export default App
