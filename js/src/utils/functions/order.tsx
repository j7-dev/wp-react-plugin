export const getOrderStatus = (status: string) => {
  const rmPrefixStatus = status.replace('wc-', '')
  switch (rmPrefixStatus) {
    case 'processing':
      return {
        label: '處理中',
        color: '#108ee9',
      }
    case 'pending':
      return {
        label: '等待付款中',
        color: 'volcano',
      }
    case 'wmp-in-transit':
      return {
        label: '配送中',
        color: '#2db7f5',
      }
    case 'wmp-shipped':
      return {
        label: '已出貨',
        color: 'green',
      }
    case 'on-hold':
      return {
        label: '保留',
        color: 'gold',
      }
    case 'completed':
      return {
        label: '已完成',
        color: '#87d068',
      }
    case 'cancelled':
      return {
        label: '已取消',
        color: 'orange',
      }
    case 'refunded':
      return {
        label: '已退款',
        color: 'volcano',
      }
    case 'failed':
      return {
        label: '失敗訂單',
        color: 'magenta',
      }
    case 'checkout-draft':
      return {
        label: '未完成結帳',
        color: 'gold',
      }
    case 'ry-at-cvs':
      return {
        label: 'RY 等待撿貨中',
        color: 'cyan',
      }
    case 'ry-out-cvs':
      return {
        label: 'RY 訂單過期',
        color: 'purple',
      }

    default:
      return {
        label: status,
        color: 'default',
      }
  }
}
