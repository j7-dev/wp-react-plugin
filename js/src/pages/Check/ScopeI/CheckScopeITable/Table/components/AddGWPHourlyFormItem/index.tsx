import { useContext } from 'react'
import { Input, InputNumber, Form } from 'antd'
import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'
import { FormContext } from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/AddRecordButton'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'

const AddGWPHourlyFormItem = () => {
  const { validating } = useContext(FormContext)
  const { groupIndex } = useContext(TableDataContext)

  return (
    <>
      <Input.Group compact className="mb-4">
        <Form.Item
          name={[
            groupIndex,
            'hourlyAmount',
          ]}
          className="w-[calc(100%-20rem)] mb-0"
          initialValue={0}
          rules={[
            {
              required: validating,
              message: '請輸入每小時排放量',
            },
          ]}
        >
          <InputNumber
            addonBefore="每小時排放"
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
      <Input.Group compact className="mb-4">
        <Form.Item
          name={[
            groupIndex,
            'hours',
          ]}
          className="w-full mb-0"
          initialValue={0}
          rules={[
            {
              required: validating,
              message: '請輸入此設備今年運轉了幾小時',
            },
          ]}
        >
          <InputNumber
            addonBefore="此設備今年運轉了"
            addonAfter="小時"
            className="w-full"
            min={0}
          />
        </Form.Item>
      </Input.Group>
    </>
  )
}

export default AddGWPHourlyFormItem
