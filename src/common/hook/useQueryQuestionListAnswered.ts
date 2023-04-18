import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { MyAnswer } from '../type'

export const useQueryQuestionListAnswered = () => {
  const router = useRouter()
  const getQuestionListAnswered = async () => {
    const res = await axios.get<MyAnswer[]>(`${process.env.NEXT_PUBLIC_API_URL}/answer/question-list-answered`)
    return res.data
  }
  return useQuery<MyAnswer[], Error>({
    queryKey: ['questionList-answered'],
    queryFn: getQuestionListAnswered,
    staleTime: Infinity, //5分
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
