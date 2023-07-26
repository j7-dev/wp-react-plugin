export type TTaxonomy = {
  name: string
  slug: string
  description: string
  types: string[]
  hierarchical: boolean
  rest_base: string
  rest_namespace: string
  _links: {
    [key: string]: any
  }
}

export type TTaxonomies = {
  [key: string]: TTaxonomy
}
