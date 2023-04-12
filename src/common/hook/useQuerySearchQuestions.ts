import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { SearchQuestion } from '../type'

export const useQuerySearchQuestions = (searchWord: string) => {
  const router = useRouter()
  const getSingleQuestion = async (searchWord: string) => {
    const res = await axios.get<SearchQuestion[]>(`${process.env.NEXT_PUBLIC_API_URL}/question/search/${searchWord}`)
    return res.data
  }
  return useQuery<SearchQuestion[], Error>({
    queryKey: ['search-question-list', searchWord],
    queryFn: () => {
      return getSingleQuestion(searchWord)
    },
    enabled: !!searchWord,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
