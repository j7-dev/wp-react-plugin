import { Input, InputNumber, Form } from 'antd'

import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'

const GWPYearlyFormItem: React.FC<{
  groupIndex: number
  validating: boolean
}> = ({ groupIndex, validating }) => {
  return (
    <>
      <Input.Group compact className="mb-4">
        <Form.Item
          name={[
            groupIndex,
            'yearlyAmount',
          ]}
          className="w-[calc(100%-20rem)] mb-0"
          initialValue={0}
          rules={[
            {
              required: validating,
              message: '請輸入年排放量',
            },
          ]}
        >
          <InputNumber
            addonBefore="年排放"
            className="w-full rounded-r-none"
            min={0}
          />
        </Form.Item>
        <Form.Item
          name={[
            groupIndex,
            'gwp',
          ]}
          className="w-60 mb-0"
          rules={[
            {
              required: validating,
              message: '請選擇溫室氣體',
            },
          ]}
        >
          <FormGWPSelect
            name={[
              groupIndex,
              'gwp',
            ]}
          />
        </Form.Item>
        <Form.Item
          name={[
            groupIndex,
            'unit',
          ]}
          className="w-20 mb-0"
          initialValue="kg"
          rules={[
            {
              required: validating,
              message: '請選擇單位',
            },
          ]}
        >
          <FormUnitSelect
            name={[
              groupIndex,
              'unit',
            ]}
          />
        </Form.Item>
      </Input.Group>
    </>
  )
}

export default GWPYearlyFormItem
