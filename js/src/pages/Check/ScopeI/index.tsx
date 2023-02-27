import { useState, useContext, useEffect } from 'react'
import CheckScopeITable from '@/pages/Check/ScopeI/CheckScopeITable'
import { Button } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { ProjectContext } from '@/pages/Check'
import { IGroupData } from './CheckScopeITable/Table/types'
import { nanoid } from 'nanoid'

const ScopeIPage = () => {
  const { projectData } = useContext(ProjectContext)
  console.log('projectData', projectData)
  const postId = projectData?.id
  const metaData = JSON.parse(projectData?.meta?.project_data || '{}')
  const scopeIGroups: IGroupData[] = metaData?.scopeI || []
  const [
    groupKeys,
    setGroupKeys,
  ] = useState([nanoid()])

  useEffect(() => {
    if (scopeIGroups.length > 0) {
      const fetchKeys = scopeIGroups.map((group) => group.key)
      setGroupKeys(fetchKeys)
    }
  }, [])

  const handleAdd = () => {
    setGroupKeys([
      ...groupKeys,
      nanoid(),
    ])
  }

  const handleDeleteGroup = (groupKey: string) => {
    const newCount = groupKeys.filter((rowIndex) => rowIndex !== groupKey)
    setGroupKeys(newCount)
  }

  return (
    <>
      {groupKeys.map((groupKey, index) => {
        const groupData = scopeIGroups.find(
          (group) => group.key === groupKey,
        ) || {
          key: groupKey,
          groupName: '工廠',
          dataSource: [],
        }

        return (
          <CheckScopeITable
            key={groupKey}
            groupKey={groupKey}
            groupIndex={index}
            groupData={groupData}
            postId={postId}
            onDelete={handleDeleteGroup}
            editable
          />
        )
      })}
      <Button
        className="w-full mt-8"
        type="primary"
        size="large"
        onClick={handleAdd}
      >
        <AppstoreAddOutlined className="mr-2" />
        新增群組
      </Button>
    </>
  )
}

export default ScopeIPage
