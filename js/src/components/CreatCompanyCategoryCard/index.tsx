import React, { useState } from 'react'
import { Card, Modal, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import { createResource } from '@/api'

const { Meta } = Card
const baseUrl = process.env.BASE_URL || ''

const CreatCompanyCategoryCard: React.FC<{
  option: {
    name: string
    key: string
    image: string
  }
}> = ({ option }) => {
  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false)
  const [
    confirmLoading,
    setConfirmLoading,
  ] = useState(false)
  const navigate = useNavigate()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    setConfirmLoading(true)

    try {
      const createResult = await createResource({
        resource: 'carbon-project',
        options: {
          title: '○○○○股份有限公司',
          status: 'publish',
          meta: {
            company_category: option.name,
          },
        },
      })

      setIsModalOpen(false)
      setConfirmLoading(false)
      navigate(`${baseUrl}check`, {
        state: { id: createResult.data?.id || 0 },
      })
    } catch (error) {
      setIsModalOpen(false)
      setConfirmLoading(false)
      console.log('catch error', error)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Card
        onClick={showModal}
        className="w-full"
        cover={
          <img
            className="aspect-[16/9]"
            alt={option.name || '沒有名稱'}
            src={
              option.image ||
              'https://via.placeholder.com/480x270.png?text=NO+IMAGE'
            }
          />
        }
      >
        <Meta
          title={
            <p className="text-center my-auto">{option.name || '沒有名稱'}</p>
          }
        />
      </Card>

      <Modal
        title={<>創建專案 - 分類: {option.name}</>}
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="確認創建專案"
        cancelText="再想想"
        confirmLoading={confirmLoading}
      >
        <Alert
          className="my-8"
          message="按下確認後會創建專案，下一頁可以填寫更多資訊"
          type="info"
          showIcon
        />
      </Modal>
    </>
  )
}

export default CreatCompanyCategoryCard
