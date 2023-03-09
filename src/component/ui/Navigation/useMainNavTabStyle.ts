import { useAtom } from 'jotai'

import type { MainNavTabStyleType } from '@/common/type'
import { mainNavTabStyleAtom } from '@/store/question-atom'

export const useMainNavTabStyle = () => {
  const [mainNavTabStyle, setNavTabStyle] = useAtom(mainNavTabStyleAtom)

  const defaultMainNavTabStyle = ' text-black no-underline hover:text-red-500'
  const selectedMainNavTabStyle = 'text-blue-500 no-underline'

  let questionsStyle = defaultMainNavTabStyle
  let eventStyle = defaultMainNavTabStyle
  let informationStyle = defaultMainNavTabStyle
  let dashboardStyle = defaultMainNavTabStyle

  if (mainNavTabStyle === 'questions') {
    questionsStyle = selectedMainNavTabStyle
    eventStyle = defaultMainNavTabStyle
    informationStyle = defaultMainNavTabStyle
    dashboardStyle = defaultMainNavTabStyle
  } else if (mainNavTabStyle === 'event') {
    eventStyle = selectedMainNavTabStyle
    questionsStyle = defaultMainNavTabStyle
    informationStyle = defaultMainNavTabStyle
    dashboardStyle = defaultMainNavTabStyle
  } else if (mainNavTabStyle === 'information') {
    informationStyle = selectedMainNavTabStyle
    questionsStyle = defaultMainNavTabStyle
    eventStyle = defaultMainNavTabStyle
    dashboardStyle = defaultMainNavTabStyle
  } else if (mainNavTabStyle === 'dashboard') {
    dashboardStyle = selectedMainNavTabStyle
    informationStyle = defaultMainNavTabStyle
    questionsStyle = defaultMainNavTabStyle
    eventStyle = defaultMainNavTabStyle
  }

  const handleNavTabStyle = (currentMainNavTabStyle: MainNavTabStyleType) => {
    setNavTabStyle(currentMainNavTabStyle)
  }
  return { handleNavTabStyle, questionsStyle, eventStyle, informationStyle, dashboardStyle }
}
