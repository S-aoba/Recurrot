import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { NewQuestion } from '../type'

export const useQueryNewQuestionList = () => {
  const router = useRouter()
  const getNewQuestionList = async () => {
    const { data } = await axios.get<NewQuestion[]>(`${process.env.NEXT_PUBLIC_API_URL}/question`)
    return data
  }
  return useQuery<NewQuestion[], Error>({
    queryKey: ['new-question-list'],
    queryFn: getNewQuestionList,
    staleTime: 10000, //5分
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
