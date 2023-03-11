import { createContext, useContext, useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, InputNumber } from 'antd'
import { FolderAddFilled } from '@ant-design/icons'
import type { TYearlyDataType } from '@/pages/Check/ScopeII/CheckScopeIITable/Table/types'
import { nanoid } from 'nanoid'
import { handleClearZero, sourceNames } from '@/utils'
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
      'scopeII',
      groupIndex,
      'yearlyAmount',
    ],
    form,
  )
  const watchCo2Kwh = Form.useWatch(
    [
      'scopeII',
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
        'scopeII',
        groupIndex,
        'sourceName',
      ],
      [
        'scopeII',
        groupIndex,
        'yearlyAmount',
      ],
      [
        'scopeII',
        groupIndex,
        'co2Kwh',
      ],
    ])
  }

  const showModal = () => {
    setIsModalOpen(true)
    resetFormData()
  }

  const handleData = () => {
    const formData = form.getFieldsValue().scopeII[groupIndex]

    const yearlyAmount = formData?.yearlyAmount || 0
    const co2Kwh = formData.co2Kwh || 1
    const carbonTonsPerYear = (yearlyAmount * co2Kwh) / 1000

    const theFormatRecord: TYearlyDataType = {
      key: nanoid(),
      sourceName: formData?.sourceName,
      co2Kwh: formData.co2Kwh || 1,
      yearlyAmount,
      carbonTonsPerYear,
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
    const isES = Object.keys(value.scopeII[groupIndex]).includes('sourceName')

    const values = {
      ...form.getFieldsValue(),
    }

    if (isES) {
      const source = sourceNames.find(
        (s) => s.value === value.scopeII[groupIndex].sourceName,
      ) || {
        co2Kwh: 1,
      }

      values.scopeII[groupIndex].co2Kwh = source.co2Kwh

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
                  'scopeII',
                  groupIndex,
                  'yearlyAmount',
                ]}
                initialValue={0}
                rules={[
                  {
                    required: validating,
                    message: '請輸入使用度數',
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  onClick={handleClearZero}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    CO<sub>2</sub>(kg)/Kwh
                  </>
                }
                name={[
                  'scopeII',
                  groupIndex,
                  'co2Kwh',
                ]}
                initialValue={0}
                rules={[
                  {
                    required: validating,
                    message: `請輸入${(
                      <>
                        CO<sub>2</sub>(kg)/Kwh
                      </>
                    )}`,
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  onClick={handleClearZero}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="碳排(噸/年)">
                <InputNumber
                  value={(watchYearlyAmount * watchCo2Kwh) / 1000}
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
