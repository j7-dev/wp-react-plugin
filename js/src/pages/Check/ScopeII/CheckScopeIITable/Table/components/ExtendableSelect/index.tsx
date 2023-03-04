import React, { useState, useRef } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Divider, Input, Select, Space, Button, InputRef, Form } from 'antd'
import { sourceNames } from '@/utils'

let index = 0

const ExtendableSelect: React.FC<{
  groupIndex: number
  validating: boolean
}> = ({ groupIndex, validating }) => {
  const defaultItems = sourceNames.map((item) => item.value)
  const [
    items,
    setItems,
  ] = useState(defaultItems)
  const [
    name,
    setName,
  ] = useState('')
  const inputRef = useRef<InputRef>(null)

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault()
    setItems([
      ...items,
      name || `New item ${index++}`,
    ])
    setName('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <Form.Item
      label="電力來源"
      name={[
        'scopeII',
        groupIndex,
        'sourceName',
      ]}
      rules={[{ required: validating, message: '請輸入電力來源' }]}
    >
      <Select
        className="w-full"
        placeholder="選擇電力來源"
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
              <Input
                placeholder="自行輸入"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                新增
              </Button>
            </Space>
          </>
        )}
        options={items.map((item) => ({ label: item, value: item }))}
      />
    </Form.Item>
  )
}

export default ExtendableSelect
