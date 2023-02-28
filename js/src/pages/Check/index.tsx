/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect, ChangeEvent } from 'react'
import {
  Row,
  Col,
  Tabs,
  Form,
  Button,
  TabsProps,
  Popover,
  Modal,
  Input,
  notification,
} from 'antd'
import {
  InfoCircleOutlined,
  WarningFilled,
  EditOutlined,
} from '@ant-design/icons'
import ScopeI from './ScopeI'
import ScopeII from './ScopeII'
import Chart from './Chart'
import Export from './Export'
import { useColor, useOne } from '@/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateResource, deleteResource } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import { IGroupData } from './ScopeI/CheckScopeITable/Table/types'
import { isEqual } from 'lodash-es'
import ImageUpload from '@/components/ImageUpload'

export const defaultScopes = {
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
  info: {
    title: '○○○○股份有限公司',
    companyCategory: '未分類',
  },
}
export const ProjectContext = createContext<{
  projectData: any
  scopes: {
    scopeI: IGroupData[]
    scopeII: IGroupData[]
  }
  setScopes: React.Dispatch<{
    scopeI: IGroupData[]
    scopeII: IGroupData[]
    info: {
      title: string
      companyCategory: string
    }
  }>
}>({
  projectData: null,
  scopes: defaultScopes,
  setScopes: () => {},
})

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'SCOPE I',
    children: <ScopeI />,
    forceRender: true,
  },
  {
    key: '2',
    label: 'SCOPE II',
    children: <ScopeII />,
    forceRender: true,
  },
  {
    key: '3',
    label: '報表',
    children: <Chart />,
    forceRender: true,
  },
  {
    key: '4',
    label: '匯出',
    children: <Export />,
    forceRender: true,
  },
]

