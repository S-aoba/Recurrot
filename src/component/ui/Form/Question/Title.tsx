import { TextInput } from '@mantine/core'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

import type { EditedQuestion } from '@/common/type'

/**
 * @package
 */

type TitleProps = {
  question: EditedQuestion
  setQuestion: Dispatch<SetStateAction<EditedQuestion>>
}

export const Title: React.FC<TitleProps> = ({ question, setQuestion }) => {
  const handleChangeTitle = (evt: ChangeEvent<HTMLInputElement>) => {
    setQuestion({ ...question, title: evt.target.value })
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
