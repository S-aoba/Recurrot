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
  const { newQuestionsStyle, questionsWaitingAnswerStyle, myQuestionsStyle, myAnswersStyle, myProfileStyle } =
    useSubNavTabStyle()

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
      href: '/dashboard/my-questions',
      children: '自分の質問',
      className: myQuestionsStyle,
    },
    {
      href: '/dashboard/my-answers',
      children: '自分の回答',
      className: myAnswersStyle,
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
          <Link key={href} href={href} className={className}>
            {children}
          </Link>
        )
      })}
    </>
  )
}
