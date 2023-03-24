import type { Answer } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const useQueryAnswers = (questionId: number) => {
  const router = useRouter()
  const getAnswers = async (questionId: number) => {
    const { data } = await axios.get<Answer[]>(`${process.env.NEXT_PUBLIC_API_URL}/answer/${questionId}`)
    return data
  }
  return useQuery<Answer[], Error>({
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