import { useAtom } from 'jotai'
import Link from 'next/link'
import type { ReactNode } from 'react'

import type { SubUrlVal } from '@/common/type'
import { navTabAtom } from '@/store/question-atom'

import { useSubNavTabStyle } from './useSubNavTabStyle'

/**
 * @package
 */

type SubNavTabType = {
  href: SubUrlVal
  children: ReactNode
  handleOnClick?: any
  className?: string
}

export const SubNavTab = () => {
  const { newQuestionsStyle, questionsWaitingAnswerStyle, myQuestionsStyle, myAnswersStyle, myProfileStyle } =
    useSubNavTabStyle()

  const [navTab, setNavTab] = useAtom(navTabAtom)

  const SubNavTabItem: SubNavTabType[] = [
    {
      href: '/dashboard/new-questions',
      children: '新着',
      handleOnClick: () => {
        return setNavTab({ ...navTab, sub: 'new-questions' })
      },
      className: newQuestionsStyle,
    },
    {
      href: '/dashboard/question-waiting-answers',
      children: '回答募集中',
      handleOnClick: () => {
        return setNavTab({ ...navTab, sub: 'question-waiting-answers' })
      },
      className: questionsWaitingAnswerStyle,
    },
    {
      href: '/dashboard/my-questions',
      children: '自分の質問',
      handleOnClick: () => {
        return setNavTab({ ...navTab, sub: 'my-questions' })
      },
      className: myQuestionsStyle,
    },
    {
      href: '/dashboard/my-answers',
      children: '自分の回答',
      handleOnClick: () => {
        return setNavTab({ ...navTab, sub: 'my-answers' })
      },
      className: myAnswersStyle,
    },
    {
      href: '/dashboard/my-profile',
      children: 'プロフィール',
      handleOnClick: () => {
        return setNavTab({ ...navTab, sub: 'my-profile' })
      },
      className: myProfileStyle,
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
