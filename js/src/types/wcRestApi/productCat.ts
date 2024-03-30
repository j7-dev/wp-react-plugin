import { TImage } from '@/types/wpRestApi'

export type TProductCat = {
  id: number
  name: string
  slug: string
  parent: number
  description: string
  display: string
  image: TImage | null
  menu_order: number
  count: number
  _links: {
    [key: string]: any
  }
}
