import { useAtom } from 'jotai'

import { useQuestionForm } from '@/common/hook/useQuestionForm'
import { editedQuestionAtom } from '@/store/atom'

import { useDescriptionEditor } from '../../../../common/hook/useDescriptionEditor'
import { Content } from './Content'
import { Hashtag } from './Hashtag'
import { Title } from './Title'

/**
 * @package
 */

export const CreateForm = () => {
  const [editedQuestion, setEditedQuestion] = useAtom(editedQuestionAtom)

  const { questionEditor } = useDescriptionEditor()

  useQuestionForm()

  return (
    <>
      <div className=' flex h-fit w-full flex-col items-center gap-y-5 py-5'>
        <Title editedQuestion={editedQuestion} setEditedQuestion={setEditedQuestion} />
        <Hashtag editedQuestion={editedQuestion} setEditedQuestion={setEditedQuestion} />
        <Content editor={questionEditor} />
      </div>
    </>
  )
}
