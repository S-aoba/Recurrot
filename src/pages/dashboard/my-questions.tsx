import { Loader } from '@mantine/core'
import type { Question } from '@prisma/client'
import Head from 'next/head'
import { useEffect } from 'react'

import { useQueryUserQuestions } from '@/common/hook/useQueryUserQuestion'
import { WrapperLayout } from '@/component/layout/WrapperLayout'
import { Card } from '@/component/ui/Card'
import { useSubNavTabStyle } from '@/component/ui/Navigation/useSubNavTabStyle'

const MyQuestions = () => {
  const { handleSubNavTabStyle } = useSubNavTabStyle()
  const { data, status } = useQueryUserQuestions()

  useEffect(() => {
    handleSubNavTabStyle('dashboard/my-questions')
  })
  if (status === 'loading') return <Loader />
  return (
    <>
      <Head>
        <title>Recurrot - 自分の質問</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <WrapperLayout>
        <main className=' flex h-fit flex-1 justify-center'>
          <div className=' grid w-9/12 grid-cols-3 gap-10 py-5'>
            {data &&
              data.map((question: Question) => {
                return <Card key={question.id} question={question} />
              })}
          </div>
        </main>
      </WrapperLayout>
    </>
  )
}
export default MyQuestions
