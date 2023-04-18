import { PostedQuestionsPage } from '@/component/page/posted-questions'

const PostedQuestions = () => {
  return <PostedQuestionsPage />
}

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default PostedQuestions
