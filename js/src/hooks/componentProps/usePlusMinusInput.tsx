import { useState } from 'react'

export const usePlusMinusInput = (defaultValue = 1) => {
  const [
    value,
    setValue,
  ] = useState<number>(defaultValue)
  return {
    value,
    setValue,
    defaultValue,
  }
}
