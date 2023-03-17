import { useAtom } from 'jotai'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { Button } from '@/lib/mantine'
import { initialQuestion, questionAtom } from '@/store/question-atom'

import { Content } from './Content'
import { Title } from './Title'

/**
 * @package
 */

export const QuestionForm = () => {
  const [question, setQuestion] = useAtom(questionAtom)
  const [_, setContent] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuestion(initialQuestion)
  }

  return (
    <form className=' flex h-full w-11/12 flex-col items-center gap-y-5 py-5' onSubmit={handleSubmit}>
      <Title question={question} setQuestion={setQuestion} />
      <Content setContent={setContent} />
      <Button color='blue'>送信</Button>
    </form>
  )
}
