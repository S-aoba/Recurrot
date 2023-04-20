import { Button } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import { useAtom, useAtomValue } from 'jotai'
import type { Dispatch, FormEvent, SetStateAction } from 'react'
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
  setIsEdit?: Dispatch<SetStateAction<boolean>>
}

export const UpdateAnswerForm: React.FC<AnswerFormProps> = ({ questionId, setIsEdit }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [editedAnswer, _] = useAtom(editedAnswerAtom)
  const description = useAtomValue(answerDescriptionAtom)

  const { updateAnswerMutation } = useMutateAnswer(questionId)

  const { answerEditor } = useDescriptionEditor()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 1秒後にupdateAnswerMutationを実行
    setIsLoading(true)
    setTimeout(() => {
      if (editedAnswer.id !== '0' && answerEditor && setIsEdit) {
        updateAnswerMutation.mutate({
          id: editedAnswer.id,
          description,
        })
        answerEditor.commands.setContent('')
        setIsEdit(false)
        setIsLoading(false)
      }
    }, 1000)
  }
  useAnswerForm()

  return (
    <>
      <form className=' w-full' onSubmit={handleSubmit}>
        <RichTextEditor editor={answerEditor} className=' h-96 w-full rounded-md bg-white'>
          <RichTextEditor.Content />
        </RichTextEditor>
        <div className=' mt-3 flex justify-end'>
          <Button
            color='blue'
            type='submit'
            className=' hover:transform-none'
            disabled={description === ''}
            loading={isLoading}
          >
            {isLoading ? '更新中です' : '更新する'}
          </Button>
        </div>
      </form>
    </>
  )
}
