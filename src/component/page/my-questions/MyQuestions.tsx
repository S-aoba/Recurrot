import type { NextPage } from 'next'

import type { MyQuestion } from '@/common/type'
import { Card } from '@/component/ui/Card'

/**
 * @package
 */

type MyQuestionsProps = {
  myQuestionList: MyQuestion[]
}

export const MyQuestions: NextPage<MyQuestionsProps> = ({ myQuestionList }) => {
  return (
    <>
      {myQuestionList.map((question: MyQuestion) => {
        return <Card key={question.id} question={question} />
      })}
    </>
  )
}
