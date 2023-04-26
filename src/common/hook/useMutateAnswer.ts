import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

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
      router.push(`/dashboard/questions/${questionId}`)

      queryClient.invalidateQueries(['answer-list'])
      queryClient.invalidateQueries(['notification-list'])
      queryClient.invalidateQueries(['questionList-answered'])
      queryClient.invalidateQueries(['question-waiting-answered'])

      resetDescription()

      toast.success('回答を投稿しました')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')

        resetDescription()

        toast.error('回答の投稿に失敗しました')
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
      router.push(`/dashboard/questions/${questionId}`)

      queryClient.invalidateQueries(['answer-list'])

      resetDescription()

      toast.success('回答を更新しました')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')

        resetDescription()

        toast.error('回答の更新に失敗しました')
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
      router.push(`/dashboard/questions/${questionId}`)

      queryClient.invalidateQueries(['answer-list'])
      queryClient.invalidateQueries(['questionList-answered'])
      queryClient.invalidateQueries(['notification-list'])
      queryClient.invalidateQueries(['question-waiting-answered'])

      resetDescription()

      toast.success('回答を削除しました')
    },
    onError: (err: any) => {
      resetDescription()
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
        toast.error('回答の削除に失敗しました')
      }
    },
  })

  return { createAnswerMutation, updateAnswerMutation, deleteAnswerMutation }
}
