import React from 'react'
import { Select, Form } from 'antd'

const FormUnitSelect:React.FC<{
  rowIndex:number,
  className?:string
}> = ({
  rowIndex,
  className = 'rounded-l-none'
}) => {
  const { Option } = Select
  const form = Form.useFormInstance()
  const unit = Form.useWatch(['dataSource', rowIndex, 'unit'], form)

  const handleSelect = (value: string) => {
    form.setFieldValue(['dataSource', rowIndex, 'unit'], value)
  }

  return (
    <Select
      className={className}
      value={unit}
      onSelect={handleSelect}
    >
      <Option value="kg">kg</Option>
      <Option value="tons">tons</Option>
    </Select>
  )
}

export default FormUnitSelect