import { useAtom } from 'jotai'

import type { MainNavTabStyleType } from '@/common/type'
import { mainNavTabStyleAtom } from '@/store/question-atom'

export const useMainNavTabStyle = () => {
  const [mainNavTabStyle, setNavTabStyle] = useAtom(mainNavTabStyleAtom)

  const defaultMainNavTabStyle = ' text-black no-underline hover:text-red-500'
  const selectedMainNavTabStyle = 'text-blue-500 no-underline'

  let questionsStyle = selectedMainNavTabStyle
  let eventStyle = defaultMainNavTabStyle
  let informationStyle = defaultMainNavTabStyle

  if (mainNavTabStyle === 'question') {
    questionsStyle = selectedMainNavTabStyle
    eventStyle = defaultMainNavTabStyle
    informationStyle = defaultMainNavTabStyle
  }
  // 2023/3/21 一旦コメントアウト　後ほど実装
  // else if (mainNavTabStyle === 'event') {
  //   eventStyle = selectedMainNavTabStyle
  //   questionsStyle = defaultMainNavTabStyle
  //   informationStyle = defaultMainNavTabStyle
  //   dashboardStyle = defaultMainNavTabStyle
  // }
  // else if (mainNavTabStyle === 'information') {
  //   informationStyle = selectedMainNavTabStyle
  //   questionsStyle = defaultMainNavTabStyle
  //   eventStyle = defaultMainNavTabStyle
  //   dashboardStyle = defaultMainNavTabStyle
  // }

  const handleNavTabStyle = (currentMainNavTabStyle: MainNavTabStyleType) => {
    setNavTabStyle(currentMainNavTabStyle)
  }
  return { handleNavTabStyle, questionsStyle, eventStyle, informationStyle }
}
