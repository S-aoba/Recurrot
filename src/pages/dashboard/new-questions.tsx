import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import router from 'next/router'
import { useEffect } from 'react'

import type { QuestionAndAnswerIdListType } from '@/common/type'
import { useSubNavTabStyle } from '@/component/layout/Navigation/useSubNavTabStyle'
import { Card } from '@/component/ui/Card'

type NewQuestionsProps = {
  initialData: QuestionAndAnswerIdListType[]
}

const NewQuestions: NextPage<NewQuestionsProps> = ({ initialData }) => {
  const { data: questions } = useQuery<QuestionAndAnswerIdListType[], Error>({
    queryKey: ['questions'],
    queryFn: getQuestions,
    initialData,
    staleTime: 10000, //5分
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })

  const { handleSubNavTabStyle } = useSubNavTabStyle()

  useEffect(() => {
    handleSubNavTabStyle('dashboard/new-questions')
  })

  return (
    <>
      <Head>
        <title>Recurrot - 新着</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className=' flex h-fit flex-1 justify-center bg-red-500'>
        <div className=' grid w-9/12 grid-cols-1 place-items-center gap-10 py-5 sm:grid-cols-2 md:grid-cols-3'>
          {questions.map((question: QuestionAndAnswerIdListType, index) => {
            return <Card key={index} question={question} />
          })}
        </div>
      </main>
    </>
  )
}

const getQuestions = async () => {
  const { data } = await axios.get<QuestionAndAnswerIdListType[]>(`${process.env.NEXT_PUBLIC_API_URL}/question`)
  return data
}

export const getServerSideProps = async () => {
  const initialData = await getQuestions()
  return {
    props: {
      layout: 'WrapperLayout',
      initialData,
    },
  }
}

export default NewQuestions
