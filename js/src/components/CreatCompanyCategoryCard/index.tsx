import React from 'react'
import { Card, Form, notification } from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import { useColor } from '@/hooks'
import axios from '@/api'




const { Meta } = Card
const baseUrl = process.env.BASE_URL || ''

const CreatCompanyCategoryCard: React.FC<{option: {
  name: string,
  key: string,
  image: string
}}> = ({option}) => {

const form = Form.useFormInstance()
const [api, contextHolder] = notification.useNotification();
const {colorPrimary} = useColor()
const category = Form.useWatch(['project', 'category'])




const handleClick = async () => {
  form.setFieldValue(['project', 'category'], option.name)
  // const data = await axios.get('/wp/v2/posts')
  const token = await axios.post('/jwt-auth/v1/token', {
    username: 'carbon',
        password: 'X0921565659x+'
  })

  console.log('token', token)


  api.open({
    message: <><LoadingOutlined style={{color:colorPrimary}} className='mr-4' />創建專案中...</>,
    description: <></>,
    placement: 'bottomRight',
  });
}


  return (
<>
{contextHolder}
<Link to={`${baseUrl}/check`}>
      <Card
      // onClick={handleClick}
        style={{ width: '100%' }}
        cover={
          <img
            className='aspect-[16/9]'
            alt={option?.name || '沒有名稱'}
            src={option?.image || 'https://via.placeholder.com/480x270.png?text=NO+IMAGE'}
          />
        }
      >
        <Meta
          title={<p className='text-center my-0'>{option?.name || '沒有名稱'}</p>}
        />
      </Card>
      </Link>
</>
  )
}

export default CreatCompanyCategoryCard