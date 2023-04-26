import { NewQuestionsPage } from '@/component/page/new-questions'

const NewQuestions = () => {
  return <NewQuestionsPage />
}

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default NewQuestions
