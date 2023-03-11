import { axios } from '@/api'

/**
 * NO NEED to use this because we use "usefulteam/jwt-auth" to get token by default
 * use this only if you want to get token by username and password
 */

export const getToken = async () => {
  const token = await axios.post('/jwt-auth/v1/token', {
    username: 'admin',
    password: 'password',
  })

  return token
}
