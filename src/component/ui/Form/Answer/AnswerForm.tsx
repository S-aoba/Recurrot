import { Button } from '@mantine/core'
import { Link, RichTextEditor } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAtom, useAtomValue } from 'jotai'

import { useMutateAnswer } from '@/common/hook/useMutateAnswer'
import { descriptionAtom, editedAnswerAtom } from '@/store/question-atom'

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
  questionId: number
}

export const AnswerForm: React.FC<AnswerFormProps> = ({ questionId }) => {
  const editedAnswer = useAtomValue(editedAnswerAtom)
  const [description, setDescription] = useAtom(descriptionAtom)

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
    content: editedAnswer.id === 0 ? escapeHtml(description) : description,
    onUpdate({ editor }) {
      setDescription(editor.getHTML())
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedAnswer.id === 0) {
      createAnswerMutation.mutate({
        description,
      })
    }
  }

  return (
    <form className=' w-full' onSubmit={handleSubmit}>
      <RichTextEditor editor={editor} className=' h-96 w-full '>
        <RichTextEditor.Content />
      </RichTextEditor>
      <div className=' mt-3 flex justify-end'>
        <Button color='blue' type='submit' className=' hover:transform-none'>
          {editedAnswer.id === 0 ? '投稿' : '更新'}
        </Button>
      </div>
    </form>
  )
}
