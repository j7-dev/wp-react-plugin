import React from 'react'
import { Card } from 'antd'
import defaultImage from '@/static/defaultImage.jpg'

const { Meta } = Card

const CreatCompanyCategoryCard: React.FC<{
  option: {
    name: string
    key: string
    image: string
  }
  showModal: (_name: string) => () => void
}> = ({ option, showModal }) => {
  return (
    <>
      <Card
        onClick={showModal(option?.name || '沒有名稱')}
        className="w-full cursor-pointer"
        cover={
          <img
            className="aspect-[16/9]"
            alt={option?.name || '沒有名稱'}
            src={option?.image || defaultImage}
          />
        }
      >
        <Meta
          title={
            <p className="text-center my-auto">{option?.name || '沒有名稱'}</p>
          }
        />
      </Card>
    </>
  )
}

export default CreatCompanyCategoryCard
