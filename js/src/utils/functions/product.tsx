import { TProduct as TProductStoreApi } from '@/types/wcStoreApi'
import { TProduct as TProductRestApi } from '@/types/wcRestApi'

import { defaultImage } from '@/utils'

export const getProductImageSrc = (
  product: TProductStoreApi | TProductRestApi,
) => {
  const images = product?.images ?? []
  const image = images[0] ?? {}
  const imageSrc = image?.src ?? defaultImage
  return imageSrc
}
