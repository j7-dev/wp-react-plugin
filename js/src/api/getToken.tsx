
import axios from '@/api'

const getToken = async () => {

  const token = await axios.post('/jwt-auth/v1/token', {
      username: 'carbon',
      password: 'X0921565659x+'
  })

  return token
}

export default getToken