import { MultiSelect } from '@mantine/core'
import type { Dispatch, SetStateAction } from 'react'

import type { EditedQuestion } from '@/common/type'

// {value: 'react', label: 'React'}この型の配列の変数を主要なプログラミング言語15個分作る
const data = [
  { value: 'c', label: 'C' },
  { value: 'c++', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'php', label: 'PHP' },
  { value: 'python', label: 'Python' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'go', label: 'Go' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'rust', label: 'Rust' },
  { value: 'react', label: 'React' },
  { value: 'next.js', label: 'Next.js' },
]

type HashTagProps = {
  editedQuestion: EditedQuestion
  setEditedQuestion: Dispatch<SetStateAction<EditedQuestion>>
}

export const Hashtag: React.FC<HashTagProps> = ({ editedQuestion, setEditedQuestion }) => {
  const handleSetHashTag = (value: string[]) => {
    setEditedQuestion({ ...editedQuestion, hashtags: value })
  }

  return (
    <MultiSelect
      data={data}
      placeholder='ハッシュタグを最大5つまで選択できます'
      searchable
      nothingFound='Nothing found'
      clearable
      withAsterisk
      maxSelectedValues={5}
      className=' w-9/12'
      value={editedQuestion.hashtags}
      onChange={handleSetHashTag}
    />
  )
}
