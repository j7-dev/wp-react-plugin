import { ChangeEvent, useState } from 'react'
import {
  UploadOutlined,
  ImportOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import {
  Upload,
  UploadProps,
  Button,
  Modal,
  Input,
  Row,
  Col,
  Divider,
} from 'antd'
import { createResource } from '@/api'
import { addKey } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const baseUrl = process.env.BASE_URL || ''

const JsonUpload = () => {
  const [
    isLoading,
    setIsLoading,
  ] = useState(false)
  const [
    showLink,
    setShowLink,
  ] = useState(false)

  const [
    theProjectId,
    setTheProjectId,
  ] = useState<number>(0)

  const [
    jsonContent,
    setJsonContent,
  ] = useState<string>('')

  const [
    isJsonUploadModalOpen,
    setIsJsonUploadModalOpen,
  ] = useState(false)

  const queryClient = useQueryClient()

  const showJsonUploadModal = () => {
    setIsJsonUploadModalOpen(true)
  }

  const handleJsonUploadOk = () => {
    setIsJsonUploadModalOpen(false)
  }

  const handleJsonUploadCancel = () => {
    setIsJsonUploadModalOpen(false)
    setShowLink(false)
  }

  const props: UploadProps = {
    accept: '.json',
    name: 'file',
    multiple: false,

    onChange({ file }) {
      setIsLoading(true)

      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event?.target?.result || '{}'
        setJsonContent(content as string)
        // setJsonContent(JSON.parse(content as string))
        setIsLoading(false)
      }
      if (file?.originFileObj) {
        reader.readAsText(file.originFileObj)
      }
    },
    maxCount: 1,
    showUploadList: false,
    className: 'block w-full',
  }

  const handleImport = async () => {
    //add key & groupKey back
    const scopesWithoutKey = JSON.parse(jsonContent || '{}')
    const scopes = addKey(scopesWithoutKey)

    const createResult = await createResource({
      resource: 'carbon-project',
      args: {
        title: scopes?.info?.title || '○○○○股份有限公司',
        content: scopes?.info?.content || '',
        status: 'publish',
        featured_media: scopes?.info?.imgData?.attachmentId || 0,
        meta: {
          project_data: JSON.stringify(scopes || {}),
        },
      },
    })
    if (createResult?.status === 201 || createResult?.status === 200) {
      queryClient.invalidateQueries([
        'get_carbon-projects',
      ])

      setShowLink(true)
      setTheProjectId(createResult?.data?.id || 0)
    } else {
      console.log('createResult', createResult)
    }
  }

  const handleTextAreaChange = (e: ChangeEvent<any>) => {
    const text = e?.target?.value || ''
    setJsonContent(text)
  }

  return (
    <>
      <Button icon={<UploadOutlined />} onClick={showJsonUploadModal}>
        使用 JSON 檔案上傳
      </Button>
      <Modal
        title="匯入專案 JSON 數據"
        centered
        open={isJsonUploadModalOpen}
        onOk={handleJsonUploadOk}
        onCancel={handleJsonUploadCancel}
        footer={null}
      >
        <Input.TextArea
          disabled={isLoading}
          value={jsonContent}
          rows={6}
          onChange={handleTextAreaChange}
        />
        <Row gutter={24} className="mt-4 json-upload">
          <Col span={12}>
            <Upload {...props}>
              <Button
                className="w-full"
                icon={isLoading ? <LoadingOutlined /> : <UploadOutlined />}
              >
                使用 JSON 檔案上傳
              </Button>
            </Upload>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              className="w-full"
              onClick={handleImport}
              icon={<ImportOutlined />}
            >
              確認匯入 JSON
            </Button>
          </Col>
          {showLink && (
            <Col span={24} className="mt-4">
              <Divider plain>已成功創建專案</Divider>
              <Link to={`${baseUrl}check`} state={{ id: theProjectId }}>
                <Button type="primary" className="w-full">
                  立即查看專案
                </Button>
              </Link>
            </Col>
          )}
        </Row>
      </Modal>
    </>
  )
}

export default JsonUpload
