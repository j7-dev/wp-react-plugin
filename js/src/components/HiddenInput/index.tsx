import { Form, Input } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'

const HiddenInput: React.FC<{
  name: string | number | (string | number)[]
  required?: boolean
}> = ({ name, required = false }) => {
  const form = Form.useFormInstance()
  const value = Form.useWatch(name, form)

  return (
    <>
      <Form.Item
        name={name}
        hidden
        rules={[
          {
            required,
          },
        ]}
      >
        <Input hidden />
      </Form.Item>
      {required && !value && (
        <p className="text-red-500">
          <CloseCircleFilled className="mr-2" />
          不可為空
        </p>
      )}
    </>
  )
}

export default HiddenInput
