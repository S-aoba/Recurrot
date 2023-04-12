import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { MyAnswer } from '../type'

export const useQueryUserAnswers = () => {
  const router = useRouter()
  const getAnsweredQuestionList = async () => {
    const res = await axios.get<MyAnswer[]>(`${process.env.NEXT_PUBLIC_API_URL}/answer/my-answer`)
    return res.data
  }
  return useQuery<MyAnswer[], Error>({
    queryKey: ['userAnswers'],
    queryFn: getAnsweredQuestionList,
    staleTime: 10000, //5分
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
