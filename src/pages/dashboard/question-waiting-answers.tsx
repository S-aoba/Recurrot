import { QuestionWaitingAnswersPage } from '@/component/page/question-waiting-answers/'

const QuestionWaitingAnswers = () => {
  return <QuestionWaitingAnswersPage />
}

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default QuestionWaitingAnswers
