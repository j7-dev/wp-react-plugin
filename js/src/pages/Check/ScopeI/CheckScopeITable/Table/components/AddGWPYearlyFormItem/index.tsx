import { useContext } from 'react'
import { Input, InputNumber, Form } from 'antd'

import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'
import { FormContext } from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/AddRowButton'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'
import HiddenInput from '@/components/HiddenInput'
import { nanoid } from 'nanoid'

const AddGWPYearlyFormItem = () => {
  const { validating } = useContext(FormContext)
  const { groupIndex, dataSource } = useContext(TableDataContext)
  const rowIndex = dataSource.length
  return (
    <>
      <Input.Group compact className="mb-4">
        <Form.Item
          name={[
            'scopeI',
            groupIndex,
            'dataSource',
            rowIndex,
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

export default AddGWPYearlyFormItem
