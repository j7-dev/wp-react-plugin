import {axios} from '@/api'

export const getResource = async (resource:string,id:number, args?:{
  [key: string]: any;
}) => {

  const getResult = await axios.get(`/wp/v2/${resource}/${id}/?${new URLSearchParams(args)}`)

  return getResult
}



export const getResources = async (resource:string, args?:{
  [key: string]: any;
}) => {
  const getResult = await axios.get(`/wp/v2/${resource}/?${new URLSearchParams(args)}`)

  return getResult
}
