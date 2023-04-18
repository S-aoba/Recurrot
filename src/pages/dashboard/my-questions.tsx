import { MyQuestionsPage } from '@/component/page/my-questions'

const MyQuestions = () => {
  return <MyQuestionsPage />
}

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default MyQuestions
