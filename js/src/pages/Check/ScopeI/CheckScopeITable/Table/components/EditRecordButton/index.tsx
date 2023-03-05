import { createContext, useContext, useState } from 'react'
import { Modal, Input, Radio, Form } from 'antd'
import { SlidersOutlined } from '@ant-design/icons'
import GWPYearlyFormItem from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/GWPYearlyFormItem'
import GWPMonthlyFormItem from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/GWPMonthlyFormItem'
import GWPHourlyFormItem from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/GWPHourlyFormItem'
import type { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import { nanoid } from 'nanoid'
import { gwpMapping, convertUnitToTons, reverseUnitValue } from '@/utils'
import { ProjectContext } from '@/pages/Check'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'
import { useColor } from '@/hooks'
import { round } from 'lodash-es'

export const FormContext = createContext<any | null>(null)
const EditRecordButton: React.FC<{ record: TYearlyDataType }> = ({
  record,
}) => {
  const form = Form.useFormInstance()
  const { scopes, setScopes } = useContext(ProjectContext)
  const { groupIndex, groupKey } = useContext(TableDataContext)
  const scopeIGroups = scopes?.scopeI || []
  const group = scopeIGroups.find((theGroup) => theGroup.groupKey === groupKey)
  const dataSource = group?.dataSource || []
  const { colorPrimary } = useColor()

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false)

  const [
    validating,
    setValidating,
  ] = useState(false)

  const showModal = (theRecord: TYearlyDataType) => () => {
    setIsModalOpen(true)

    const theYearlyAmount = reverseUnitValue({
      value: theRecord.yearlyAmount,
      unit: theRecord.unit,
    })

    const theHourlyAmount = theRecord.hourlyAmount || 0
    const theHours = !!theHourlyAmount ? theYearlyAmount / theHourlyAmount : 0

    form.setFieldsValue({
      scopeI: {
        [groupIndex]: {
          sourceName: theRecord.sourceName,
          period: theRecord.period,
          yearlyAmount: reverseUnitValue({
            value: theRecord.yearlyAmount || 0,
            unit: theRecord.unit,
          }),
          monthlyAmount: theRecord.monthlyAmount || new Array(12).fill(0),
          hourlyAmount: theRecord.hourlyAmount || 0,
          hours: round(theHours, 1),
          gwp: theRecord.gwp,
          unit: theRecord.unit,
        },
      },
    })
  }

  const handleData = () => {
    const formData = form.getFieldsValue().scopeI[groupIndex]

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
      key: record?.key || nanoid(),
      sourceName: formData?.sourceName,
      gwp: formData?.gwp,
      yearlyAmount,
      ar5,
      co2e: carbonTonsPerYear,
      carbonTonsPerYear,
      period: formData?.period,
      monthlyAmount:
        formData?.period === 'monthly' ? formData?.monthlyAmount : [],
      hourlyAmount: formData?.period === 'hourly' ? formData?.hourlyAmount : 0,
      unit: formData.unit,
    }

    const theRecordIndex = dataSource.findIndex(
      (theRecord) => theRecord.key === record?.key,
    )

    return [
      ...dataSource.slice(0, theRecordIndex),
      theFormatRecord,
      ...dataSource.slice(theRecordIndex + 1),
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
      'period',
    ],
    form,
  )

  return (
    <>
      <SlidersOutlined
        className="ml-4 text-[20px]"
        style={{ color: colorPrimary }}
        onClick={showModal(record)}
      />
      <Modal
        title="編輯設備"
        open={isModalOpen}
        onOk={handleModalOk}
        centered
        width={600}
        className="cc-modal"
        onCancel={handleCancel}
        okText="編輯設備"
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
              'sourceName',
            ]}
            rules={[{ required: validating, message: '請輸入設備名稱' }]}
          >
            <Input className="mt-8" addonBefore="設備名稱" />
          </Form.Item>

          <Form.Item
            name={[
              'scopeI',
              groupIndex,
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
          {period === 'yearly' && (
            <GWPYearlyFormItem
              groupIndex={groupIndex}
              validating={validating}
            />
          )}
          {period === 'monthly' && (
            <GWPMonthlyFormItem
              groupIndex={groupIndex}
              validating={validating}
            />
          )}
          {period === 'hourly' && (
            <GWPHourlyFormItem
              groupIndex={groupIndex}
              validating={validating}
            />
          )}
        </Form>
      </Modal>
    </>
  )
}

export default EditRecordButton
