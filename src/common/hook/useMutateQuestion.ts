import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import { resetEditedQuestionAtom, resetQuestionDescriptionAtom } from '@/store/atom'

import type { EditedQuestion, NewQuestion } from '../type'

export const useMutateQuestion = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [, resetEditedQuestion] = useAtom(resetEditedQuestionAtom)
  const [, resetDescription] = useAtom(resetQuestionDescriptionAtom)

  const createQuestionMutation = useMutation({
    mutationKey: ['new-question-list'],
    mutationFn: async (question: Omit<EditedQuestion, 'id'>) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/question`, question)
      return res.data
    },
    onSuccess: (res: NewQuestion) => {
      const previousQuestionList = queryClient.getQueryData<NewQuestion[]>(['new-question-list'])
      if (previousQuestionList) {
        queryClient.setQueriesData(['new-question-list'], [res, ...previousQuestionList])
      }
      router.push(`/dashboard/questions/${res.id}`)
      resetEditedQuestion()
      resetDescription()
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
        resetEditedQuestion()
        resetDescription()
      }
    },
  })

  const updateQuestionMutation = useMutation({
    mutationKey: ['new-question-list'],
    mutationFn: async (question: EditedQuestion) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/question/${question.id}`, question)
      return res.data
    },
    onSuccess: (res: NewQuestion) => {
      const previousQuestionList = queryClient.getQueryData<NewQuestion[]>(['new-question-list'])
      if (previousQuestionList) {
        queryClient.setQueryData(
          ['new-question-list'],
          previousQuestionList.map((question) => {
            return question.id === res.id ? res : question
          })
        )
      }
      router.push(`/dashboard/questions/${res.id}`)

      queryClient.invalidateQueries(['singleQuestion', res.id])
      queryClient.invalidateQueries(['my-question-list'])
      queryClient.invalidateQueries(['my-answered-question-list'])

      resetEditedQuestion()
      resetDescription()
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        resetEditedQuestion()
        resetDescription()
        router.push('/')
      }
    },
  })

  const deleteQuestionMutation = useMutation({
    mutationKey: ['new-question-list'],
    mutationFn: async (questionId: string) => {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/question/${questionId}`)
      return res.data
    },
    onSuccess: (_, variables) => {
      const previousQuestionList = queryClient.getQueryData<NewQuestion[]>(['new-question-list'])
      if (previousQuestionList) {
        queryClient.setQueryData(
          ['new-question-list'],
          previousQuestionList.filter((question) => {
            return question.id !== variables
          })
        )
      }
      router.push('/dashboard/new-questions')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    },
  })

  return { createQuestionMutation, updateQuestionMutation, deleteQuestionMutation }
}
