import { createContext, useContext, useState, useEffect } from 'react'
import { Button, Modal, Input, Radio, Form } from 'antd'
import { FolderAddOutlined } from '@ant-design/icons'
import AddGWPYearlyFormItem from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/AddGWPYearlyFormItem'
import AddGWPMonthlyFormItem from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/AddGWPMonthlyFormItem'
import AddGWPHourlyFormItem from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/AddGWPHourlyFormItem'
import type { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import { nanoid } from 'nanoid'
import { gwpMapping, convertUnitToTons } from '@/utils'
import type { TUnit } from '@/types'

import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'

export const FormContext = createContext<any | null>(null)
const AddRowButton = () => {
  const form = Form.useFormInstance()
  const { dataSource, setDataSource, groupIndex } = useContext(TableDataContext)
  const rowIndex = dataSource.length || 0

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false)

  const [
    validating,
    setValidating,
  ] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
    // TODO set reset field name
  }

  const handleData = () => {
    const theKey = form.getFieldValue([
      'scopeI',
      groupIndex,
      'dataSource',
      rowIndex,
      'key',
    ])
    const formData = form.getFieldsValue()

    console.log('formData', formData)
    const groupData = formData?.scopeI[groupIndex]

    console.log('groupData', theKey, groupData)

    const theDataSource = groupData.dataSource.find(
      (item: {
        key: string
        equipment: string
        period: string
        gwp: string
        unit: TUnit
        yearlyAmount?: number
        hourlyAmount?: number
        hours?: number
        monthlyAmount?: number[]
      }) => item?.key === theKey,
    )

    console.log('theDataSource', theDataSource)

    const getYearlyAmount = (theRecord: any) => {
      switch (theRecord?.period) {
        case 'yearly':
          return convertUnitToTons({
            value: theRecord.yearlyAmount ?? 0,
            unit: theRecord.unit,
          })
        case 'monthly':
          return convertUnitToTons({
            value: (theRecord?.monthlyAmount ?? []).reduce(
              (acc: number, cur: number) => acc + cur,
              0,
            ),
            unit: theRecord.unit,
          })
        case 'hourly':
          return convertUnitToTons({
            value: (theRecord.hourlyAmount ?? 0) * (theRecord.hours ?? 0),
            unit: theRecord.unit,
          })
        default:
          return 0
      }
    }
    const yearlyAmount = getYearlyAmount(theDataSource)

    const ar5 =
      gwpMapping.find((gwp) => gwp?.value === theDataSource?.gwp)?.ar5 || 0

    const carbonTonsPerYear = yearlyAmount * ar5

    const theFormatDataSource: TYearlyDataType = {
      key: theDataSource?.key ?? '',
      equipment: theDataSource?.equipment,
      gwp: theDataSource.gwp,
      yearlyAmount,
      ar5,
      co2e: carbonTonsPerYear,
      carbonTonsPerYear,
      period: theDataSource?.period,
      monthlyAmount:
        theDataSource?.period === 'monthly' ? theDataSource.monthlyAmount : [],
      hourlyAmount:
        theDataSource?.period === 'hourly' ? theDataSource.hourlyAmount : [],
      unit: theDataSource.unit,
    }

    return theFormatDataSource
  }

  // TODO
  const handleModalOk = () => {
    setValidating(true)
    form
      .validateFields()
      .then((_values) => {
        setValidating(false)
        setIsModalOpen(false)
        const newDataSource = handleData()
        // const scopeI = JSON.stringify({
        //   ...fetchMetaProjectData,
        //   dataSources: [
        //     fetchDataSource,
        //     ...newDataSources,
        //   ],
        // })
        // useUpdate({
        //   resource: 'carbon-project',
        //   id:postId,
        //   args: {
        //     meta: {
        //       project_data,
        //     },
        //   },
        // })
        console.log('newDataSources', newDataSource)
        setDataSource([
          ...dataSource,
          newDataSource,
        ])
      })
      .catch((err) => {
        console.log('Validate Failed:', err)
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const period = Form.useWatch(
    [
      'scopeI',
      groupIndex,
      'dataSource',
      rowIndex,
      'period',
    ],
    form,
  )

  // TODO
  useEffect(() => {
    form.resetFields([
      [
        'scopeI',
        groupIndex,
        'dataSource',
        rowIndex,
        'yearlyAmount',
      ],
      [
        'scopeI',
        groupIndex,
        'dataSource',
        rowIndex,
        'monthlyAmount',
      ],
      [
        'scopeI',
        groupIndex,
        'dataSource',
        rowIndex,
        'hourlyAmount',
      ],
      [
        'scopeI',
        groupIndex,
        'dataSource',
        rowIndex,
        'hours',
      ],
    ])
  }, [period])

  return (
    <>
      <Button onClick={showModal} type="default" className="mt-4">
        <FolderAddOutlined className="mr-2" />
        新增設備
      </Button>
      <Modal
        title="新增設備"
        open={isModalOpen}
        onOk={handleModalOk}
        centered
        width={600}
        className="cc-modal"
        onCancel={handleCancel}
        okText="新增設備"
        cancelText="取消"
      >
        <Form
          form={form}
          onFieldsChange={() => {
            setValidating(false)
          }}
        >
          <Form.Item
            // hasFeedback={true}
            name={[
              'scopeI',
              groupIndex,
              'dataSource',
              rowIndex,
              'equipment',
            ]}
            rules={[{ required: validating, message: '請輸入設備名稱' }]}
          >
            <Input className="mt-8" addonBefore="設備名稱" />
          </Form.Item>

          <Form.Item
            name={[
              'scopeI',
              groupIndex,
              'dataSource',
              rowIndex,
              'period',
            ]}
            initialValue="yearly"
          >
            <Radio.Group className="w-full mt-8" buttonStyle="solid">
              <Radio.Button className="w-1/3 text-center" value="yearly">
                年碳排放
              </Radio.Button>
              <Radio.Button className="w-1/3 text-center" value="monthly">
                月碳排放
              </Radio.Button>
              <Radio.Button className="w-1/3 text-center" value="hourly">
                每小時碳排放
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <FormContext.Provider value={{ validating }}>
            {period === 'yearly' && <AddGWPYearlyFormItem />}
            {period === 'monthly' && <AddGWPMonthlyFormItem />}
            {period === 'hourly' && <AddGWPHourlyFormItem />}
          </FormContext.Provider>
        </Form>
      </Modal>
    </>
  )
}

export default AddRowButton
