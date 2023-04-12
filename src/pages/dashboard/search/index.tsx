import { useSetAtom } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useQuerySearchQuestions } from '@/common/hook/useQuerySearchQuestions'
import type { SearchQuestion } from '@/common/type'
import { QuestionLayout } from '@/component/layout/QuestionLayout'
import { Card } from '@/component/ui/Card'
import { QuestionLoading } from '@/component/ui/Loading'
import { navTabAtom } from '@/store/question-atom'

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

  const { data: searchQuestionList, status: searchQuestionListStatus } = useQuerySearchQuestions(id)

  const setNavTab = useSetAtom(navTabAtom)

  useEffect(() => {
    setNavTab({ main: null, sub: null })
  }, [setNavTab])

  if (searchQuestionListStatus == 'loading') return <QuestionLoading />

  return (
    <>
      <Head>
        <title>Recurrot - 新着</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <QuestionLayout>
        {searchQuestionList &&
          searchQuestionList.map((question: SearchQuestion, index) => {
            return <Card key={index} question={question} />
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

export default SearchQuestions
