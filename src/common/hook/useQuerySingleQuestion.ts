import type { Question } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const useQuerySingleQuestions = (id: number) => {
  const router = useRouter()
  const getSingleQuestions = async (id: number) => {
    const res = await axios.get<Question>(`${process.env.NEXT_PUBLIC_API_URL}/question/${id}`, {
      withCredentials: true,
    })
    return res.data
  }
  return useQuery<Question, Error>({
    queryKey: ['singleQuestion', id],
    queryFn: () => {
      return getSingleQuestions(id)
    },
    enabled: !!id,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
