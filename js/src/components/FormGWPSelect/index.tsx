import React from 'react'
import { Select, Form } from 'antd'
import { gwpOptions, convertChemicalToString } from '@/utils'

const FormGWPSelect: React.FC<{
  name: string | Array<string | number>
  className?: string
}> = ({ name, className = 'rounded-none' }) => {
  const form = Form.useFormInstance()
  const gwp = Form.useWatch(name, form)

  const handleSelect = (value: string) => {
    form.setFieldValue(name, value)
    form.validateFields()
  }

  const handleClear = () => {
    form.setFieldValue(name, undefined)
  }

  return (
    <Select
      className={className}
      showSearch
      allowClear
      placeholder="請選擇或搜尋溫室氣體"
      optionFilterProp="children"
      filterOption={(input, option) =>
        convertChemicalToString(option?.label).includes(input.toLowerCase())
      }
      options={gwpOptions}
      value={gwp}
      onSelect={handleSelect}
      onClear={handleClear}
    />
  )
}

export default FormGWPSelect
