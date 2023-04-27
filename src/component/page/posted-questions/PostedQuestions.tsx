import type { NextPage } from 'next'

import type { MyQuestion } from '@/common/type'
import { Card } from '@/component/ui/Card'

/**
 * @package
 */

type PostedQuestionsProps = {
  postedQuestionList: MyQuestion[]
}

export const PostedQuestions: NextPage<PostedQuestionsProps> = ({ postedQuestionList }) => {
  return (
    <>
      {postedQuestionList.map((question: MyQuestion, index) => {
        return <Card key={question.id} question={question} index={index} />
      })}
    </>
  )
}
