import React, {useState} from 'react'
import {Input, InputNumber, Form, Button} from 'antd'
import {PlusCircleOutlined, MinusCircleOutlined} from '@ant-design/icons'
import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'


const AddGWPYearlyFormItem = () => {
  const [count, setCount] = useState([0])

  const handleAdd = () => {
    setCount([
      ...count,
      count[count.length - 1] +1
    ])
  }
  const handleDelete = (rowIndex:number) => {
    const newCount = count.filter((item) => item !== rowIndex)
    setCount(newCount)
  }

  return (
    <>
      {count.map((rowIndex) => (
        <Input.Group compact className='mb-4' key={`YearlyView-${rowIndex}`}>
          <Form.Item
            name={['dataSource', rowIndex, 'yearlyAmount']}
            className='w-[calc(100%-22rem)] mb-0'
            initialValue={0}
            rules={[
              {
                required: true,
                message: '請輸入年排放量'
              }
            ]}
          >
            <InputNumber addonBefore='年排放' className='w-full rounded-r-none' min={0} />
          </Form.Item>
          <Form.Item
            name={['dataSource', rowIndex, 'gwp']}
            className='w-60 mb-0'
            rules={[
              {
                required: true,
                message: '請選擇溫室氣體'
              }
            ]}
          >
            <FormGWPSelect rowIndex={rowIndex} />
          </Form.Item>
          <Form.Item
            name={['dataSource', rowIndex, 'unit']}
            className='w-20 mb-0'
            initialValue='kg'
            rules={[
              {
                required: true,
                message: '請選擇單位'
              }
            ]}
          >
            <FormUnitSelect rowIndex={rowIndex} />
          </Form.Item>
          <MinusCircleOutlined className='w-8 text-center mt-[0.6rem] text-red-500' onClick={() => handleDelete(rowIndex)} />
        </Input.Group>
      ))}

      <Button type='dashed' onClick={handleAdd} className='w-full mb-16'><PlusCircleOutlined className='mr-2' />新增一筆</Button>
    </>
  )
}

export default AddGWPYearlyFormItem