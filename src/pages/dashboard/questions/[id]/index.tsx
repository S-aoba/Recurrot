// import axios from 'axios'
import type { GetServerSideProps } from 'next'
import nookies from 'nookies'

// import type { SingleQuestion } from '@/common/type'
import { QuestionDetailPage } from '@/component/page/[id]'

const QuestionDetail = ({ cookie }: any) => {
  // console.log('data', data)
  return (
    <div>
      <p>{cookie}</p>
      <QuestionDetailPage />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const { id } = ctx.query
  const cookies = nookies.get(ctx)
  // cookiesをstringに変換して、cookieに入れる
  const cookie = Object.keys(cookies).reduce((acc, cur) => {
    return `${acc}${cur}=${cookies[cur]};`
  }, '')

  // const data = await getSingleQuestion(id, cookie)

  return {
    props: {
      // data,
      cookie,
      layout: 'WrapperLayout',
    },
  }
}

// const getSingleQuestion = async (id, cookie) => {
//   const res = await axios.get<SingleQuestion>(`${process.env.NEXT_PUBLIC_API_URL}/question/${id}`, {
//     headers: {
//       cookie,
//     },
//   })
//   return res.data
// }

export default QuestionDetail
