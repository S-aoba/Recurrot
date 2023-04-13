import { useAtom } from 'jotai'

import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { useQuestionForm } from '@/common/hook/useQuestionForm'
import { editedQuestionAtom, questionDescriptionAtom } from '@/store/question-atom'

import { Modal } from '../../Modal'
import { Content } from './Content'
import { Editor } from './Editor'
import { Hashtag } from './Hashtag'
import { Title } from './Title'

/**
 * @package
 */

type QuestionFormProps = {
  isOpened: boolean
  onHandleClose: () => void
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ isOpened, onHandleClose: handleClose }) => {
  const [editedQuestion, setEditedQuestion] = useAtom(editedQuestionAtom)

  const [description, _] = useAtom(questionDescriptionAtom)

  const { createQuestionMutation, updateQuestionMutation } = useMutateQuestion()

  const { questionEditor } = Editor()

  const handleSubmit = () => {
    if (editedQuestion.id === '0' && questionEditor) {
      createQuestionMutation.mutate({
        title: editedQuestion.title,
        description,
        hashtags: editedQuestion.hashtags,
      })
      questionEditor.commands.setContent('')
    } else if (editedQuestion.id !== '0' && questionEditor) {
      updateQuestionMutation.mutate({
        id: editedQuestion.id,
        title: editedQuestion.title,
        description,
        hashtags: editedQuestion.hashtags,
      })
      questionEditor.commands.setContent('')
    }
  }

  useQuestionForm()

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
        <Content editor={questionEditor} />
      </div>
    </>
  )
}
