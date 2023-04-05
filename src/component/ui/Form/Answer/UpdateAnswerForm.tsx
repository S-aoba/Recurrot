import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link, RichTextEditor } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAtom } from 'jotai'
import type { Dispatch, SetStateAction } from 'react'

import { useMutateAnswer } from '@/common/hook/useMutateAnswer'
import { answerDescriptionAtom, editedAnswerAtom } from '@/store/question-atom'

import { Modal } from '../../Modal'

/**
 * @package
 */

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

type AnswerFormProps = {
  questionId: string
  setIsEdit?: Dispatch<SetStateAction<boolean>>
  answerId: string
}

export const UpdateAnswerForm: React.FC<AnswerFormProps> = ({ questionId, setIsEdit, answerId }) => {
  const [isOpened, { open: handleOpen, close: handleClose }] = useDisclosure(false)

  const [editedAnswer, setEditedAnswer] = useAtom(editedAnswerAtom)
  const [description, setDescription] = useAtom(answerDescriptionAtom)

  const { updateAnswerMutation } = useMutateAnswer(questionId)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: editedAnswer.id === '0' ? escapeHtml(description) : description,
    onUpdate({ editor }) {
      setDescription(editor.getHTML())
    },
    onFocus() {
      setEditedAnswer({ ...editedAnswer, id: answerId })
    },
  })

  const handleSubmit = () => {
    if (editedAnswer.id !== '0' && editor && setIsEdit) {
      setIsEdit(false)
      updateAnswerMutation.mutate({
        id: editedAnswer.id,
        description,
      })
      editor.commands.setContent('')
    }
    setEditedAnswer({ ...editedAnswer, id: '0' })
    handleClose()
  }

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
        <RichTextEditor editor={editor} className=' h-96 w-full'>
          <RichTextEditor.Content />
        </RichTextEditor>
        <div className=' mt-3 flex justify-end'>
          <Button color='blue' type='button' onClick={handleOpen} className=' hover:transform-none'>
            更新する
          </Button>
        </div>
      </div>
    </>
  )
}
