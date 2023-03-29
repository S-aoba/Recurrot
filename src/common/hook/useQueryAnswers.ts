import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { AnswerAndPostedUserNameType } from '../type'

export const useQueryAnswers = (questionId: string) => {
  const router = useRouter()
  const getAnswers = async (questionId: string) => {
    const { data } = await axios.get<AnswerAndPostedUserNameType[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/answer/${questionId}`
    )
    return data
  }
  return useQuery<AnswerAndPostedUserNameType[], Error>({
    queryKey: ['answers', questionId],
    queryFn: () => {
      return getAnswers(questionId)
    },
    enabled: !!questionId,
    staleTime: 10000, //5分
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
