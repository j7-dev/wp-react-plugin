import React, { useContext } from 'react'
import type { DataType } from '../interfaces'
import { Popconfirm, Typography } from 'antd'
import { TableDataContext } from '@/components/CheckScopeIITable'
import { DeleteOutlined } from '@ant-design/icons'
import type { ColumnType } from 'antd/lib/table'

const useColumns = () => {
  const {
    dataSource,
    handleSave,
    handleDelete,
    editable = false,
  } = useContext(TableDataContext)

  const defaultColumns: (ColumnType<DataType> & {
    editable?: boolean
    dataIndex: string
  })[] = [
    {
      title: <Typography.Text editable={editable}>電力來源</Typography.Text>,
      dataIndex: 'source',
      width: '30%',
      editable,
    },
    {
      title: (
        <Typography.Text editable={editable}>使用度數(年)</Typography.Text>
      ),
      dataIndex: 'usagePerYear',
      editable,
    },
    {
      title: <Typography.Text editable={editable}>灰店比例</Typography.Text>,
      dataIndex: 'percentage',
      editable,
      render: (percentage: number) => {
        return `${Math.round(percentage * 100)}%`
      },
    },
    {
      title: '碳排(噸/年)',
      dataIndex: 'CarbonTonsPerYear',
      editable,
    },
    {
      title: '動作',
      dataIndex: 'action',
      render: (_, record: DataType) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="確認刪除?"
            okText="確認"
            cancelText="取消"
            onConfirm={() => handleDelete(record.key)}
          >
            <DeleteOutlined className="text-red-500" />
          </Popconfirm>
        ) : null,
    },
  ]

  if (!editable) {
    defaultColumns.pop()
    return defaultColumns
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    }
  })

  return columns
}

export default useColumns
