import React from 'react'

export const windowOuterWidth = window?.outerWidth || 1200

export const isIphone = /iPhone/.test(navigator.userAgent)

export const renderHTML = (rawHTML: string) =>
  React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } })

export const handleClearZero = (e: React.MouseEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement
  if (target.value === '0') {
    target.value = ''
  }
}

export const getCopyableJson = (variable: any) => {
  const jsonStringStrippedEscapeC = JSON.stringify(
    JSON.stringify(variable || '{}'),
  ).replace(/\\/g, '')
  const jsonString = jsonStringStrippedEscapeC.slice(
    1,
    jsonStringStrippedEscapeC.length - 1,
  )

  if (typeof variable === 'object') {
    const countKeys = Object.keys(variable).length

    return countKeys === 0 ? '' : jsonString
  }
  return !!variable ? jsonString : ''
}

export const getQueryString = (name: string) => {
  const urlParams = new URLSearchParams(window.location.search)
  const paramValue = urlParams.get(name)
  return paramValue
}

export const getCurrencyString = ({
  price,
  symbol = 'NT$',
}: {
  price: number | string | undefined
  symbol?: string
}) => {
  if (typeof price === 'undefined') return ''
  if (typeof price === 'string') return `${symbol} ${price}`
  return `${symbol} ${price.toString()}`
}

export const filterObjKeys = (
  obj: object,
  arr: (string | number | boolean | undefined | null)[] = [undefined],
) => {
  for (const key in obj) {
    if (arr.includes(obj[key as keyof typeof obj])) {
      delete obj[key as keyof typeof obj]
    } else if (typeof obj[key as keyof typeof obj] === 'object') {
      filterObjKeys(obj[key as keyof typeof obj]) // 递归处理嵌套对象
      if (Object.keys(obj[key as keyof typeof obj]).length === 0) {
        delete obj[key as keyof typeof obj]
      }
    }
  }

  return obj
}

export const isUsingBlockEditor =
  typeof window?.wp !== 'undefined' && typeof window?.wp?.blocks !== 'undefined'
