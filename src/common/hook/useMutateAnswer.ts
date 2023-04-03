import type { Answer } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import { resetAnswerDescriptionAtom } from '@/store/question-atom'

import type { EditedAnswer } from '../type'

export const useMutateAnswer = (questionId: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [, resetDescription] = useAtom(resetAnswerDescriptionAtom)

  const createAnswerMutation = useMutation({
    mutationKey: ['answers'],
    mutationFn: async (answer: Omit<EditedAnswer, 'id'>) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/answer/${questionId}`, answer)
      return res.data
    },
    onSuccess: (res: Answer) => {
      const previousAnswers = queryClient.getQueryData<Answer[]>(['answers'])
      if (previousAnswers) {
        queryClient.setQueriesData(['answers'], [res, ...previousAnswers])
      }
      queryClient.invalidateQueries(['answers'])
      queryClient.invalidateQueries(['questions'])
      queryClient.invalidateQueries(['singleQuestion'])
      queryClient.invalidateQueries(['user'])
      resetDescription()
      router.push(`/dashboard/questions/${questionId}`)
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        resetDescription()
        router.push('/')
      }
    },
  })

  const updateAnswerMutation = useMutation({
    mutationKey: ['answers'],
    mutationFn: async (answer: EditedAnswer) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/answer/${answer.id}`, answer)
      return res.data
    },
    onSuccess: (res: Answer) => {
      const previousAnswer = queryClient.getQueryData<Answer[]>(['answers'])
      if (previousAnswer) {
        queryClient.setQueryData(
          ['answers'],
          previousAnswer.map((answer) => {
            return answer.id === res.id ? res : answer
          })
        )
      }
      queryClient.invalidateQueries(['answers'])
      resetDescription()
      router.push(`/dashboard/questions/${questionId}`)
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        resetDescription()
        router.push('/')
      }
    },
  })

  const deleteAnswerMutation = useMutation({
    mutationKey: ['answers'],
    mutationFn: async (answerId: string) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/answer/${answerId}`)
    },
    onSuccess: (_, variables) => {
      const previousAnswers = queryClient.getQueryData<Answer[]>(['answers'])
      if (previousAnswers) {
        queryClient.setQueryData(
          ['answers'],
          previousAnswers.filter((answer) => {
            return answer.id !== variables
          })
        )
      }
      queryClient.invalidateQueries(['answers'])
      queryClient.invalidateQueries(['userAnswers'])
      resetDescription()
      router.push(`/dashboard/questions/${questionId}`)
    },
    onError: (err: any) => {
      resetDescription()
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    },
  })

  return { createAnswerMutation, updateAnswerMutation, deleteAnswerMutation }
}
