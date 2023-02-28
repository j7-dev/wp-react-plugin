import React, { useState, useContext, ChangeEvent, useEffect } from 'react'
import { Button, Modal, Popover, Input, notification } from 'antd'
import { InfoCircleOutlined, WarningFilled } from '@ant-design/icons'
import { useColor } from '@/hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import { deleteResource } from '@/api'
import { ProjectContext } from '@/pages/Check'

const EditProjectButtons: React.FC<{
  isDiff: boolean
  handleUpdate: () => void
}> = ({ isDiff, handleUpdate }) => {
  const { colorInfo, colorError, colorErrorBg } = useColor()
  const { projectData, printMode = false } = useContext(ProjectContext)
  const { state } = useLocation()
  const id = state?.id

  const [
    api,
    contextHolder,
  ] = notification.useNotification()

  const [
    deleteInputValue,
    setDeleteInputValue,
  ] = useState('')
  const [
    deleteInputValidateMsg,
    setDeleteInputValidateMsg,
  ] = useState('')
  const navigate = useNavigate()

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
      {!printMode ? (
        <>
          {contextHolder}
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
        </>
      ) : null}
    </>
  )
}

export default EditProjectButtons
