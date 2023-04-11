import { Loader } from '@mantine/core'
import { useSetAtom } from 'jotai'
import Head from 'next/head'
import { useEffect } from 'react'

import { useQueryUserQuestions } from '@/common/hook/useQueryUserQuestion'
import type { QuestionAndAnswerIdListType } from '@/common/type'
import { QuestionLayout } from '@/component/layout/QuestionLayout'
import { Card } from '@/component/ui/Card'
import { navTabAtom } from '@/store/question-atom'

const MyQuestions = () => {
  const { data: myQuestions, status: myQuestionsStatus } = useQueryUserQuestions()

  const setNavTab = useSetAtom(navTabAtom)

  useEffect(() => {
    setNavTab({ main: 'questions', sub: 'my-questions' })
  }, [setNavTab])

  if (myQuestionsStatus === 'loading') return <Loader />

  return (
    <>
      <Head>
        <title>Recurrot - 自分の質問</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <QuestionLayout>
        {myQuestions &&
          myQuestions.map((question: QuestionAndAnswerIdListType) => {
            return <Card key={question.id} question={question} />
          })}
      </QuestionLayout>
    </>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default MyQuestions
