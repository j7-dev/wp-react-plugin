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
import { ProjectContext } from '@/pages/Check'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'

export const FormContext = createContext<any | null>(null)
const AddRowButton = () => {
  const form = Form.useFormInstance()
  const { scopes, setScopes } = useContext(ProjectContext)
  const { groupIndex, groupKey } = useContext(TableDataContext)
  const scopeIGroups = scopes?.scopeI || []
  const dataSource =
    scopeIGroups.find((group) => group.key === groupKey)?.dataSource || []
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

    const theRecord = groupData.dataSource.find(
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

    console.log('theRecord', theRecord)

    const getYearlyAmount = (record: any) => {
      switch (record?.period) {
        case 'yearly':
          return convertUnitToTons({
            value: record.yearlyAmount ?? 0,
            unit: record.unit,
          })
        case 'monthly':
          return convertUnitToTons({
            value: (record?.monthlyAmount ?? []).reduce(
              (acc: number, cur: number) => acc + cur,
              0,
            ),
            unit: record.unit,
          })
        case 'hourly':
          return convertUnitToTons({
            value: (record.hourlyAmount ?? 0) * (record.hours ?? 0),
            unit: record.unit,
          })
        default:
          return 0
      }
    }
    const yearlyAmount = getYearlyAmount(theRecord)

    const ar5 =
      gwpMapping.find((gwp) => gwp?.value === theRecord?.gwp)?.ar5 || 0

    const carbonTonsPerYear = yearlyAmount * ar5

    const theFormatRecord: TYearlyDataType = {
      key: theRecord?.key ?? '',
      equipment: theRecord?.equipment,
      gwp: theRecord.gwp,
      yearlyAmount,
      ar5,
      co2e: carbonTonsPerYear,
      carbonTonsPerYear,
      period: theRecord?.period,
      monthlyAmount:
        theRecord?.period === 'monthly' ? theRecord.monthlyAmount : [],
      hourlyAmount:
        theRecord?.period === 'hourly' ? theRecord.hourlyAmount : [],
      unit: theRecord.unit,
    }

    return {
      ...dataSource,
      ...theFormatRecord,
    }
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

        const newScopes = JSON.parse(JSON.stringify(scopes))
        newScopes.scopeI[groupIndex].dataSource = newDataSource

        setScopes(newScopes)
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
