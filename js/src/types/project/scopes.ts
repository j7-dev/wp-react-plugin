import { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'

export type TGroupData = {
  groupKey: string
  groupName: string
  dataSource: TYearlyDataType[]
}

export type TInfo = {
  title: string
  content: string
  companyCategory: string
  imgData: {
    attachmentId: number
    url: string
  }
}

export type TScopes = {
  scopeI: TGroupData[]
  scopeII: TGroupData[]
  info: TInfo
}
