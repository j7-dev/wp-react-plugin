/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext } from 'react'
import { Table, Row, Button, Form, Popconfirm } from 'antd'
import AddRecordButton from './components/AddRecordButton'
import type { TYearlyDataType } from './types'
import useColumns from './hooks/useColumns'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'
import { DeleteFilled } from '@ant-design/icons'
import useMonthlyTable from './hooks/useMonthlyTable'
import type { ColumnType } from 'antd/lib/table'
import { useColor, useEditableTitle } from '@/hooks'
import { ProjectContext } from '@/pages/Check'

const App: React.FC = () => {
  const { colorPrimary } = useColor()
  const columns = useColumns()
  const { renderTable } = useMonthlyTable()
  const {
    projectData: projectContextData,
    scopes,
    printMode = false,
  } = useContext(ProjectContext)
  const scopeIGroups = scopes?.scopeI || []

  const {
    groupKey,
    groupIndex,
    groupData,
    onDelete: handleDeleteGroup = () => {},
  } = useContext(TableDataContext)
  console.log('🚀 ~ file: index.tsx:31 ~ groupData:', groupData)

  const dataSource =
    scopeIGroups.find((group) => group.groupKey === groupKey)?.dataSource || []

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
    title: {
      theTitle: groupData?.groupName || '工廠',
      level: 4,
    },
    printMode,
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
        scroll={printMode ? undefined : { x: 1150 }}
      />
      {!printMode && (
        <Row justify="space-between">
          <Popconfirm
            title="確認刪除群組?"
            okText="確認"
            cancelText="取消"
            onConfirm={handleDelete(groupKey)}
          >
            <Button className="mt-4" type="dashed" danger>
              <DeleteFilled className="mr-2" />
              刪除群組
            </Button>
          </Popconfirm>
          <AddRecordButton />
        </Row>
      )}

      <div style={{ backgroundColor: colorPrimary }} className="my-8 h-[3px]" />
    </div>
  )
}

export default App
