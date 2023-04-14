import { Link } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAtom } from 'jotai'

import { answerDescriptionAtom, questionDescriptionAtom } from '@/store/atom'

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, `'`)
}

export const useDescriptionEditor = () => {
  const [questionDescription, setQuestionDescription] = useAtom(questionDescriptionAtom)
  const [answerDescription, setAnswerDescription] = useAtom(answerDescriptionAtom)

  const questionEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: escapeHtml(questionDescription),
    onUpdate({ editor }) {
      // ここでeditorの中身が空の時にdescriptionを空にする
      if (editor.getText() === '') {
        setQuestionDescription('')
      } else {
        setQuestionDescription(editor.getHTML())
      }
    },
  })

  const answerEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: escapeHtml(answerDescription),
    onUpdate({ editor }) {
      // ここでeditorの中身が空の時にdescriptionを空にする
      if (editor.getText() === '') {
        setAnswerDescription('')
      } else {
        setAnswerDescription(editor.getHTML())
      }
    },
  })
  return { questionEditor, answerEditor }
}
