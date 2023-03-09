import { useAtom } from 'jotai'

import type { SubNavTabStyleType } from '@/common/type'
import { subNavTabStyleAtom } from '@/store/question-atom'

export const useSubNavTabStyle = () => {
  const [subNavTabStyle, setNavTabStyle] = useAtom(subNavTabStyleAtom)

  const defaultSubNavTabStyle = ' text-black no-underline hover:text-red-500'
  const selectedSubNavTabStyle = 'text-blue-500 no-underline'

  let newQuestionsStyle = selectedSubNavTabStyle
  let questionsWaitingAnswerStyle = defaultSubNavTabStyle
  let dashboardQuestionsStyle = defaultSubNavTabStyle
  let dashboardAnswersStyle = defaultSubNavTabStyle
  let dashboardProfileStyle = defaultSubNavTabStyle

  if (subNavTabStyle === 'new-questions') {
    newQuestionsStyle = selectedSubNavTabStyle
    questionsWaitingAnswerStyle = defaultSubNavTabStyle
    dashboardQuestionsStyle = defaultSubNavTabStyle
    dashboardAnswersStyle = defaultSubNavTabStyle
    dashboardProfileStyle = defaultSubNavTabStyle
  } else if (subNavTabStyle === 'question-waiting-answers') {
    questionsWaitingAnswerStyle = selectedSubNavTabStyle
    newQuestionsStyle = defaultSubNavTabStyle
    dashboardQuestionsStyle = defaultSubNavTabStyle
    dashboardAnswersStyle = defaultSubNavTabStyle
    dashboardProfileStyle = defaultSubNavTabStyle
  } else if (subNavTabStyle === 'dashboard-questions') {
    dashboardQuestionsStyle = selectedSubNavTabStyle
    dashboardAnswersStyle = defaultSubNavTabStyle
    dashboardProfileStyle = defaultSubNavTabStyle
    newQuestionsStyle = defaultSubNavTabStyle
    questionsWaitingAnswerStyle = defaultSubNavTabStyle
  } else if (subNavTabStyle === 'dashboard-answers') {
    dashboardAnswersStyle = selectedSubNavTabStyle
    dashboardQuestionsStyle = defaultSubNavTabStyle
    dashboardProfileStyle = defaultSubNavTabStyle
    newQuestionsStyle = defaultSubNavTabStyle
    questionsWaitingAnswerStyle = defaultSubNavTabStyle
  } else if (subNavTabStyle === 'dashboard-profile') {
    dashboardProfileStyle = selectedSubNavTabStyle
    dashboardAnswersStyle = defaultSubNavTabStyle
    dashboardQuestionsStyle = defaultSubNavTabStyle
    newQuestionsStyle = defaultSubNavTabStyle
    questionsWaitingAnswerStyle = defaultSubNavTabStyle
  }

  const handleSubNavTabStyle = (currentSubNavTabStyle: SubNavTabStyleType) => {
    setNavTabStyle(currentSubNavTabStyle)
  }

  return {
    handleSubNavTabStyle,
    newQuestionsStyle,
    questionsWaitingAnswerStyle,
    dashboardQuestionsStyle,
    dashboardAnswersStyle,
    dashboardProfileStyle,
  }
}
