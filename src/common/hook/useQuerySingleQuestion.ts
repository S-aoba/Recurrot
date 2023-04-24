import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { SingleQuestion } from '../type'

export const useQuerySingleQuestion = (id: string | string[] | undefined) => {
  const router = useRouter()
  const getSingleQuestion = async () => {
    const res = await axios.get<SingleQuestion>(`${process.env.NEXT_PUBLIC_API_URL}/question/${id}`)
    return res.data
  }
  return useQuery<SingleQuestion, Error>({
    queryKey: ['singleQuestion', id],
    queryFn: getSingleQuestion,
    enabled: !!id,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.status === 403) {
        router.push('/404')
      } else if (err.response.status === 401) return router.push('/')
    },
  })
}
