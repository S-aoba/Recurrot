import { Link } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAtom } from 'jotai'

import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { useQuestionForm } from '@/common/hook/useQuestionForm'
import { editedQuestionAtom, questionDescriptionAtom } from '@/store/question-atom'

import { Modal } from '../../Modal'
import { Content } from './Content'
import { Hashtag } from './Hashtag'
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

type QuestionFormProps = {
  isOpened: boolean
  onHandleClose: () => void
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ isOpened, onHandleClose: handleClose }) => {
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
    content: editedQuestion.id === '0' ? escapeHtml(description) : description,
    onUpdate({ editor }) {
      setDescription(editor.getHTML())
    },
  })

  const handleSubmit = () => {
    if (editedQuestion.id === '0' && editor) {
      createQuestionMutation.mutate({
        title: editedQuestion.title,
        description,
        hashtags: editedQuestion.hashtags,
      })
      editor.commands.setContent('')
    } else if (editedQuestion.id !== '0' && editor) {
      updateQuestionMutation.mutate({
        id: editedQuestion.id,
        title: editedQuestion.title,
        description,
        hashtags: editedQuestion.hashtags,
      })
      editor.commands.setContent('')
    }
  }

  useQuestionForm(editedQuestion, description, editor)

  return (
    <>
      <Modal
        opened={isOpened}
        onClose={handleClose}
        onSubmit={handleSubmit}
        buttonWord={editedQuestion.id === '0' ? '投稿する' : '更新する'}
        modalTitle={editedQuestion.id === '0' ? 'Recurrotに投稿する' : '質問を更新する'}
      />

      <div className=' flex h-fit w-full flex-col items-center gap-y-5 py-5'>
        <Title editedQuestion={editedQuestion} setEditedQuestion={setEditedQuestion} />
        <Hashtag editedQuestion={editedQuestion} setEditedQuestion={setEditedQuestion} />
        <Content editor={editor} />
      </div>
    </>
  )
}
