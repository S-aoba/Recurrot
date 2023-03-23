import type { Question } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const useQueryQuestions = () => {
  const router = useRouter()
  const getQuestions = async () => {
    const { data } = await axios.get<Question[]>(`${process.env.NEXT_PUBLIC_API_URL}/question`)
    return data
  }
  return useQuery<Question[], Error>({
    queryKey: ['questions'],
    queryFn: getQuestions,
    staleTime: 10000, //5分
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
