import { useAtom } from 'jotai'

import { navTabAtom } from '@/store/atom'

export const useSubNavTabStyle = () => {
  const [navTab, _] = useAtom(navTabAtom)

  const defaultSubNavTabStyle =
    ' my-2 ml-2 whitespace-nowrap px-2 py-1 text-black no-underline opacity-50 hover:text-black hover:opacity-100'
  const selectedSubNavTabStyle =
    ' my-2 ml-2 whitespace-nowrap rounded bg-blue-500 px-2 py-1 text-white no-underline outline'

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
