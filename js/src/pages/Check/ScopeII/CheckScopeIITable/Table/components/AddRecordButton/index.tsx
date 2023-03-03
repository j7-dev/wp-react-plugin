import { createContext, useContext, useState, useEffect } from 'react'
import { Button, Modal, Input, Radio, Form } from 'antd'
import { FolderAddFilled } from '@ant-design/icons'
import GWPYearlyFormItem from '@/pages/Check/ScopeII/CheckScopeIITable/Table/components/GWPYearlyFormItem'
import type { TYearlyDataType } from '@/pages/Check/ScopeII/CheckScopeIITable/Table/types'
import { nanoid } from 'nanoid'
import { gwpMapping, convertUnitToTons } from '@/utils'
import { ProjectContext } from '@/pages/Check'
import { TableDataContext } from '@/pages/Check/ScopeII/CheckScopeIITable'

export const FormContext = createContext<any | null>(null)
const AddRecordButton = () => {
  const form = Form.useFormInstance()
  const { scopes, setScopes } = useContext(ProjectContext)
  const { groupIndex, groupKey } = useContext(TableDataContext)
  const scopeIIGroups = scopes?.scopeII || []
  const group = scopeIIGroups.find((theGroup) => theGroup.groupKey === groupKey)
  const dataSource = group?.dataSource || []

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false)

  const [
    validating,
    setValidating,
  ] = useState(false)

  const resetFormData = () => {
    form.resetFields([
      [
        groupIndex,
        'equipment',
      ],
      [
        groupIndex,
        'period',
      ],
      [
        groupIndex,
        'yearlyAmount',
      ],
      [
        groupIndex,
        'monthlyAmount',
      ],
      [
        groupIndex,
        'hourlyAmount',
      ],
      [
        groupIndex,
        'hours',
      ],
      [
        groupIndex,
        'gwp',
      ],
      [
        groupIndex,
        'unit',
      ],
    ])
  }

  const showModal = () => {
    setIsModalOpen(true)
    resetFormData()
  }

  const handleData = () => {
    const formData = form.getFieldsValue()[groupIndex]
    console.log('formData', formData)

    const getYearlyAmount = (theFormData: any) => {
      switch (theFormData?.period) {
        case 'yearly':
          return convertUnitToTons({
            value: theFormData.yearlyAmount ?? 0,
            unit: theFormData.unit,
          })
        case 'monthly':
          return convertUnitToTons({
            value: (theFormData?.monthlyAmount ?? []).reduce(
              (acc: number, cur: number) => acc + cur,
              0,
            ),
            unit: theFormData.unit,
          })
        case 'hourly':
          return convertUnitToTons({
            value: (theFormData.hourlyAmount ?? 0) * (theFormData.hours ?? 0),
            unit: theFormData.unit,
          })
        default:
          return 0
      }
    }
    const yearlyAmount = getYearlyAmount(formData)

    const ar5 = gwpMapping.find((gwp) => gwp?.value === formData?.gwp)?.ar5 || 0

    const carbonTonsPerYear = yearlyAmount * ar5

    const theFormatRecord: TYearlyDataType = {
      key: nanoid(),
      equipment: formData?.equipment,
      gwp: formData.gwp,
      yearlyAmount,
      ar5,
      co2e: carbonTonsPerYear,
      carbonTonsPerYear,
      period: formData?.period,
      monthlyAmount:
        formData?.period === 'monthly' ? formData.monthlyAmount : [],
      hourlyAmount: formData?.period === 'hourly' ? formData.hourlyAmount : 0,
      unit: formData.unit,
    }

    return [
      ...dataSource,
      theFormatRecord,
    ]
  }

  const handleModalOk = () => {
    setValidating(true)
    form
      .validateFields()
      .then((_values) => {
        setValidating(false)
        setIsModalOpen(false)
        const newDataSource = handleData()
        const newScopes = JSON.parse(JSON.stringify(scopes))

        newScopes.scopeII[groupIndex].dataSource = newDataSource

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
      groupIndex,
      'period',
    ],
    form,
  )

  return (
    <>
      <Button onClick={showModal} type="primary" className="mt-4">
        <FolderAddFilled className="mr-2" />
        新增電力來源
      </Button>
      <Modal
        title="新增電力來源"
        open={isModalOpen}
        onOk={handleModalOk}
        centered
        width={600}
        className="cc-modal"
        onCancel={handleCancel}
        okText="新增電力來源"
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
              groupIndex,
              'equipment',
            ]}
            rules={[{ required: validating, message: '請輸入電力來源' }]}
          >
            <Input className="mt-8" addonBefore="電力來源" />
          </Form.Item>

          <GWPYearlyFormItem groupIndex={groupIndex} validating={validating} />
        </Form>
      </Modal>
    </>
  )
}

export default AddRecordButton