const App: React.FC = () => {
  const [
    scopes,
    setScopes,
  ] = useState<{
    scopeI: IGroupData[]
    scopeII: IGroupData[]
    info: {
      title: string
      companyCategory: string
    }
  }>(defaultScopes)
  const [
    isDiff,
    setIsDiff,
  ] = useState(false)
  const [
    api,
    contextHolder,
  ] = notification.useNotification()
  const { state } = useLocation()
  const [form] = Form.useForm()
  const [
    deleteInputValue,
    setDeleteInputValue,
  ] = useState('')
  const [
    deleteInputValidateMsg,
    setDeleteInputValidateMsg,
  ] = useState('')
  const navigate = useNavigate()
  const title = Form.useWatch(['title'], form)

  const id = state?.id
  const { colorPrimary, colorInfo, colorError, colorErrorBg } = useColor()
  const projectData = useOne({
    resource: 'carbon-project',
    id,
  })

  const queryClient = useQueryClient()

  const handleUpdate = async () => {
    const content = form.getFieldValue(['content'])
    const copyScopes = JSON.parse(JSON.stringify(scopes || defaultScopes))

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
          content,
          title,
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
      setScopes(fectchScopes)
      form.setFieldValue(['title'], projectData?.title?.rendered)
      form.setFieldValue(
        ['content'],
        (projectData?.content?.rendered || '').replace(/<[^>]+>/g, ''),
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

  const [
    isDeleteProjectModalOpen,
    setIsDeleteProjectModalOpen,
  ] = useState(false)

  const showDeleteProjectModal = () => {
    setIsDeleteProjectModalOpen(true)
  }

  const handleDeleteProjectOk = async () => {
    if (deleteInputValue === projectData?.title?.rendered) {
      const deleteResult = await deleteResource({
        resource: 'carbon-project',
        id,
      })
      if (deleteResult?.status === 200) {
        setIsDeleteProjectModalOpen(false)
        navigate('')
      } else {
        console.log('deleteResult', deleteResult)
      }
    } else {
      setDeleteInputValidateMsg('輸入的專案名稱不正確')
    }
  }

  const handleDeleteProjectCancel = () => {
    setIsDeleteProjectModalOpen(false)
  }

  const handleDeleteInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeleteInputValue(e?.target?.value || '')
  }

  const [
    isEditProjectModalOpen,
    setIsEditProjectModalOpen,
  ] = useState(false)

  const showEditProjectModal = () => {
    setIsEditProjectModalOpen(true)
  }

  const handleEditProjectOk = async () => {
    setIsEditProjectModalOpen(false)

    // if (deleteInputValue === projectData?.title?.rendered) {
    //   const deleteResult = await deleteResource({
    //     resource: 'carbon-project',
    //     id,
    //   })
    //   if (deleteResult?.status === 200) {
    //     setIsEditProjectModalOpen(false)
    //     navigate('')
    //   } else {
    //     console.log('deleteResult', deleteResult)
    //   }
    // } else {
    //   setEditInputValidateMsg('輸入的專案名稱不正確')
    // }
  }

  const handleEditProjectCancel = () => {
    setIsEditProjectModalOpen(false)
  }

  useEffect(() => {
    if (isDiff) {
      api.warning({
        key: 'saveReminder',
        placement: 'bottomRight',
        message: '您有未儲存的變更',
        description: '請記得到頁面上方更新專案資料',
        duration: null,
      })
    }
  }, [isDiff])

  return (
    <>
      {contextHolder}
      <Form form={form}>
        <hr style={{ borderColor: colorPrimary }} />

        <Row align="middle" className="my-8">
          <Col flex="auto">
            <h2
              className="text-2xl cursor-pointer"
              onClick={showEditProjectModal}
            >
              {title}
              <EditOutlined className="ml-2" style={{ color: colorPrimary }} />
            </h2>
            <Modal
              title="編輯專案基本資料"
              open={isEditProjectModalOpen}
              onOk={handleEditProjectOk}
              onCancel={handleEditProjectCancel}
              centered
              okText="確認"
              cancelText="取消"
              forceRender={true}
            >
              <p className="mb-1 mt-6">公司/專案名稱:</p>

              <Form.Item name={['title']} noStyle>
                <Input />
              </Form.Item>
              <p className="mb-1 mt-6">公司/專案說明:</p>

              <Form.Item name={['content']} noStyle>
                <Input.TextArea
                  autoSize={{ minRows: 4 }}
                  maxLength={100}
                  showCount
                />
              </Form.Item>
              <div className="mt-6">
                <ImageUpload />
              </div>
            </Modal>
          </Col>
          <Col flex="none">
            <div className="flex justify-end align-middle">
              <Popover
                title={
                  <>
                    <InfoCircleOutlined
                      style={{ color: colorInfo }}
                      className="mr-2"
                    />
                    記得儲存資料
                  </>
                }
                open={isDiff}
              >
                <Button
                  type="primary"
                  className={`${isDiff ? 'animate-pulse' : ''} mr-2`}
                  size="large"
                  onClick={handleUpdate}
                >
                  更新專案資料
                </Button>
              </Popover>

              <Button
                type="dashed"
                size="large"
                danger
                onClick={showDeleteProjectModal}
              >
                刪除專案
              </Button>
              <Modal
                title={
                  <p
                    className="text-xl rounded-xl py-3 px-4"
                    style={{ color: colorError, backgroundColor: colorErrorBg }}
                  >
                    <WarningFilled className="mr-2" />
                    確認刪除整個專案嗎？
                  </p>
                }
                open={isDeleteProjectModalOpen}
                onOk={handleDeleteProjectOk}
                onCancel={handleDeleteProjectCancel}
                okButtonProps={{ danger: true }}
                centered
                okText="確認刪除"
                cancelText="取消"
              >
                <p>刪除專案後，所有資料將不可復原</p>
                <p>
                  如果您確認刪除此專案，請在下方輸入「
                  {projectData?.title?.rendered}」
                </p>
                <Input
                  value={deleteInputValue}
                  onChange={handleDeleteInputChange}
                  size="large"
                  placeholder={`請輸入「${projectData?.title?.rendered}」`}
                />
                {deleteInputValidateMsg && (
                  <p style={{ color: colorError }}>{deleteInputValidateMsg}</p>
                )}
              </Modal>
            </div>
          </Col>
        </Row>

        <div className="w-full border-2 border-gray-500">
          <ProjectContext.Provider value={{ projectData, scopes, setScopes }}>
            <Tabs tabPosition="left" items={items} />
          </ProjectContext.Provider>
        </div>
      </Form>
    </>
  )
}

export default App
