import { useAtom } from 'jotai'

import { navTabAtom } from '@/store/question-atom'

export const useSubNavTabStyle = () => {
  const [navTab, _] = useAtom(navTabAtom)

  const defaultSubNavTabStyle =
    ' whitespace-nowrap text-black no-underline hover:text-black hover:opacity-100 px-2 py-1 ml-2 opacity-50'
  const selectedSubNavTabStyle =
    'whitespace-nowrap text-white no-underline px-2 py-1 outline rounded my-2 ml-2 bg-blue-500'

  let newQuestionsStyle = defaultSubNavTabStyle
  let questionsWaitingAnswerStyle = defaultSubNavTabStyle
  let myQuestionsStyle = defaultSubNavTabStyle
  let myAnswersStyle = defaultSubNavTabStyle
  let myProfileStyle = defaultSubNavTabStyle

  if (navTab.sub === 'new-questions') {
    newQuestionsStyle = selectedSubNavTabStyle
  } else if (navTab.sub === 'question-waiting-answers') {
    questionsWaitingAnswerStyle = selectedSubNavTabStyle
  } else if (navTab.sub === 'my-questions') {
    myQuestionsStyle = selectedSubNavTabStyle
  } else if (navTab.sub === 'my-answers') {
    myAnswersStyle = selectedSubNavTabStyle
  } else if (navTab.sub === 'my-profile') {
    myProfileStyle = selectedSubNavTabStyle
  }

  return {
    newQuestionsStyle,
    questionsWaitingAnswerStyle,
    myQuestionsStyle,
    myAnswersStyle,
    myProfileStyle,
  }
}
