import { theme } from 'antd'

const { useToken } = theme

export const useColor = () => {
  const { token } = useToken()
  return token
}
