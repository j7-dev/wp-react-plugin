import { TScopes } from '@/types'
import { nanoid } from 'nanoid'

export const defaultScopes: TScopes = {
  scopeI: [
    {
      groupKey: '0',
      groupName: '工廠 #1',
      dataSource: [],
    },
  ],
  scopeII: [
    {
      groupKey: '0',
      groupName: '工廠 #1',
      dataSource: [],
    },
  ],
  info: {
    title: '○○○○股份有限公司',
    content: '',
    companyCategory: '未分類',
    imgData: {
      attachmentId: 0,
      url: '',
    },
  },
}

export const removeKey = (scopes: TScopes) => {
  return {
    ...scopes,
    scopeI: scopes?.scopeI?.map((group) => {
      return {
        ...group,
        groupKey: undefined,
        dataSource: group?.dataSource?.map((item) => {
          return {
            ...item,
            key: undefined,
          }
        }),
      }
    }),
  }
}

export const addKey = (scopes: TScopes) => {
  return {
    ...scopes,
    scopeI: scopes?.scopeI?.map((group) => {
      return {
        ...group,
        groupKey: nanoid(),
        dataSource: group?.dataSource?.map((item) => {
          return {
            ...item,
            key: nanoid(),
          }
        }),
      }
    }),
  }
}
