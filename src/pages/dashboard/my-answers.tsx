import { MyAnswersPage } from '@/component/page/my-answers'

const MyAnswers = () => {
  return <MyAnswersPage />
}

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default MyAnswers
