import { useAtom } from 'jotai'
import Link from 'next/link'
import type { ReactNode } from 'react'

import type { MainUrlVal } from '@/common/type'
import { navTabAtom } from '@/store/question-atom'

import { useMainNavTabStyle } from './useMainNavTabStyle'

/**
 * @package
 */

type MainNavTabType = {
  href: MainUrlVal
  children: ReactNode
  handleOnClick: () => void
  className?: string
}

export const MainNavTab = () => {
  const { questionsStyle } = useMainNavTabStyle()
  const [navTab, setNavTab] = useAtom(navTabAtom)

  const MainNavTabItem: MainNavTabType[] = [
    {
      href: '/dashboard/new-questions',
      children: '質問',
      handleOnClick: () => {
        return setNavTab({ ...navTab, main: 'questions', sub: 'new-questions' })
      },
      className: questionsStyle,
    },
    // 2023/3/21 一旦コメントアウト　後ほど実装
    // {
    //   children: 'イベント',
    //   href: '/event',
    //   handleOnClick: () => {
    //     return handleNavTabStyle('event')
    //   },
    //   className: eventStyle,
    // },
    // {
    //   href: '/information',
    //   children: 'お知らせ',
    //   handleOnClick: () => {
    //     return handleNavTabStyle('information')
    //   },
    //   className: informationStyle,
    // },
  ]

  return (
    <>
      {MainNavTabItem &&
        MainNavTabItem.map(({ href, children, className, handleOnClick }) => {
          return (
            <Link key={href} href={href} className={className} onClick={handleOnClick}>
              {children}
            </Link>
          )
        })}
    </>
  )
}
