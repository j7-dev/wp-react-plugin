import { useContext, useState, useRef, useEffect } from 'react'
import { Row, Col, Button, Modal, Input, Empty, notification } from 'antd'
import CheckChartColumn from '@/components/CheckChartColumn'
import CheckChartPie from '@/components/CheckChartPie'
import CheckScopeITable from '@/pages/Check/ScopeI/CheckScopeITable'
import { ProjectContext } from '@/pages/Check'
import { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import { TGroupData } from '@/types'
import ClipboardJS from 'clipboard'
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons'
import { flatten } from 'lodash-es'
import { useReactToPrint } from 'react-to-print'

new ClipboardJS('.button')

const Export = () => {
  const [
    api,
    contextHolder,
  ] = notification.useNotification()
  const { projectData, scopes } = useContext(ProjectContext)
  const postId = projectData?.id
  const scopeIGroups: TGroupData[] = scopes?.scopeI || []

  const mergedDataSource: TYearlyDataType[] = flatten(
    scopeIGroups.map((group) => group?.dataSource) || [],
  )

  const [
    isPrinting,
    setIsPrinting,
  ] = useState(false)
  const printRef = useRef(null)
  const promiseResolveRef = useRef<null | any>(null)

  useEffect(() => {
    if (isPrinting) {
      api.info({
        key: 'pleaseWaitForPrint',
        placement: 'bottomRight',
        message: '調整格式中...',
        description: '請稍候...',
        duration: 2,
      })
    }
    const timer = setTimeout(() => {
      if (isPrinting && promiseResolveRef.current) {
        promiseResolveRef.current()
        // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      }
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [isPrinting])

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve
        setIsPrinting(true)
      })
    },
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null
      setIsPrinting(false)
    },
  })

  const [
    isExportModalOpen,
    setIsExportModalOpen,
  ] = useState(false)

  const showExportModal = () => {
    setIsExportModalOpen(true)
  }

  const jsonString = JSON.stringify(JSON.stringify(scopes || '{}')).replace(
    /\\/g,
    ' ',
  )

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
      {contextHolder}
      <div ref={printRef} className={isPrinting ? 'w-[277mm]' : 'w-full'}>
        <Row gutter={24}>
          {mergedDataSource.length > 0 ? (
            <>
              <Col span={24} lg={{ span: 16 }} className="mb-12">
                <CheckChartColumn mergedDataSource={mergedDataSource} />
              </Col>
              <Col span={24} lg={{ span: 8 }} className="mb-12">
                <CheckChartPie mergedDataSource={mergedDataSource} />
              </Col>
            </>
          ) : (
            <div className="w-full px-2">
              <div className="flex justify-center items-center w-full aspect-video bg-slate-100 rounded-xl">
                <Empty description="沒有資料" />
              </div>
            </div>
          )}
        </Row>
        {scopeIGroups.map((theGroup, index) => {
          return (
            <CheckScopeITable
              key={theGroup?.groupKey}
              groupKey={theGroup?.groupKey}
              groupIndex={index}
              groupData={theGroup}
              postId={postId}
            />
          )
        })}
      </div>
      <Row className="my-8" gutter={24}>
        <Col span={24} lg={{ span: 12 }}>
          <Button
            type="primary"
            size="large"
            className="w-full"
            onClick={handlePrint}
          >
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
