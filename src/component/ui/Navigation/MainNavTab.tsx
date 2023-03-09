import type { ReactNode } from 'react'

import type { MainUrlVal } from '@/common/type'
import { Link } from '@/lib/next/Link'

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
  const { handleNavTabStyle, questionsStyle, eventStyle, informationStyle, dashboardStyle } = useMainNavTabStyle()
  const MainNavTabItem: MainNavTabType[] = [
    {
      href: '/',
      children: '質問',
      handleOnClick: () => {
        return handleNavTabStyle('questions')
      },
      className: questionsStyle,
    },
    {
      children: 'イベント',
      href: '/event',
      handleOnClick: () => {
        return handleNavTabStyle('event')
      },
      className: eventStyle,
    },
    {
      href: '/information',
      children: 'お知らせ',
      handleOnClick: () => {
        return handleNavTabStyle('information')
      },
      className: informationStyle,
    },
    {
      href: '/dashboard/questions',
      children: 'ダッシュボード',
      handleOnClick: () => {
        return handleNavTabStyle('dashboard')
      },
      className: dashboardStyle,
    },
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
