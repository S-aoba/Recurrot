import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { QuestionAndAnswerIdListType } from '../type'

export const useQuerySingleQuestion = (id: string) => {
  const router = useRouter()
  const getSingleQuestion = async (id: string) => {
    const res = await axios.get<Omit<QuestionAndAnswerIdListType, 'answers'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/question/${id}`
    )
    return res.data
  }
  return useQuery<Omit<QuestionAndAnswerIdListType, 'answers'>, Error>({
    queryKey: ['singleQuestion', id],
    queryFn: () => {
      return getSingleQuestion(id)
    },
    enabled: !!id,
    staleTime: 10000, //5分
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
