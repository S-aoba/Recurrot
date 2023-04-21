import { Tabs } from '@mantine/core'
import { useAtomValue } from 'jotai'
import Link from 'next/link'

import type { SubUrlVal } from '@/common/type'
import { isActiveTabAtom } from '@/store/atom'

/**
 * @package
 */

type SubNavTabType = {
  href: SubUrlVal
  value: string
  children: string
}

export const SubNavTab = () => {
  const SubNavTabItem: SubNavTabType[] = [
    {
      href: '/dashboard/new-questions',
      value: 'new-questions',
      children: '新着',
    },
    {
      href: '/dashboard/question-waiting-answers',
      value: 'question-waiting-answers',
      children: '回答募集中',
    },
    {
      href: '/dashboard/posted-questions',
      value: 'posted-questions',
      children: '投稿した質問',
    },
    {
      href: '/dashboard/questions-answered',
      value: 'questions-answered',
      children: '回答した質問',
    },
    {
      href: '/dashboard/my-profile',
      value: 'my-profile',
      children: 'プロフィール',
    },
  ]
  const activeTab = useAtomValue(isActiveTabAtom)

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
            backgroundColor: '#1976d2',
            borderRadius: '1rem',
            ':hover': {
              backgroundColor: '#1976d2',
              color: 'white',
            },
          },
          ':hover': {
            color: 'black',
            backgroundColor: 'white',
          },
          color: 'gray',
        },
      }}
    >
      <Tabs.List>
        {SubNavTabItem.map(({ href, value, children }) => {
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
