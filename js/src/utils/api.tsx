export const getTypeText = (
  resource: string,
  method: string,
  statusText: string,
) => {
  const getMethodText = (theMethod: string) => {
    switch (theMethod) {
      case 'get':
        return '獲取'
      case 'post':
        return '更新'
      case 'delete':
        return '刪除'
      default:
        return '更新'
    }
  }

  const methodText = getMethodText(method)
  const getResourceText = (theResource: string) => {
    switch (theResource) {
      case 'posts':
        return '文章'
      case 'users':
        return '用戶'
      case 'attachment':
        return '圖片'
    }
  }
  const resourceText = getResourceText(resource)

  switch (resource + '-' + method) {
    case 'attachment-post':
      return '圖片上傳'
    case 'posts-post':
      return statusText === 'Created'
        ? `${resourceText}創建`
        : `${resourceText}${methodText}`
    default:
      return `${resourceText}${methodText}`
  }
}
