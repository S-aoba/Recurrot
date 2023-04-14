import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { RichTextEditor } from '@mantine/tiptap'
import { useAtom, useAtomValue } from 'jotai'
import type { Dispatch, SetStateAction } from 'react'

import { useAnswerForm } from '@/common/hook/useAnswerForm'
import { useMutateAnswer } from '@/common/hook/useMutateAnswer'
import { answerDescriptionAtom, editedAnswerAtom } from '@/store/atom'

import { useDescriptionEditor } from '../../../../common/hook/useDescriptionEditor'
import { Modal } from '../../Modal'

/**
 * @package
 */

type AnswerFormProps = {
  questionId: string
  setIsEdit?: Dispatch<SetStateAction<boolean>>
}

export const UpdateAnswerForm: React.FC<AnswerFormProps> = ({ questionId, setIsEdit }) => {
  const [isOpened, { open: handleOpen, close: handleClose }] = useDisclosure(false)

  const [editedAnswer, setEditedAnswer] = useAtom(editedAnswerAtom)
  const description = useAtomValue(answerDescriptionAtom)

  const { updateAnswerMutation } = useMutateAnswer(questionId)

  const { answerEditor } = useDescriptionEditor()

  const handleSubmit = () => {
    if (editedAnswer.id !== '0' && answerEditor && setIsEdit) {
      setIsEdit(false)
      updateAnswerMutation.mutate({
        id: editedAnswer.id,
        description,
      })
      answerEditor.commands.setContent('')
    }
    setEditedAnswer({ ...editedAnswer, id: '0' })
    handleClose()
  }
  useAnswerForm()

  return (
    <>
      <Modal
        opened={isOpened}
        onClose={handleClose}
        onSubmit={handleSubmit}
        buttonWord='更新する'
        modalTitle='回答を更新する'
      />

      <div className=' w-full'>
        <RichTextEditor editor={answerEditor} className=' h-96 w-full rounded-md bg-white'>
          <RichTextEditor.Content />
        </RichTextEditor>
        <div className=' mt-3 flex justify-end'>
          <Button
            color='blue'
            type='button'
            onClick={handleOpen}
            className=' hover:transform-none'
            disabled={description === ''}
          >
            更新する
          </Button>
        </div>
      </div>
    </>
  )
}
