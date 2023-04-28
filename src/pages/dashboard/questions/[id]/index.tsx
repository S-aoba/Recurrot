import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'

import type { SingleQuestion } from '@/common/type'
import { QuestionDetailPage } from '@/component/page/[id]'

type Props = {
  question: SingleQuestion
}

const QuestionDetail: NextPage<Props> = ({ question }) => {
  return (
    <>
      <div>{question.title}</div>
      <QuestionDetailPage />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const csrfToken = ctx.req.cookies._csrf
  const accessToken = ctx.req.cookies.access_token

  // console.log(`_csrf=${csrfToken}; access_token=${accessToken}}`)
  const id = ctx.query.id
  const cookie = `_csrf=${csrfToken}; access_token=${accessToken}`
  const question = await getSingleQuestion(id, cookie)

  return {
    props: {
      question,
      layout: 'WrapperLayout',
    },
  }
}

export default QuestionDetail

const getSingleQuestion = async (id: string | string[] | undefined, cookie: string) => {
  const res = await axios.get<SingleQuestion>(`${process.env.NEXT_PUBLIC_API_URL}/question/${id}`, {
    headers: {
      cookie,
    },
  })
  return res.data
}
