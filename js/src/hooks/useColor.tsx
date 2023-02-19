import {theme} from 'antd'

const {useToken} = theme

const useColor = () => {

  const {token} = useToken()

  return token
}

export default useColor