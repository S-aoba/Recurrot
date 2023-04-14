import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import { resetAnswerDescriptionAtom } from '@/store/atom'

import type { AnswerType, EditedAnswer } from '../type'

export const useMutateAnswer = (questionId: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [, resetDescription] = useAtom(resetAnswerDescriptionAtom)

  const createAnswerMutation = useMutation({
    mutationKey: ['answer-list'],
    mutationFn: async (answer: Omit<EditedAnswer, 'id'>) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/answer/${questionId}`, answer)
      return res.data
    },
    onSuccess: (res: AnswerType) => {
      const previousAnswerList = queryClient.getQueryData<AnswerType[]>(['answer-list'])
      if (previousAnswerList) {
        queryClient.setQueriesData(['answer-list'], [res, ...previousAnswerList])
      }
      resetDescription()
      queryClient.invalidateQueries(['answer-list'])
      queryClient.invalidateQueries(['notification-list'])
      queryClient.invalidateQueries(['my-answered-question-list'])
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
    mutationKey: ['answer-list'],
    mutationFn: async (answer: EditedAnswer) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/answer/${answer.id}`, answer)
      return res.data
    },
    onSuccess: (res: AnswerType) => {
      const previousAnswerList = queryClient.getQueryData<AnswerType[]>(['answer-list'])
      if (previousAnswerList) {
        queryClient.setQueryData(
          ['answer-list'],
          previousAnswerList.map((answer) => {
            return answer.id === res.id ? res : answer
          })
        )
      }
      queryClient.invalidateQueries(['answer-list'])
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
    mutationKey: ['answer-list'],
    mutationFn: async (answerId: string) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/answer/${answerId}`)
    },
    onSuccess: (_, variables) => {
      const previousAnswers = queryClient.getQueryData<AnswerType[]>(['answer-list'])
      if (previousAnswers) {
        queryClient.setQueryData(
          ['answer-list'],
          previousAnswers.filter((answer) => {
            return answer.id !== variables
          })
        )
      }
      queryClient.invalidateQueries(['answer-list'])
      queryClient.invalidateQueries(['my-answered-question-list'])
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
