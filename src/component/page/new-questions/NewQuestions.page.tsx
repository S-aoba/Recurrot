import { useSetAtom } from 'jotai'
import Head from 'next/head'
import { useEffect } from 'react'

import { useQueryNewQuestionList } from '@/common/hook/useQueryNewQuestionList'
import { QuestionLayout } from '@/component/layout/QuestionLayout'
import { QuestionLoading } from '@/component/ui/Loading'
import { isActiveTabAtom, isMainActiveTabAtom } from '@/store/atom'

import { NewQuestions } from './NewQuestions'

/**
 * @package
 */

export const NewQuestionsPage = () => {
  const { data: newQuestionList, status: newQuestionListStatus } = useQueryNewQuestionList()

  const setActiveTab = useSetAtom(isActiveTabAtom)
  const setIsMainActiveTab = useSetAtom(isMainActiveTabAtom)

  useEffect(() => {
    setIsMainActiveTab('questions')
    setActiveTab('new-questions')
  }, [setActiveTab, setIsMainActiveTab])

  if (newQuestionListStatus === 'loading') return <QuestionLoading />

  return (
    <>
      <Head>
        <title>Recurrot - 新着</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <QuestionLayout>{newQuestionList && <NewQuestions newQuestionList={newQuestionList} />}</QuestionLayout>
    </>
  )
}
