import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { Notification } from '@/common/type'

export const useQueryNotification = () => {
  const router = useRouter()
  const getNotification = async () => {
    const { data } = await axios.get<Notification[]>(`${process.env.NEXT_PUBLIC_API_URL}/notification`)
    return data
  }
  return useQuery<Notification[], Error>({
    queryKey: ['notifications'],
    queryFn: getNotification,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
