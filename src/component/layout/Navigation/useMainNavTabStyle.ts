import { useAtom } from 'jotai'

import { navTabAtom } from '@/store/question-atom'

export const useMainNavTabStyle = () => {
  const [navTab, _] = useAtom(navTabAtom)

  const defaultMainNavTabStyle =
    ' whitespace-nowrap text-black no-underline hover:text-black hover:opacity-100 opacity-50 p-2'
  const selectedMainNavTabStyle =
    'text-blue-500 no-underline p-2 whitespace-nowrap border-b-2 border-blue-500 border-solid border-r-0 border-l-0 border-t-0'

  let questionsStyle = defaultMainNavTabStyle
  // let eventStyle = defaultMainNavTabStyle
  // let informationStyle = defaultMainNavTabStyle

  if (navTab.main === 'questions') {
    questionsStyle = selectedMainNavTabStyle
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

  return { questionsStyle }
}
