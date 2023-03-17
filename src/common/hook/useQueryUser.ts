import type { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSetAtom } from 'jotai'

import { isAuthenticatedAtom } from '@/store/auth-atom'

export const useQueryUser = () => {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom)

  const getUser = async () => {
    const { data } = await axios.get<Omit<User, 'hashedPassword'>>(`${process.env.NEXT_PUBLIC_API_URL}/user`)
    setIsAuthenticated(true)
    return data
  }
  return useQuery<Omit<User, 'hashedPassword'>, Error>({
    queryKey: ['user'],
    queryFn: getUser,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) setIsAuthenticated(false)
    },
  })
}
