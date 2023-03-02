/**
 * @package
 */

import Link from 'next/link'
import type { ReactNode } from 'react'

import type { SubUrlVal } from '@/component/type'

export const SubNavTab = () => {
  return (
    <>
      {SubNavTabItem.map(({ href, children }) => {
        return (
          <Link key={href} href={href}>
            {children}
          </Link>
        )
      })}
    </>
  )
}

type SubNavTabType = {
  href: SubUrlVal
  children: ReactNode
}

const SubNavTabItem: SubNavTabType[] = [
  {
    href: '/',
    children: '新着',
  },
  {
    href: '/question-waiting-answers',
    children: '回答募集中',
  },
]
