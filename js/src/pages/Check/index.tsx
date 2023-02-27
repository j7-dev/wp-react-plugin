/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect } from 'react'
import { Tabs, Form, Button, TabsProps } from 'antd'
import ScopeI from './ScopeI'
import ScopeII from './ScopeII'
import Chart from './Chart'
import Export from './Export'
import { useColor, useOne, useEditableTitle } from '@/hooks'
import { useLocation } from 'react-router-dom'
import { updateResource } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import { IGroupData } from './ScopeI/CheckScopeITable/Table/types'

export const ProjectContext = createContext<{
  projectData: any
  scopes: {
    scopeI: IGroupData[]
    scopeII: IGroupData[]
  }
  setScopes: React.Dispatch<{
    scopeI: IGroupData[]
    scopeII: IGroupData[]
  }>
}>({
  projectData: null,
  scopes: {
    scopeI: [
      {
        groupKey: '0',
        groupName: '工廠 #1',
        dataSource: [],
      },
    ],
    scopeII: [
      {
        groupKey: '0',
        groupName: '工廠 #1',
        dataSource: [],
      },
    ],
  },
  setScopes: () => {},
})

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'SCOPE I',
    children: <ScopeI />,
  },
  {
    key: '2',
    label: 'SCOPE II',
    children: <ScopeII />,
  },
  {
    key: '3',
    label: '報表',
    children: <Chart />,
  },
  {
    key: '4',
    label: '匯出',
    children: <Export />,
  },
]

const App: React.FC = () => {
  const [
    scopes,
    setScopes,
  ] = useState<{
    scopeI: IGroupData[]
    scopeII: IGroupData[]
  }>({
    scopeI: [
      {
        groupKey: '0',
        groupName: '工廠 #1',
        dataSource: [],
      },
    ],
    scopeII: [
      {
        groupKey: '0',
        groupName: '工廠 #1',
        dataSource: [],
      },
    ],
  })
  const { state } = useLocation()
  const [form] = Form.useForm()

  const id = state?.id
  const { colorPrimary } = useColor()
  const projectData = useOne({
    resource: 'carbon-project',
    id,
  })

  const queryClient = useQueryClient()

  const { element } = useEditableTitle({
    form,
    name: ['title'],
    required: true,
    initialValue: '○○○○股份有限公司',
    fetchData: projectData,
    title: {
      theTitle: projectData?.title?.rendered || '',
      level: 3,
    },
  })

  const handleUpdate = async () => {
    const title = form.getFieldValue(['title']) || ''

    const copyScopes = JSON.parse(JSON.stringify(scopes))
    const updateScopeI = copyScopes.scopeI.map(
      (theGroup: IGroupData, groupIndex: number) => ({
        ...theGroup,
        groupName:
          form.getFieldValue([
            groupIndex,
            'groupName',
          ]) || '',
      }),
    )
    const updateScopes = {
      ...copyScopes,
      scopeI: updateScopeI,
    }

    console.log('updateScopes', updateScopes)

    try {
      await updateResource({
        resource: 'carbon-project',
        id,
        args: {
          title,
          meta: {
            project_data: JSON.stringify(updateScopes),
          },
        },
      })
      queryClient.invalidateQueries([
        'getProject',
        id,
      ])
    } catch (error) {}
  }

  useEffect(() => {
    if (!!projectData) {
      const fectchScopes = JSON.parse(projectData.meta.project_data)
      setScopes(fectchScopes)
    }
  }, [projectData])

  return (
    <>
      <Form form={form}>
        <hr style={{ borderColor: colorPrimary }} />
        <div className="flex justify-between align-middle mt-8">
          {element}

          <Button type="primary" size="large" onClick={handleUpdate}>
            更新專案資料
          </Button>
        </div>

        <div className="w-full border-2 border-gray-500 mt-8">
          <ProjectContext.Provider value={{ projectData, scopes, setScopes }}>
            <Tabs tabPosition="left" items={items} />
          </ProjectContext.Provider>
        </div>
      </Form>
    </>
  )
}

export default App
