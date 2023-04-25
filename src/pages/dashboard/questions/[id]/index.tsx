import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'

import type { SingleQuestion } from '@/common/type'
import { QuestionDetailPage } from '@/component/page/[id]'

type QuestionDetailProps = {
  question: SingleQuestion
}

const QuestionDetail: NextPage<QuestionDetailProps> = ({ question }) => {
  return <QuestionDetailPage question={question} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = ctx.req.headers.cookie
  if (!cookie) return { props: { layout: 'WrapperLayout' } }

  const res = await axios.get<SingleQuestion>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/question/${ctx.query.id}`, {
    headers: {
      cookie,
    },
  })
  const question = res.data

  return {
    props: {
      question,
      layout: 'WrapperLayout',
    },
  }
}

export default QuestionDetail
