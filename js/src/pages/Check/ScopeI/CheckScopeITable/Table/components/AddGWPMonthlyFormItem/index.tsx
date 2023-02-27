import { useContext } from 'react'
import { Input, InputNumber, Form, Row, Col } from 'antd'
import { months } from '@/utils'
import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'
import { FormContext } from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/AddRowButton'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'
import HiddenInput from '@/components/HiddenInput'
import { nanoid } from 'nanoid'

const AddGWPMonthlyFormItem = () => {
  const { validating } = useContext(FormContext)
  const { groupIndex, dataSource } = useContext(TableDataContext)
  const rowIndex = dataSource.length || 0

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name={[
              'scopeI',
              groupIndex,
              'dataSource',
              rowIndex,
              'gwp',
            ]}
            className="w-full"
            rules={[
              {
                required: validating,
                message: '請選擇溫室氣體',
              },
            ]}
          >
            <FormGWPSelect
              className="rounded-[6px]"
              name={[
                'scopeI',
                groupIndex,
                'dataSource',
                rowIndex,
                'gwp',
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={[
              'scopeI',
              groupIndex,
              'dataSource',
              rowIndex,
              'unit',
            ]}
            className="w-full"
            initialValue="kg"
            rules={[
              {
                required: validating,
                message: '請選擇單位',
              },
            ]}
          >
            <FormUnitSelect
              className="rounded-l-[6px]"
              name={[
                'scopeI',
                groupIndex,
                'dataSource',
                rowIndex,
                'unit',
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          {months.map((month, index: number) =>
            index < 6 ? (
              <Input.Group
                compact
                className="mb-4"
                key={`month-${month.value}`}
              >
                <Form.Item
                  name={[
                    'scopeI',
                    groupIndex,
                    'dataSource',
                    rowIndex,
                    'monthlyAmount',
                    month.value,
                  ]}
                  className="w-full mb-0"
                  initialValue={0}
                  rules={[
                    {
                      required: validating,
                      message: '請輸入月排放量',
                    },
                  ]}
                >
                  <InputNumber
                    addonBefore={<p className="m-0 w-16">{month.label}</p>}
                    className="w-full"
                    min={0}
                  />
                </Form.Item>
              </Input.Group>
            ) : null,
          )}
        </Col>
        <Col span={12}>
          {months.map((month, index: number) =>
            index > 5 ? (
              <Input.Group
                compact
                className="mb-4"
                key={`month-${month.value}`}
              >
                <Form.Item
                  name={[
                    'scopeI',
                    groupIndex,
                    'dataSource',
                    rowIndex,
                    'monthlyAmount',
                    month.value,
                  ]}
                  className="w-full mb-0"
                  initialValue={0}
                  rules={[
                    {
                      required: validating,
                      message: '請輸入月排放量',
                    },
                  ]}
                >
                  <InputNumber
                    addonBefore={<p className="m-0 w-16">{month.label}</p>}
                    className="w-full"
                    min={0}
                  />
                </Form.Item>
              </Input.Group>
            ) : null,
          )}
        </Col>
      </Row>
      <HiddenInput
        name={[
          'scopeI',
          groupIndex,
          'dataSource',
          rowIndex,
          'key',
        ]}
        initialValue={nanoid()}
        required
      />
    </>
  )
}

export default AddGWPMonthlyFormItem
