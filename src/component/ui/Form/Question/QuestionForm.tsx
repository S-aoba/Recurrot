import { Button } from '@mantine/core'
import { useAtom } from 'jotai'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { editedQuestionAtom } from '@/store/question-atom'

import { Content } from './Content'
import { Title } from './Title'

/**
 * @package
 */

export const QuestionForm = () => {
  // const [question, setQuestion] = useAtom(questionAtom)
  const [editedQuestion, setEditedQuestion] = useAtom(editedQuestionAtom)
  const [_, setContent] = useState<string>('')

  const { createQuestionMutation } = useMutateQuestion()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedQuestion.id === 0)
      createQuestionMutation.mutate({
        title: editedQuestion.title,
        description: editedQuestion.description,
      })
  }

  return (
    <form className=' flex h-full w-11/12 flex-col items-center gap-y-5 py-5' onSubmit={handleSubmit}>
      <Title editedQuestion={editedQuestion} setEditedQuestion={setEditedQuestion} />
      <Content setContent={setContent} />
      <Button color='blue' type='submit'>
        送信
      </Button>
    </form>
  )
}
