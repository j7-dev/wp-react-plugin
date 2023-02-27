import React from 'react'
import { QuestionOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd'

const CreatCompanyCategoryInput: React.FC = () => (
  <div className="border-2 border-gray-300 h-full w-full rounded-lg border-dashed flex flex-col justify-center items-center">
    <div className="aspect-[16/9] flex flex-col justify-center items-center w-full">
      <QuestionOutlined className="text-gray-300" style={{ fontSize: 48 }} />
      <div className="text-gray-300" style={{ marginTop: 24 }}>
        找不到所屬的產業
      </div>
    </div>
    <div className="w-full py-4">
      <Input.Group compact className="text-center">
        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="自行輸入" />
        <Button type="primary">送出</Button>
      </Input.Group>
    </div>
  </div>
)

export default CreatCompanyCategoryInput
