export type TImage = {
  id: number
  src: string
  thumbnail: string
  srcset: string
  sizes: string
  name: string
  alt: string
}

export type TProductTerm = {
  id: number
  name: string
  slug: string
  link: string
}

export type TProductAttributeTerm = {
  id: number
  name: string
  slug: string
}

export type TProductAttribute = {
  id: number
  name: string
  taxonomy: string
  has_variations: boolean
  terms: TProductAttributeTerm[]
}

export type TProductVariationAttribute = {
  name: string
  value: string
}

export type TProductVariation = {
  id: number
  attributes: TProductVariationAttribute[]
}

export type TProduct = {
  id: number
  name: string
  parent: number
  type: string
  variation: string
  permalink: string
  sku: string
  short_description: string
  description: string
  on_sale: boolean
  prices: {
    price: string
    regular_price: string
    sale_price: string
    price_range: {
      min_amount: string
      max_amount: string
    } | null
    currency_code: string
    currency_symbol: string
    currency_minor_unit: number
    currency_decimal_separator: string
    currency_thousand_separator: string
    currency_prefix: string
    currency_suffix: string
  }
  price_html: string
  average_rating: string
  review_count: number
  images: TImage[]
  categories: TProductTerm[]
  tags: TProductTerm[]
  attributes: TProductAttribute[]
  variations: TProductVariation[]
  has_options: boolean
  is_purchasable: boolean
  is_in_stock: boolean
  is_on_backorder: boolean
  low_stock_remaining: any
  sold_individually: boolean
  add_to_cart: {
    text: string
    description: string
    url: string
    minimum: number
    maximum: number
    multiple_of: number
  }
  extensions: {}
}

export const defaultProduct: TProduct = {
  id: 0,
  name: '',
  parent: 0,
  type: '',
  variation: '',
  permalink: '',
  sku: '',
  short_description: '',
  description: '',
  on_sale: false,
  prices: {
    price: '',
    regular_price: '',
    sale_price: '',
    price_range: null,
    currency_code: '',
    currency_symbol: '',
    currency_minor_unit: 0,
    currency_decimal_separator: '',
    currency_thousand_separator: '',
    currency_prefix: '',
    currency_suffix: '',
  },
  price_html: '',
  average_rating: '',
  review_count: 0,
  images: [],
  categories: [],
  tags: [],
  attributes: [],
  variations: [],
  has_options: false,
  is_purchasable: false,
  is_in_stock: false,
  is_on_backorder: false,
  low_stock_remaining: null,
  sold_individually: false,
  add_to_cart: {
    text: '',
    description: '',
    url: '',
    minimum: 0,
    maximum: 0,
    multiple_of: 0,
  },
  extensions: {},
}
