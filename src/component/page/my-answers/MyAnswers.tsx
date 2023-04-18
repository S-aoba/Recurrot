import type { NextPage } from 'next'

import type { MyAnswer } from '@/common/type'
import { Card } from '@/component/ui/Card'

/**
 * @package
 */

type MyAnswersProps = {
  questions: MyAnswer[]
}

export const MyAnswers: NextPage<MyAnswersProps> = ({ questions }) => {
  return (
    <>
      {questions.map((question: MyAnswer) => {
        return <Card key={question.title} question={question} />
      })}
    </>
  )
}
