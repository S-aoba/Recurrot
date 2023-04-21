import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export const useMutateUser = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const deleteUserMutation = useMutation({
    mutationKey: ['current-user'],
    mutationFn: async () => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user`)
    },
    onSuccess: async () => {
      await router.push('/')

      queryClient.clear()

      toast.success('ユーザーアカウントを削除しました。ご利用ありがとうございました、またね！')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')

        toast.error('ユーザーアカウントの削除に失敗しました')
      }
    },
  })

  const logoutMutation = useMutation({
    mutationKey: ['current-user'],
    mutationFn: async () => {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    },
    onSuccess: () => {
      router.push('/')

      queryClient.clear()

      toast.success('ログアウトしました')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')

        toast.error('ログアウトに失敗しました')
      }
    },
  })

  return { deleteUserMutation, logoutMutation }
}
