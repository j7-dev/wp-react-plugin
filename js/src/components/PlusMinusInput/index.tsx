import { FC } from 'react'
import { InputNumber } from 'antd'
import './style.scss'

const PlusMinusInput: FC<{
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  defaultValue: number
}> = ({ value, setValue, defaultValue }) => {
  const handleMinus = () => {
    if (value > 1) {
      setValue((pre) => pre - 1)
    }
  }

  const handlePlus = () => {
    setValue((pre) => pre + 1)
  }

  const handleChange = (v: number | null) => {
    if (v) {
      setValue(v)
    } else {
      setValue(1)
    }
  }

  return (
    <InputNumber
      className="w-full"
      addonBefore={
        <span className="fs-addon" onClick={handleMinus}>
          -
        </span>
      }
      addonAfter={
        <span className="fs-addon" onClick={handlePlus}>
          +
        </span>
      }
      defaultValue={defaultValue}
      value={value}
      onChange={handleChange}
    />
  )
}

export default PlusMinusInput
