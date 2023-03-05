import React from 'react'
import type { TUnit } from '@/types'
import { round } from 'lodash-es'

export const windowOuterWidth = window?.outerWidth || 1200

export const renderHTML = (rawHTML: string) =>
  React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } })

export const months = [
  {
    value: 0,
    label: '一月',
  },
  {
    value: 1,
    label: '二月',
  },
  {
    value: 2,
    label: '三月',
  },
  {
    value: 3,
    label: '四月',
  },
  {
    value: 4,
    label: '五月',
  },
  {
    value: 5,
    label: '六月',
  },
  {
    value: 6,
    label: '七月',
  },
  {
    value: 7,
    label: '八月',
  },
  {
    value: 8,
    label: '九月',
  },
  {
    value: 9,
    label: '十月',
  },
  {
    value: 10,
    label: '十一月',
  },
  {
    value: 11,
    label: '十二月',
  },
]

export const convertUnitToTons = ({
  value,
  unit,
}: {
  value: number
  unit: TUnit
}) => {
  switch (unit) {
    case 'kg':
      return round(value / 1000, 3)
    case 'tons':
      return round(value, 3)
  }
}

export const reverseUnitValue = ({
  value,
  unit,
}: {
  value: number
  unit: TUnit
}) => {
  switch (unit) {
    case 'kg':
      return value * 1000
    case 'tons':
      return value
  }
}

export const getTypeText = (
  resource: string,
  method: string,
  statusText: string,
) => {
  const getMethodText = (theMethod: string) => {
    switch (theMethod) {
      case 'get':
        return '獲取'
      case 'post':
        return '更新'
      case 'delete':
        return '刪除'
      default:
        return '更新'
    }
  }

  const methodText = getMethodText(method)
  const getResourceText = (theResource: string) => {
    switch (theResource) {
      case 'carbon-project':
        return '專案'
      case 'attachment':
        return '圖片'
    }
  }
  const resourceText = getResourceText(resource)

  switch (resource + '-' + method) {
    case 'attachment-post':
      return '圖片上傳'
    case 'carbon-project-post':
      return statusText === 'Created'
        ? `${resourceText}創建`
        : `${resourceText}${methodText}`
    default:
      return `${resourceText}${methodText}`
  }
}

const baseUrl = process.env.BASE_URL || ''

export const defaultRouterMetas = [
  {
    path: baseUrl,
    title: '所有專案',
  },
  {
    path: `${baseUrl}create`,
    title: '選擇你的公司分類',
  },
  {
    path: `${baseUrl}check`,
    title: '碳盤查',
  },
]
