import axios from 'axios'
import type { GetServerSideProps } from 'next'

import type { CurrentUser, SingleQuestion } from '@/common/type'
import { QuestionDetailPage } from '@/component/page/[id]'

const QuestionDetail = (props: { question: SingleQuestion; currentUser: CurrentUser }) => {
  const { question, currentUser } = props

  return <QuestionDetailPage question={question} currentUser={currentUser} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id
  const cookie = ctx.req.headers.cookie

  const question = await getSingleQuestion(id, cookie)
  const currentUser = await getCurrentUser(cookie)

  // if (!question) return { notFound: true, redirect: { destination: '/dashboard/new-questions', permanent: false } }

  return {
    props: {
      question,
      currentUser,
      layout: 'WrapperLayout',
    },
  }
}

const getSingleQuestion = async (id: string | string[] | undefined, cookie: string | undefined) => {
  const res = await axios.get<SingleQuestion>(`${process.env.NEXT_PUBLIC_API_URL}/question/${id}`, {
    headers: {
      cookie,
    },
  })
  return res.data
}

const getCurrentUser = async (cookie: string | undefined) => {
  const { data } = await axios.get<CurrentUser>(`${process.env.NEXT_PUBLIC_API_URL}/user/current-user`, {
    headers: {
      cookie,
    },
  })
  return data
}
export default QuestionDetail
