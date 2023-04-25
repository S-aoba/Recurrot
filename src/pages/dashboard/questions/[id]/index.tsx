import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import { parseCookies } from 'nookies'

import type { SingleQuestion } from '@/common/type'
import { QuestionDetailPage } from '@/component/page/[id]'

type Props = {
  question: SingleQuestion
}

const QuestionDetail: NextPage<Props> = ({ question }) => {
  return <QuestionDetailPage question={question} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id
  const cookies = parseCookies(ctx)
  const cookie = Object.keys(cookies)
    .map((cookieName) => {
      return `${cookieName}=${cookies[cookieName]}`
    })
    .join(';')

  const data = await getSingleQuestion(id, cookie)

  return {
    props: {
      question: data,
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
