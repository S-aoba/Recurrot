import { TextInput } from '@mantine/core'
import { Link, RichTextEditor } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAtom } from 'jotai'

import { questionAtom } from '@/store/question-atom'

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const QuestionForm = () => {
  const [content, setContent] = useAtom(questionAtom)
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
    content: escapeHtml(''),
    onUpdate({ editor }) {
      setContent({ ...content, content: editor.getHTML() })
    },
  })

  return (
    <div className=' flex h-full w-11/12 flex-col items-center gap-y-5 py-5'>
      <TextInput placeholder='質問のタイトル' variant='filled' size='md' withAsterisk className=' w-9/12' />
      <RichTextEditor editor={editor} className=' h-full min-h-fit w-9/12 '>
        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  )
}
