import {axios} from '@/api'

export const createProject = async (options:any) => {

  const createResult = await axios.post('/wp/v2/carbon-project', options)

  return createResult
}
