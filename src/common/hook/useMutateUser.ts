import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const useMutateUser = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const deleteUserMutation = useMutation({
    mutationKey: ['current-user'],
    mutationFn: async () => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user`)
    },
    onSuccess: () => {
      queryClient.clear()
      router.push('/')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    },
  })

  const logoutMutation = useMutation({
    mutationKey: ['current-user'],
    mutationFn: async () => {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    },
    onSuccess: () => {
      queryClient.clear()
      router.push('/')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    },
  })

  return { deleteUserMutation, logoutMutation }
}
