import React, { useContext, useEffect } from 'react'
import { Table, Row, Button, Form } from 'antd'
import AddRowButton from './components/AddRowButton'
import type { TYearlyDataType, IGroupData } from './types'
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
  const { projectData: projectContextData, scopes } = useContext(ProjectContext)
  const scopeIGroups = scopes?.scopeI || []

  const {
    groupKey,
    groupIndex,
    groupData,
    onDelete: handleDeleteGroup,
    editable = false,
  } = useContext(TableDataContext)

  const dataSource =
    scopeIGroups.find((group) => group.key === groupKey)?.dataSource || []

  const id = projectContextData?.id || 0
  const form = Form.useFormInstance()
  // const data = JSON.parse(projectContextData?.meta?.project_data || '{}')
  const { element } = useEditableTitle({
    form,
    name: [
      'scopeI',
      groupIndex,
      'groupName',
    ],
    required: true,
    initialValue: '工廠',
    fetchData: projectContextData,
    title: {
      theTitle: groupData?.groupName || '工廠',
      level: 4,
    },
  })

  const handleDelete = (theGroupKey: string) => () => {
    handleDeleteGroup(theGroupKey)
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
