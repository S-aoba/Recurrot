import type { User } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { UserType } from '@/common/type'

export const useMutateNotification = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const updateNotificationMutation = useMutation({
    mutationKey: ['notifications'],
    mutationFn: async (answerId: string) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/notification/${answerId}`)
      return res.data
    },
    onSuccess: (res: UserType) => {
      const previousNotification = queryClient.getQueryData<User>(['notifications'])

      if (previousNotification) {
        queryClient.setQueryData(['notifications'], res)
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
