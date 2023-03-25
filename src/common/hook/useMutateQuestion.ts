import type { Question } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import { resetEditedQuestionAtom, resetQuestionDescriptionAtom } from '@/store/question-atom'

import type { EditedQuestion } from '../type'

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
      onSuccess: (res: Question) => {
        const previousQuestions = queryClient.getQueryData<Question[]>(['questions'])
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
      onSuccess: (res: Question) => {
        const previousQuestion = queryClient.getQueryData<Question[]>(['questions'])
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
  return { createQuestionMutation, updateQuestionMutation }
}
