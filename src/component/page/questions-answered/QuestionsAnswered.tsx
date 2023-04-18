import type { NextPage } from 'next'

import type { MyAnswer } from '@/common/type'
import { Card } from '@/component/ui/Card'

/**
 * @package
 */

type QuestionsAnsweredProps = {
  questionList: MyAnswer[]
}

export const QuestionsAnswered: NextPage<QuestionsAnsweredProps> = ({ questionList }) => {
  return (
    <>
      {questionList.map((question: MyAnswer) => {
        return <Card key={question.title} question={question} />
      })}
    </>
  )
}
