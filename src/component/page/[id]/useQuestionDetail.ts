import { useAtom, useSetAtom } from 'jotai'
import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'

import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import type { SingleQuestion } from '@/common/type'
import { editedQuestionAtom, questionDescriptionAtom } from '@/store/atom'

/**
 * @package
 */

type UseQuestionDetailProps = {
  question: SingleQuestion
  setIsDeleteQuestionLoading: Dispatch<SetStateAction<boolean>>
  handleDeleteQuestionClose: () => void
}

export const useQuestionDetail = ({
  question,
  setIsDeleteQuestionLoading,
  handleDeleteQuestionClose,
}: UseQuestionDetailProps) => {
  const setDescription = useSetAtom(questionDescriptionAtom)
  const [editedQuestion, setEditedQuestion] = useAtom(editedQuestionAtom)

  const { deleteQuestionMutation } = useMutateQuestion()

  const handleSetQuestion = () => {
    setDescription(question.description)
    setEditedQuestion({
      ...editedQuestion,
      id: question.id,
      title: question.title,
      hashtags: question.hashtags,
      codingProblem: question.codingProblem,
    })
  }

  const handleDeleteQuestion = () => {
    setIsDeleteQuestionLoading(true)
    setTimeout(() => {
      deleteQuestionMutation.mutate(question.id)
      setIsDeleteQuestionLoading(false)
      handleDeleteQuestionClose()
      toast.success('質問を削除しました')
    }, 500)
  }

  return { handleSetQuestion, handleDeleteQuestion }
}
