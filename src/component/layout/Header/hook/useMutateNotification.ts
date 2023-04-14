import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { Notification } from '@/common/type'

export const useMutateNotification = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const updateNotificationMutation = useMutation({
    mutationKey: ['notification-list'],
    mutationFn: async (answerId: string) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/notification/${answerId}`)
      return res.data
    },
    onSuccess: (res: Notification[]) => {
      const previousNotification = queryClient.getQueryData<Notification[]>(['notification-list'])

      if (previousNotification) {
        queryClient.setQueryData(['notification-list'], res)
      }
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    },
  })
  return { updateNotificationMutation }
}
