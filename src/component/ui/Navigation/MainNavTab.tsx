import Link from 'next/link'
import type { ReactNode } from 'react'

import type { MainUrlVal } from '@/common/type'

/**
 * @package
 */

export const MainNavTab = () => {
  return (
    <>
      {MainNavTabItem.map(({ href, children }) => {
        return (
          <Link key={href} href={href}>
            {children}
          </Link>
        )
      })}
    </>
  )
}

type MainNavTabType = {
  href: MainUrlVal
  children: ReactNode
}

const MainNavTabItem: MainNavTabType[] = [
  {
    href: '/',
    children: '質問',
  },
  {
    href: '/event',
    children: 'イベント',
  },
  {
    href: '/information',
    children: 'お知らせ',
  },
  {
    href: '/dashboard/questions',
    children: 'ダッシュボード',
  },
]
