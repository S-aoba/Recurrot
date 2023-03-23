import { Link, RichTextEditor } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import type { Dispatch, SetStateAction } from 'react'

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * @package
 */

type ContentProps = {
  id: number
  description: string
  setDescription: Dispatch<SetStateAction<string>>
}

export const Content: React.FC<ContentProps> = ({ id, description, setDescription }) => {
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
    content: id === 0 ? escapeHtml(description) : description,
    onUpdate({ editor }) {
      setDescription(editor.getHTML())
    },
  })

  return (
    <RichTextEditor editor={editor} className=' h-full min-h-fit w-9/12 '>
      <RichTextEditor.Content />
    </RichTextEditor>
  )
}
