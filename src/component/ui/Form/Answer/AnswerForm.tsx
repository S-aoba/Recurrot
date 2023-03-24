import { Button } from '@mantine/core'
import { Link, RichTextEditor } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

/**
 * @package
 */

export const AnswerForm = () => {
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
    content: '',
  })
  return (
    <form className=' w-full'>
      <RichTextEditor editor={editor} className=' h-96 w-full '>
        <RichTextEditor.Content />
      </RichTextEditor>
      <div className=' mt-3 flex justify-end'>
        <Button color='blue' type='submit' className=' hover:transform-none'>
          投稿
        </Button>
      </div>
    </form>
  )
}
