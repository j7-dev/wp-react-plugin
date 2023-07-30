import { useState } from 'react'
import { ModalProps } from 'antd'

export const useModal = (props?: ModalProps) => {
  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const modalProps: ModalProps = {
    centered: true,
    open: isModalOpen,
    onOk: handleOk,
    onCancel: handleCancel,
    ...(props ? props : {}),
  }

  return {
    showModal,
    modalProps,
    isModalOpen,
    setIsModalOpen,
  }
}
