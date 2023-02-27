import React from 'react'

import { Select, Form } from 'antd'

const FormUnitSelect: React.FC<{
  name: string | Array<string | number>
  className?: string
}> = ({ name, className = 'rounded-l-none' }) => {
  const { Option } = Select

  const form = Form.useFormInstance()

  const unit = Form.useWatch(name, form)

  const handleSelect = (value: string) => {
    form.setFieldValue(name, value)
  }

  return (
    <Select className={className} value={unit} onSelect={handleSelect}>
      <Option value="kg">kg</Option>

      <Option value="tons">tons</Option>
    </Select>
  )
}

export default FormUnitSelect
