import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import type { Dispatch, SetStateAction } from 'react'

import { useDescriptionEditor } from '@/common/hook/useDescriptionEditor'
import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { editedQuestionAtom, questionDescriptionAtom, resetQuestionAtom } from '@/store/atom'

/**
 * @package
 */

type UsePostProps = {
  setIsCreateQuestionLoading: Dispatch<SetStateAction<boolean>>
}

export const usePost = ({ setIsCreateQuestionLoading }: UsePostProps) => {
  const router = useRouter()

  const resetEditedQuestion = useSetAtom(resetQuestionAtom)
  const editedQuestion = useAtomValue(editedQuestionAtom)
  const description = useAtomValue(questionDescriptionAtom)

  const { createQuestionMutation } = useMutateQuestion()
  const { questionEditor } = useDescriptionEditor()

  const handleDiscardChangesAndRedirectToPostedQuestions = () => {
    if (editedQuestion.title !== '' || editedQuestion.hashtags.length !== 0 || description) {
      const isOk = window.confirm('入力した内容は破棄されます。よろしいですか？')
      if (isOk) {
        resetEditedQuestion()
        router.push('/dashboard/posted-questions')
        return
      }
      return
    }
    router.push('/dashboard/posted-questions')
    return
  }

  const handleCreateQuestion = () => {
    // 1秒後にcreateQuestionMutationを実行する
    setIsCreateQuestionLoading(true)
    setTimeout(() => {
      if (questionEditor) {
        createQuestionMutation.mutate({
          title: editedQuestion.title,
          hashtags: editedQuestion.hashtags,
          description,
        })
        setIsCreateQuestionLoading(false)
      }
    }, 500)
  }

  return { handleDiscardChangesAndRedirectToPostedQuestions, handleCreateQuestion }
}
