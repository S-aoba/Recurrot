import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { RichTextEditor } from '@mantine/tiptap'
import { useAtom, useAtomValue } from 'jotai'

import { useAnswerForm } from '@/common/hook/useAnswerForm'
import { useMutateAnswer } from '@/common/hook/useMutateAnswer'
import { answerDescriptionAtom, editedAnswerAtom } from '@/store/question-atom'

import { useDescriptionEditor } from '../../../../common/hook/useDescriptionEditor'
import { Modal } from '../../Modal'

/**
 * @package
 */

type AnswerFormProps = {
  questionId: string
}

export const CreateAnswerForm: React.FC<AnswerFormProps> = ({ questionId }) => {
  const [isOpened, { open: handleOpen, close: handleClose }] = useDisclosure(false)

  const [editedAnswer, setEditedAnswer] = useAtom(editedAnswerAtom)
  const description = useAtomValue(answerDescriptionAtom)

  const { createAnswerMutation } = useMutateAnswer(questionId)

  const { answerEditor } = useDescriptionEditor()

  const handleSubmit = () => {
    if (editedAnswer.id === '0' && answerEditor) {
      createAnswerMutation.mutate({
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
        buttonWord='回答する'
        modalTitle='回答を投稿する'
      />

      <div className=' w-full'>
        <RichTextEditor editor={answerEditor} className=' h-96 w-full rounded-md border-none bg-white shadow'>
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
            投稿する
          </Button>
        </div>
      </div>
    </>
  )
}
