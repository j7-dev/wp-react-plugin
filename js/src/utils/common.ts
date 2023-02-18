import type {TUnit} from '@/types'

export const months = [
  {
    value: 0,
    label: '一月'
  },
  {
    value: 1,
    label: '二月'
  },
  {
    value: 2,
    label: '三月'
  },
  {
    value: 3,
    label: '四月'
  },
  {
    value: 4,
    label: '五月'
  },
  {
    value: 5,
    label: '六月'
  },
  {
    value: 6,
    label: '七月'
  },
  {
    value: 7,
    label: '八月'
  },
  {
    value: 8,
    label: '九月'
  },
  {
    value: 9,
    label: '十月'
  },
  {
    value: 10,
    label: '十一月'
  },
  {
    value: 11,
    label: '十二月'
  }
]

export const convertUnitToTons = ({value, unit}:{value:number, unit: TUnit}) => {
  switch (unit) {
  case 'kg':
    return value / 1000
  case 'tons':
    return value
  }
}

export const reverseUnitValue = ({value, unit}:{value:number, unit: TUnit}) => {
  switch (unit) {
  case 'kg':
    return value * 1000
  case 'tons':
    return value
  }
}