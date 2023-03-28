import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import { resetEditedQuestionAtom, resetQuestionDescriptionAtom } from '@/store/question-atom'

import type { EditedQuestion, QuestionAndAnswerIdListType } from '../type'

export const useMutateQuestion = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [, resetEditedQuestion] = useAtom(resetEditedQuestionAtom)
  const [, resetDescription] = useAtom(resetQuestionDescriptionAtom)

  const createQuestionMutation = useMutation(
    ['questions'],
    async (question: Omit<EditedQuestion, 'id'>) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/question`, question)
      return res.data
    },
    {
      onSuccess: (res: QuestionAndAnswerIdListType) => {
        const previousQuestions = queryClient.getQueryData<QuestionAndAnswerIdListType[]>(['questions'])
        if (previousQuestions) {
          queryClient.setQueriesData(['questions'], [res, ...previousQuestions])
        }
        resetEditedQuestion()
        resetDescription()
        router.push('/dashboard/new-questions')
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          resetEditedQuestion()
          resetDescription()
          router.push('/')
        }
      },
    }
  )

  const updateQuestionMutation = useMutation(
    ['questions'],
    async (question: EditedQuestion) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/question/${question.id}`, question)
      return res.data
    },
    {
      onSuccess: (res: QuestionAndAnswerIdListType) => {
        const previousQuestion = queryClient.getQueryData<QuestionAndAnswerIdListType[]>(['questions'])
        if (previousQuestion) {
          queryClient.setQueryData(
            ['questions'],
            previousQuestion.map((question) => {
              return question.id === res.id ? res : question
            })
          )
        }
        resetEditedQuestion()
        resetDescription()
        queryClient.invalidateQueries(['singleQuestion', res.id])
        router.push('/dashboard/new-questions')
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          resetEditedQuestion()
          resetDescription()
          router.push('/')
        }
      },
    }
  )

  const deleteQuestionMutation = useMutation(
    ['questions'],
    async (questionId: string) => {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/question/${questionId}`)
      return res.data
    },
    {
      onSuccess: (_, variables) => {
        const previousQuestion = queryClient.getQueryData<QuestionAndAnswerIdListType[]>(['questions'])
        if (previousQuestion) {
          queryClient.setQueryData(
            ['questions'],
            previousQuestion.filter((question) => {
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
    }
  )

  return { createQuestionMutation, updateQuestionMutation, deleteQuestionMutation }
}
