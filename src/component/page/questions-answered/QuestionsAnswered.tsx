import type { NextPage } from 'next'

import type { MyAnswer } from '@/common/type'
import { Card } from '@/component/ui/Card'

/**
 * @package
 */

type QuestionsAnsweredProps = {
  questions: MyAnswer[]
}

export const QuestionsAnswered: NextPage<QuestionsAnsweredProps> = ({ questions }) => {
  return (
    <>
      {questions.map((question: MyAnswer) => {
        return <Card key={question.title} question={question} />
      })}
    </>
  )
}
