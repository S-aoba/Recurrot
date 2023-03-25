import { Button } from '@mantine/core'
import { Link } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAtom } from 'jotai'
import type { FormEvent } from 'react'

import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { editedQuestionAtom, questionDescriptionAtom } from '@/store/question-atom'

import { Content } from './Content'
import { Title } from './Title'

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

export const QuestionForm = () => {
  const [editedQuestion, setEditedQuestion] = useAtom(editedQuestionAtom)
  const [description, setDescription] = useAtom(questionDescriptionAtom)

  const { createQuestionMutation, updateQuestionMutation } = useMutateQuestion()

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
    content: editedQuestion.id === 0 ? escapeHtml(description) : description,
    onUpdate({ editor }) {
      setDescription(editor.getHTML())
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedQuestion.id === 0 && editor) {
      createQuestionMutation.mutate({
        title: editedQuestion.title,
        description,
      })
      editor.commands.setContent('')
    } else if (editedQuestion.id !== 0 && editor) {
      updateQuestionMutation.mutate({
        id: editedQuestion.id,
        title: editedQuestion.title,
        description,
      })
      editor.commands.setContent('')
    }
  }

  return (
    <form className=' flex h-full w-11/12 flex-col items-center gap-y-5 py-5' onSubmit={handleSubmit}>
      <Title editedQuestion={editedQuestion} setEditedQuestion={setEditedQuestion} />
      <Content editor={editor} />
      <Button color='blue' type='submit' className=' hover:transform-none'>
        {editedQuestion.id === 0 ? '投稿' : '更新'}
      </Button>
    </form>
  )
}
