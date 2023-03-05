import { useContext } from 'react'
import type { ColumnType } from 'antd/lib/table'
import type { TYearlyDataType } from '../types'
import { Popconfirm, Tooltip } from 'antd'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'
import { ProjectContext } from '@/pages/Check'
import { DeleteOutlined, InfoCircleFilled } from '@ant-design/icons'
import { gwpMapping, windowOuterWidth } from '@/utils'
import EditRecordButton from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/EditRecordButton'
import { useColor } from '@/hooks'
import { round } from 'lodash-es'

const useColumns = () => {
  const { colorPrimary } = useColor()
  const { scopes, setScopes, printMode = false } = useContext(ProjectContext)
  const scopeIGroups = scopes?.scopeI || []
  const { groupIndex } = useContext(TableDataContext)
  const group = scopeIGroups[groupIndex]
  const dataSource = group?.dataSource || []

  const handleDelete = (key: string) => {
    const newDataSource = dataSource.filter(
      (theRecord) => theRecord.key !== key,
    )
    setScopes({
      ...scopes,
      scopeI: [
        ...scopeIGroups.slice(0, groupIndex),
        {
          ...group,
          dataSource: newDataSource,
        },
        ...scopeIGroups.slice(groupIndex + 1),
      ],
    })
  }

  const defaultColumns: (ColumnType<TYearlyDataType> & {
    editable?: boolean
    dataIndex: string
  })[] = [
    {
      title: '排碳設備',
      align: 'center',
      dataIndex: 'sourceName',
      width: 200,
      fixed: false,
    },
    {
      title: '溫室氣體',
      width: 160,
      align: 'center',
      dataIndex: 'gwp',
      render: (gwp) => gwpMapping.find((item) => item.value === gwp)?.label,
    },
    {
      title: '溫室氣體排放量 (噸/年)',
      align: 'center',
      width: 200,
      dataIndex: 'yearlyAmount',
      render: (yearlyAmount: number) => round(yearlyAmount, 3),
    },
    {
      title: 'GPT係數',
      align: 'center',
      dataIndex: 'ar5',
      width: 120,
    },
    {
      title: (
        <>
          <Tooltip title="二氧化碳當量(CO2e, carbon dioxide equivalent)是測量碳足跡(carbon footprints)的標準單位">
            CO<sub>2</sub>e 碳排 (噸/年){' '}
            <InfoCircleFilled style={{ color: colorPrimary }} />
          </Tooltip>
        </>
      ),
      align: 'center',
      dataIndex: 'carbonTonsPerYear',
      render: (carbonTonsPerYear: number) => round(carbonTonsPerYear, 3),
      width: 200,
    },
    {
      title: '動作',
      align: 'center',
      dataIndex: 'action',
      width: 100,
      fixed: false,
      render: (_, record: TYearlyDataType) => (
        <p className="text-center">
          <Popconfirm
            title="確認刪除?"
            onConfirm={() => handleDelete(record.key)}
          >
            <DeleteOutlined className="text-red-500 text-[20px]" />
          </Popconfirm>
          <EditRecordButton record={record} />
        </p>
      ),
    },
  ]

  if (printMode) {
    defaultColumns.pop()
    return defaultColumns
  }

  return defaultColumns
}

export default useColumns
