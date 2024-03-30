import { TImage } from '@/types/wpRestApi'

export type TProductBase = {
  id: number
  permalink: string
  date_created: string
  date_created_gmt: string
  date_modified: string
  date_modified_gmt: string
  status: string
  description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  date_on_sale_from: string | null
  date_on_sale_from_gmt: string | null
  date_on_sale_to: string | null
  date_on_sale_to_gmt: string | null
  on_sale: boolean
  purchasable: boolean
  virtual: boolean
  downloadable: boolean
  downloads: any[]
  download_limit: number
  download_expiry: number
  tax_status: string
  tax_class: string
  manage_stock: boolean
  stock_quantity: string | null
  stock_status: string
  backorders: string
  backorders_allowed: boolean
  backordered: boolean
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  shipping_class: string
  shipping_class_id: number
  attributes: TAttribute[] | TSimpleAttribute[]
  menu_order: number
  meta_data: TMeta[]
  _links: {
    [key: string]: any
  }
}

export type TProduct = TProductBase & {
  name: string
  slug: string
  type: string
  featured: boolean
  catalog_visibility: string
  short_description: string
  total_sales: number
  external_url: string
  button_text: string
  sold_individually: boolean
  shipping_required: boolean
  shipping_taxable: boolean
  low_stock_amount: number | null
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  upsell_ids: any[]
  cross_sell_ids: any[]
  parent_id: number
  purchase_note: string
  categories: {
    id: number
    name: string
    slug: string
  }[]
  tags: any[]
  images: TImage[]
  default_attributes: any[]
  variations: number[]
  grouped_products: any[]
  price_html: string
  related_ids: number[]
  has_options: boolean
}

export type TProductVariation = TProductBase & {
  image: TImage | null
}

export type TMeta = {
  id: number
  key: string
  value: any
}

export type TAttribute = {
  id: number
  name: string
  position: number
  visible: boolean
  variation: boolean
  options: string[]
}

export type TSimpleAttribute = {
  id: number
  name: string
  option: string
}
