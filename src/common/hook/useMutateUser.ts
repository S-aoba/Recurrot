import type { User } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const useMutateUser = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const updateUserMutation = useMutation(
    ['user'],
    async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'email' | 'hashedPassword'>) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user`, user)
      return res.data
    },
    {
      onSuccess: (res: User) => {
        const previousUser = queryClient.getQueryData<User>(['user'])
        if (previousUser) {
          queryClient.setQueryData(['user'], res)
        }
        queryClient.invalidateQueries(['user'])
        router.push('/dashboard/my-profile')
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  const deleteUserMutation = useMutation(
    ['user'],
    async () => {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user`)
      return res.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
        router.push('/')
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  return { updateUserMutation, deleteUserMutation }
}
