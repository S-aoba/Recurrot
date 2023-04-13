import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { AnswerType } from '../type'

export const useQueryAnswerList = (questionId: string) => {
  const router = useRouter()
  const getAnswerList = async (questionId: string) => {
    const { data } = await axios.get<AnswerType[]>(`${process.env.NEXT_PUBLIC_API_URL}/answer/${questionId}`)
    return data
  }
  return useQuery<AnswerType[], Error>({
    queryKey: ['answers', questionId],
    queryFn: () => {
      return getAnswerList(questionId)
    },
    enabled: !!questionId,
    staleTime: 10000, //5分
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
