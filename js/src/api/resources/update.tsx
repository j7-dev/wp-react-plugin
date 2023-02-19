import {axios} from '@/api'

export const updateProject = async (id:number, options:any) => {

  const updateResult = await axios.post(`/wp/v2/carbon-project/${id}`, options)

  return updateResult
}
