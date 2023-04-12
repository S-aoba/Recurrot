import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { CurrentUser } from '../type'

export const useQueryCurrentUser = () => {
  const router = useRouter()
  const getCurrentUser = async () => {
    const { data } = await axios.get<CurrentUser>(`${process.env.NEXT_PUBLIC_API_URL}/user/current-user`)
    return data
  }
  return useQuery<CurrentUser, Error>({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
