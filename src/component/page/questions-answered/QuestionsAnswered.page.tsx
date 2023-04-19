import { useSetAtom } from 'jotai'
import Head from 'next/head'
import { useEffect } from 'react'

import { useQueryQuestionListAnswered } from '@/common/hook/useQueryQuestionListAnswered'
import { QuestionLayout } from '@/component/layout/QuestionLayout'
import { QuestionLoading } from '@/component/ui/Loading'
import { navTabAtom } from '@/store/atom'

import { QuestionsAnswered } from './QuestionsAnswered'

/**
 * @package
 */

export const QuestionsAnsweredPage = () => {
  const { data: questionList, status: questionListStatus } = useQueryQuestionListAnswered()

  const setNavTab = useSetAtom(navTabAtom)

  useEffect(() => {
    setNavTab({ main: 'questions', sub: 'questions_answered' })
  }, [setNavTab])

  if (questionListStatus === 'loading') return <QuestionLoading />

  return (
    <>
      <Head>
        <title>Recurrot - 回答した質問</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <QuestionLayout>{questionList && <QuestionsAnswered questionList={questionList} />}</QuestionLayout>
    </>
  )
}