import { useAtom } from 'jotai'

import type { MainNavTabStyleType } from '@/common/type'
import { mainNavTabStyleAtom } from '@/store/question-atom'

export const useMainNavTabStyle = () => {
  const [currentNavTabStyle, setNavTabStyle] = useAtom(mainNavTabStyleAtom)

  const defaultMainNavTabStyle = ' text-black no-underline hover:text-red-500'
  const selectedMainNavTabStyle = 'text-blue-500 no-underline'

  let questionsStyle = selectedMainNavTabStyle
  let eventStyle = defaultMainNavTabStyle
  let informationStyle = defaultMainNavTabStyle
  let dashboardStyle = defaultMainNavTabStyle

  if (currentNavTabStyle === 'questions') {
    questionsStyle = selectedMainNavTabStyle
    eventStyle = defaultMainNavTabStyle
    informationStyle = defaultMainNavTabStyle
    dashboardStyle = defaultMainNavTabStyle
  } else if (currentNavTabStyle === 'event') {
    eventStyle = selectedMainNavTabStyle
    questionsStyle = defaultMainNavTabStyle
    informationStyle = defaultMainNavTabStyle
    dashboardStyle = defaultMainNavTabStyle
  } else if (currentNavTabStyle === 'information') {
    informationStyle = selectedMainNavTabStyle
    questionsStyle = defaultMainNavTabStyle
    eventStyle = defaultMainNavTabStyle
    dashboardStyle = defaultMainNavTabStyle
  } else if (currentNavTabStyle === 'dashboard') {
    dashboardStyle = selectedMainNavTabStyle
    informationStyle = defaultMainNavTabStyle
    questionsStyle = defaultMainNavTabStyle
    eventStyle = defaultMainNavTabStyle
  }

  const handleNavTabStyle = (currentNavTabStyle: MainNavTabStyleType) => {
    setNavTabStyle(currentNavTabStyle)
  }
  return { handleNavTabStyle, questionsStyle, eventStyle, informationStyle, dashboardStyle }
}
