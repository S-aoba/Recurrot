import { useAtom } from 'jotai'

import type { SubNavTabStyleType } from '@/common/type'
import { subNavTabStyleAtom } from '@/store/question-atom'

export const useSubNavTabStyle = () => {
  const [subNavTabStyle, setNavTabStyle] = useAtom(subNavTabStyleAtom)

  const defaultSubNavTabStyle =
    ' whitespace-nowrap text-black no-underline hover:text-black hover:opacity-100 px-2 py-1 ml-2 opacity-50'
  const selectedSubNavTabStyle =
    'whitespace-nowrap text-white no-underline px-2 py-1 outline rounded my-2 ml-2 bg-blue-500'

  let newQuestionsStyle = selectedSubNavTabStyle
  let questionsWaitingAnswerStyle = defaultSubNavTabStyle
  let dashboardQuestionsStyle = defaultSubNavTabStyle
  let dashboardAnswersStyle = defaultSubNavTabStyle
  let dashboardProfileStyle = defaultSubNavTabStyle

  if (subNavTabStyle === 'dashboard/new-questions') {
    newQuestionsStyle = selectedSubNavTabStyle
    questionsWaitingAnswerStyle = defaultSubNavTabStyle
    dashboardQuestionsStyle = defaultSubNavTabStyle
    dashboardAnswersStyle = defaultSubNavTabStyle
    dashboardProfileStyle = defaultSubNavTabStyle
  } else if (subNavTabStyle === 'dashboard/question-waiting-answers') {
    questionsWaitingAnswerStyle = selectedSubNavTabStyle
    newQuestionsStyle = defaultSubNavTabStyle
    dashboardQuestionsStyle = defaultSubNavTabStyle
    dashboardAnswersStyle = defaultSubNavTabStyle
    dashboardProfileStyle = defaultSubNavTabStyle
  } else if (subNavTabStyle === 'dashboard/my-questions') {
    dashboardQuestionsStyle = selectedSubNavTabStyle
    dashboardAnswersStyle = defaultSubNavTabStyle
    dashboardProfileStyle = defaultSubNavTabStyle
    newQuestionsStyle = defaultSubNavTabStyle
    questionsWaitingAnswerStyle = defaultSubNavTabStyle
  } else if (subNavTabStyle === 'dashboard/my-answers') {
    dashboardAnswersStyle = selectedSubNavTabStyle
    dashboardQuestionsStyle = defaultSubNavTabStyle
    dashboardProfileStyle = defaultSubNavTabStyle
    newQuestionsStyle = defaultSubNavTabStyle
    questionsWaitingAnswerStyle = defaultSubNavTabStyle
  } else if (subNavTabStyle === 'dashboard/my-profile') {
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
