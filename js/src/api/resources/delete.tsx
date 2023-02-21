import { axios } from '@/api'

export const deleteProject = async (id: number) => {
	const deleteResult = await axios.delete(`/wp/v2/carbon-project/${id}`)

	return deleteResult
}
