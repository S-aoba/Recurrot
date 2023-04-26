import { QuestionsAnsweredPage } from '@/component/page/questions-answered'

const QuestionsAnswered = () => {
  return <QuestionsAnsweredPage />
}

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default QuestionsAnswered
