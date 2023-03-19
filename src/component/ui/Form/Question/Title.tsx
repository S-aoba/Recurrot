import { TextInput } from '@mantine/core'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

import type { EditedQuestion } from '@/common/type'

/**
 * @package
 */

type TitleProps = {
  editedQuestion: EditedQuestion
  setEditedQuestion: Dispatch<SetStateAction<EditedQuestion>>
}

export const Title: React.FC<TitleProps> = ({ editedQuestion, setEditedQuestion }) => {
  const handleChangeTitle = (evt: ChangeEvent<HTMLInputElement>) => {
    setEditedQuestion({ ...editedQuestion, title: evt.target.value })
  }
  return (
    <TextInput
      placeholder='質問のタイトル'
      variant='filled'
      size='md'
      withAsterisk
      className=' w-9/12'
      onChange={handleChangeTitle}
    />
  )
}
