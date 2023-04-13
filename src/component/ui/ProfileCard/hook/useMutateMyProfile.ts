import type { User } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { EditedUpdateMyProfile } from '@/common/type'

export const useMutateMyProfile = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const updateMyProfileMutation = useMutation({
    mutationKey: ['my-profile'],
    mutationFn: async (user: EditedUpdateMyProfile) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/my-profile`, user)
      return res.data
    },
    onSuccess: (res: User) => {
      const previousUser = queryClient.getQueryData<User>(['my-profile'])
      if (previousUser) {
        queryClient.setQueryData(['my-profile'], res)
      }

      // ここでHeaderの右側のプロフィール画像を更新する
      queryClient.invalidateQueries(['header-right'])

      router.push('/dashboard/my-profile')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    },
  })
  return { updateMyProfileMutation }
}
