import { QuestionDetailPage } from '@/component/page/[id]'

const QuestionDetail = () => {
  return <QuestionDetailPage />
}

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default QuestionDetail
