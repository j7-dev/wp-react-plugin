/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect } from 'react'
import { Row, Col, Tabs, Form, TabsProps } from 'antd'
import ScopeI from './ScopeI'
import ScopeII from './ScopeII'
import Chart from './Chart'
import Export from './Export'
import { useColor, useOne } from '@/hooks'
import { useLocation } from 'react-router-dom'
import { updateResource } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import { TGroupData, TScopes } from '@/types'
import { isEqual } from 'lodash-es'
import { defaultScopes } from '@/utils'
import EditProjectModal from './components/EditProjectModal'
import EditProjectButtons from './components/EditProjectButtons'

export const ProjectContext = createContext<{
  projectData: any
  scopes: TScopes
  setScopes: React.Dispatch<TScopes>
  printMode: boolean
  setIsDiff: React.Dispatch<boolean>
}>({
  projectData: null,
  scopes: defaultScopes,
  setScopes: () => {},
  printMode: false,
  setIsDiff: () => {},
})

const App: React.FC = () => {
  const [
    scopes,
    setScopes,
  ] = useState<TScopes>(defaultScopes)
  const [
    isDiff,
    setIsDiff,
  ] = useState(false)

  const [
    printMode,
    setPrintMode,
  ] = useState(false)

  const handlePrintMode = (enablePrintMode: boolean) => () => {
    setPrintMode(enablePrintMode)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span onClick={handlePrintMode(false)}>SCOPE I</span>,
      children: <ScopeI />,
    },
    {
      key: '2',
      label: <span onClick={handlePrintMode(false)}>SCOPE II</span>,
      children: <ScopeII />,
    },
    {
      key: '3',
      label: <span onClick={handlePrintMode(true)}>報表</span>,
      children: <Chart />,
    },
    {
      key: '4',
      label: <span onClick={handlePrintMode(true)}>匯出</span>,
      children: <Export />,
    },
  ]

  const { state } = useLocation()
  const [form] = Form.useForm()
  const id = state?.id
  const { colorPrimary } = useColor()
  const projectData = useOne({
    resource: 'carbon-project',
    id,
  })

  const queryClient = useQueryClient()

  const handleUpdate = async () => {
    const title = form.getFieldValue(['title'])
    const content = form.getFieldValue(['content'])
    const companyCategory = form.getFieldValue(['companyCategory'])
    const copyScopes = JSON.parse(JSON.stringify(scopes || defaultScopes))

    const updateScopeI = copyScopes.scopeI.map(
      (theGroup: TGroupData, groupIndex: number) => ({
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
      info: {
        ...copyScopes.info,
        title,
        content,
        companyCategory,
      },
    }

    try {
      await updateResource({
        resource: 'carbon-project',
        id,
        args: {
          content,
          title,
          featured_media: updateScopes?.info?.imgData?.attachmentId || 0,
          meta: {
            project_data: JSON.stringify(updateScopes),
          },
        },
      })
      queryClient.invalidateQueries([
        'get_carbon-project',
        id,
      ])
      setIsDiff(false)
    } catch (error) {}
  }

  useEffect(() => {
    if (!!projectData) {
      const fectchScopes = JSON.parse(projectData.meta.project_data)
      console.log('projectData.meta.project_data   fectchScopes', fectchScopes)
      setScopes(fectchScopes)
      form.setFieldValue(['title'], fectchScopes?.info?.title)
      form.setFieldValue(
        ['content'],
        (fectchScopes?.info?.content || '').replace(/<[^>]+>/g, ''),
      )
      form.setFieldValue(
        ['companyCategory'],
        (fectchScopes?.info?.companyCategory || '').replace(/<[^>]+>/g, ''),
      )
    }
  }, [projectData])

  useEffect(() => {
    if (!!projectData) {
      const fectchScopes = JSON.parse(projectData.meta.project_data)
      const isSame = isEqual(scopes, fectchScopes)
      setIsDiff(!isSame)
    }
  }, [scopes])

  return (
    <>
      <ProjectContext.Provider
        value={{ projectData, scopes, setScopes, printMode, setIsDiff }}
      >
        <Form form={form}>
          <hr style={{ borderColor: colorPrimary }} />

          <Row align="middle" className="my-8">
            <Col flex="auto">
              <EditProjectModal />
            </Col>
            <Col flex="none">
              <EditProjectButtons isDiff={isDiff} handleUpdate={handleUpdate} />
            </Col>
          </Row>

          <div className="w-full border-2 border-gray-500">
            <Tabs tabPosition="left" items={items} />
          </div>
        </Form>
      </ProjectContext.Provider>
    </>
  )
}

export default App
