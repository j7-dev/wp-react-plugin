import {useState, useEffect } from 'react';
import {getResources} from '@/api'
import {
  useQuery
} from "@tanstack/react-query";


const useMany = (options:{
  resource:string,
  args?: {
    [key: string]: any;
  },
  queryOptions?:{
    staleTime?:number,
    cacheTime?:number,
    refetchOnWindowFocus?:boolean,
    refetchOnMount?:boolean,
    refetchOnReconnect?:boolean,
    refetchInterval?:number,
    retry?:number | boolean,
    retryDelay?:number,
    enabled?:boolean,
  }
}) => {


  const [fetchedData, setFetchedData] = useState<any>(null)
  const getResult = useQuery([`get_${options?.resource}s`,], () => getResources(options?.resource, options?.args), options?.queryOptions || {})
  const {isSuccess, data} = getResult

  useEffect(() => {
    if(!!data){
      setFetchedData(data?.data || null)
  }
  }, [isSuccess])


  return fetchedData
}

export default useMany