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

import { useAnswerForm } from '@/common/hook/useAnswerForm'
import { useMutateAnswer } from '@/common/hook/useMutateAnswer'
import { answerDescriptionAtom, editedAnswerAtom } from '@/store/question-atom'

import { Modal } from '../../Modal'

/**
 * @package
 */

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, `'`)
}

type AnswerFormProps = {
  questionId: string
}

export const CreateAnswerForm: React.FC<AnswerFormProps> = ({ questionId }) => {
  const [isOpened, { open: handleOpen, close: handleClose }] = useDisclosure(false)

  const [editedAnswer, setEditedAnswer] = useAtom(editedAnswerAtom)
  const [description, setDescription] = useAtom(answerDescriptionAtom)

  const { createAnswerMutation } = useMutateAnswer(questionId)

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
    content: escapeHtml(description),
    onUpdate({ editor }) {
      setDescription(editor.getHTML())
    },
  })

  const handleSubmit = () => {
    if (editedAnswer.id === '0' && editor) {
      createAnswerMutation.mutate({
        description,
      })
      editor.commands.setContent('')
    }
    setEditedAnswer({ ...editedAnswer, id: '0' })
    handleClose()
  }

  useAnswerForm(description, editor)

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
        <RichTextEditor editor={editor} className=' h-96 w-full'>
          <RichTextEditor.Content />
        </RichTextEditor>
        <div className=' mt-3 flex justify-end'>
          <Button color='blue' type='button' onClick={handleOpen} className=' hover:transform-none'>
            投稿する
          </Button>
        </div>
      </div>
    </>
  )
}
