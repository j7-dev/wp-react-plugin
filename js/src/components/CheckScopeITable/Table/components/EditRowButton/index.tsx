import React, {useContext, useState, useEffect, createContext} from 'react'
import { Modal,Input,Radio,Form} from 'antd'
import {SlidersOutlined} from '@ant-design/icons'
import { TableDataContext } from '@/components/CheckScopeITable'
import EditGWPYearlyFormItem from '@/components/CheckScopeITable/Table/components/EditGWPYearlyFormItem'
import EditGWPMonthlyFormItem from '@/components/CheckScopeITable/Table/components/EditGWPMonthlyFormItem'
import EditGWPHourlyFormItem from '@/components/CheckScopeITable/Table/components/EditGWPHourlyFormItem'
import {TYearlyDataType} from '@/components/CheckScopeITable/Table/types'
import { gwpMapping, convertUnitToTons } from '@/utils'
import type {TUnit} from '@/types'
import { useColor } from '@/hooks'

export const EditRowButtonContext = createContext<TYearlyDataType | null>(null)

const EditRowButton:React.FC<{record:TYearlyDataType}> = ({record}) => {

  const {colorPrimary} = useColor()
  const [form] = Form.useForm()

  const {handleEdit} = useContext(TableDataContext)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
    form.resetFields()
  }

  const handleData = (record:TYearlyDataType) => {
    const values = form.getFieldsValue()
    const parentKey = record.key.slice(0,-3) || ''

    const period = values.period
    const dataSources:TYearlyDataType[] = values.dataSource.map((item:{gwp:string;unit:TUnit; yearlyAmount?:number; hourlyAmount?:number;hours?:number; monthlyAmount: number[]}, index:number) => {

      const getYearlyAmount = () => {
        switch (period) {
        case 'yearly':
          return convertUnitToTons({value:item?.yearlyAmount ?? 0, unit:item?.unit ?? ''})
        case 'monthly':
          return convertUnitToTons({value: (item?.monthlyAmount ?? []).reduce((acc:number, cur:number) => acc + cur, 0), unit:item?.unit ?? ''})
        case 'hourly':
          return convertUnitToTons({value:( (item?.hourlyAmount ?? 0 ) * (item?.hours ?? 0 ) ), unit:item?.unit ?? ''})
        default:
          return 0
        }
      }
      const yearlyAmount = getYearlyAmount()

      const ar5 = gwpMapping.find((gwp) => gwp.value === item?.gwp)?.ar5 || 0
      const carbonTonsPerYear = yearlyAmount * ar5
      return (
        {
          ...item,
          key: `${parentKey}-${index.toString().padStart(2, '0')}`,
          equipment: values.equipment,
          gwp: item?.gwp,
          yearlyAmount,
          ar5,
          co2e: carbonTonsPerYear,
          carbonTonsPerYear: carbonTonsPerYear,
          period,
          monthlyAmount: period === 'monthly' ? item?.monthlyAmount : [],
          hourlyAmount: period === 'hourly' ? item?.hourlyAmount : [],
          unit: item?.unit,
        }
      )
    })

    return dataSources
  }

  const handleOk = (record:TYearlyDataType) => {
    setIsModalOpen(false)
    const dataSources = handleData(record)

    handleEdit(dataSources)
    console.log('dataSources', dataSources)

  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const period = Form.useWatch(['period'],form)

  useEffect( () => {
    form.resetFields([
      ['dataSource'],
    ])
  } , [period])

  return (
    <>
      <SlidersOutlined className='ml-4' style={{color: colorPrimary}} onClick={showModal} />
      <EditRowButtonContext.Provider value={record}>
        <Modal
          title="設備資料更新"
          open={isModalOpen}
          onOk={() => handleOk(record)}
          centered
          width={600}
          className='cc-modal'
          onCancel={handleCancel}
          okText='設備資料更新'
          cancelText='取消'
        >
          <Form form={form}>
            <Form.Item
              name={['equipment']}
              rules={[{ required: true, message: '請輸入設備名稱' }]}
              initialValue={record.equipment}
            >
              <Input className='mt-8' addonBefore="設備名稱"  />
            </Form.Item>
            <Form.Item
              name={['period']}
              initialValue={record.period}
            >
              <Radio.Group className='w-full mt-8' buttonStyle="solid">
                <Radio.Button className='w-1/3 text-center' value="yearly">年碳排放</Radio.Button>
                <Radio.Button className='w-1/3 text-center' value="monthly">月碳排放</Radio.Button>
                <Radio.Button className='w-1/3 text-center' value="hourly">每小時碳排放</Radio.Button>
              </Radio.Group>
            </Form.Item>
            {period === 'yearly' && <EditGWPYearlyFormItem />}
            {period === 'monthly' && <EditGWPMonthlyFormItem />}
            {period === 'hourly' && <EditGWPHourlyFormItem />}
          </Form>
        </Modal>
      </EditRowButtonContext.Provider>
    </>
  )
}

export default EditRowButton