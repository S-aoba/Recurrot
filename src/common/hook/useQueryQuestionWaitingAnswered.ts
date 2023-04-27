import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { QuestionWaitingAnswered } from '../type'

export const useQueryQuestionWaitingAnswered = () => {
  const router = useRouter()
  const getQuestionWaitingAnsweredList = async () => {
    const { data } = await axios.get<QuestionWaitingAnswered[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/question/question-waiting-answered`
    )
    return data
  }
  return useQuery<QuestionWaitingAnswered[], Error>({
    queryKey: ['question-waiting-answered'],
    queryFn: getQuestionWaitingAnsweredList,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
