import { useContext, useState } from 'react'
import { Row, Col, Button, Modal, Input } from 'antd'
import CheckChartColumn from '@/components/CheckChartColumn'
import CheckChartPie from '@/components/CheckChartPie'
import CheckScopeITable from '@/pages/Check/ScopeI/CheckScopeITable'
import { ProjectContext } from '@/pages/Check'
import { IGroupData } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import ClipboardJS from 'clipboard'
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons'

new ClipboardJS('.button')

const Export = () => {
  const { projectData, scopes } = useContext(ProjectContext)
  const postId = projectData?.id
  const scopeIGroups: IGroupData[] = scopes?.scopeI || []
  console.log('@@@ scopes', scopes)

  const [
    isExportModalOpen,
    setIsExportModalOpen,
  ] = useState(false)

  const showExportModal = () => {
    setIsExportModalOpen(true)
  }

  const jsonString = JSON.stringify(JSON.stringify(scopes || '{}'))

  const download = (text: string) => () => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `碳盤查 JSON 數據 - ${
      projectData?.title?.rendered || ''
    }.json`
    link.href = url
    link.click()
  }

  return (
    <>
      <Row gutter={24}>
        <Col span={24} lg={{ span: 16 }}>
          <CheckChartColumn />
        </Col>
        <Col span={24} lg={{ span: 8 }}>
          <CheckChartPie />
        </Col>
      </Row>
      {scopeIGroups.map((theGroup, index) => {
        return (
          <CheckScopeITable
            key={theGroup?.groupKey}
            groupKey={theGroup?.groupKey}
            groupIndex={index}
            groupData={theGroup}
            postId={postId}
            editable={false}
          />
        )
      })}
      <Row className="my-8" gutter={24}>
        <Col span={24} lg={{ span: 12 }}>
          <Button type="primary" size="large" className="w-full">
            匯出為 PDF
          </Button>
        </Col>
        <Col span={24} lg={{ span: 12 }}>
          <Button
            type="default"
            size="large"
            className="w-full"
            onClick={showExportModal}
          >
            匯出為 JSON 數據
          </Button>
          <Modal
            title="匯出 JSON 數據"
            centered
            open={isExportModalOpen}
            footer={null}
            onCancel={() => setIsExportModalOpen(false)}
          >
            <Input.TextArea value={jsonString} rows={6} />
            <div className="flex justify-end mt-4">
              <Button
                type="default"
                onClick={download(jsonString)}
                className="mr-2"
              >
                <DownloadOutlined className="mr-2" />
                下載
              </Button>
              <Button
                type="primary"
                className="button"
                data-clipboard-text={jsonString}
              >
                <CopyOutlined className="mr-2" />
                複製
              </Button>
            </div>
          </Modal>
        </Col>
      </Row>
    </>
  )
}

export default Export
