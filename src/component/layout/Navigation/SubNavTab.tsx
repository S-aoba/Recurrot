import Link from 'next/link'
import type { ReactNode } from 'react'

import type { SubUrlVal } from '@/common/type'

import { useSubNavTabStyle } from './useSubNavTabStyle'

/**
 * @package
 */

type SubNavTabType = {
  href: SubUrlVal
  children: ReactNode
  className?: string
}

export const SubNavTab = () => {
  const {
    newQuestionsStyle,
    questionsWaitingAnswerStyle,
    postedQuestionsStyle,
    questionsAnsweredStyle,
    myProfileStyle,
  } = useSubNavTabStyle()

  const SubNavTabItem: SubNavTabType[] = [
    {
      href: '/dashboard/new-questions',
      children: '新着',
      className: newQuestionsStyle,
    },
    {
      href: '/dashboard/question-waiting-answers',
      children: '回答募集中',
      className: questionsWaitingAnswerStyle,
    },
    {
      href: '/dashboard/posted-questions',
      children: '投稿した質問',
      className: postedQuestionsStyle,
    },
    {
      href: '/dashboard/questions-answered',
      children: '回答した質問',
      className: questionsAnsweredStyle,
    },
    {
      href: '/dashboard/my-profile',
      children: 'プロフィール',
      className: myProfileStyle,
    },
  ]

  return (
    <>
      {SubNavTabItem.map(({ href, children, className }) => {
        return (
          <Link key={href} href={href} className={className} datatype='true'>
            {children}
          </Link>
        )
      })}
    </>
  )
}
