import { useAtom } from 'jotai'

import { navTabAtom } from '@/store/atom'

export const useMainNavTabStyle = () => {
  const [navTab, _] = useAtom(navTabAtom)

  const defaultMainNavTabStyle =
    ' whitespace-nowrap border-b-2 border-r-0 border-l-0 border-t-0 border-solid border-white p-2 text-black no-underline opacity-50 hover:text-black hover:opacity-100'
  const selectedMainNavTabStyle =
    ' whitespace-nowrap border-b-2 border-r-0 border-l-0 border-t-0 border-solid border-blue-500 p-2 text-blue-500 no-underline'

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
