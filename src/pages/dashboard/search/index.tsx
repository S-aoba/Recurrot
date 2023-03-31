import { Loader } from '@mantine/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useQuerySearchQuestions } from '@/common/hook/useQuerySearchQuestions'
import type { QuestionAndAnswerIdListType } from '@/common/type'
import { Card } from '@/component/ui/Card'

const SearchQuestions = () => {
  const [id, setId] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      if (typeof router.query.q === 'string') {
        setId(router.query.q)
      }
    }
  }, [router])
  const { data: searchQuestions, status: searchQuestionsStatus } = useQuerySearchQuestions(id)
  if (searchQuestionsStatus == 'loading') return <Loader />
  return (
    <>
      <Head>
        <title>Recurrot - 新着</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className=' flex h-fit flex-1 justify-center'>
        <div className=' grid w-9/12 grid-cols-3 gap-10 py-5'>
          {searchQuestions &&
            searchQuestions.map((question: QuestionAndAnswerIdListType, index) => {
              return <Card key={index} question={question} />
            })}
        </div>
      </main>
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

export default SearchQuestions
