import { Tabs } from '@mantine/core'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import type { ReactNode } from 'react'

import type { MainNavTab, MainUrlVal } from '@/common/type'
import { isMainActiveTabAtom } from '@/store/atom'

/**
 * @package
 */

type MainNavTabType = {
  href: MainUrlVal
  value: MainNavTab
  children: ReactNode
}

export const MainNavTabList = () => {
  const MainNavTabItem: MainNavTabType[] = [
    {
      href: '/dashboard/new-questions',
      value: 'questions',
      children: '質問',
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
  const activeTab = useAtomValue(isMainActiveTabAtom)

  return (
    <Tabs
      value={activeTab}
      variant='pills'
      styles={{
        tabsList: {
          flexWrap: 'nowrap',
        },
        tab: {
          '&[data-active=true]': {
            color: 'gray',
            backgroundColor: 'white',
            borderBottom: '3px solid #1976d2',
            borderRadius: 0,
            ':hover': {
              color: 'gray',
              backgroundColor: 'white',
              borderBottom: '3px solid #1976d2',
              borderRadius: 0,
            },
          },
          ':hover': {
            color: 'black',
            backgroundColor: 'white',
            borderBottom: '3px solid white',
          },
          color: 'gray',
          borderBottom: '3px solid white',
        },
      }}
    >
      <Tabs.List>
        {MainNavTabItem.map(({ href, value, children }) => {
          return (
            <Link key={href} href={href} className=' py-1 no-underline'>
              <Tabs.Tab key={href} value={value}>
                {children}
              </Tabs.Tab>
            </Link>
          )
        })}
      </Tabs.List>
    </Tabs>
  )
}
