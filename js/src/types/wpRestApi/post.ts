import { TPagination } from './common'

export type TPost = {
  id: number
  date: string | null
  date_gmt: string | null
  guid: {
    rendered: string
  }
  link: string
  modified: string | null
  modified_gmt: string | null
  slug: string
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private'
  type: string
  password: string
  permalink_template: string
  generated_slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  featured_media: number
  comment_status: 'open' | 'closed'
  ping_status: 'open' | 'closed'
  sticky: boolean
  template: string
  format:
    | 'standard'
    | 'aside'
    | 'chat'
    | 'gallery'
    | 'link'
    | 'image'
    | 'quote'
    | 'status'
    | 'video'
    | 'audio'
  meta: {
    [key: string]: any
  }
  categories: number[]
  tags: number[]
  _links: {
    [key: string]: any
  }
}

export type TPostsArgs = TPagination & {
  context?: 'view' | 'embed' | 'edit'
  search?: string
  after?: string
  before?: string
  modified_after?: string
  modified_before?: string
  author?: number
  author_exclude?: number
  exclude?: number | number[]
  include?: number | number[]
  search_columns?: string[]
  slug?: string
  status?: string
  tax_relation?: 'AND' | 'OR'
  categories?: number[]
  categories_exclude?: number[]
  tags?: number[]
  tags_exclude?: number[]
  sticky?: boolean
}

export type TPostArgs = {
  id?: number
  context?: 'view' | 'embed' | 'edit'
  password?: string
}
