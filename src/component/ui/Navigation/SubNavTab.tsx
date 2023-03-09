import { useAtomValue } from 'jotai'
import type { ReactNode } from 'react'

import type { SubUrlVal } from '@/common/type'
import { Link } from '@/lib/next/Link'
import { mainNavTabStyleAtom } from '@/store/question-atom'

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
  const mainNabTabStyle = useAtomValue(mainNavTabStyleAtom)
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

  const SubDashboardNavTabItem: SubNavTabType[] = [
    {
      href: '/dashboard/questions',
      children: '自分質問',
      handleOnClick: () => {
        return handleSubNavTabStyle('dashboard-questions')
      },
      className: dashboardQuestionsStyle,
    },
    {
      href: '/dashboard/answers',
      children: '自分の回答',
      handleOnClick: () => {
        return handleSubNavTabStyle('dashboard-answers')
      },
      className: dashboardAnswersStyle,
    },
    {
      href: '/dashboard/profile',
      children: 'プロフィール',
      handleOnClick: () => {
        return handleSubNavTabStyle('dashboard-profile')
      },
      className: dashboardProfileStyle,
    },
  ]

  if (mainNabTabStyle === 'questions') {
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
  } else if (mainNabTabStyle === 'dashboard') {
    return (
      <>
        {SubDashboardNavTabItem.map(({ href, children, className, handleOnClick }) => {
          return (
            <Link key={href} href={href} className={className} onClick={handleOnClick}>
              {children}
            </Link>
          )
        })}
      </>
    )
  }
}
