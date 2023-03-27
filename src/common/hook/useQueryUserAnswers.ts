import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { QuestionAndAnswerIdListType } from '../type'

export const useQueryUserAnswers = () => {
  const router = useRouter()
  const getAnsweredQuestionByUserId = async () => {
    const res = await axios.get<QuestionAndAnswerIdListType[]>(`${process.env.NEXT_PUBLIC_API_URL}/answer`, {
      withCredentials: true,
    })
    return res.data
  }
  return useQuery<QuestionAndAnswerIdListType[], Error>({
    queryKey: ['userAnswers'],
    queryFn: getAnsweredQuestionByUserId,
    staleTime: 10000, //5分
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
