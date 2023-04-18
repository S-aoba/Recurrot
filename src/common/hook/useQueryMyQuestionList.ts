import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { MyQuestion } from '../type'

export const useQueryPostedQuestionList = () => {
  const router = useRouter()
  const getPostedQuestionList = async () => {
    const res = await axios.get<MyQuestion[]>(`${process.env.NEXT_PUBLIC_API_URL}/question/my-question-list`, {
      withCredentials: true,
    })
    return res.data
  }
  return useQuery<MyQuestion[], Error>({
    queryKey: ['my-question-list'],
    queryFn: getPostedQuestionList,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
