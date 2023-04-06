import { RichTextEditor } from '@mantine/tiptap'
import type { Editor } from '@tiptap/react'

/**
 * @package
 */

type ContentProps = {
  editor: Editor | null
}

export const Content: React.FC<ContentProps> = ({ editor }) => {
  return (
    <RichTextEditor editor={editor} className=' min-h-[400px] w-9/12 '>
      <RichTextEditor.Content />
    </RichTextEditor>
  )
}
