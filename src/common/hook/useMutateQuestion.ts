import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { resetEditedQuestionAtom, resetQuestionDescriptionAtom } from '@/store/atom'

import type { EditedQuestion, NewQuestion } from '../type'
import { useDescriptionEditor } from './useDescriptionEditor'

export const useMutateQuestion = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [, resetEditedQuestion] = useAtom(resetEditedQuestionAtom)
  const [, resetDescription] = useAtom(resetQuestionDescriptionAtom)
  const { questionEditor } = useDescriptionEditor()

  const createQuestionMutation = useMutation({
    mutationKey: ['new-question-list'],
    mutationFn: async (question: Omit<EditedQuestion, 'id'>) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/question`, question)
      return res.data
    },
    onSuccess: async (res: NewQuestion) => {
      const previousQuestionList = queryClient.getQueryData<NewQuestion[]>(['new-question-list'])
      if (previousQuestionList) {
        queryClient.setQueriesData(['new-question-list'], [res, ...previousQuestionList])
      }
      await router.push(`/dashboard/questions/${res.id}`)
      resetEditedQuestion()
      resetDescription()
      questionEditor?.commands.setContent('')

      toast.success('質問を投稿しました')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
        resetEditedQuestion()
        resetDescription()
        toast.success('質問の投稿に失敗しました')
      }
    },
  })

  const updateQuestionMutation = useMutation({
    mutationKey: ['new-question-list'],
    mutationFn: async (question: EditedQuestion) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/question/${question.id}`, question)
      return res.data
    },
    onSuccess: async (res: NewQuestion) => {
      const previousQuestionList = queryClient.getQueryData<NewQuestion[]>(['new-question-list'])
      if (previousQuestionList) {
        queryClient.setQueryData(
          ['new-question-list'],
          previousQuestionList.map((question) => {
            return question.id === res.id ? res : question
          })
        )
      }
      await router.push(`/dashboard/questions/${res.id}`)

      queryClient.invalidateQueries(['singleQuestion', res.id])
      queryClient.invalidateQueries(['posted-question-list'])
      queryClient.invalidateQueries(['questionList-answered'])

      resetEditedQuestion()
      resetDescription()
      questionEditor?.commands.setContent('')

      toast.success('質問を更新しました')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
        resetEditedQuestion()
        resetDescription()
        toast.success('質問の更新に失敗しました')
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

      queryClient.invalidateQueries(['posted-question-list'])
      queryClient.invalidateQueries(['questionList-answered'])

      toast.success('質問を削除しました')
    },
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
        toast.success('質問の削除に失敗しました')
      }
    },
  })

  return { createQuestionMutation, updateQuestionMutation, deleteQuestionMutation }
}
