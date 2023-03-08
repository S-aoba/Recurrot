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
  handleOnClick: () => void
  className?: string
}

export const SubNavTab = () => {
  const { handleSubNavTabStyle, newQuestionsStyle, questionsWaitingAnswerStyle } = useSubNavTabStyle()

  const SubNavTabItem: SubNavTabType[] = [
    {
      href: '/',
      children: '新着',
      handleOnClick: () => {
        return handleSubNavTabStyle('new-questions')
      },
      className: newQuestionsStyle,
    },
    {
      href: '/question-waiting-answers',
      children: '回答募集中',
      handleOnClick: () => {
        return handleSubNavTabStyle('question-waiting-answers')
      },
      className: questionsWaitingAnswerStyle,
    },
  ]
  return (
    <>
      {SubNavTabItem.map(({ href, children, className, handleOnClick }) => {
        return (
          <Link key={href} href={href} className={className} onClick={handleOnClick}>
            {children}
          </Link>
        )
      })}
    </>
  )
}
