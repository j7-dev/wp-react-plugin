import { useState, useEffect } from 'react'
import { Typography } from 'antd'
import HiddenInput from '@/components/HiddenInput'
import { FormInstance } from 'antd/lib/form'

const useEditableTitle = ({
  form,
  name,
  required,
  initialValue,
  fetchData,
  title,
}: {
  form: FormInstance<any>
  name: string | number | (string | number)[]
  required?: boolean
  initialValue?: string | number
  fetchData: any
  title: {
    theTitle: string
    level: 1 | 2 | 3 | 4 | 5 | undefined
  }
}) => {
  const [
    editableStr,
    setEditableStr,
  ] = useState(initialValue)

  const handleChange = (str: string) => {
    setEditableStr(str)
    form.setFieldValue(name, str)
  }

  useEffect(() => {
    setEditableStr(title.theTitle)
  }, [title.theTitle])

  const renderTitle = () => (
    <>
      <Typography.Title
        editable={{ onChange: handleChange }}
        level={title.level}
      >
        {editableStr}
      </Typography.Title>
      <HiddenInput
        name={name}
        required={required}
        initialValue={initialValue}
      />
    </>
  )

  return {
    element: renderTitle(),
  }
}

export default useEditableTitle
