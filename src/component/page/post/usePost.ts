import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'

import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { editedQuestionAtom, questionDescriptionAtom } from '@/store/atom'

/**
 * @package
 */

type UsePostProps = {
  setIsCreateQuestionLoading: Dispatch<SetStateAction<boolean>>
}

export const usePost = ({ setIsCreateQuestionLoading }: UsePostProps) => {
  const router = useRouter()

  const editedQuestion = useAtomValue(editedQuestionAtom)
  const description = useAtomValue(questionDescriptionAtom)

  const { createQuestionMutation } = useMutateQuestion()

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

  const handleCreateQuestion = () => {
    // 1秒後にcreateQuestionMutationを実行する
    setIsCreateQuestionLoading(true)
    setTimeout(() => {
      createQuestionMutation.mutate({
        title: editedQuestion.title,
        hashtags: editedQuestion.hashtags,
        description,
      })
      toast.success('質問を投稿しました')
    }, 500)
  }

  return { handleDiscardChangesAndRedirectToPostedQuestions, handleCreateQuestion }
}
