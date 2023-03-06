import type { FormEvent } from 'react'
import { useState } from 'react'

import type { QuestionType } from '@/common/type'

import { Content } from './Content'
import { Title } from './Title'

/**
 * @package
 */

export const QuestionForm = () => {
  const [question, setQuestion] = useState<QuestionType>({
    questionId: '',
    postedUseId: '',
    title: '',
    content: '',
    postDate: '',
    hashtagList: [],
    answerList: [],
  })

  const [_, setContent] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form className=' flex h-full w-11/12 flex-col items-center gap-y-5 py-5' onSubmit={handleSubmit}>
      <Title question={question} setQuestion={setQuestion} />
      <Content setContent={setContent} />
      <button type='submit'>送信</button>
    </form>
  )
}
