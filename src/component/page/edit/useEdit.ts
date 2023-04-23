import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import type { Dispatch, FormEvent, SetStateAction } from 'react'

import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { editedQuestionAtom, questionDescriptionAtom } from '@/store/atom'

/**
 * @package
 */

type UseEditProps = {
  setIsUpdateQuestionLoading: Dispatch<SetStateAction<boolean>>
}

export const useEdit = ({ setIsUpdateQuestionLoading }: UseEditProps) => {
  const router = useRouter()

  const editedQuestion = useAtomValue(editedQuestionAtom)
  const description = useAtomValue(questionDescriptionAtom)

  const { updateQuestionMutation } = useMutateQuestion()

  const handleDiscardChangesAndRedirectToPostedQuestions = () => {
    if (editedQuestion.title !== '' || editedQuestion.hashtags.length !== 0 || description) {
      const isOk = window.confirm('入力した内容は破棄されます。よろしいですか？')
      if (isOk) {
        router.push('/dashboard/posted-questions')
        return
      }
      return
    }
    router.push('/dashboard/posted-questions')
    return
  }

  const handleUpdateQuestion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUpdateQuestionLoading(true)
    if (editedQuestion.id !== '0') {
      setTimeout(() => {
        updateQuestionMutation.mutate({
          id: editedQuestion.id,
          title: editedQuestion.title,
          description,
          hashtags: editedQuestion.hashtags,
        })
      }, 500)
    }
  }

  return { handleDiscardChangesAndRedirectToPostedQuestions, handleUpdateQuestion }
}
