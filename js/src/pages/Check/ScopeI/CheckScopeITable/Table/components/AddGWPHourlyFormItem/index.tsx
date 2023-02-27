import { useContext } from 'react'
import { Input, InputNumber, Form } from 'antd'
import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'
import { FormContext } from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/AddRowButton'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'
import HiddenInput from '@/components/HiddenInput'
import { nanoid } from 'nanoid'

const AddGWPHourlyFormItem = () => {
  const { validating } = useContext(FormContext)
  const { groupIndex, dataSource } = useContext(TableDataContext)
  const rowIndex = dataSource.length || 0

  return (
    <>
      <Input.Group compact className="mb-4">
        <Form.Item
          name={[
            'scopeI',
            groupIndex,
            'dataSource',
            rowIndex,
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
            'scopeI',
            groupIndex,
            'dataSource',
            rowIndex,
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
              'scopeI',
              groupIndex,
              'dataSource',
              rowIndex,
              'gwp',
            ]}
          />
        </Form.Item>
        <Form.Item
          name={[
            'scopeI',
            groupIndex,
            'dataSource',
            rowIndex,
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
              'scopeI',
              groupIndex,
              'dataSource',
              rowIndex,
              'unit',
            ]}
          />
        </Form.Item>
      </Input.Group>
      <Input.Group compact className="mb-4">
        <Form.Item
          name={[
            'scopeI',
            groupIndex,
            'dataSource',
            rowIndex,
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

export default AddGWPHourlyFormItem
