import { Form, Input } from "antd";
import {CloseCircleFilled} from '@ant-design/icons'

const HiddenInput: React.FC<{ name: Array<string | number>; initialValue?: any; required?: boolean }> = ({
  name,
  initialValue = "○○○",
  required = false,
}) => {
  const form = Form.useFormInstance();
  const value = form.getFieldValue(name);

  return (
    <>
      <Form.Item name={name} hidden initialValue={initialValue}
      rules={
        [
          {
            required: required,
          }
        ]
      }
      >
        <Input hidden />
      </Form.Item>
      {required && !value && <p className="text-red-500"><CloseCircleFilled className='mr-2' />不可為空</p>}
    </>
  );
};

export default HiddenInput;
