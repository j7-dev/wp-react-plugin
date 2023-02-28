/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useContext } from 'react'
import { Modal, Form, Input } from 'antd'
import { useColor } from '@/hooks'
import { EditOutlined } from '@ant-design/icons'
import ImageUpload from '@/components/ImageUpload'
import { ProjectContext } from '@/pages/Check'

const EditProjectModal = () => {
  const { colorPrimary } = useColor()
  const { scopes, setScopes, printMode = false } = useContext(ProjectContext)
  const form = Form.useFormInstance()

  const [
    isEditProjectModalOpen,
    setIsEditProjectModalOpen,
  ] = useState(false)

  const showEditProjectModal = () => {
    setIsEditProjectModalOpen(true)
  }

  const handleEditProjectOk = async () => {
    setIsEditProjectModalOpen(false)
    const title = form.getFieldValue(['title'])
    const content = form.getFieldValue(['content'])
    const companyCategory = form.getFieldValue(['companyCategory'])

    const newScopes = {
      ...scopes,
      info: {
        ...scopes.info,
        title,
        content,
        companyCategory,
      },
    }

    setScopes(newScopes)
  }

  const handleEditProjectCancel = () => {
    setIsEditProjectModalOpen(false)
  }

  return (
    <>
      <h2
        className={`text-2xl ${!printMode ? 'cursor-pointer' : ''}`}
        onClick={!printMode ? showEditProjectModal : () => {}}
      >
        {scopes?.info?.title}
        {!printMode && (
          <EditOutlined className="ml-2" style={{ color: colorPrimary }} />
        )}
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

        <p className="mb-1 mt-6">公司/專案分類:</p>

        <Form.Item name={['companyCategory']} noStyle>
          <Input />
        </Form.Item>

        <p className="mb-1 mt-6">公司/專案說明:</p>

        <Form.Item name={['content']} noStyle>
          <Input.TextArea autoSize={{ minRows: 4 }} maxLength={100} showCount />
        </Form.Item>
        <div className="mt-6">
          <ImageUpload />
        </div>
      </Modal>
    </>
  )
}

export default EditProjectModal
