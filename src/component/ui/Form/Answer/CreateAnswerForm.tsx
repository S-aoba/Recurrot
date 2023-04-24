import { Button } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import { useAtom, useAtomValue } from 'jotai'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { useAnswerForm } from '@/common/hook/useAnswerForm'
import { useMutateAnswer } from '@/common/hook/useMutateAnswer'
import { answerDescriptionAtom, editedAnswerAtom } from '@/store/atom'

import { useDescriptionEditor } from '../../../../common/hook/useDescriptionEditor'

/**
 * @package
 */

type AnswerFormProps = {
  questionId: string
}

export const CreateAnswerForm: React.FC<AnswerFormProps> = ({ questionId }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [editedAnswer, _] = useAtom(editedAnswerAtom)
  const description = useAtomValue(answerDescriptionAtom)

  const { createAnswerMutation } = useMutateAnswer(questionId)

  const { answerEditor } = useDescriptionEditor()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // 1秒後にcreateAnswerMutationを実行する
    setTimeout(() => {
      if (editedAnswer.id === '0' && answerEditor) {
        createAnswerMutation.mutate({
          description,
        })
        answerEditor.commands.setContent('')
        setIsLoading(false)
      }
    }, 1000)
  }

  useAnswerForm()

  return (
    <>
      <form className=' w-full' onSubmit={handleSubmit} id='createAnswer'>
        <RichTextEditor editor={answerEditor} className=' h-96 w-full rounded-md border-none bg-white shadow'>
          <RichTextEditor.Content />
        </RichTextEditor>
        <div className=' mt-3 flex justify-end'>
          <Button
            color='blue'
            type='submit'
            className=' bg-mainColor hover:transform-none hover:bg-mainColor'
            disabled={description === ''}
            loading={isLoading}
            form='createAnswer'
          >
            {isLoading ? '回答を投稿中...' : '回答を投稿する'}
          </Button>
        </div>
      </form>
    </>
  )
}
