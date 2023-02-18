import React, {useState, useContext, useEffect} from 'react'
import {Input, InputNumber, Form, Button, Divider} from 'antd'
import {PlusCircleOutlined, MinusCircleOutlined} from '@ant-design/icons'
import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'
import {EditRowButtonContext} from '@/components/CheckScopeITable/Table/components/EditRowButton'
import {TableDataContext} from '@/components/CheckScopeITable'
import {reverseUnitValue} from '@/utils'
import { TYearlyDataType } from '@/components/CheckScopeITable/Table/types'

const EditGWPHourlyFormItem = () => {
  const [count, setCount] = useState([0])
  const record = useContext(EditRowButtonContext)
  const {dataSource} = useContext(TableDataContext)
  const parentKey = record?.key.slice(0,-3) || ''
  const parentRecords = dataSource.filter((item:TYearlyDataType) => item.key.includes(parentKey))
  const countRecord = parentRecords.length

  useEffect(() => {
    if (countRecord > 0) {
      setCount(Array.from(Array(countRecord).keys()))
    }
  }, [countRecord])

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
        <div key={`HourlyView-${rowIndex}`}>
          <Input.Group compact className='mb-4'>
            <Form.Item
              name={['dataSource', rowIndex, 'hourlyAmount']}
              className='w-[calc(100%-20rem)] mb-0'
              initialValue={parentRecords[rowIndex]?.hourlyAmount}
              rules={[
                {
                  required: true,
                  message: '請輸入每小時排放量'
                }
              ]}
            >
              <InputNumber addonBefore='每小時排放' className='w-full rounded-r-none' min={0} />
            </Form.Item>
            <Form.Item
              name={['dataSource', rowIndex, 'gwp']}
              className='w-60 mb-0'
              initialValue={parentRecords[rowIndex]?.gwp}
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
              initialValue={parentRecords[rowIndex]?.unit}
              rules={[
                {
                  required: true,
                  message: '請選擇單位'
                }
              ]}
            >
              <FormUnitSelect rowIndex={rowIndex} />
            </Form.Item>
          </Input.Group>
          <Input.Group compact className='mb-4'>
            <Form.Item
              name={['dataSource', rowIndex, 'hours']}
              className='w-full mb-0'
              initialValue={Math.round((reverseUnitValue({value: parentRecords[rowIndex]?.yearlyAmount, unit: parentRecords[rowIndex]?.unit}) / parentRecords[rowIndex]?.hourlyAmount) * 1000) / 1000  }
              rules={[
                {
                  required: true,
                  message: '請輸入此設備今年運轉了多少小時'
                }
              ]}
            >
              <InputNumber addonBefore='此設備今年運轉了' addonAfter='小時' className='w-full' min={0} />
            </Form.Item>
          </Input.Group>
          {count.length > 1 && <Button type='primary' danger onClick={() => handleDelete(rowIndex)} className='w-full'><MinusCircleOutlined className='mr-2' />刪除</Button>}

          {count.length > 1 && <div className='my-8'><Divider plain>分隔線</Divider></div>}
        </div>
      ))}


      <Button type='dashed' onClick={handleAdd} className='w-full mb-16'><PlusCircleOutlined className='mr-2' />新增一筆</Button>
    </>
  )
}

export default EditGWPHourlyFormItem