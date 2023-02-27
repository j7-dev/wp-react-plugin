import React, { createContext } from 'react'
import { Tabs, Form, Button, TabsProps } from 'antd'
import ScopeI from './ScopeI'
import ScopeII from './ScopeII'
import Chart from './Chart'
import Export from './Export'
import { useColor, useOne, useEditableTitle } from '@/hooks'
import { useLocation } from 'react-router-dom'
import { updateResource } from '@/api'
import { useQueryClient } from '@tanstack/react-query'

export const ProjectContext = createContext<any>({
  projectData: null,
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
    const formData = form.getFieldsValue() || {}

    console.log('formData', formData)

    try {
      await updateResource({
        resource: 'carbon-project',
        id,
        args: {
          title: formData?.title || '',
          meta: {
            project_data: JSON.stringify(formData),
          },
        },
      })
      queryClient.invalidateQueries([
        'getProject',
        id,
      ])
    } catch (error) {}
  }

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
          <ProjectContext.Provider value={{ projectData }}>
            <Tabs tabPosition="left" items={items} />
          </ProjectContext.Provider>
        </div>
      </Form>
    </>
  )
}

export default App
