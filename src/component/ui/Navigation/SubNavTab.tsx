// import { useAtomValue } from 'jotai'
import Link from 'next/link'
import type { ReactNode } from 'react'

import type { SubUrlVal } from '@/common/type'

// import { mainNavTabStyleAtom } from '@/store/question-atom'
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
  // 2023/3/21 一旦コメントアウト　後ほど実装
  // const mainNavTabStyle = useAtomValue(mainNavTabStyleAtom)
  const {
    handleSubNavTabStyle,
    newQuestionsStyle,
    questionsWaitingAnswerStyle,
    dashboardQuestionsStyle,
    dashboardAnswersStyle,
    dashboardProfileStyle,
  } = useSubNavTabStyle()

  const SubNavTabItem: SubNavTabType[] = [
    {
      href: '/dashboard/new-questions',
      children: '新着',
      handleOnClick: () => {
        return handleSubNavTabStyle('dashboard/new-questions')
      },
      className: newQuestionsStyle,
    },
    {
      href: '/dashboard/question-waiting-answers',
      children: '回答募集中',
      handleOnClick: () => {
        return handleSubNavTabStyle('dashboard/question-waiting-answers')
      },
      className: questionsWaitingAnswerStyle,
    },
    {
      href: '/dashboard/my-questions',
      children: '自分の質問',
      handleOnClick: () => {
        return handleSubNavTabStyle('dashboard/my-questions')
      },
      className: dashboardQuestionsStyle,
    },
    {
      href: '/dashboard/my-answers',
      children: '自分の回答',
      handleOnClick: () => {
        return handleSubNavTabStyle('dashboard/my-answers')
      },
      className: dashboardAnswersStyle,
    },
    {
      href: '/dashboard/my-profile',
      children: 'プロフィール',
      handleOnClick: () => {
        return handleSubNavTabStyle('dashboard/my-profile')
      },
      className: dashboardProfileStyle,
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
