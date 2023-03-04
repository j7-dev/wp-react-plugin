import { createContext, useContext, useState, useEffect } from 'react'
import { Button, Modal, InputNumber, Form, Row, Col } from 'antd'
import { FolderAddFilled } from '@ant-design/icons'
import type { TYearlyDataType } from '@/pages/Check/ScopeII/CheckScopeIITable/Table/types'
import { nanoid } from 'nanoid'
import { gwpMapping, convertUnitToTons, electricSources } from '@/utils'
import { ProjectContext } from '@/pages/Check'
import { TableDataContext } from '@/pages/Check/ScopeII/CheckScopeIITable'
import ExtendableSelect from '../ExtendableSelect'

export const FormContext = createContext<any | null>(null)
const AddRecordButton = () => {
  const form = Form.useFormInstance()
  const { scopes, setScopes } = useContext(ProjectContext)
  const { groupIndex, groupKey } = useContext(TableDataContext)
  const scopeIIGroups = scopes?.scopeII || []
  const group = scopeIIGroups.find((theGroup) => theGroup.groupKey === groupKey)
  const dataSource = group?.dataSource || []

  const watchYearlyAmount = Form.useWatch(
    [
      groupIndex,
      'yearlyAmount',
    ],
    form,
  )
  const watchCo2Kwh = Form.useWatch(
    [
      groupIndex,
      'co2Kwh',
    ],
    form,
  )

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
        'electricSource',
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
      electricSource: formData?.electricSource,
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

  const handleESSelect = (value: any) => {
    const isES = Object.keys(value[groupIndex]).includes('electricSource')

    const values = {
      ...form.getFieldsValue(),
    }
    if (isES) {
      const source = electricSources.find(
        (s) => s.value === value[groupIndex].electricSource,
      ) || {
        yearlyAmount: 0,
        conversionRate: 1,
      }

      console.log('source', source)

      values[groupIndex].yearlyAmount = source.yearlyAmount
      values[groupIndex].co2Kwh = source.conversionRate

      form.setFieldsValue(values)
    }
  }

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
        onCancel={handleCancel}
        okText="新增電力來源"
        cancelText="取消"
      >
        <Form
          form={form}
          onFieldsChange={() => {
            setValidating(false)
          }}
          layout="vertical"
          onValuesChange={handleESSelect}
        >
          <Row gutter={16} className="mt-8">
            <Col span={12}>
              <ExtendableSelect
                groupIndex={groupIndex}
                validating={validating}
              />
            </Col>
            <Col span={12}>
              <Form.Item
                label="使用度數(年)"
                name={[
                  groupIndex,
                  'yearlyAmount',
                ]}
                initialValue={0}
                rules={[
                  {
                    required: validating,
                    message: '請輸入年排放量',
                  },
                ]}
              >
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    CO<sub>2</sub>/Kwh
                  </>
                }
                name={[
                  groupIndex,
                  'co2Kwh',
                ]}
                initialValue={0}
                rules={[
                  {
                    required: validating,
                    message: `請輸入${(
                      <>
                        CO<sub>2</sub>/Kwh
                      </>
                    )}`,
                  },
                ]}
              >
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="碳排(噸/年)">
                <InputNumber
                  value={watchYearlyAmount * watchCo2Kwh}
                  className="w-full"
                  min={0}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default AddRecordButton
