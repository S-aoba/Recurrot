import type { Question } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const useQueryUserQuestions = () => {
  const router = useRouter()
  const getUserQuestions = async () => {
    const res = await axios.get<Question[]>(`${process.env.NEXT_PUBLIC_API_URL}/question/user/:userName`, {
      withCredentials: true,
    })
    return res.data
  }
  return useQuery<Question[], Error>({
    queryKey: ['userQuestions'],
    queryFn: getUserQuestions,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
