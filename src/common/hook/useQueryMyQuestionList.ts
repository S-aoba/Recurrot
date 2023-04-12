import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { MyQuestion } from '../type'

export const useQueryMyQuestionList = () => {
  const router = useRouter()
  const getMyQuestionList = async () => {
    const res = await axios.get<MyQuestion[]>(`${process.env.NEXT_PUBLIC_API_URL}/question/my-question-list`, {
      withCredentials: true,
    })
    return res.data
  }
  return useQuery<MyQuestion[], Error>({
    queryKey: ['my-question-list'],
    queryFn: getMyQuestionList,
    staleTime: 10000, //5分
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
