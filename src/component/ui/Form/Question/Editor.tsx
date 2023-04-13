import { Link } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAtom } from 'jotai'

import { questionDescriptionAtom } from '@/store/question-atom'

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, `'`)
}

export const Editor = () => {
  const [description, setDescription] = useAtom(questionDescriptionAtom)

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
    content: escapeHtml(description),
    onUpdate({ editor }) {
      // ここでeditorの中身が空の時にdescriptionを空にする
      if (editor.getText() === '') {
        setDescription('')
      } else {
        setDescription(editor.getHTML())
      }
    },
  })
  return { questionEditor }
}
