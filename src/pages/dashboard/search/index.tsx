import { SearchPage } from '@/component/page/search'

const SearchQuestions = () => {
  return <SearchPage />
}

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default SearchQuestions
