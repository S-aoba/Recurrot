import type { NextPage } from 'next'

import type { MyQuestion } from '@/common/type'
import { Card } from '@/component/ui/Card'

/**
 * @package
 */

type PostedQuestionsProps = {
  myQuestionList: MyQuestion[]
}

export const PostedQuestions: NextPage<PostedQuestionsProps> = ({ myQuestionList }) => {
  return (
    <>
      {myQuestionList.map((question: MyQuestion) => {
        return <Card key={question.id} question={question} />
      })}
    </>
  )
}
