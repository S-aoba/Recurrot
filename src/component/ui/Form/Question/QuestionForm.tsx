import { Button } from '@mantine/core'
import { useAtom } from 'jotai'
import type { FormEvent } from 'react'

import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { descriptionAtom, editedQuestionAtom } from '@/store/question-atom'

import { Content } from './Content'
import { Title } from './Title'

/**
 * @package
 */

export const QuestionForm = () => {
  const [editedQuestion, setEditedQuestion] = useAtom(editedQuestionAtom)
  const [description, setDescription] = useAtom(descriptionAtom)

  const { createQuestionMutation } = useMutateQuestion()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedQuestion.id === 0)
      createQuestionMutation.mutate({
        title: editedQuestion.title,
        description,
      })
  }
  return (
    <form className=' flex h-full w-11/12 flex-col items-center gap-y-5 py-5' onSubmit={handleSubmit}>
      <Title editedQuestion={editedQuestion} setEditedQuestion={setEditedQuestion} />
      <Content id={editedQuestion.id} description={description} setDescription={setDescription} />
      <Button color='blue' type='submit'>
        送信
      </Button>
    </form>
  )
}
