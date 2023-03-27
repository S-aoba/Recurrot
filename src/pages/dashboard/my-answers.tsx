import { Loader } from '@mantine/core'
import Head from 'next/head'
import { useEffect } from 'react'

import { useQueryUserAnswers } from '@/common/hook/useQueryUserAnswers'
import type { QuestionAndAnswerIdListType } from '@/common/type'
import { WrapperLayout } from '@/component/layout/WrapperLayout'
import { Card } from '@/component/ui/Card'
import { useSubNavTabStyle } from '@/component/ui/Navigation/useSubNavTabStyle'

const MyAnswers = () => {
  const { handleSubNavTabStyle } = useSubNavTabStyle()

  const { data: questions, status: answersStatus } = useQueryUserAnswers()

  useEffect(() => {
    handleSubNavTabStyle('dashboard/my-answers')
  })

  if (answersStatus === 'loading') return <Loader />

  return (
    <>
      <Head>
        <title>Recurrot - 自分の回答</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <WrapperLayout>
        <main className=' flex h-fit flex-1 justify-center'>
          <div className=' grid w-9/12 grid-cols-3 gap-10 py-5'>
            {questions &&
              questions.map((question: QuestionAndAnswerIdListType, index) => {
                return <Card key={index} question={question} answerLength={question.answers.length} />
              })}
          </div>
        </main>
      </WrapperLayout>
    </>
  )
}
export default MyAnswers
