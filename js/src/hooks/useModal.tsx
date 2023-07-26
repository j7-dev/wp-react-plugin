import { useState } from 'react'

export const useModal = () => {
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

  const modalProps = {
    open: isModalOpen,
    onOk: handleOk,
    onCancel: handleCancel,
  }

  return {
    showModal,
    modalProps,
    isModalOpen,
    setIsModalOpen,
  }
}
