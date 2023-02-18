import React, {useState, useContext, useEffect} from 'react'
import {Input, InputNumber, Form, Button, Divider, Row, Col} from 'antd'
import {months} from '@/utils'
import {PlusCircleOutlined, MinusCircleOutlined} from '@ant-design/icons'
import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'
import {EditRowButtonContext} from '@/components/CheckScopeITable/Table/components/EditRowButton'
import {TableDataContext} from '@/components/CheckScopeITable'
import { TYearlyDataType } from '@/components/CheckScopeITable/Table/types'


const EditGWPMonthlyFormItem = () => {
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

  const MonthView:React.FC<{rowIndex:number}> = ({rowIndex}) => {
    return (
      <>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name={['dataSource', rowIndex, 'gwp']}
              className='w-full'
              initialValue={parentRecords[rowIndex]?.gwp}
              rules={[
                {
                  required: true,
                  message: '請選擇溫室氣體'
                }
              ]}
            >
              <FormGWPSelect className='rounded-[6px]' rowIndex={rowIndex} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['dataSource', rowIndex, 'unit']}
              className='w-full'
              initialValue={parentRecords[rowIndex]?.unit}
              rules={[
                {
                  required: true,
                  message: '請選擇單位'
                }
              ]}
            >
              <FormUnitSelect className='rounded-l-[6px]' rowIndex={rowIndex} />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={24}>
          <Col span={12}>
            {months.map((month, index:number) => (
              <>
                {index < 6 && (
                  <Input.Group compact className='mb-4' key={`month-${month.value}`}>
                    <Form.Item
                      name={['dataSource', rowIndex, 'monthlyAmount', month.value]}
                      className='w-full mb-0'
                      initialValue={parentRecords[rowIndex]?.monthlyAmount[month.value] ?? 0}
                      rules={[
                        {
                          required: true,
                          message: '請輸入月排放量'
                        }
                      ]}
                    >
                      <InputNumber addonBefore={<p className='m-0 w-16'>{month.label}</p>} className='w-full' min={0} />
                    </Form.Item>
                  </Input.Group>
                )}
              </>
            ))}
          </Col>
          <Col span={12}>
            {months.map((month, index:number) => (
              <>
                {index > 5 && (
                  <Input.Group compact className='mb-4' key={`month-${month.value}`}>
                    <Form.Item
                      name={['dataSource', rowIndex, 'monthlyAmount', month.value]}
                      className='w-full mb-0'
                      initialValue={parentRecords[rowIndex]?.monthlyAmount[month.value] ?? 0}
                      rules={[
                        {
                          required: true,
                          message: '請輸入月排放量'
                        }
                      ]}
                    >
                      <InputNumber addonBefore={<p className='m-0 w-16'>{month.label}</p>} className='w-full' min={0} />
                    </Form.Item>
                  </Input.Group>
                )}
              </>
            ))}
          </Col>

        </Row>

        {count.length > 1 && <Button type='primary' danger onClick={() => handleDelete(rowIndex)} className='w-full'><MinusCircleOutlined className='mr-2' />刪除</Button>}

        {count.length > 1 && <div className='my-8'><Divider plain>分隔線</Divider></div>}

      </>
    )
  }

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
      {count.map((rowIndex) => <MonthView key={`MonthView-${rowIndex}`} rowIndex={rowIndex} />)}

      <Button type='dashed' onClick={handleAdd} className='w-full mb-16 mt-8'><PlusCircleOutlined className='mr-2' />新增一筆</Button>
    </>
  )
}

export default EditGWPMonthlyFormItem