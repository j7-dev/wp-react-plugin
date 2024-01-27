import { TDataProvider } from '@/types'

export const getTypeText = (
  resource: string,
  method: string,
  statusText: string,
) => {
  const getMethodText = (theMethod: string) => {
    switch (theMethod) {
      case 'get':
        return 'Get'
      case 'post':
        return 'Updated'
      case 'delete':
        return 'Deleted'
      default:
        return 'Updated'
    }
  }

  const methodText = getMethodText(method)
  const getResourceText = (theResource: string) => {
    switch (theResource) {
      case 'posts':
        return 'Post'
      case 'users':
        return 'User'
      case 'attachment':
        return 'Image'
    }
  }
  const resourceText = getResourceText(resource)

  switch (resource + '-' + method) {
    case 'attachment-post':
      return 'Image Uploaded'
    case 'posts-post':
      return statusText === 'Created'
        ? `${resourceText} Created`
        : `${resourceText}${methodText}`
    default:
      return `${resourceText} ${methodText}`
  }
}

export const getDataProviderUrlParams = (dataProvider: TDataProvider) => {
  switch (dataProvider) {
    case 'wp-rest':
      return 'wp/v2'
    case 'wc-rest':
      return 'wc/v3'
    case 'wc-store':
      return 'wc/store/v1'
    default:
      return 'wp/v2'
  }
}
