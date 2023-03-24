import type { Question } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const useQueryUserAnswers = () => {
  const router = useRouter()
  const getAnsweredQuestionByUserId = async () => {
    const res = await axios.get<Question[]>(`${process.env.NEXT_PUBLIC_API_URL}/answer`, {
      withCredentials: true,
    })
    return res.data
  }
  return useQuery<Question[], Error>({
    queryKey: ['userAnswers'],
    queryFn: getAnsweredQuestionByUserId,
    staleTime: 10000, //5分
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
