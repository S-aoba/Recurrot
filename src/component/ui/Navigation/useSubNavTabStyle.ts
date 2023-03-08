import { useAtom } from 'jotai'

import type { SubNavTabStyleType } from '@/common/type'
import { subNavTabStyleAtom } from '@/store/question-atom'

export const useSubNavTabStyle = () => {
  const [subNavTabStyle, setNavTabStyle] = useAtom(subNavTabStyleAtom)

  const defaultSubNavTabStyle = ' text-black no-underline hover:text-red-500'
  const selectedSubNavTabStyle = 'text-blue-500 no-underline'

  let newQuestionsStyle = selectedSubNavTabStyle
  let questionsWaitingAnswerStyle = defaultSubNavTabStyle

  if (subNavTabStyle === 'new-questions') {
    newQuestionsStyle = selectedSubNavTabStyle
    questionsWaitingAnswerStyle = defaultSubNavTabStyle
  } else if (subNavTabStyle === 'question-waiting-answers') {
    questionsWaitingAnswerStyle = selectedSubNavTabStyle
    newQuestionsStyle = defaultSubNavTabStyle
  }

  const handleSubNavTabStyle = (currentSubNavTabStyle: SubNavTabStyleType) => {
    setNavTabStyle(currentSubNavTabStyle)
  }

  return { handleSubNavTabStyle, newQuestionsStyle, questionsWaitingAnswerStyle }
}
