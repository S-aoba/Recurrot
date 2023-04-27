import type { NextPage } from 'next'

import type { QuestionWaitingAnswered } from '@/common/type'
import { Card } from '@/component/ui/Card'

/**
 * @package
 */

type QuestionWaitingAnswersProps = {
  questionWaitingAnsweredList: QuestionWaitingAnswered[]
}

export const QuestionWaitingAnswers: NextPage<QuestionWaitingAnswersProps> = ({ questionWaitingAnsweredList }) => {
  return (
    <>
      {questionWaitingAnsweredList.map((questionWaitingAnswered: QuestionWaitingAnswered, index) => {
        return <Card key={questionWaitingAnswered.id} question={questionWaitingAnswered} index={index} />
      })}
    </>
  )
}
