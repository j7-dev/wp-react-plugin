import { useContext, useEffect } from 'react'
import CheckScopeITable from '@/pages/Check/ScopeI/CheckScopeITable'
import { Button } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { ProjectContext } from '@/pages/Check'
import { IGroupData } from './CheckScopeITable/Table/types'
import { nanoid } from 'nanoid'

const ScopeIPage = () => {
  const { projectData, scopes, setScopes } = useContext(ProjectContext)
  console.log('projectData', projectData)
  const postId = projectData?.id
  const scopeIGroups: IGroupData[] = scopes?.scopeI || []

  const handleAdd = () => {
    setScopes({
      ...scopes,
      scopeI: [
        ...scopeIGroups,
        {
          groupKey: nanoid(),
          groupName: '工廠',
          dataSource: [],
        },
      ],
    })
  }

  const handleDeleteGroup = (theGroupKey: string) => {
    const newScopeIGroups = scopeIGroups.filter(
      (theGroup) => theGroup?.groupKey !== theGroupKey,
    )
    setScopes({
      ...scopes,
      scopeI: [
        ...newScopeIGroups,
      ],
    })
  }

  useEffect(() => {
    if (!!projectData?.meta?.project_data) {
      const fetchScopes = JSON.parse(projectData?.meta?.project_data)
      console.log('fetchScopes', projectData?.meta)
    }
  }, [projectData])

  return (
    <>
      {scopeIGroups.map((theGroup, index) => {
        return (
          <CheckScopeITable
            key={theGroup?.groupKey}
            groupKey={theGroup?.groupKey}
            groupIndex={index}
            groupData={theGroup}
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
