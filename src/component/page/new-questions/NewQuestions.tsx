import type { NextPage } from 'next'

import type { NewQuestion } from '@/common/type'
import { Card } from '@/component/ui/Card'

/**
 * @package
 */

type NewQuestionsProps = {
  newQuestionList: NewQuestion[]
}

export const NewQuestions: NextPage<NewQuestionsProps> = ({ newQuestionList }) => {
  return (
    <>
      {newQuestionList.map((newQuestion: NewQuestion, index) => {
        return <Card key={newQuestion.id} question={newQuestion} index={index} />
      })}
    </>
  )
}
