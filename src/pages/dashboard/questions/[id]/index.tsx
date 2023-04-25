import type { GetServerSideProps } from 'next'

import { QuestionDetailPage } from '@/component/page/[id]'

const QuestionDetail = () => {
  return <QuestionDetailPage />
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default QuestionDetail
