import type { User } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { UserType } from '../type'

export const useMutateUser = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const updateReadAnswerMutation = useMutation({
    mutationKey: ['user'],
    mutationFn: async (answerId: string) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/read-answer/${answerId}`)
      return res.data
    },
    onSuccess: (res: UserType) => {
      const previousUser = queryClient.getQueryData<User>(['user'])

      if (previousUser) {
        queryClient.setQueryData(['user'], res)
      }
      queryClient.invalidateQueries(['answers'])
      queryClient.invalidateQueries(['questions'])
      queryClient.invalidateQueries(['singleQuestion'])
      queryClient.invalidateQueries(['user'])
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    },
  })

  const updateUserMutation = useMutation({
    mutationKey: ['user'],
    mutationFn: async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'email' | 'hashedPassword'>) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user`, user)
      return res.data
    },
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
  })

  const deleteUserMutation = useMutation({
    mutationKey: ['user'],
    mutationFn: async () => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user`)
    },
    onSuccess: () => {
      queryClient.removeQueries(['user'])
      router.push('/')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    },
  })

  return { updateUserMutation, deleteUserMutation, updateReadAnswerMutation }
}
