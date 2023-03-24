import type { Answer } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'

import { editedAnswerAtom, initialEditedAnswer } from '@/store/question-atom'

import type { EditedAnswer } from '../type'

export const useMutateAnswer = (questionId: number) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const setResetEditedAnswer = useSetAtom(editedAnswerAtom)

  const createAnswerMutation = useMutation(
    ['answers'],
    async (answer: Omit<EditedAnswer, 'id'>) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/answer/${questionId}`, answer)
      return res.data
    },
    {
      onSuccess: (res: Answer) => {
        const previousAnswers = queryClient.getQueryData<Answer[]>(['answers'])
        if (previousAnswers) {
          queryClient.setQueriesData(['answers'], [res, ...previousAnswers])
        }
        queryClient.invalidateQueries(['answers'])
        router.push(`/dashboard/questions/${questionId}`)
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  const updateAnswerMutation = useMutation(
    ['answers'],
    async (answer: EditedAnswer) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/answer/${answer.id}`, answer)
      return res.data
    },
    {
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
        setResetEditedAnswer(initialEditedAnswer)
        router.push(`/dashboard/questions/${questionId}`)
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          setResetEditedAnswer(initialEditedAnswer)
          router.push('/')
        }
      },
    }
  )
  return { createAnswerMutation, updateAnswerMutation }
}
