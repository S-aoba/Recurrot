import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { UserType } from '../type'

export const useQueryUser = () => {
  const router = useRouter()
  const getUser = async () => {
    const { data } = await axios.get<Omit<UserType, 'hashedPassword'>>(`${process.env.NEXT_PUBLIC_API_URL}/user`)
    return data
  }
  return useQuery<Omit<UserType, 'hashedPassword'>, Error>({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
