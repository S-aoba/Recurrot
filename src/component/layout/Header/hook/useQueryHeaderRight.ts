import type { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const useQueryHeaderRight = () => {
  const router = useRouter()
  const getHeaderRight = async () => {
    const { data } = await axios.get<Pick<User, 'profileImage'>>(`${process.env.NEXT_PUBLIC_API_URL}/user/header-right`)
    return data
  }
  return useQuery<Pick<User, 'profileImage'>, Error>({
    queryKey: ['header-right'],
    queryFn: getHeaderRight,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
